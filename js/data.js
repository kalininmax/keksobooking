import { getRandomLocation, getRandomNumber, getRandomArrayElement, getRandomArrayElements } from './util.js'

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

const createRandomOffer = () => {
  const location = getRandomLocation(LOCATIONS);
  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, TOTAL_USERS)}.png`,
    },
    offer: {
      title: `Заголовок ${getRandomNumber(1, OFFERS_COUNT)}`,
      address: `${location.x}, ${location.y} `,
      price: getRandomNumber(PRICE.min, PRICE.max),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomNumber(ROOMS.min, ROOMS.max),
      guests: getRandomNumber(GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKIN_TIME),
      features: getRandomArrayElements(FEATURES),
      description: `Описание ${getRandomNumber(1, OFFERS_COUNT)}`,
      photos: getRandomArrayElements(PHOTOS),
    },
    location: location,
  }
}

const createOffers = (offersCount) => {
  const array = [];
  while (offersCount > 0) {
    array.push(createRandomOffer());
    offersCount--;
  }
  return array;
}

const offerList = createOffers(OFFERS_COUNT);

export { offerList, createRandomOffer };
