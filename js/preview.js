'use strict';

(function () {
  var bigPictureSection = document.querySelector('.big-picture');
  var bigPicture = bigPictureSection.querySelector('.big-picture__img');
  var commentsCounter = bigPictureSection.querySelector('.social__comment-count');
  var commentsLoader = bigPictureSection.querySelector('.comments-loader');
  var commentList = bigPictureSection.querySelector('.social__comments');
  var commentListItem = bigPictureSection.querySelector('.social__comment');
  var likesCount = bigPictureSection.querySelector('.likes-count');
  var pictureDescription = bigPictureSection.querySelector('.social__caption');
  var commentsCount = bigPictureSection.querySelector('.comments-count');
  var bigPictureClose = bigPictureSection.querySelector('.big-picture__cancel');
  var picturesContainer = document.querySelector('.pictures');

  var openPreviewPressEscHandler = function (evt) {
    if (evt.keyCode === window.form.ESC_KEYCODE) {
      bigPictureSection.classList.add('hidden');
    }
  };
  var loadCounterClickHandler = function () {
    var noShowComments = commentList.querySelectorAll('.visually-hidden');
    for (var i = 0; i < 5 && i < noShowComments.length; i++) {
      window.utils.showElement(noShowComments[i]);
    }
    if (noShowComments.length <= 5) {
      window.utils.hideElement(commentsLoader);
    }
  };

  var openPreview = function () {
    bigPictureSection.classList.remove('.hidden');
    document.addEventListener('keydown', openPreviewPressEscHandler);
    commentsLoader.addEventListener('click', loadCounterClickHandler);
    var noShowComments = commentList.querySelectorAll('.visually-hidden');
    if (noShowComments.length === 0) {
      window.utils.hideElement(commentsLoader);
    }
  };

  var closePreview = function () {
    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild);
    }
    window.utils.showElement(commentsLoader);
    commentsLoader.removeEventListener('click', loadCounterClickHandler);
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
    pictureDescription.textContent = publication.description;
    commentsCount.textContent = publication.comments.length;
    renderCommentHtmlElement(publication);
  };

  /**
  *
  * @param {Publication} publication
  * @return {void}
  */
  var renderCommentHtmlElement = function (publication) {
    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild);
    }
    for (var i = 0; i < publication.comments.length; i++) {
      var commentItem = commentListItem.cloneNode(true);
      commentList.appendChild(commentItem);
      commentItem.querySelector('.social__picture').src = publication.comments[i].avatar;
      commentItem.querySelector('.social__picture').alt = publication.comments[i].name;
      commentItem.querySelector('.social__text').textContent = publication.comments[i].message;
      if (i > 4) {
        window.utils.hideElement(commentItem);
      }
    }
  };

  /**
   * Функция показывает слой с полноразмерной картинкой по превью которой кликнул пользователь
   * @param {[]} publicationsArr массив с данными, из которых формируются публикации
   * @return {void}
   */

  var showActivePublicationHtmlElement = function (publicationsArr) {
    picturesContainer.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('picture__img') && evt.target.dataset.id !== undefined) {
        bigPictureSection.classList.remove('hidden');
        renderActivePublicationHtmlElement(publicationsArr[evt.target.dataset.id]);
        openPreview();
      } else {
        evt.stopPropagation();
      }
    });

    picturesContainer.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.form.ENTER_KEYCODE && evt.target.children[0].classList.contains('picture__img') && evt.target.children[0].dataset.id !== undefined) {
        bigPictureSection.classList.remove('hidden');
        renderActivePublicationHtmlElement(publicationsArr[evt.target.children[0].dataset.id]);
        openPreview();
      }
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
