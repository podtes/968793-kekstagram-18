'use strict';

(function () {
  var bigPictureSection = document.querySelector('.big-picture');
  var bigPicture = bigPictureSection.querySelector('.big-picture__img');
  var commentsCounter = bigPictureSection.querySelector('.social__comment-count');
  var commentsLoader = bigPictureSection.querySelector('.comments-loader');
  var commentListItems = bigPictureSection.querySelectorAll('.social__comment');
  var likesCount = bigPictureSection.querySelector('.likes-count');
  var commentsCount = bigPictureSection.querySelector('.comments-count');
  var smallPictures;
  var bigPictureClose = bigPictureSection.querySelector('.big-picture__cancel');


  var openPreviewPressEscHandler = function (evt) {
    if (evt.keyCode === window.form.ESC_KEYCODE) {
      bigPictureSection.classList.add('hidden');
    }
  };
  var openPreview = function () {
    bigPictureSection.classList.remove('.hidden');
    document.addEventListener('keydown', openPreviewPressEscHandler);
  };
  var closePreview = function () {
    bigPictureSection.classList.add('hidden');
    document.removeEventListener('keydown', openPreviewPressEscHandler);
  };

  /**
  * Функция присваивает полям выбранного пользователем поста значения из публикации
  * @param {Publication} publication объект, содержащий необходимые данные для генерации активной публикации
  * @return {void}
  */
  var renderActivePublicationHtmlElement = function (publication) {
    bigPicture.childNodes[1].src = publication.url;
    likesCount.textContent = publication.likes;
    commentsCount.textContent = publication.comments.length;
    renderCommentHtmlElements(publication);
  };

  /**
  *
  * @param {Publication} publication
  * @return {void}
  */
  var renderCommentHtmlElements = function (publication) {
    for (var i = 0; i < commentListItems.length; i++) {
      commentListItems[i].children[0].src = publication.comments[i].avatar;
      commentListItems[i].children[0].alt = publication.comments[i].name;
      commentListItems[i].children[1].textContent = publication.comments[i].message;
    }
  };

  /**
   * Функция показывает слой с полноразмерной картинкой по превью которой кликнул пользователь
   * @param {[]} publicationsArr массив с данными, из которых формируются публикации
   * @return {void}
   */

  var showActivePublicationHtmlElement = function (publicationsArr) {
    smallPictures = document.querySelectorAll('.picture');

    smallPictures[0].addEventListener('click', function () {
      bigPictureSection.classList.remove('hidden');
      renderActivePublicationHtmlElement(publicationsArr[0]);
      openPreview();
    });
  };


  window.preview = {
    commentsCounter: commentsCounter,
    commentsLoader: commentsLoader,
    renderActivePublicationHtmlElement: renderActivePublicationHtmlElement,
    bigPictureSection: bigPictureSection,
    showActivePublicationHtmlElement: showActivePublicationHtmlElement,
    bigPictureClose: bigPictureClose,
    closePreview: closePreview
  };

})();
