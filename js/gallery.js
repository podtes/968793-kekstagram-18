'use strict';
(function () {
  /**
   * @param {Publication[]} publicationsArr
   * @return {void}
   */
  var renderPublicationHtmlElements = function (publicationsArr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < publicationsArr.length; i++) {
      fragment.appendChild(window.data.generatePublicationHtmlElement(publicationsArr[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  };

  renderPublicationHtmlElements(window.data.publications);
})();
