'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var successWindowTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorWindowTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  /**
  * @typedef {{
  * url: string,
  *   description: string,
  *   likes: number,
  *   comments: {
  *     avatar: string,
  *     message: string,
  *     name: string
  *   }[]
  * }} Publication
  */

  window.data = {
    pictureTemplate: pictureTemplate,
    successWindowTemplate: successWindowTemplate,
    errorWindowTemplate: errorWindowTemplate
  };

})();
