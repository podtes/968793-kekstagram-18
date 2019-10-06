'use strict';

var AUTHOR_NAMES = ['Алексей', 'Дмитрий', 'Василий', 'Юрий', 'Бенджамин', 'Георгий', 'Джон', 'Юлия', 'Мария', 'Валерия', 'Валерий', 'Евгений', 'Константин', 'Анна', 'Эдуард'];
var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AUTHOR_DESCRIPTIONS = ['Классно посидели!', 'Вот такой отпуск', 'Вы только посмотрите на это!', 'Какая то умная цитата несуществующего философа', 'Размышления о жизни', 'Сходил на бизнес-тренинг и теперь могу постить такие фотографии', 'Завидуйте мне', 'Просто фотография еды', 'Ставьте лайки, делайте репосты, подписывайтесь на колокольчик'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var ESC_KEYCODE = 27;
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
var effectLevelValue = imageRedactorForm.querySelector('.effect-level__value');
var hashtagsInput = imageRedactorForm.querySelector('.text__hashtags');
var descriptionInput = imageRedactorForm.querySelector('.text__description');

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
    imageRedactorForm.classList.add('hidden');
    uploadFileOpen.value = '';
  }
};

var openRedactor = function () {
  imageRedactorSection.classList.remove('hidden');
  document.addEventListener('keydown', openRedactorPressEscHandler);
  descriptionInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', openRedactorPressEscHandler);
  });
  descriptionInput.addEventListener('blur', function () {
    document.addEventListener('keydown', openRedactorPressEscHandler);
  });
};

var closeRedactor = function () {
  imageRedactorForm.classList.add('hidden');
  document.removeEventListener('keydown', openRedactorPressEscHandler);
  uploadFileOpen.value = '';
};

createPublicationsArray(25);
renderPublicationHtmlElements(publications);
hideElement(commentsCounter);
hideElement(commentsLoader);
renderActivePublicationHtmlElement(publications[0]);

// bigPictureSection.classList.remove('hidden');

uploadFileOpen.addEventListener('change', function () {
  openRedactor();
});

uploadFileClose.addEventListener('click', function () {
  closeRedactor();
});


// передвижение пина интенсивности фильтра
var effectLevelPin = imageRedactorForm.querySelector('.effect-level__pin');
effectLevelPin.addEventListener('mouseup', function () {
  console.log('Отпустил кнопку');
});


// список иконок для переключения фильтров в редакторе
var noneEffect = imageRedactorForm.querySelector('.effects__preview--none');
var chromeEffect = imageRedactorForm.querySelector('.effects__preview--chrome');
var sepiaEffect = imageRedactorForm.querySelector('.effects__preview--sepia');
var marvinEffect = imageRedactorForm.querySelector('.effects__preview--marvin');
var phobosEffect = imageRedactorForm.querySelector('.effects__preview--phobos');
var heatEffect = imageRedactorForm.querySelector('.effects__preview--heat');

/**
 * @param {string} effect функция добавляет класс по которому к изображению применяется фильтр
 * return {void}
 */
var addEffectToImagePreview = function (effect) {
  postImagePreview.children[0].classList.add('effects__preview--' + effect);
};

noneEffect.addEventListener('click', function () {
  effectLevel.classList.add('hidden'); // при клике скрываем индикатор интенсивности фильтра
  postImagePreview.children[0].style.filter = ''; // обнуляем св-во filter
  postImagePreview.children[0].className = ''; // удаляем все классы на превью изображения
});

chromeEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  postImagePreview.children[0].style.filter = '';
  postImagePreview.children[0].className = '';
  addEffectToImagePreview('chrome'); // накладываем св-во
  postImagePreview.children[0].style.filter = 'grayscale(' + 1 / 100 * effectLevelValue.value + ')'; // записываем в св-во filter текущее значение индикатора интенсивности фильтра
});

sepiaEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  postImagePreview.children[0].style.filter = '';
  postImagePreview.children[0].className = '';
  addEffectToImagePreview('sepia');
  postImagePreview.children[0].style.filter = 'sepia(' + 1 / 100 * effectLevelValue.value + ')';
});

marvinEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  postImagePreview.children[0].style.filter = '';
  postImagePreview.children[0].className = '';
  addEffectToImagePreview('marvin');
  postImagePreview.children[0].style.filter = 'invert(' + 100 / 100 * effectLevelValue.value + '%)';
});

phobosEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  postImagePreview.children[0].style.filter = '';
  postImagePreview.children[0].className = '';
  addEffectToImagePreview('phobos');
  postImagePreview.children[0].style.filter = 'blur(' + 3 / 100 * effectLevelValue.value + 'px)';
});

heatEffect.addEventListener('click', function () {
  effectLevel.classList.remove('hidden');
  postImagePreview.children[0].style.filter = '';
  postImagePreview.children[0].className = '';
  addEffectToImagePreview('heat');
  postImagePreview.children[0].style.filter = 'brightness(' + 3 / 100 * effectLevelValue.value + ')';
});


// описание валидации для поля ввода хэштегов

hashtagsInput.addEventListener('change', function () {
  var hashtags = hashtagsInput.value.split(' ');
  if (hashtags.length > 5) { // проверяю не превышено ли максимальное количество
    console.log('слишком много тегов');
    hashtagsInput.setCustomValidity('Максимальное количество хэштегов - 5 штук');
    imageRedactorForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  } else {
    console.log('Кол-во тегов ок!');
    hashtagsInput.setCustomValidity('');
    imageRedactorForm.addEventListener('submit', function () {
    });
  }


  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i].charAt(0) !== '#') { // проверка на то, что первый символ элемента массива === #
      console.log(hashtags[i] + ' должен начинаться с символа #');
      hashtagsInput.setCustomValidity('Хэштег ' + hashtags[i] + ' должен начинаться с символа #');
      imageRedactorForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    } else {
      console.log('Все ок! Хэштег ' + hashtags[i] + ' в порядке');
      hashtagsInput.setCustomValidity(' ');
      imageRedactorForm.addEventListener('submit', function () {
      });
    }
  }

  for (i = 0; i < hashtags.length; i++) {
    if (hashtags.indexOf(hashtags[i]) !== i) { // Проверка на повтор хэштегов. Если индекс первого вхождения не равен порядковому номеру элемента - значит повтор
      console.log('Вы несколько раз ввели хэштег ' + hashtags[i]);
      hashtagsInput.setCustomValidity('Хэштэг ' + hashtags[i] + ' повторяется несколько раз. Удалите повторы!');
      imageRedactorForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    } else {
      console.log('Теги не повторяются');
      hashtagsInput.setCustomValidity('');
      imageRedactorForm.addEventListener('submit', function () {
      });
    }
    // как написать проверку, чтобы она не учитывала регистр букв?
  }

  for (i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length > 20) { // проверка на длину каждого хэштега
      console.log('Длина хэштега НЕ ок');
      hashtagsInput.setCustomValidity('Хэштэг ' + hashtags[i] + ' слишком длинный. Максимальная длина - 20 символов');
      imageRedactorForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    } else {
      console.log('Длина хэштега ок');
      hashtagsInput.setCustomValidity('');
      imageRedactorForm.addEventListener('submit', function () {
      });
    }
  }
});
