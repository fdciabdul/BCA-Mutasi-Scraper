const parser = require('./lib/parser');
const { compile } = require('html-to-text');

const convert = compile({
  wordwrap: 130
});

module.exports = {
  getBalance: async (username, password) => {
    try {
      const IP = await parser.getIP();
      await parser.login(username, password, IP);
      await parser.openSettlementMenu();
      const balance = await parser.balance();
      await parser.logout();
      return balance;
    } catch (err) {
      await parser.logout();
      throw err;
    }
  },

  getSettlement: async (username, password, tanggalto, bulanto, tanggal, bulan) => {
    try {
      const IP = await parser.getIP();
      await parser.login(username, password, IP);
      await parser.openSettlementMenu();
      const res = await parser.settlement(tanggalto, bulanto, tanggal, bulan);
      let okey = [];
      for (i in res) {
        let str = convert(res[i].nominal, {
          wordwrap: 130
        });
        str = str.substring(0, str.length - 3);
        okey.push({
          tanggal: convert(res[i].tanggal, {
            wordwrap: 130
          }),
          keterangan: convert(res[i].keterangan, {
            wordwrap: 130
          }),
          cab: convert(res[i].cab, {
            wordwrap: 130
          }),
          nominal: str,
          mutasi: convert(res[i].mutasi, {
            wordwrap: 130
          }),
          saldoakhir: convert(res[i].saldoakhir, {
            wordwrap: 130
          })
        });
      }

      console.log(okey);
      await parser.logout();
      return okey;
    } catch (err) {
      await parser.logout();
      throw err;
    }
  }
};
