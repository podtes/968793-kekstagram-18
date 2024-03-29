'use strict';

(function () {
  var errorWindow = window.data.errorWindowTemplate.cloneNode(true);
  var errorButtons = document.querySelectorAll('.error__button');

  /**
   * @param {[]} buttons коллекция кнопок
   * @param {function} eventListener
   */
  var addEventListenersToErrorButtons = function (buttons, eventListener) {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', eventListener);
    }
  };

  window.error.showWindow = function () {
    window.form.closeEditor();
    document.querySelector('main').appendChild(errorWindow);

    var deleteErrorWindowAndListenersHandler = function () {
      errorWindow.parentNode.removeChild(errorWindow);
      for (var i = 0; i < errorButtons.length; i++) {
        errorButtons[i].removeEventListener('click', deleteErrorWindowClickHandler);
      }
      document.removeEventListener('keydown', deleteErrorWindowPressEscHandler);
      document.removeEventListener('click', deleteErrorWindowClickHandler);
    };
    var deleteErrorWindowClickHandler = function () {
      deleteErrorWindowAndListenersHandler();
    };
    var deleteErrorWindowPressEscHandler = function (evt) {
      if (evt.keyCode === window.form.ESC_KEYCODE) {
        deleteErrorWindowAndListenersHandler();
      }
    };

    addEventListenersToErrorButtons(errorButtons, deleteErrorWindowClickHandler);
    document.addEventListener('keydown', deleteErrorWindowPressEscHandler);
    document.addEventListener('click', deleteErrorWindowClickHandler);
  };
})();
