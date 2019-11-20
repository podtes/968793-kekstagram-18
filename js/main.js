'use strict';

(function () {

  window.loadPublications(window.gallery.renderPublicationHtmlElements, window.error.showWindow);

  window.preview.bigPictureClose.addEventListener('click', window.preview.closePreview);

  window.form.uploadFileOpen.addEventListener('change', window.form.openEditor);
  window.form.uploadFileClose.addEventListener('click', window.form.closeEditor);
  window.form.scaleControlBiggerButton.addEventListener('click', window.form.scalePostImagePreviewBigger);
  window.form.scaleControlSmallerButton.addEventListener('click', window.form.scalePostImagePreviewSmaller);

  window.form.noneEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.add('hidden');
    window.form.clearEffectsAndClassnameProperties();
  });
  document.querySelector('#effect-none').addEventListener('focus', function () {
    window.form.effectLevel.classList.add('hidden');
    window.form.clearEffectsAndClassnameProperties();
  });
  window.form.chromeEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('chrome');
  });
  document.querySelector('#effect-chrome').addEventListener('focus', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('chrome');
  });
  window.form.sepiaEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('sepia');
  });
  document.querySelector('#effect-sepia').addEventListener('focus', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('sepia');
  });
  window.form.marvinEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('marvin');
  });
  document.querySelector('#effect-marvin').addEventListener('focus', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('marvin');
  });
  window.form.phobosEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('phobos');
  });
  document.querySelector('#effect-phobos').addEventListener('focus', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('phobos');
  });
  window.form.heatEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('heat');
  });
  document.querySelector('#effect-heat').addEventListener('focus', function () {
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

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientX > effectLevelLineStart && moveEvt.clientX < effectLevelLineEnd) {
        var shift = startCoordinateX - moveEvt.clientX;
        startCoordinateX = moveEvt.clientX;
        window.form.effectLevelPin.style.left = (window.form.effectLevelPin.offsetLeft - shift) + 'px';
        window.form.effectLevelDepth.style.width = Math.round(window.form.MAX_PERCENT * ((moveEvt.clientX - effectLevelLineStart) / effectLevelLineGeometricProperties.width)) + '%'; // заливка активного участка слайдера
        window.form.effectLevelValue.value = Math.round(window.form.MAX_PERCENT * (moveEvt.clientX - effectLevelLineStart) / effectLevelLineGeometricProperties.width);
        window.form.applyCssFilterToImagePreview();
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.form.hashtagsInput.addEventListener('input', window.form.validateHashtagsInput);

  window.form.imageEditorForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.uploadPublication(new FormData(window.form.imageEditorForm), window.success.showWindow);
  });
})();
