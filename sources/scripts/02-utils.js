// alias functions
var $ = (id) => document.getElementById(id);
var $$ = (selector) => document.querySelector(selector);
var $$$ = (selector) => document.querySelectorAll(selector);
var createElement = (type) => document.createElement(type);
var random = () => Math.random();
var getFromLS = (item) => JSON.parse(window.localStorage.getItem(item));
var setFromLS = (item, value) =>
  window.localStorage.setItem(item, JSON.stringify(value));

// Get a random item from an array
function getRandomItem(array) {
  return array[~~(random() * array.length)];
}

// Get a random int in a range
function getRandomNumber(min, max) {
  return ~~(random() * (max - min + 1)) + min;
}

// Get a random int in a range
function getRandomGaussian(min, max) {
  return ~~(gaussianRandom() * (max - min + 1)) + min;
}

function gaussianRandom() {
  let u = 0;
  let v = 0;
  //Converting [0,1) to (0,1)
  while (u === 0) {
    u = random();
  }
  while (v === 0) {
    v = random();
  }
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    return gaussianRandom();
  } // resample between 0 and 1
  return num;
}

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}

window.onload = function () {
  var fiveMinutes = 60 * 5,
      display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
};
