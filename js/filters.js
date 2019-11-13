'use strict';

(function () {
  var filters = document.querySelector('.img-filters');
  var popularPublicationsButton = document.getElementById('filter-popular');
  var randomPublicationsButton = document.getElementById('filter-random');
  var discussedPublicationsButton = document.getElementById('filter-discussed');

  var showFilters = function () {
    filters.classList.remove('img-filters--inactive');
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
        i = i;
        randomArrElements.pop();
      } else {
        i++;
      }
    }
    return randomArrElements;
  };

  /**
   * Функция сортирует массив по количеству комментариев в объекте
   * @param {[]} arr изначальный массив
   * @return {[]} arrCopy отсортированный массив
   */
  var sortArrayByCommentsCount = function (arr) {
    var arrCopy = arr.slice();
    arrCopy.sort (function (a, b) {
      return a.comments.length - b.comments.length;
    })
    return arrCopy;
  };



    window.filters = {
      showFilters: showFilters,
      popularPublicationsButton: popularPublicationsButton,
      randomPublicationsButton: randomPublicationsButton,
      discussedPublicationsButton: discussedPublicationsButton,
      getNoRepeatRandomElementsArray: getNoRepeatRandomElementsArray,
      sortArrayByCommentsCount: sortArrayByCommentsCount
    }
})();
