import { createRandomOffer, TYPES } from './data.js';
import { createOfferPhotos, createOfferFeatures } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const offer = createRandomOffer();

const createCard = ({ author: { avatar }, offer: { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } }) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__avatar').src = avatar;
  card.querySelector('.popup__title').textContent = title;
  card.querySelector('.popup__text--address').textContent = address;
  card.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = TYPES[type].ru;
  card.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').appendChild(createOfferFeatures(features));
  card.querySelector('.popup__description').textContent = description;
  card.querySelector('.popup__photos').innerHTML = '';
  card.querySelector('.popup__photos').appendChild(createOfferPhotos(photos));
  return card;
}

const cardItem = createCard(offer);

mapCanvas.appendChild(cardItem);
