'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var SUCCESS_STATUS = 200;
  var TIMEOUT_TIME = 10000;

  window.loadPublications = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
        window.filters.show();

        window.filters.randomPublicationsButton.addEventListener('click', function () {
          window.filters.toggleActiveClassAtFilterButtons(window.filters.randomPublicationsButton, window.filters.discussedPublicationsButton, window.filters.popularPublicationsButton);
          window.gallery.deletePublicationHtmlElements();
          onSuccess(window.utils.getNoRepeatRandomElementsArray(xhr.response, 10));
        });
        window.filters.discussedPublicationsButton.addEventListener('click', function () {
          window.filters.toggleActiveClassAtFilterButtons(window.filters.discussedPublicationsButton, window.filters.randomPublicationsButton, window.filters.popularPublicationsButton);
          window.gallery.deletePublicationHtmlElements();
          onSuccess(window.filters.sortArrayByCommentsCount(xhr.response));
        });
        window.filters.popularPublicationsButton.addEventListener('click', function () {
          window.filters.toggleActiveClassAtFilterButtons(window.filters.popularPublicationsButton, window.filters.randomPublicationsButton, window.filters.discussedPublicationsButton);
          window.gallery.deletePublicationHtmlElements();
          onSuccess(xhr.response);
        });
      } else {
        onError();
      }

    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_TIME;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.load = {
    SUCCESS_STATUS: SUCCESS_STATUS,
    TIMEOUT_TIME: TIMEOUT_TIME
  };

})();
