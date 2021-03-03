import { TYPES } from './data.js';

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const addressInput = adForm.querySelector('#address');
const capacitySelect = adForm.querySelector('#capacity');
const roomNumberSelect = adForm.querySelector('#room_number');
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

const roomCapacityHandler = () => {
  const capacityOptions = capacitySelect.querySelectorAll('option');

  roomNumberSelect.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case '1':
        capacityOptions.forEach(option => {
          if (option.value !== '1') {
            option.hidden = 'true';
          } else {
            option.removeAttribute('hidden');
            capacitySelect.value = option.value;
          }
        });
        break;
      case '2':
        capacityOptions.forEach(option => {
          if ((option.value !== '1') && (option.value !== '2')) {
            option.hidden = 'true';
          } else {
            option.removeAttribute('hidden');
            capacitySelect.value = option.value;
          }
        });
        break;

      case '3':
        capacityOptions.forEach(option => {
          if ((option.value !== '1') && (option.value !== '2') && (option.value !== '3')) {
            option.hidden = 'true';
          } else {
            option.removeAttribute('hidden');
            capacitySelect.value = option.value;
          }
        });
        break;

      case '100':
        capacityOptions.forEach(option => {
          if (option.value !== '0') {
            option.hidden = 'true';
          } else {
            option.removeAttribute('hidden');
            capacitySelect.value = option.value;
          }
        });
        break;

      default:
        break;
    }
  });
}

roomCapacityHandler();

export { disableAdForm, disableFilterForm, addressInput };
