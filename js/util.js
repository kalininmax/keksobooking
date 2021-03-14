const OFFER_PHOTO = { width: 45, height: 40 };

const createOfferPhotos = (photos) => {
  const offerPhotosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const offerPhoto = document.createElement('img');
    offerPhoto.classList.add('popup__photo');
    offerPhoto.src = photo;
    offerPhoto.width = OFFER_PHOTO.width;
    offerPhoto.height = OFFER_PHOTO.height;
    offerPhoto.alt = 'Фотография жилья';
    offerPhotosFragment.appendChild(offerPhoto);
  });
  return offerPhotosFragment;
}

const createOfferFeatures = (features) => {
  const featuresItemsFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${feature}`);
    featuresItemsFragment.appendChild(featureItem);
  });
  return featuresItemsFragment;
}

const getAddress = ({ lat, lng }) => {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const closePopup = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  successMessage.style.zIndex = 1000;
  document.querySelector('main').append(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', closePopup);
};

const showErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  errorMessage.style.zIndex = 1000;
  if(message) {
    errorMessage.querySelector('p').textContent = message;
  }
  document.querySelector('main').append(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', closePopup);
};

export {
  createOfferPhotos,
  createOfferFeatures,
  getAddress,
  showSuccessMessage,
  showErrorMessage
}
