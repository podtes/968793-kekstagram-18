'use strict';

(function () {

  var errorWindow = window.data.errorWindowTemplate.cloneNode(true);

  window.error.showWindow = function () {
    window.form.closeEditor();
    document.querySelector('.pictures').appendChild(errorWindow);
  };
})();
