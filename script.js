"use strict";
//Task 4
const fsPromis = require('fs/promises');
const fs = require('fs');
const {lstatSync} = require('fs');
const path = require('path');
const inquirer = require('inquirer');

let executionDir = process.cwd();

class ListItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }

  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}
const run = async () => {
  const list = await fsPromis.readdir(executionDir);
  const items = list.map(fileName =>
    new ListItem(path.join(executionDir, fileName), fileName));

  const item = await inquirer.prompt([
    {
      name: 'fileName',
      type: 'list', // input, number, confirm, list, checkbox, password
      message: 'Выберите файл для чтения',
      choices: items.map(item => ({name: item.fileName, value: item})),
    }
  ]).then(answer => answer.fileName);

  if (item.isDir) {
    executionDir = item.path;
    return await run();
  } else {
    const data = await fsPromis.readFile(item.path, 'utf-8');
    const writeStreamFirst = fs.createWriteStream('./89.123.1.41.log', {flags: 'a', encoding: 'utf8'});
    const writeStreamSecond = fs.createWriteStream('./34.48.240.111.log', {flags: 'a', encoding: 'utf8'});

    try {
      function readFile(chunk) {
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
        console.log('File reading finished')
      }
      readFile(data);

    } catch (e) {
      console.log(Error); // (3)

    }
  }
};

run();
