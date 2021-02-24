import { TYPES } from './data.js';

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const filterForm = document.querySelector('.map__filters');

typeSelect.addEventListener('change', () => {
  priceInput.min = TYPES[typeSelect.value].minPrice;
  priceInput.placeholder = TYPES[typeSelect.value].minPrice;
});

timeInSelect.addEventListener('change', () => {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', () => {
  timeInSelect.value = timeOutSelect.value;
});

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach(fieldset => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};

const disableFilterForm = () => {
  filterForm.classList.add('map__filters--disabled');
  for (let i = 0; i < filterForm.children.length; i++) {
    filterForm.children[i].setAttribute('disabled', 'disabled');
  }
};

disableAdForm();
disableFilterForm();
