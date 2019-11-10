'use strict';

(function () {
  var successWindow = window.data.successWindowTemplate.cloneNode(true);

  window.success.showWindow = function () {
    window.form.closeEditor();
    document.querySelector('.pictures').appendChild(successWindow);

    var successButton = document.querySelector('.success__button');

    var deleteSuccessWindowAndListenersHandler = function () {
      successWindow.parentNode.removeChild(successWindow);
      successButton.removeEventListener('click', deleteSuccessWindowClickHandler);
      document.removeEventListener('keydown', deleteSuccessWindowPressEscHandler);
      document.removeEventListener('click', deleteSuccessWindowClickHandler);
    };
    var deleteSuccessWindowClickHandler = function () {
      deleteSuccessWindowAndListenersHandler();
    };
    var deleteSuccessWindowPressEscHandler = function (evt) {
      if (evt.keyCode === window.form.ESC_KEYCODE) {
        deleteSuccessWindowAndListenersHandler();
      }
    };

    successButton.addEventListener('click', deleteSuccessWindowClickHandler);
    document.addEventListener('keydown', deleteSuccessWindowPressEscHandler);
    document.addEventListener('click', deleteSuccessWindowClickHandler);
  };

})();
