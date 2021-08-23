# BCA-Mutasi-Scraper
NodeJS Package for scraping statement (mutasi) in BCA Internet Banking 

![image](https://user-images.githubusercontent.com/31664438/130382645-3763dd51-3867-48b9-b671-7cf103507904.png)

Library ini hasil modif dari https://github.com/apriady/nodejs-bca-scraper

Kenapa saya modif ? karna file originalnya  adalah internet banking versi mobile dan tidak ada nilai saldo akhir pada mutasi nya


## Cara Install

```bash
npm install --save nodejs-bca-scraper
```

atau

```bash
yarn add nodejs-bca-scraper
```

## Penggunaan

```javascript
const bca = require('nodejs-bca-scraper');
```

### Cek Saldo Terakhir

```javascript
bca
  .getBalance(USERNAME, PASSWORD)
  .then(res => {
    console.log('saldo ', res);
  })
  .catch(err => {
    console.log('error ', err);
  });
```

### Cek Settlement Pada Hari Itu

```javascript
bca
  .getSettlement(USERNAME, PASSWORD)
  .then(res => {
    console.log('settlement ', res);
  })
  .catch(err => {
    console.log('error ', err);
  });
```

# License

MIT

