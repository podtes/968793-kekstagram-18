'use strict';

(function () {
  var getRandomIntFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
  * Функция возвращает случайный элемент массива
  * @param {*[]} arr массив, из которого будем выбирать случайный элемент
  * @return {*} randomValue случайный элемент массива
  */

  var getRandomArrayElement = function (arr) {
    var randomValue = arr[Math.floor(Math.random() * arr.length)];
    return randomValue;
  };

  var hideElement = function (element) {
    element.classList.add('visually-hidden');
  };

  var showElement = function (element) {
    element.classList.remove('visually-hidden');
  };

  window.utils = {
    getRandomIntFromInterval: getRandomIntFromInterval,
    getRandomArrayElement: getRandomArrayElement,
    hideElement: hideElement,
    showElement: showElement
  };

})();
