'use strict';

(function () {

  /**
   * Функция генерирует DOM элемент на основе шаблона pictureTemplate
   * @param {Publication} publication
   * @return {Node} возвращает сгенерированный DOM элемент
   */
  var generatePublicationHtmlElement = function (publication) {
    var pictureElement = window.data.pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = publication.url;
    pictureElement.querySelector('.picture__likes').textContent = publication.likes;
    pictureElement.querySelector('.picture__comments').textContent = publication.comments.length;

    return pictureElement;
  };

  /**
   * Функция присваивает атрибут каждому DOM элементу из коллекции
   * @return {void}
   */
  var assignAttributeToPreviewPicture = function () {
    var previewsPictures = document.querySelectorAll('.picture__img');
    for (var i = 0; i < previewsPictures.length; i++) {
      previewsPictures[i].setAttribute('data-id', i + 1)
    }
  };

  /**
   * @param {Publication[]} publicationsArr
   * @return {void}
   */
  var renderPublicationHtmlElements = function (publicationsArr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < publicationsArr.length; i++) {
      fragment.appendChild(generatePublicationHtmlElement(publicationsArr[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
    assignAttributeToPreviewPicture();
  };

  window.gallery = {
    renderPublicationHtmlElements: renderPublicationHtmlElements
  };
})();
