'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram';

  window.uploadPublication = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        window.error.showWindow();
      }

      xhr.addEventListener('error', function () {
        window.error.showWindow();
      });

      xhr.addEventListener('timeout', function () {
        window.error.showWindow();
      });
    });

    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
