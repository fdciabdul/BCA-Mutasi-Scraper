# BCA-Mutasi-Scraper
NodeJS Package for scraping statement (mutasi) in BCA Internet Banking 

![image](https://user-images.githubusercontent.com/31664438/130382645-3763dd51-3867-48b9-b671-7cf103507904.png)

Library ini hasil modif dari https://github.com/apriady/nodejs-bca-scraper

Kenapa saya modif ? karna file originalnya  adalah internet banking versi mobile dan tidak ada nilai saldo akhir pada mutasi nya


# nodejs-bca-scraper

Plugin untuk membantu anda mendapatkan informasi saldo terakhir rekening BCA anda serta mutasi rekening BCA anda pada hari itu melalui KlikBCA.

## Cara Install

```bash
npm install --save mutasi-bca
```

atau

```bash
npm install https://github.com/fdciabdul/BCA-Mutasi-Scraper
```

## Penggunaan

```javascript
const bca = require('mutasi-bca');
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

### Cek Settlement Pada Hari tertentu

```javascript
bca
  .getSettlement(USERNAME, PASSWORD , 17 , 08 , 17 ,09) // cek tanggal 17 bulang 8 sampai tanggal 17 bulan 19 (30hari)
  .then(res => {
    console.log('settlement ', res);
  })
  .catch(err => {
    console.log('error ', err);
  });
```

# License

[MIT](https://github.com/fdciabdul/BCA-Mutasi-Scraper)

# Author

[Achmad Apriady](mailto:abdulmuttaqin456@gmail.com)

# Modified by
[Abdul Muttaqin](mailto:abdulmuttaqin456@gmail.com)
