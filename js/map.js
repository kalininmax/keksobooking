/* global L:readonly */
import { TOKYO, offerList } from './data.js';
import { addressInput } from './form.js';
import { getAddress } from './util.js';

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
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

offerList.forEach(({ location: { x: lat, y: lng } }) => {
  L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
  ).addTo(map);
})
