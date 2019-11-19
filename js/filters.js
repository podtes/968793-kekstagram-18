'use strict';

(function () {
  var filters = document.querySelector('.img-filters');
  var popularPublicationsButton = document.querySelector('#filter-popular');
  var randomPublicationsButton = document.querySelector('#filter-random');
  var discussedPublicationsButton = document.querySelector('#filter-discussed');

  var show = function () {
    filters.classList.remove('img-filters--inactive');
  };

  /**
   * Функция сортирует массив по количеству комментариев в объекте
   * @param {[]} arr изначальный массив
   * @return {[]} arrCopy отсортированный массив
   */
  var sortArrayByCommentsCount = function (arr) {
    var arrCopy = arr.slice();
    arrCopy.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return arrCopy;
  };

  /**
   * @param {Node} activeButton
   * @param {Node} passiveButton1
   * @param {Node} passiveButton2
   * @return {void}
   */
  var toggleActiveClassAtFilterButtons = function (activeButton, passiveButton1, passiveButton2) {
    activeButton.classList.add('img-filters__button--active');
    passiveButton1.classList.remove('img-filters__button--active');
    passiveButton2.classList.remove('img-filters__button--active');
  };

  window.filters = {
    show: show,
    popularPublicationsButton: popularPublicationsButton,
    randomPublicationsButton: randomPublicationsButton,
    discussedPublicationsButton: discussedPublicationsButton,
    sortArrayByCommentsCount: sortArrayByCommentsCount,
    toggleActiveClassAtFilterButtons: toggleActiveClassAtFilterButtons,
  };

})();
