"use strict";
//Task 4
const fs = require('fs');
const {lstatSync} = require('fs');
const path = require('path');
const http = require('http');

(async () => {
  const isFile = (path) => lstatSync(path).isFile();

  http.createServer((req, res) => {

    const fullPath = path.join(process.cwd(), req.url);

    if (!fs.existsSync(fullPath)) return res.end('Не наеден файл');

    if (isFile(fullPath)) {
      let data = fs.createReadStream(fullPath, 'utf-8');
      const writeStreamFirst = fs.createWriteStream('./89.123.1.41.log', {flags: 'a', encoding: 'utf8'});
      const writeStreamSecond = fs.createWriteStream('./34.48.240.111.log', {flags: 'a', encoding: 'utf8'});

      data.on('data', (chunk) => {
        console.log('Start');
        let arrayOfStrings = chunk.split('\n');

        arrayOfStrings.forEach(el => {
          if (el.indexOf('89.123.1.41') !== -1) {
            writeStreamFirst.write(el);
            writeStreamFirst.write('\n');

          } else if (el.indexOf('34.48.240.111') !== -1) {
            writeStreamSecond.write(el);
            writeStreamSecond.write('\n');
          }
        })
      });

      return data.pipe(res);
    }

    let linksList = '';

    fs.readdirSync(fullPath)
      .forEach(fileName => {
        const filePath = path.join(req.url, fileName);
        linksList += `<li><a href="${filePath}">${fileName}</a></li>`;
      });
    const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('##linksList', linksList);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    })
    return res.end(HTML);

  }).listen(5555);
})();


