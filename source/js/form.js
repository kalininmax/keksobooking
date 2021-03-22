import { TYPES } from './card.js';
import { sendData } from './data.js';
import { showSuccessMessage, showErrorMessage } from './util.js';
import { resetAddress } from './map.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const roomsCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const typeSelect = adForm.querySelector('#type');
const roomSelect = adForm.querySelector('#room_number');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const capacitySelect = adForm.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');
const priceInput = adForm.querySelector('#price');
const addressInput = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');
const filterForm = document.querySelector('.map__filters');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoPreview = document.querySelector('.ad-form__photo');

const setAddresInputValue = (value) => {
  addressInput.value = value;
};

addressInput.readOnly = true;

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
  adForm.classList.toggle('ad-form--disabled');
  adFormFieldsets.forEach(fieldset => {
    fieldset.disabled = !fieldset.disabled;
  });
};

const disableFilterForm = () => {
  filterForm.classList.toggle('map__filters--disabled');
  for (let filterFormItem of filterForm.children) {
    filterFormItem.disabled = !filterFormItem.disabled;
  }
};

disableAdForm();
disableFilterForm();

const validateRoomSelect = () => {
  capacityOptions.forEach((option) => {
    option.selected = roomsCapacity[roomSelect.value][0] === option.value;
    option.disabled = roomsCapacity[roomSelect.value].indexOf(option.value) < 0;
    option.hidden = option.disabled;
  });
};

validateRoomSelect();

const onRoomSelectChange = () => {
  validateRoomSelect();
};

roomSelect.addEventListener('change', onRoomSelectChange);

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

const resetForm = () => {
  adForm.reset();
  avatarPreview.src = DEFAULT_AVATAR;
  filterForm.reset();
  photoPreview.style.background = '';
  resetAddress();
};

resetForm();

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
})

onSubmitAdForm(() => {
  showSuccessMessage();
  resetForm();
}, showErrorMessage);

export { disableAdForm, disableFilterForm, setAddresInputValue };
