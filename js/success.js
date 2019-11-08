'use strict';

(function () {

  window.success.showWindow = function () {
    var successWindow = document.querySelector('#success')
      .content
      .querySelector('.success');
    document.querySelector('.pictures').appendChild(successWindow);
    var successButton = document.querySelector('.success__button');

    window.form.closeEditor();
    successButton.addEventListener('click', function () {
      successWindow.parentNode.removeChild(successWindow);
    });

    document.addEventListener('keydown', function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.form.ESC_KEYCODE) {
        successWindow.parentNode.removeChild(successWindow);
      }
    });
  };

})();
