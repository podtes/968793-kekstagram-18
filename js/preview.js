'use strict';

(function () {
  var bigPictureSection = document.querySelector('.big-picture');
  var bigPicture = bigPictureSection.querySelector('.big-picture__img');
  var bigPictureImg = bigPicture.children[0];
  var commentsCounter = bigPictureSection.querySelector('.social__comment-count');
  var commentsLoader = bigPictureSection.querySelector('.comments-loader');
  var pictureDescription = bigPictureSection.querySelector('.social__caption');
  var commentListItems = bigPictureSection.querySelectorAll('.social__comment');
  var likesCount = bigPictureSection.querySelector('.likes-count');
  var commentsCount = bigPictureSection.querySelector('.comments-count');

  /**
  * Функция присваивает полям выбранного пользователем поста значения из публикации
  * @param {Publication} publication объект, содержащий необходимые данные для генерации активной публикации
  * @return {void}
  */
  var renderActivePublicationHtmlElement = function (publication) {
    bigPictureImg.src = publication.url;
    likesCount.textContent = publication.likes;
    commentsCount.textContent = publication.comments.length;
    pictureDescription.textContent = publication.description;

    renderCommentHtmlElements(window.data.publications[0]);
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

  window.preview = {
    commentsCounter: commentsCounter,
    commentsLoader: commentsLoader,
    renderActivePublicationHtmlElement: renderActivePublicationHtmlElement,
    bigPictureSection: bigPictureSection
  };

})();
