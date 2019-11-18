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
  var commentsForRender = [];
  var startCount = 0;
  var finishCount = 5;

  var openPreviewPressEscHandler = function (evt) {
    if (evt.keyCode === window.form.ESC_KEYCODE) {
      bigPictureSection.classList.add('hidden');
    }
    commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
  };
  var commentsLoaderClickHandler = function () {
    var notRenderedElemensLeft = window.preview.publicationData.comments.length - finishCount;
    if (notRenderedElemensLeft > 5) {
      startCount += 5;
      finishCount += 5;
      commentsCounter.textContent = finishCount + ' из ' + commentsCount.textContent + ' комментариев';
      createAndRenderCommentHtmlElements(window.preview.publicationData, startCount, finishCount);
    } else if (notRenderedElemensLeft >= 0) {
      startCount += 5;
      finishCount += notRenderedElemensLeft;
      commentsCounter.textContent = finishCount + ' из ' + commentsCount.textContent + ' комментариев';
      createAndRenderCommentHtmlElements(window.preview.publicationData, startCount, finishCount);
      window.utils.hideElement(commentsLoader);
      commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
    }
  };
  var openPreview = function () {
    bigPictureSection.classList.remove('hidden');
    document.addEventListener('keydown', openPreviewPressEscHandler);
  };
  var closePreview = function () {
    bigPictureSection.classList.add('hidden');
    document.removeEventListener('keydown', openPreviewPressEscHandler);
    commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
  };

  /**
   * @param {Publication} publication
   * @param {number} startCount
   * @param {number} finishCount
   * return {void}
   */
  var getArrayForRenderComments = function (publication, startCount, finishCount) {
    commentsForRender = publication.comments.slice(startCount, finishCount);
  };

  /**
   *
   * @param {Publication} publication
   * @param {number} startCount
   * @param {number} finishCount
   */
  var createAndRenderCommentHtmlElements = function (publication, startCount, finishCount) {
    getArrayForRenderComments(publication, startCount, finishCount);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsForRender.length; i++) {
      var newComment = commentListItem.cloneNode(true);
      newComment.querySelector('.social__picture').src = commentsForRender[i].avatar;
      newComment.querySelector('.social__picture').alt = commentsForRender[i].name;
      newComment.querySelector('.social__text').textContent = commentsForRender[i].message;
      fragment.appendChild(newComment);
    }
    commentList.appendChild(fragment);
  };

  /**
  * Функция присваивает полям выбранного пользователем поста значения из публикации
  * @param {Publication} publication объект, содержащий необходимые данные для генерации активной публикации
  * @return {void}
  */
  var renderActivePublicationHtmlElement = function (publication) {
    startCount = 0;
    finishCount = 5;
    window.utils.showElement(commentsLoader);

    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild);
    }

    bigPicture.childNodes[1].src = publication.url;
    likesCount.textContent = publication.likes;
    pictureDescription.textContent = publication.description;
    commentsCount.textContent = publication.comments.length;

    if (publication.comments.length < finishCount) {
      window.utils.hideElement(commentsLoader);
      commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
      commentsCounter.textContent = publication.comments.length + ' из ' + publication.comments.length + ' комментариев';
    } else {
      window.utils.showElement(commentsLoader);
      commentsLoader.addEventListener('click', commentsLoaderClickHandler);
      commentsCounter.textContent = '5 из ' + commentsCount.textContent + ' комментариев';
    }

    createAndRenderCommentHtmlElements(publication, startCount, finishCount);

    window.preview = {
      publicationData: publication
    };
  };

  /**
   * Функция показывает слой с полноразмерной картинкой по превью которой кликнул пользователь
   * @param {[]} publicationsArr массив с данными, из которых формируются публикации
   * @return {void}
   */
  window.showActivePublicationHtmlElement = function (publicationsArr) {
    picturesContainer.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('picture__img') && evt.target.dataset.id !== undefined) {
        openPreview();
        renderActivePublicationHtmlElement(publicationsArr[evt.target.dataset.id]);
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
