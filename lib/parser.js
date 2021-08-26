const request = require('request-promise-native');
const moment = require('moment');
const { stringBetween, tdValue, removeHtml, toNumber } = require('./helper');
const cheerio = require('cheerio');
const fs = require('fs');
const j = request.jar();
const { compile } = require('html-to-text');

const convert = compile({
  wordwrap: 130
});
const rp = request.defaults({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus One Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
  },
  jar: j
});

module.exports = {
  getIP: async () => {
    const ipify = await request({
      uri: 'https://api.ipify.org/?format=json',
      json: true
    });
    return ipify.ip;
  },

  login: (username, password, ip) => {
    const options = {
      method: 'POST',
      uri: 'https://ibank.klikbca.com/authentication.do',
      form: {
        'value(user_id)': username,
        'value(pswd)': password,
        'value(Submit)': 'LOGIN',
        'value(actions)': 'login',
        'value(browser_info)': 'Mozilla/5.0+(Windows+NT+10.0;+Win64;+x64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/92.0.4515.159+Safari/537.36',
        'value(user_ip)': ip,
        'value(mobile)': false
      
      },
      headers: {
        Referer: 'https://ibank.klikbca.com/login.jsp'
      }
    };
    return rp(options)
      .then(result => {
      //  console.log(result)
      })
  },

  openSettlementMenu: () => {
    const options = {
      method: 'POST',
      uri: 'https://ibank.klikbca.com/nav_bar_indo/account_information_menu.htm',
      headers: {
        Referer: 'https://ibank.klikbca.com/authentication.do'
      }
    };
    return rp(options);
  },

  balance: () => {
    const options = {
      method: 'POST',
      uri: 'https://ibank.klikbca.com/balanceinquiry.do',
      headers: {
        Referer: 'https://ibank.klikbca.com/nav_bar_indo/account_information_menu.htm'
      }
    };
    return rp(options)
      .then(result => {
      const potong = result.split('<table border="0" cellpadding="0" cellspacing="0" width="590">')[2];
      const potongtable = potong.split("</tr>");
      const loop = potongtable[1].replace(/\n|\r/g, "").split("</td>")
      // let ay = []
      // for(i in loop) {
      //  // const td = potongtable[i].split('</td>');
      // ay.push(loop[i])
      // }
      const akhir = [{
        norek: convert(loop[0], {
          wordwrap: 130
        }),
        jenis: convert(loop[1], {
          wordwrap: 130
        }),
        saldo: convert(loop[3], {
          wordwrap: 130
        })
      }]
      return akhir;
      })
  },

  settlement: async (tanggalto , bulanto , tanggal, bulan) => {
    const options = {
      method: 'POST',
      uri: 'https://ibank.klikbca.com/accountstmt.do?value(actions)=acct_stmt',
      headers: {
        Referer: 'https://ibank.klikbca.com/nav_bar_indo/account_information_menu.htm'
      }
    };
    try {
      
      const now = moment();
      const tanggalawal = tanggalto;
      const bulannawal = bulanto;
      // const yearawal = now.format('YYYY');
      const tanggalend = tanggal;
      const bulanend = bulan;
      const year = now.format('YYYY');

      await rp(options);
      options.uri = 'https://ibank.klikbca.com/accountstmt.do?value(actions)=acctstmtview';
      options.headers.Referer = 'https://ibank.klikbca.com/accountstmt.do?value(actions)=acct_stmt';
      options.form = {
        r1: 1,
        'value(D1)': 0,
        'value(startDt)': tanggalawal,
        'value(startMt)': bulannawal,
        'value(startYr)': year,
        'value(endDt)': tanggalend,
        'value(endMt)': bulanend,
        'value(endYr)': year
      };
      const result = await rp(options);
      // const cleanStmt = [];
      

      const reg = result.split('Saldo')[1].split('</table>  </td></tr><tr>  <td colspan="2">    <table border="0" width="70%" cellpadding="0" cellspacing="0" bordercolor="#ffffff">')[0];
      const td = reg.split(/<\/tr>/);
      let $ = cheerio.load(result);
      let hey = [];
      let wa;
      // for(i in tdi){
        $('table > tbody > tr').toArray().map(item => {
          wa = $('td > div > font').text();
        });
      // }
    const datarr = wa.split("Saldo")[1].split("\n")
    td.forEach(element => {
     const potong = element.split('</td>');
     hey.push({
       tanggal: potong[0],
      keterangan:potong[1],
      cab : potong[2],
      nominal: potong[3],
      mutasi: potong[4],
      saldoakhir: potong[5]})
    });
    return hey.slice(1, -1);
    } catch (err) {
      throw err.message;
    }
  },

  logout: () => {
    const options = {
      method: 'GET',
      uri: 'https://ibank.klikbca.com/authentication.do?value(actions)=logout',
      headers: {
        Referer: 'https://ibank.klikbca.com/authentication.do?value(actions)=menu'
      }
    };
    return rp(options);
  }
};
