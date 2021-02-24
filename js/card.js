import { createRandomOffer, TYPES } from './data.js';
import { createOfferPhotos, createOfferFeatures } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const card = cardTemplate.cloneNode(true);
const avatarImg = card.querySelector('.popup__avatar');
const offerTitle = card.querySelector('.popup__title');
const offerLocation = card.querySelector('.popup__text--address');
const offerPrice = card.querySelector('.popup__text--price');
const offerType = card.querySelector('.popup__type');
const offerCapacity = card.querySelector('.popup__text--capacity');
const offerTime = card.querySelector('.popup__text--time');
const offerFeatures = card.querySelector('.popup__features');
const offerDescription = card.querySelector('.popup__description');
const offerPhotos = card.querySelector('.popup__photos');
const offer = createRandomOffer();

const createCard = ({ author: { avatar }, offer: { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } }) => {
  if (avatar) {
    avatarImg.src = avatar;
  } else {
    avatarImg.remove();
  }
  if (title) {
    offerTitle.textContent = title;
  } else {
    offerTitle.remove();
  }
  if (address) {
    offerLocation.textContent = address;
  } else {
    offerLocation.remove();
  }
  if (price) {
    offerPrice.textContent = `${price} ₽/ночь`;
  } else {
    offerPrice.remove();
  }
  if (type) {
    offerType.textContent = TYPES[type].ru;
  } else {
    offerType.remove();
  }
  if (rooms && guests) {
    offerCapacity.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    offerCapacity.remove();
  }
  if (checkin && checkout) {
    offerTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    offerTime.remove();
  }
  if (features) {
    offerFeatures.innerHTML = '';
    offerFeatures.appendChild(createOfferFeatures(features));
  } else {
    offerFeatures.remove();
  }
  if (description) {
    offerDescription.textContent = description;
  } else {
    offerDescription.remove();
  }
  if (photos) {
    offerPhotos.innerHTML = '';
    offerPhotos.appendChild(createOfferPhotos(photos));
  } else {
    offerPhotos.remove();
  }
  return card;
}

const cardItem = createCard(offer);

mapCanvas.appendChild(cardItem);
