import { TYPES } from './card.js';
import { sendData } from './data.js';
import { showSuccessMessage, showErrorMessage } from './util.js';
import { resetAddress } from './map.js';

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
const resetButton = adForm.querySelector('.ad-form__reset');
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
    fieldset.disabled = !fieldset.disabled;
  });
};

const disableFilterForm = () => {
  filterForm.classList.add('map__filters--disabled');
  for (let i = 0; i < filterForm.children.length; i++) {
    filterForm.children[i].disabled = !filterForm.children[i].disabled;
  }
};

addressInput.readOnly = true;

const validateRoomSelect = () => {
  capacityOptions.forEach((option) => {
    option.selected = roomsCapacity[roomSelect.value][0] === option.value;
    option.disabled = roomsCapacity[roomSelect.value].indexOf(option.value) < 0;
    option.hidden = option.disabled;
  });
};

validateRoomSelect();

roomSelect.addEventListener('change', validateRoomSelect);

const onSubmitAdForm = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

const resetAdForm = () => {
  adForm.reset();
  resetAddress();
};

resetAdForm();

onResetButtonClick

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdForm();
})

onSubmitAdForm(() => {
  showSuccessMessage();
  resetAdForm();
}, showErrorMessage);

export { disableAdForm, disableFilterForm, addressInput };
