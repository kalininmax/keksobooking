/* global L:readonly */
import { setAddresInputValue } from './form.js';
import { getAddress, showErrorMessage, debounce } from './util.js';
import { createCard } from './card.js';
import { getData } from './data.js';
import { filterOffers } from './filter.js';

const TOKYO = { lat: 35.652832, lng: 139.839478 };
const MAP_ZOOM = 12;
const MAX_OFFERS = 10;
const RENDER_DELAY = 500;
const filterForm = document.querySelector('.map__filters');

let offers;

const map = L.map('map-canvas')
  .setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, MAP_ZOOM);

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


marker.on('moveend', (evt) => {
  setAddresInputValue(getAddress(evt.target.getLatLng()));
});

const resetAddress = () => {
  marker.setLatLng(TOKYO);
  setAddresInputValue(getAddress(marker.getLatLng()));
};

const layerGroup = L.layerGroup().addTo(map);

const renderOffers = (offers) => {
  offers.forEach(offer => {
    L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: pinIcon,
    }).addTo(layerGroup)
      .bindPopup(createCard(offer));
  });
};

const removeMapPin = () => {
  layerGroup.clearLayers();
}

const onFilterChange = debounce(() => {
  removeMapPin();
  renderOffers(filterOffers(offers))
}, RENDER_DELAY);

const onSuccess = (data) => {
  offers = data.slice(0, MAX_OFFERS);
  renderOffers(offers);
  filterForm.addEventListener('change', onFilterChange);
};

const onFail = () => {
  showErrorMessage();
};

getData(onSuccess, onFail);

export { resetAddress, MAX_OFFERS };
