'use strict';

(function () {

  window.data.createPublicationsArray(25);
  window.gallery.renderPublicationHtmlElements(window.data.publications);
  window.preview.renderActivePublicationHtmlElement(window.data.publications[0]);

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
    window.form.addEffectToImagePreview('chrome'); // накладываем св-во
    window.form.applyCssFilterToImagePreview();
  });
  window.form.sepiaEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('sepia');
    window.form.applyCssFilterToImagePreview();
  });
  window.form.marvinEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('marvin');
    window.form.applyCssFilterToImagePreview();
  });
  window.form.phobosEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('phobos');
    window.form.applyCssFilterToImagePreview();
  });
  window.form.heatEffect.addEventListener('click', function () {
    window.form.effectLevel.classList.remove('hidden');
    window.form.clearEffectsAndClassnameProperties();
    window.form.addEffectToImagePreview('heat');
    window.form.applyCssFilterToImagePreview();
  });

  window.form.effectLevelPin.addEventListener('mouseup', function (evt) {
    window.form.postImagePreview.children[0].style.filter = '';
    var effectLevelLine = window.form.imageEditorForm.querySelector('.effect-level__line'); // нашел весь слайдер
    var effectLevelLineGeometricProperties = effectLevelLine.getBoundingClientRect(); // нашел все свойства слайдера как геометрического объекта
    window.form.effectLevelValue.value = Math.round(100 * (evt.clientX - effectLevelLineGeometricProperties.x) / effectLevelLineGeometricProperties.width); // найду положение пина в процентом соотношении от начала слайдера
    window.form.applyCssFilterToImagePreview();
  });

  window.form.hashtagsInput.addEventListener('input', window.form.validateHashtagsInput);

})();
