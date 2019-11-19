'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var HASHTAGS_MAX = 5;
  var HASHTAG_MAX = 20;
  var SCALE_STEP = 25;
  var CHROME_AND_SEPIA_MAX_VALUE = 1;
  var INVERT_MAX_VALUE = 100;
  var PHOBOS_AND_HEAT_MAX_VALUE = 3;

  var uploadFileOpen = document.getElementById('upload-file');
  var uploadFileClose = document.getElementById('upload-cancel');
  var imageEditorSection = document.querySelector('.img-upload__overlay');
  var imageEditorForm = document.querySelector('.img-upload__form');
  var postImagePreview = imageEditorForm.querySelector('.img-upload__preview');
  var effectLevel = imageEditorForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = imageEditorForm.querySelector('.effect-level__pin');
  var effectLevelValue = imageEditorForm.querySelector('.effect-level__value');
  var effectLevelLine = imageEditorForm.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var hashtagsInput = imageEditorForm.querySelector('.text__hashtags');
  var descriptionInput = imageEditorForm.querySelector('.text__description');
  var noneEffect = imageEditorForm.querySelector('.effects__preview--none');
  var chromeEffect = imageEditorForm.querySelector('.effects__preview--chrome');
  var sepiaEffect = imageEditorForm.querySelector('.effects__preview--sepia');
  var marvinEffect = imageEditorForm.querySelector('.effects__preview--marvin');
  var phobosEffect = imageEditorForm.querySelector('.effects__preview--phobos');
  var heatEffect = imageEditorForm.querySelector('.effects__preview--heat');
  var scaleControlSmallerButton = imageEditorForm.querySelector('.scale__control--smaller');
  var scaleControlBiggerButton = imageEditorForm.querySelector('.scale__control--bigger');
  var scaleControlValue = imageEditorForm.querySelector('.scale__control--value');

  var openEditorPressEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeEditor();
    }
  };
  var openEditor = function () {
    window.preview.picturesContainer.removeEventListener('keydown', window.preview.closePreviewPressEnterHandler);
    imageEditorSection.classList.remove('hidden');
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', openEditorPressEscHandler);
    descriptionInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', openEditorPressEscHandler);
    });
    descriptionInput.addEventListener('blur', function () {
      document.addEventListener('keydown', openEditorPressEscHandler);
    });
    hashtagsInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', openEditorPressEscHandler);
    });
    hashtagsInput.addEventListener('blur', function () {
      document.addEventListener('keydown', openEditorPressEscHandler);
    });
  };
  var closeEditor = function () {
    clearEffectsAndClassnameProperties();
    imageEditorSection.classList.add('hidden');
    document.removeEventListener('keydown', openEditorPressEscHandler);
    window.preview.picturesContainer.addEventListener('click', window.preview.closePreviewClickHandler);
    window.preview.picturesContainer.addEventListener('keydown', window.preview.closePreviewPressEnterHandler);
  };

  /**
  * @param {string} effect функция добавляет класс по которому к изображению применяется фильтр
  * return {void}
  */
  var addEffectToImagePreview = function (effect) {
    postImagePreview.children[0].classList.add('effects__preview--' + effect);
  };

  var clearEffectsAndClassnameProperties = function () {
    scaleControlValue.value = '100%';
    effectLevelValue.value = 100;
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    postImagePreview.children[0].style.filter = '';
    postImagePreview.children[0].className = '';
    postImagePreview.children[0].style.transform = 'scale(1)';
  };

  /**
  *
  * @param{string[]} hashtags
  * @return {string[]} hashtags вернет массив строк в нижнем регистре
  */
  var changeHashtagsToLowerCase = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      hashtags[i] = hashtags[i].toLowerCase();
    }
    return hashtags;
  };

  // описание валидации для поля ввода хэштегов
  var isCountOfHashtagsValid = function (hashtags) {
    if (hashtags.length > HASHTAGS_MAX) {
      return false;
    } else {
      return true;
    }
  };
  var isFirstCharacterOfHashtagsValid = function (hashtags) {
    if (hashtags.length >= 1) {
      for (var i = 0; i < hashtags.length; i++) {
        if (hashtags[i].charAt(0) !== '#' || hashtags[i] === '#') {
          return false;
        }
      }
    }
    return true;
  };
  var isRepeatHashtagsValid = function (hashtags) {
    changeHashtagsToLowerCase(hashtags);
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags.indexOf(hashtags[i]) !== i) {
        return false;
      }
    }
    return true;
  };
  var isLengthOfHashtagValid = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length > HASHTAG_MAX) {
        return false;
      }
    }
    return true;
  };
  var isHashInWordsValid = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      for (var j = 0; j < hashtags[i].length; j++) {
        if (hashtags[i].charAt(0) === '#' && hashtags[i].charAt(j + 1) === '#') {
          return false;
        }
      }
    }
    return true;
  };
  var validateHashtagsInput = function () {
    hashtagsInput.setCustomValidity('');
    var hashtags = hashtagsInput.value.split(' ');
    if (hashtagsInput.value === '') {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.style.removeProperty('border');
    } else if (!isCountOfHashtagsValid(hashtags)) {
      hashtagsInput.setCustomValidity('Максимальное число хэштегов - 5');
      hashtagsInput.style.border = '3px solid red';
    } else if (!isRepeatHashtagsValid(hashtags)) {
      hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
      hashtagsInput.style.border = '3px solid red';
    } else if (!isFirstCharacterOfHashtagsValid(hashtags)) {
      hashtagsInput.setCustomValidity('Хэштег должен начинаться с символа # и не состоять только из #');
      hashtagsInput.style.border = '3px solid red';
    } else if (!isLengthOfHashtagValid(hashtags)) {
      hashtagsInput.setCustomValidity('Максимальная длина хэштега - 20 символов');
      hashtagsInput.style.border = '3px solid red';
    } else if (!isHashInWordsValid(hashtags)) {
      hashtagsInput.setCustomValidity('хэштеги должны разделяться пробелами');
      hashtagsInput.style.border = '3px solid red';
    } else {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.style.removeProperty('border');
    }
  };

  // масштабирование превью картинки в редакторе
  var scalePostImagePreviewBigger = function () {
    var scaleControlValueInNumber = +scaleControlValue.value.slice(0, -1);
    if (scaleControlValueInNumber <= 75) {
      scaleControlValueInNumber = scaleControlValueInNumber + SCALE_STEP;
      scaleControlValue.value = scaleControlValueInNumber + '%';
      postImagePreview.children[0].style.transform = 'scale(' + scaleControlValueInNumber / 100 + ')';
    }
  };
  var scalePostImagePreviewSmaller = function () {
    var scaleControlValueInNumber = +scaleControlValue.value.slice(0, -1);
    if (scaleControlValueInNumber >= 50) {
      scaleControlValueInNumber = scaleControlValueInNumber - SCALE_STEP;
      scaleControlValue.value = scaleControlValueInNumber + '%';
      postImagePreview.children[0].style.transform = 'scale(' + scaleControlValueInNumber / 100 + ')';
    }
  };

  /**
   * Функция проверяет класс эффекта превью публикации и возвращает булевское значение
   * @param {string} effectName
   * @return {boolean}
   */
  var isAppliedEffect = function (effectName) {
    if (postImagePreview.children[0].className === 'effects__preview--' + effectName) {
      return true;
    } else {
      return false;
    }
  };

  // применение фильтра к превью в редакторе, исходя из значения класса
  var applyCssFilterToImagePreview = function () {
    if (isAppliedEffect('chrome')) {
      postImagePreview.children[0].style.filter = 'grayscale(' + CHROME_AND_SEPIA_MAX_VALUE / 100 * effectLevelValue.value + ')';
    } else if (isAppliedEffect('sepia')) {
      postImagePreview.children[0].style.filter = 'sepia(' + CHROME_AND_SEPIA_MAX_VALUE / 100 * effectLevelValue.value + ')';
    } else if (isAppliedEffect('marvin')) {
      postImagePreview.children[0].style.filter = 'invert(' + INVERT_MAX_VALUE / 100 * effectLevelValue.value + '%)';
    } else if (isAppliedEffect('phobos')) {
      postImagePreview.children[0].style.filter = 'blur(' + PHOBOS_AND_HEAT_MAX_VALUE / 100 * effectLevelValue.value + 'px)';
    } else if (isAppliedEffect('heat')) {
      postImagePreview.children[0].style.filter = 'brightness(' + PHOBOS_AND_HEAT_MAX_VALUE / 100 * effectLevelValue.value + ')';
    } else {
      postImagePreview.children[0].style.filter = '';
    }
    return postImagePreview.children[0].style.filter;
  };

  window.form = {
    openEditor: openEditor,
    closeEditor: closeEditor,
    uploadFileOpen: uploadFileOpen,
    uploadFileClose: uploadFileClose,
    scalePostImagePreviewBigger: scalePostImagePreviewBigger,
    scalePostImagePreviewSmaller: scalePostImagePreviewSmaller,
    scaleControlSmallerButton: scaleControlSmallerButton,
    scaleControlBiggerButton: scaleControlBiggerButton,
    noneEffect: noneEffect,
    chromeEffect: chromeEffect,
    sepiaEffect: sepiaEffect,
    marvinEffect: marvinEffect,
    phobosEffect: phobosEffect,
    heatEffect: heatEffect,
    effectLevel: effectLevel,
    effectLevelLine: effectLevelLine,
    effectLevelDepth: effectLevelDepth,
    clearEffectsAndClassnameProperties: clearEffectsAndClassnameProperties,
    addEffectToImagePreview: addEffectToImagePreview,
    applyCssFilterToImagePreview: applyCssFilterToImagePreview,
    effectLevelPin: effectLevelPin,
    postImagePreview: postImagePreview,
    imageEditorForm: imageEditorForm,
    effectLevelValue: effectLevelValue,
    hashtagsInput: hashtagsInput,
    validateHashtagsInput: validateHashtagsInput,
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE
  };

})();
