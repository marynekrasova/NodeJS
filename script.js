"use strict";
//Task 2
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

const emitter = new MyEmitter();
emitter.on('endtime', () => {
  console.log('"Время истекло"');
});
emitter.on('outputtime', (days,hours,minutes,seconds) => {
  console.log(`${days} days ${hours} hours ${minutes} minutes ${seconds}seconds`);
});

function countDownTimer(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(endtime) {
  function updateClock() {
    let t = countDownTimer(endtime);
    let days = t.days;
    let hours = ('0' + t.hours).slice(-2);
    let minutes = ('0' + t.minutes).slice(-2);
    let seconds = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timeinterval);
      emitter.emit('endtime');
    }
    emitter.emit('outputtime', days,hours,minutes,seconds);
  }

  updateClock();
  let timeinterval = setInterval(updateClock, 1000);
}

let deadline = "January 18 2022 19:40:00 GMT+0300";

initializeClock(deadline);
