"use strict";
//Task 2
const fs = require('fs');
const readStream = fs.createReadStream('./access1.log', 'utf8');
const writeStreamFirst = fs.createWriteStream('./89.123.1.41.log',  { flags: 'a', encoding: 'utf8' });
const writeStreamSecond = fs.createWriteStream('./34.48.240.111.log',  { flags: 'a', encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log('Start');
  let arrayOfStrings = chunk.split('\n');

  arrayOfStrings.forEach(el =>
  {
    if(el.indexOf('89.123.1.41') !== -1) {
      writeStreamFirst.write(el);
      writeStreamFirst.write('\n');
    } else if (el.indexOf('34.48.240.111') !== -1)
    {
      writeStreamSecond.write(el);
      writeStreamSecond.write('\n');
    }
  })
});

readStream.on('end', () => console.log('File reading finished'));
readStream.on('error', () => console.log(err));


