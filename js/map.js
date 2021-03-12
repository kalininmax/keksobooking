/* global L:readonly */
import { addressInput } from './form.js';
import { getAddress, showErrorMessage } from './util.js';
import { createCard } from './card.js';
import { getData } from './data.js';

const TOKYO = { lat: 35.652832, lng: 139.839478 };
const OFFERS_COUNT = 10;

const map = L.map('map-canvas')
  .setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -10],
});

const marker = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
  {
    draggable: true,
    autoPan: true,
    icon: mainPinIcon,
  },
).addTo(map);

addressInput.value = getAddress(marker.getLatLng());

marker.on('moveend', (evt) => {
  addressInput.value = getAddress(evt.target.getLatLng());
});

const renderOffers = (offers) => {
  offers.forEach(offer => {
    L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: pinIcon,
      },
    ).addTo(map)
      .bindPopup(createCard(offer));
  });
}

getData(
  (offers) => {
    renderOffers(offers.slice(0, OFFERS_COUNT));
  },
  showErrorMessage);
