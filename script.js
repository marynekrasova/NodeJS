"use strict";
//Task 4
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();
const fileList = fs.readdirSync('./').filter(isFile);
// const fileList = fs.readdirSync('../');

inquirer.prompt([
  {
    name: 'fileName',
    type: 'list', // input, number, confirm, list, checkbox, password
    message: 'Выберите файл для чтения',
    choices: fileList,
  }
]).then(({ fileName }) => {

  const fullPath = path.join(executionDir, fileName);
  const data = fs.readFileSync(fullPath, 'utf-8');
  const writeStreamFirst = fs.createWriteStream('./89.123.1.41.log',  { flags: 'a', encoding: 'utf8' });
  const writeStreamSecond = fs.createWriteStream('./34.48.240.111.log',  { flags: 'a', encoding: 'utf8' });

  try {
    function readFile(chunk){
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
      console.log('File reading finished')
    };
    readFile(data);

  } catch(e) {
    console.log(Error); // (3)

  }
});

