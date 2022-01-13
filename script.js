"use strict";
//Task 1
const colors = require('colors');

function numPrime(min, max) {
  let colorArr = ["green", "yellow", "red"];
  if ((min > max) || (min < 0)||(isNaN(min)||(isNaN(max)))) console.log(colors.red("Не верно задан диапазон или это не числа"));

  let j = 0;
  for (let i = 2; i <= max; i++) {
    let text = colors[colorArr[j]] && colors[colorArr[j]](i);
    console.log(text);
    j = j === 2 ? 0 : j + 1;
  }
}

numPrime(2, 100);


