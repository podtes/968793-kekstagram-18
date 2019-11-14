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

  /**
   * Функция возвращает массив неповторяющихся случайных элементов из другого массива
   * @param {*[]} arr массив, из которого будет выбирать случайные эелементы
   * @param {number} countOfElements нужное нам количество неповторяющихся случайных элементов
   * @return {[]} randomArrElements массив случайных неповторяющихся элементов
   */
  var getNoRepeatRandomElementsArray = function (arr, countOfElements) {
    var randomArrElements = [];
    for (var i = 0; i < countOfElements;) {
      randomArrElements.push(window.utils.getRandomArrayElement(arr));
      if (randomArrElements.indexOf(randomArrElements[i]) !== i) {
        randomArrElements.pop();
      } else {
        i++;
      }
    }
    return randomArrElements;
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
    getNoRepeatRandomElementsArray: getNoRepeatRandomElementsArray,
    hideElement: hideElement,
    showElement: showElement
  };

})();
