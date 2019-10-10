'use strict';

var AUTHOR_NAMES = ['Алексей', 'Дмитрий', 'Василий', 'Юрий', 'Бенджамин', 'Георгий', 'Джон', 'Юлия', 'Мария', 'Валерия', 'Валерий', 'Евгений', 'Константин', 'Анна', 'Эдуард'];
var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AUTHOR_DESCRIPTIONS = ['Классно посидели!', 'Вот такой отпуск', 'Вы только посмотрите на это!', 'Какая то умная цитата несуществующего философа', 'Размышления о жизни', 'Сходил на бизнес-тренинг и теперь могу постить такие фотографии', 'Завидуйте мне', 'Просто фотография еды', 'Ставьте лайки, делайте репосты, подписывайтесь на колокольчик'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var ESC_KEYCODE = 27;
var HASHTAGS_MAX = 5;
var HASHTAG_MAX = 20;
var SCALE_STEP = 25;
var CHROME_AND_SEPIA_MAX_VALUE = 1;
var INVERT_MAX_VALUE = 100;
var PHOBOS_AND_HEAT_MAX_VALUE = 3;

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var publications = [];
var bigPictureSection = document.querySelector('.big-picture');
var bigPicture = bigPictureSection.querySelector('.big-picture__img');
var bigPictureImg = bigPicture.children[0];
var likesCount = bigPictureSection.querySelector('.likes-count');
var commentsCount = bigPictureSection.querySelector('.comments-count');
var pictureDescription = bigPictureSection.querySelector('.social__caption');
var commentListItems = bigPictureSection.querySelectorAll('.social__comment');
var commentsCounter = bigPictureSection.querySelector('.social__comment-count');
var commentsLoader = bigPictureSection.querySelector('.comments-loader');
var uploadFileOpen = document.getElementById('upload-file');
var uploadFileClose = document.getElementById('upload-cancel');
var imageRedactorSection = document.querySelector('.img-upload__overlay');
var imageRedactorForm = document.querySelector('.img-upload__form');
var postImagePreview = imageRedactorForm.querySelector('.img-upload__preview');
var effectLevel = imageRedactorForm.querySelector('.img-upload__effect-level');
var effectLevelPin = imageRedactorForm.querySelector('.effect-level__pin');
var effectLevelValue = imageRedactorForm.querySelector('.effect-level__value');
var hashtagsInput = imageRedactorForm.querySelector('.text__hashtags');
var descriptionInput = imageRedactorForm.querySelector('.text__description');
var noneEffect = imageRedactorForm.querySelector('.effects__preview--none');
var chromeEffect = imageRedactorForm.querySelector('.effects__preview--chrome');
var sepiaEffect = imageRedactorForm.querySelector('.effects__preview--sepia');
var marvinEffect = imageRedactorForm.querySelector('.effects__preview--marvin');
var phobosEffect = imageRedactorForm.querySelector('.effects__preview--phobos');
var heatEffect = imageRedactorForm.querySelector('.effects__preview--heat');
var valids = [];
var scaleControlSmallerButton = imageRedactorForm.querySelector('.scale__control--smaller');
var scaleControlBiggerButton = imageRedactorForm.querySelector('.scale__control--bigger');
var scaleControlValue = imageRedactorForm.querySelector('.scale__control--value');

/**
 * @typedef {{
 * url: string,
 *   description: string,
 *   likes: number,
 *   comments: {
 *     avatar: string,
 *     message: string,
 *     name: string
 *   }[]
 * }} Publication
 */

var getRandomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Функция возвращает случайный элемент массива
 * @param {*[]} arr массив, из которого будем выбирать случайный элемент
 * @return {*} randomValue случайный элемент массива
 */
var getRandomArrayElement = function (arr) {
  var randomValue = arr[Math.floor(Math.random() * arr.length)];
  return randomValue;
};

/**
 * Функция создает объект, который описывает публикацию
 * @param {number} photoNumber порядковый номер файла с фотографией
 * @return {Publication} publication объект с данными для генерациии публикации
 */
var createPublicationObject = function (photoNumber) {
  var publication = {
    url: './photos/' + photoNumber + '.jpg',
    description: getRandomArrayElement(AUTHOR_DESCRIPTIONS),
    likes: getRandomIntFromInterval(LIKES_MIN, LIKES_MAX),
    comments: [{
      avatar: './img/avatar-' + getRandomIntFromInterval(1, 6) + '.svg',
      message: getRandomArrayElement(AUTHOR_COMMENTS),
      name: getRandomArrayElement(AUTHOR_NAMES)
    },
    {
      avatar: './img/avatar-' + getRandomIntFromInterval(1, 6) + '.svg',
      message: getRandomArrayElement(AUTHOR_COMMENTS),
      name: getRandomArrayElement(AUTHOR_NAMES)
    }]
  };
  return publication;
};

/**
 * @param {number} arraySize нужное количество элементов массива
 * @return {Publication[]}
 */
var createPublicationsArray = function (arraySize) {
  for (var i = 0; i < arraySize; i++) {
    publications[i] = createPublicationObject(i + 1);
  }
  return publications;
};

/**
 * Функция генерирует DOM элемент на основе шаблона pictureTemplate
 * @param {Publication} publication
 * @return {Node} возвращает сгенерированный DOM элемент
 */
var generatePublicationHtmlElement = function (publication) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = publication.url;
  pictureElement.querySelector('.picture__likes').textContent = publication.likes;
  pictureElement.querySelector('.picture__comments').textContent = publication.comments.length;

  return pictureElement;
};

/**
 * @param {Publication[]} publicationsArr
 * @return {void}
 */
var renderPublicationHtmlElements = function (publicationsArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < publicationsArr.length; i++) {
    fragment.appendChild(generatePublicationHtmlElement(publicationsArr[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);

};

var hideElement = function (element) {
  element.classList.add('visually-hidden');
};

/**
 *
 * @param {Publication} publication
 * @return {void}
 */
var renderCommentHtmlElements = function (publication) {
  for (var i = 0; i < commentListItems.length; i++) {
    commentListItems[i].children[0].src = publication.comments[i].avatar;
    commentListItems[i].children[0].alt = publication.comments[i].name;
    commentListItems[i].children[1].textContent = publication.comments[i].message;
  }
};

/**
 * Функция присваивает полям выбранного пользователем поста значения из публикации
 * @param {Publication} publication объект, содержащий необходимые данные для генерации активной публикации
 * @return {void}
 */
var renderActivePublicationHtmlElement = function (publication) {
  bigPictureImg.src = publication.url;
  likesCount.textContent = publication.likes;
  commentsCount.textContent = publication.comments.length;
  pictureDescription.textContent = publication.description;

  renderCommentHtmlElements(publications[0]);
};

var openRedactorPressEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imageRedactorSection.classList.add('hidden');
    uploadFileOpen.value = '';
  }
};

var openRedactor = function () {
  imageRedactorSection.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', openRedactorPressEscHandler);
  descriptionInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', openRedactorPressEscHandler);
  });
  descriptionInput.addEventListener('blur', function () {
    document.addEventListener('keydown', openRedactorPressEscHandler);
  });
  hashtagsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', openRedactorPressEscHandler);
  });
  hashtagsInput.addEventListener('blur', function () {
    document.addEventListener('keydown', openRedactorPressEscHandler);
  });
};

var closeRedactor = function () {
  imageRedactorSection.classList.add('hidden');
  document.removeEventListener('keydown', openRedactorPressEscHandler);
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
  postImagePreview.children[0].style.filter = '';
  postImagePreview.children[0].className = '';
  postImagePreview.children[0].style.transform = 'scale(1)';

};

/**
 *
 * @param{string[]} hashtagsArr
 * @return {string[]} hashtagsArr вернет массив строк в нижнем регистре
 */
var changeHashtagsToLowerCase = function (hashtagsArr) {
  for (var i = 0; i < hashtagsArr.length; i++) {
    hashtagsArr[i] = hashtagsArr[i].toLowerCase();
  }
  return hashtagsArr;
};

// описание валидации для поля ввода хэштегов
var isCountOfHashtagsValid = function (hashtagsArr) {
  if (hashtagsArr.length > HASHTAGS_MAX) {
    return false;
  } else {
    return true;
  }
};
var isFirstCharacterOfHashtagsValid = function (hashtagsArr) {
  if (hashtagsArr.length >= 1) {
    for (var i = 0; i < hashtagsArr.length; i++) {
      if (hashtagsArr[i].charAt(0) !== '#' || hashtagsArr[i] === '#') {
        return false;
      }
    }
  }
  return true;
};
var isRepeatHashtagsValid = function (hashtagsArr) {
  changeHashtagsToLowerCase(hashtagsArr);
  for (var i = 0; i < hashtagsArr.length; i++) {
    if (hashtagsArr.indexOf(hashtagsArr[i]) !== i) {
      return false;
    }
  }
  return true;
};
var isLengthOfHashtagValid = function (hashtagsArr) {
  for (var i = 0; i < hashtagsArr.length; i++) {
    if (hashtagsArr[i].length > HASHTAG_MAX) {
      return false;
    }
  }
  return true;
};
var isHashInWordsValid = function (hashtagsArr) {
  for (var i = 0; i < hashtagsArr.length; i++) {
    for (var j = 0; j < hashtagsArr[i].length; j++) {
      if (hashtagsArr[i].charAt(0) === '#' && hashtagsArr[i].charAt(j + 1) === '#') {
        return false;
      }
    }
  }
  return true;
};
var validateHashtagsInput = function () {
  hashtagsInput.setCustomValidity('');
  var hashtags = hashtagsInput.value.split(' ');
  isCountOfHashtagsValid(hashtags);
  isRepeatHashtagsValid(hashtags);
  isFirstCharacterOfHashtagsValid(hashtags);
  isLengthOfHashtagValid(hashtags);
  isHashInWordsValid(hashtags);
  if (!isCountOfHashtagsValid(hashtags)) {
    hashtagsInput.setCustomValidity('Максимальное число хэштегов - 5');
  } else if (!isRepeatHashtagsValid(hashtags)) {
    hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
  } else if (!isFirstCharacterOfHashtagsValid(hashtags)) {
    hashtagsInput.setCustomValidity('Хэштег должен начинаться с символа # и не состоять только из #');
  } else if (!isLengthOfHashtagValid(hashtags)) {
    hashtagsInput.setCustomValidity('Максимальная длина хэштега - 20 символов');
  } else if (!isHashInWordsValid(hashtags)) {
    hashtagsInput.setCustomValidity('хэштеги должны разделяться пробелами');
  } else {
    hashtagsInput.setCustomValidity('');
  }
};

// масштабирование превью картинки в редакторе
var scalePostImagePreviewBigger = function () {
  var scaleControlValueInNumber = +scaleControlValue.value.slice(0, -1);
  if (scaleControlValueInNumber <= 75) {
    scaleControlValueInNumber = scaleControlValueInNumber + SCALE_STEP;
    scaleControlValue.value = scaleControlValueInNumber + '%';
    postImagePreview.children[0].style.transform = 'scale(' + scaleControlValueInNumber / 100 + ')';
  } else {
    scaleControlValueInNumber = scaleControlValueInNumber;
  }
};
var scalePostImagePreviewSmaller = function () {
  var scaleControlValueInNumber = +scaleControlValue.value.slice(0, -1);
  if (scaleControlValueInNumber >= 50) {
    scaleControlValueInNumber = scaleControlValueInNumber - SCALE_STEP;
    scaleControlValue.value = scaleControlValueInNumber + '%';
    postImagePreview.children[0].style.transform = 'scale(' + scaleControlValueInNumber / 100 + ')';
  } else {
    scaleControlValueInNumber = scaleControlValueInNumber;
  }
};


createPublicationsArray(25);
renderPublicationHtmlElements(publications);
hideElement(commentsCounter);
hideElement(commentsLoader);
renderActivePublicationHtmlElement(publications[0]);

// bigPictureSection.classList.remove('hidden');

uploadFileOpen.addEventListener('change', openRedactor);
uploadFileClose.addEventListener('click', closeRedactor);

// кнопки масштаба
scaleControlBiggerButton.addEventListener('click', scalePostImagePreviewBigger);
scaleControlSmallerButton.addEventListener('click', scalePostImagePreviewSmaller);

// передвижение пина интенсивности фильтра
effectLevelPin.addEventListener('mouseup', function (evt) {
  var effectLevelLine = imageRedactorForm.querySelector('.effect-level__line'); // нашел весь слайдер
  var effectLevelLineGeometricProperties = effectLevelLine.getBoundingClientRect(); // нашел все свойства слайдера как геометрического объекта
  effectLevelValue.value = 100 * (evt.clientX - effectLevelLineGeometricProperties.x) / effectLevelLineGeometricProperties.width; // найду положение пина в процентом соотношении от начала слайдера
});

// наложение фильтров на картинку
noneEffect.addEventListener('click', function () {
  effectLevel.classList.add('hidden');
  clearEffectsAndClassnameProperties();
});
chromeEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  clearEffectsAndClassnameProperties();
  addEffectToImagePreview('chrome'); // накладываем св-во
  postImagePreview.children[0].style.filter = 'grayscale(' + CHROME_AND_SEPIA_MAX_VALUE / 100 * effectLevelValue.value + ')'; // записываем в св-во filter текущее значение индикатора интенсивности фильтра
});
sepiaEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  clearEffectsAndClassnameProperties();
  addEffectToImagePreview('sepia');
  postImagePreview.children[0].style.filter = 'sepia(' + CHROME_AND_SEPIA_MAX_VALUE / 100 * effectLevelValue.value + ')';
});
marvinEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  clearEffectsAndClassnameProperties();
  addEffectToImagePreview('marvin');
  postImagePreview.children[0].style.filter = 'invert(' + INVERT_MAX_VALUE / 100 * effectLevelValue.value + '%)';
});
phobosEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  clearEffectsAndClassnameProperties();
  addEffectToImagePreview('phobos');
  postImagePreview.children[0].style.filter = 'blur(' + PHOBOS_AND_HEAT_MAX_VALUE / 100 * effectLevelValue.value + 'px)';
});
heatEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  clearEffectsAndClassnameProperties();
  addEffectToImagePreview('heat');
  postImagePreview.children[0].style.filter = 'brightness(' + PHOBOS_AND_HEAT_MAX_VALUE / 100 * effectLevelValue.value + ')';
});

// проверка поля с хэштегами перед отправкой
hashtagsInput.addEventListener('input', validateHashtagsInput);
