'use strict';

var AUTHOR_NAMES = ['Алексей', 'Дмитрий', 'Василий', 'Юрий', 'Бенджамин', 'Георгий', 'Джон', 'Юлия', 'Мария', 'Валерия', 'Валерий', 'Евгений', 'Константин', 'Анна', 'Эдуард'];
var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AUTHOR_DESCRIPTIONS = ['Классно посидели!', 'Вот такой отпуск', 'Вы только посмотрите на это!', 'Какая то умная цитата несуществующего философа', 'Размышления о жизни', 'Сходил на бизнес-тренинг и теперь могу постить такие фотографии', 'Завидуйте мне', 'Просто фотография еды', 'Ставьте лайки, делайте репосты, подписывайтесь на колокольчик'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
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
  var randomValue = Math.floor(Math.random() * arr.length);
  return randomValue;
};

/**
 * Функция создает первый объект будущего массива с публикациями пользователей
 * @param {number} addressOfFirstPhoto число, с которого начнется генерация адресов, из которых будут загружаться фото и аватарки
 * @return {Publication} publication объект с данными для генерациии публикации
 */
var createPublicationObject = function (addressOfFirstPhoto) {
  var publication = {
    url: './photos/' + addressOfFirstPhoto + '.jpg',
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
  return publication;
};

/**
 * Функция создает массив с публикациями
 * @param {number} countOfPublications нужное количество элементов массива
 * @return {[]} publications
 */
var createPublicationsArray = function (countOfPublications) {
  for (var i = 0; i < countOfPublications; i++) {
    publications[i] = createPublicationObject(i + 1);
  }
  return publications;
};

/**
 * Функция генерирует DOM элемент на основе шаблона pictureTemplate
 * @param {object[]} publication элемент массива объектов с данными для генерации публикаций (моки)
 * @return {Node} возвращает сгенерированный DOM элемент
 */
var generatePublication = function (publication) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = publication.url;
  pictureElement.querySelector('.picture__likes').textContent = publication.likes;
  pictureElement.querySelector('.picture__comments').textContent = publication.comments.length;

  return pictureElement;
};

var putPublicationsToPage = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < publications.length; i++) {
    fragment.appendChild(generatePublication(publications[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);
};

var hideElementWithVisuallyHidden = function (element) {
  element.classList.add('visually-hidden');
};

/**
 * Функция присваивает полям большой картинки значения из элемента массива photos
 * @param {Publication} arrayElement объект, содержащий необходимые данные для генерации большой публикации
 */
var generateBigPublication = function (arrayElement) {
  bigPictureImg.src = arrayElement.url;
  likesCount.textContent = arrayElement.likes;
  commentsCount.textContent = arrayElement.comments.length;
  pictureDescription.textContent = arrayElement.description;

  // циклом перебираем коллекцию с комментариями и переопределяем аватарок комментариев, имен авторов и текста каждого комментария
  for (var i = 0; i < commentListItems.length; i++) {
    commentListItems[i].children[0].src = arrayElement.comments[i].avatar;
    commentListItems[i].children[0].alt = arrayElement.comments[i].name;
    commentListItems[i].children[1].textContent = arrayElement.comments[i].message;
  }
};

createPublicationsArray(25);
putPublicationsToPage();
hideElementWithVisuallyHidden(commentsCounter);
hideElementWithVisuallyHidden(commentsLoader);
generateBigPublication(publications[0]);

bigPictureSection.classList.remove('hidden');
