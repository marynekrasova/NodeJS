"use strict";
//Task 1
const colors = require('colors');

function numPrime(min, max) {
  let colorArr = ["green", "yellow", "red"];
  if ((min > max) || (min < 0)) throw Error("Не верно задан диапазон");

  let j = 0;
  for (let i = 2; i <= max; i++) {
    let text = colors[colorArr[j]] && colors[colorArr[j]](i);
    console.log(text);
    j = j === 2 ? 0 : j + 1;
  }
}

numPrime(1, 100);


