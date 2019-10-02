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
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length; // так корректно передавать количество комментариев как длину массива?

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

createPhotosArray(25);
putPhotosToPage();

// Показываю блок полноразмерной картинки картинки
bigPictureSection.classList.remove('hidden');

// нахожу блок в котором лежит фотография
var bigPicture = bigPictureSection.querySelector('.big-picture__img');

// нахожу изображение
var bigPictureImg = bigPicture.children[0];

// присваиваю ему адрес из photos[0]
bigPictureImg.src = photos[0].url;

// нахожу элемент, в котором записано кол-во лайков
var likesCount = bigPictureSection.querySelector('.likes-count');

// переопределяю на лайки из photos[0]
likesCount.textContent = photos[0].likes;

// нахожу элемент, в котором записано кол-во комментариев
var commentsCount = bigPictureSection.querySelector('.comments-count');

// переопределяю ко-во комментариев на значение длины массива из ключа comments элемента photos[0]
commentsCount.textContent = photos[0].comments.length;

// находим подпись к фотографии в разметке
var pictureDescription = bigPictureSection.querySelector('.social__caption');

// мняем текстовое сождержимое pictureDescription на значение ключа description в элементе photos[0]
pictureDescription.textContent = photos[0].description;

// находим все комментарии в разметке
var commentListItems = bigPictureSection.querySelectorAll('.social__comment');

// циклом перебираем коллекцию с комментариями и переопределяем аватарок комментариев, имен авторов и текста каждого комментария
for (var i = 0; i <= commentListItems.length; i++) {
  commentListItems[i].children[0].src = photos[i].comments[i].avatar; // почему тут ошибка, адреса меняет верно
  commentListItems[i].children[0].alt = photos[i].comments[i].name;
  commentListItems[i].children[1].textContent = photos[i].comments[i].message;
}

// прячу счетчики
var commentsCounter = bigPictureSection.querySelector('.social__comment-count');
commentsCounter.classList.add('visually-hidden');
var commentsLoader = bigPictureSection.querySelector('.comments-loader');
commentsLoader.classList.add('visually-hidden');

// так правильно, не считая ошибки в цикле, из-за которой не скрываются счетчики? Если ок, то буду оборачивать в функции и приводить в порядок. Ну и косяки исправлять, котрых тут наверно хватает или что-то можно оптимизировать еще.
