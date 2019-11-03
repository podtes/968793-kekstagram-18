'use strict';

(function () {
   window.error.showErrorWindow = function () {
    var errorWindow = document.querySelector('#error')
      .content
      .querySelector('.error');
    document.querySelector('.pictures').appendChild(errorWindow);
  };
})();
