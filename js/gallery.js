'use strict';

(function () {

  /**
   * Функция генерирует DOM элемент на основе шаблона pictureTemplate
   * @param {Publication} publication
   * @param {number} pictureId
   * @return {Node} возвращает сгенерированный DOM элемент
   */
  var generatePublicationHtmlElement = function (publication, pictureId) {
    var pictureElement = window.data.pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = publication.url;
    pictureElement.querySelector('.picture__likes').textContent = publication.likes;
    pictureElement.querySelector('.picture__comments').textContent = publication.comments.length;
    pictureElement.querySelector('.picture__img').setAttribute('data-id', pictureId);

    return pictureElement;
  };

  /**
   * @param {Publication[]} publicationsArr
   * @return {void}
   */
  var renderPublicationHtmlElements = function (publicationsArr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < publicationsArr.length; i++) {
      fragment.appendChild(generatePublicationHtmlElement(publicationsArr[i], i));
    }
    document.querySelector('.pictures').appendChild(fragment);
    window.showActivePublicationHtmlElement(publicationsArr);
  };

  /**
   * @return {void}
   */
  var deletePublicationHtmlElements = function () {
    var smallPreviews = document.querySelectorAll('.picture');
    for (var i = 0; i < smallPreviews.length; i++) {
      smallPreviews[i].parentNode.removeChild(smallPreviews[i]);
    }
  };

  window.gallery = {
    renderPublicationHtmlElements: renderPublicationHtmlElements,
    deletePublicationHtmlElements: deletePublicationHtmlElements
  };
})();
