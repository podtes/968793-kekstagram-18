'use strict';

/**
 * Функция вычисляет случайное число из интервала от минимального до максимального, включая эти значения
 * @param {number} min минимальное значение интервала
 * @param {number} max максимальное значение интервала
 * @return {number} случайное число из интервала
 */
var randomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Функция функция возвращает случайный элемент массива
 * @param {string} arrayName название массива, из которого будем выбирать слкчайный элемент
 * @return {number[]} randomValue случайный элемент массива
 */
var getRandomValue = function (arrayName) {
  var randomValue = Math.floor(Math.random() * arrayName.length);
  return randomValue;
};

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture'); // хотелось бы подробнее разобрать эту запись и что по итогу мы записываем в переменную pictureTemplate?

var AUTHOR_NAMES = ['Алексей', 'Дмитрий', 'Василий', 'Юрий', 'Бенджамин', 'Георгий', 'Юрий', 'Юлия', 'Мария', 'Валерия', 'Валерий', 'Евгений', 'Константин', 'Анна', 'Эдуард'];
var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AUTHOR_DESCRIPTION = ['Классно посидели!', 'Вот такой отпуск', 'Вы только посмотрите на это!', 'Какая то умная цитата несуществующего философа', 'Размышления о жизни', 'Сходил на бизнес-тренинг и теперь могу постить такие фотографии', 'Завидуйте мне', 'Просто фотография еды'];

// можно ли как то генерировать этот массив циклом? Чтобы не писать его руками. Или лучше вот так оставить?
var photos = [
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  },
  {
    name: AUTHOR_NAMES[getRandomValue(AUTHOR_NAMES)],
    comments: AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)] + ' ' + AUTHOR_COMMENTS[getRandomValue(AUTHOR_COMMENTS)],
    description: AUTHOR_DESCRIPTION[getRandomValue(AUTHOR_DESCRIPTION)],
    likes: randomIntFromInterval(15, 200)
  }
];
var avatarNumber = 0;
/**
 * Функция генерирует DOM элемент на основе шаблона pictureTemplate
 * @param {[]} photo массив объектов с данными (моки)
 * @return {Node} возвращает сгенерированный DOM элемент
 */
var renderPhotos = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = './img/avatar-' + avatarNumber + '.svg'; // или адрес изображения тоже нужно было как-то записывать в массив photos?
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = 2; // так ок?

  return pictureElement;
};

var fragment = document.createDocumentFragment(); // не могу понять зачем нужно использовать fragment и где он вообще находится?

/**
 * Функция перебирает массив photos и вставляет результат после fragment?
 */
var getPhotosToIndex = function () {
  for (var i = 0; i < photos.length; i++) {
    avatarNumber++;
    fragment.appendChild(renderPhotos(photos[i]));
  }
};

getPhotosToIndex();

document.querySelector('.pictures').appendChild(fragment);
