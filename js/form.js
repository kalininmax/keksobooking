import { TYPES } from './data.js';

const roomsCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const addressInput = adForm.querySelector('#address');
const capacitySelect = adForm.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');
const roomSelect = adForm.querySelector('#room_number');
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

addressInput.setAttribute('readonly', 'readonly');

const validateRoomSelect = () => {
  capacityOptions.forEach((option) => {
    option.selected = roomsCapacity[roomSelect.value][0] === option.value; // выбирает первую доступную опцию
    // indexOf ищет в массиве опцию, если такой опции нет — возвращает -1, сравнивает с 0, возвращает true
    option.disabled = roomsCapacity[roomSelect.value].indexOf(option.value) < 0;
    option.hidden = option.disabled;
  });
};

roomSelect.addEventListener('change', validateRoomSelect);

export { disableAdForm, disableFilterForm, addressInput };
