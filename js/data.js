'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

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
    pictureTemplate: pictureTemplate
  };

})();
