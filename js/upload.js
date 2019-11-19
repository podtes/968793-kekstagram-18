'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram';

  window.uploadPublication = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.load.SUCCESS_STATUS) {
        onSuccess();
        window.form.imageEditorForm.reset();
      } else {
        window.error.showWindow();
      }
    });

    xhr.addEventListener('error', function () {
      window.error.showWindow();
    });

    xhr.addEventListener('timeout', function () {
      window.error.showWindow();
    });

    xhr.timeout = window.load.TIMEOUT_TIME;

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
