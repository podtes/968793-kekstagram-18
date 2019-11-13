'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.loadPublications = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
        window.preview.showActivePublicationHtmlElement(xhr.response);
        window.filters.showFilters();

        window.filters.randomPublicationsButton.addEventListener('click', function () {
          window.gallery.deletePublicationHtmlElements();
          onSuccess(window.filters.getNoRepeatRandomElementsArray(xhr.response, 10));
        });
        window.filters.discussedPublicationsButton.addEventListener('click', function () {
          window.gallery.deletePublicationHtmlElements();
          onSuccess(window.filters.sortArrayByCommentsCount(xhr.response));
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

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();

  };

})();
