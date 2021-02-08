const TOTAL_USERS = 8;
const OFFERS_COUNT = 10;
const PRICE = { min: 10, max: 10000 };
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS = { min: 1, max: 50 };
const GUESTS = { min: 1, max: 50 };
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const LOCATIONS = {
  x: { min: 35.65000, max: 35.70000 },
  y: { min: 139.70000, max: 139.80000 },
};

const getRandomNumber = (min, max, afterComma = 0) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  if (afterComma === 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(afterComma));
}

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const getRandomArrayElement = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
}

const getRandomArrayElements = (arr) => {
  return shuffleArray(arr).slice(0, getRandomNumber(1, arr.length));
}

const getRandomLocation = ({ x, y }) => {
  return { x: getRandomNumber(x.min, x.max, 5), y: getRandomNumber(y.min, y.max, 5) };
}

const createRandomOffer = (location) => {
  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, TOTAL_USERS)}.png`,
    },
    offer: {
      title: 'Заголовок',
      address: `${location.x}, ${location.y} `,
      price: getRandomNumber(PRICE.min, PRICE.max),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomNumber(ROOMS.min, ROOMS.max),
      guests: getRandomNumber(GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKIN_TIME),
      features: getRandomArrayElements(FEATURES),
      description: 'Описание',
      photos: getRandomArrayElements(PHOTOS),
    },
    location: location,
  }
}

const createOfferList = (offersCount) => {
  const array = [];
  while (offersCount > 0) {
    const location = getRandomLocation(LOCATIONS);
    array.push(createRandomOffer(location));
    offersCount--;
  }
  return array;
}

let offerList = createOfferList(OFFERS_COUNT);

// eslint-disable-next-line no-console
console.log(offerList);
