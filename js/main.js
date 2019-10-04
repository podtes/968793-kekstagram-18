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

createPublicationsArray(25);
renderPublicationHtmlElements(publications);
hideElement(commentsCounter);
hideElement(commentsLoader);
renderActivePublicationHtmlElement(publications[0]);

bigPictureSection.classList.remove('hidden');
