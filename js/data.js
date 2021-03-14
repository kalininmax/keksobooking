const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      onFail('При загрузке данных с сервера произошла ошибка');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
