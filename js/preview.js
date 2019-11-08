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
  var smallPictures;

  /**
  * Функция присваивает полям выбранного пользователем поста значения из публикации
  * @param {Publication} publication объект, содержащий необходимые данные для генерации активной публикации
  * @return {void}
  */
  var renderActivePublicationHtmlElement = function (publication) {
    bigPicture.childNodes[1].src = publication.childNodes[1].src;
    likesCount.textContent = publication.childNodes[3].childNodes[3].textContent;
    commentsCount.textContent = publication.childNodes[3].childNodes[1].textContent;

    renderCommentHtmlElements(publication[0]);
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

  var showActivePublicationHtmlElement = function () {
    smallPictures = document.querySelectorAll('.picture');

    for (var i = 0; i < smallPictures.length; i++) {

      // почему не получается навесить ивент листенеры на все картинки в ходе выполнения цикла?
      smallPictures[4].addEventListener('click', function () {
        bigPictureSection.classList.remove('hidden');
        renderActivePublicationHtmlElement(smallPictures[4]); // как в ккчестве параметра функции передать массив с сервера?
        // информацию для рендера большой картинки наверное нужно брать из массива с объектами, который приходит с сервера? а то я попробовал хотя бы чуть сделать из данных html элементов
      })
    }
  };


  window.preview = {
    commentsCounter: commentsCounter,
    commentsLoader: commentsLoader,
    renderActivePublicationHtmlElement: renderActivePublicationHtmlElement,
    bigPictureSection: bigPictureSection,
    showActivePublicationHtmlElement: showActivePublicationHtmlElement
  };

})();
