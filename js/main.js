'use strict';

(function () {

  window.loadPublications(window.gallery.renderPublicationHtmlElements, window.error.showWindow);

  window.preview.bigPictureClose.addEventListener('click', window.preview.closePreview);

  window.utils.hideElement(window.preview.commentsCounter);
  window.utils.hideElement(window.preview.commentsLoader);

  window.form.uploadFileOpen.addEventListener('change', window.form.openEditor);
  window.form.uploadFileClose.addEventListener('click', window.form.closeEditor);
  window.form.scaleControlBiggerButton.addEventListener('click', window.form.scalePostImagePreviewBigger);
  window.form.scaleControlSmallerButton.addEventListener('click', window.form.scalePostImagePreviewSmaller);

  window.form.noneEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.add('hidden');
    window.form.clearEffectsAndClassnameProperties();
  });
  window.form.chromeEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('chrome');
  });
  window.form.sepiaEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('sepia');
  });
  window.form.marvinEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('marvin');
  });
  window.form.phobosEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('phobos');
  });
  window.form.heatEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('heat');
  });

  window.form.effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var effectLevelLineGeometricProperties = window.form.effectLevelLine.getBoundingClientRect();
    var startCoordinateX = evt.clientX;
    var effectLevelLineStart = effectLevelLineGeometricProperties.x;
    var effectLevelLineEnd = effectLevelLineGeometricProperties.x + effectLevelLineGeometricProperties.width;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientX > effectLevelLineStart && moveEvt.clientX < effectLevelLineEnd) {
        var shift = startCoordinateX - moveEvt.clientX;
        startCoordinateX = moveEvt.clientX;
        window.form.effectLevelPin.style.left = (window.form.effectLevelPin.offsetLeft - shift) + 'px';
        window.form.effectLevelDepth.style.width = Math.round(100 * ((moveEvt.clientX - effectLevelLineStart) / effectLevelLineGeometricProperties.width)) + '%'; // заливка активного участка слайдера
        window.form.effectLevelValue.value = Math.round(100 * (moveEvt.clientX - effectLevelLineStart) / effectLevelLineGeometricProperties.width);
        window.form.applyCssFilterToImagePreview();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.form.hashtagsInput.addEventListener('input', window.form.validateHashtagsInput);

  window.form.imageEditorForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.uploadPublication(new FormData(window.form.imageEditorForm), window.success.showWindow);
  });

})();
