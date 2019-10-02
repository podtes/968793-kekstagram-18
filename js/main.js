'use strict';

var AUTHOR_NAMES = ['Алексей', 'Дмитрий', 'Василий', 'Юрий', 'Бенджамин', 'Георгий', 'Джон', 'Юлия', 'Мария', 'Валерия', 'Валерий', 'Евгений', 'Константин', 'Анна', 'Эдуард'];
var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AUTHOR_DESCRIPTIONS = ['Классно посидели!', 'Вот такой отпуск', 'Вы только посмотрите на это!', 'Какая то умная цитата несуществующего философа', 'Размышления о жизни', 'Сходил на бизнес-тренинг и теперь могу постить такие фотографии', 'Завидуйте мне', 'Просто фотография еды', 'Ставьте лайки, делайте репосты, подписывайтесь на колокольчик'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var photos = [];
var bigPictureSection = document.querySelector('.big-picture');
var bigPicture = bigPictureSection.querySelector('.big-picture__img');
var bigPictureImg = bigPicture.children[0];
var likesCount = bigPictureSection.querySelector('.likes-count');
var commentsCount = bigPictureSection.querySelector('.comments-count');
var pictureDescription = bigPictureSection.querySelector('.social__caption');
var commentListItems = bigPictureSection.querySelectorAll('.social__comment');
var commentsCounter = bigPictureSection.querySelector('.social__comment-count');
var commentsLoader = bigPictureSection.querySelector('.comments-loader');


/**
 * @param {number} min
 * @param {number} max
 * @return {number} случайное число из интервала
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
  var randomValue = Math.floor(Math.random() * arr.length);
  return randomValue;
};

/**
 * Функция возвращает первый сгенерированный элемент будущего массива с фотографиями
 * @param {number} numberFirstPhoto число, с которого начнется генерация адресов, из которых будут загружаться фото и аватарки
 * @return {{
 *   url: string,
 *   description: string,
 *   likes: number,
 *   comments: {
 *     avatar: string,
 *     message: string,
 *     name: string
 *   }[]
 * }}
 */
var createPhoto = function (numberFirstPhoto) {
  var photo = {
    url: './photos/' + numberFirstPhoto + '.jpg',
    description: AUTHOR_DESCRIPTIONS[getRandomArrayElement(AUTHOR_DESCRIPTIONS)],
    likes: getRandomIntFromInterval(LIKES_MIN, LIKES_MAX),
    comments: [{
      avatar: './img/avatar-' + getRandomIntFromInterval(1, 6) + '.svg',
      message: AUTHOR_COMMENTS[getRandomArrayElement(AUTHOR_COMMENTS)],
      name: AUTHOR_NAMES[getRandomArrayElement(AUTHOR_NAMES)]
    },
    {
      avatar: './img/avatar-' + getRandomIntFromInterval(1, 6) + '.svg',
      message: AUTHOR_COMMENTS[getRandomArrayElement(AUTHOR_COMMENTS)],
      name: AUTHOR_NAMES[getRandomArrayElement(AUTHOR_NAMES)]
    }]
  };
  return photo;
};

/**
 * Функция создает массив с фотографиями
 * @param {number} countOfPhotos нужное количетсво элементов массива
 * @return {[]} photos вернет массив с элементами
 */
var createPhotosArray = function (countOfPhotos) {
  for (var i = 0; i < countOfPhotos; i++) {
    photos[i] = createPhoto(i + 1);
  }
  return photos;
};

/**
 * Функция генерирует DOM элемент на основе шаблона pictureTemplate
 * @param {*[]} photo массив объектов с данными (моки)
 * @return {Node} возвращает сгенерированный DOM элемент
 */
var renderPhotos = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

/**
 * Функция переносит сгенерированные DOM элементы на страницу index.html и вставляет в секцию pictures
 */
var putPhotosToPage = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhotos(photos[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);
};

/**
 * Функция скрывает элемент с помощью класса .visually-hidden
 * @param {Node} el DOM элемент, который нужно скрыть
 */
var hideElemWithVisuallyHidden = function (el) {
  el.classList.add('visually-hidden');
};

/**
 * Функция присваивает полям большой картинки значения из элемента массива photos
 * @param {object} arrayElement объект, содержащий необходимые значения
 */
var getValuesFromArrayElement = function (arrayElement) {
  // присваиваю ему адрес из photos[0]
  bigPictureImg.src = arrayElement.url;

  // переопределяю на лайки из photos[0]
  likesCount.textContent = arrayElement.likes;

  // переопределяю ко-во комментариев на значение длины массива из ключа comments элемента photos[0]
  commentsCount.textContent = arrayElement.comments.length;

  // мняем текстовое сождержимое pictureDescription на значение ключа description в элементе photos[0]
  pictureDescription.textContent = arrayElement.description;

  // циклом перебираем коллекцию с комментариями и переопределяем аватарок комментариев, имен авторов и текста каждого комментария
  for (var i = 0; i < commentListItems.length; i++) {
    commentListItems[i].children[0].src = arrayElement.comments[i].avatar;
    commentListItems[i].children[0].alt = arrayElement.comments[i].name;
    commentListItems[i].children[1].textContent = arrayElement.comments[i].message;
  }
};

createPhotosArray(25);
putPhotosToPage();
hideElemWithVisuallyHidden(commentsCounter);
hideElemWithVisuallyHidden(commentsLoader);
getValuesFromArrayElement(photos[0]);

bigPictureSection.classList.remove('hidden');
