const getRandomNumber = (min, max, afterComma = 0) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  if (afterComma === 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(afterComma));
}

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const getRandomArrayElement = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
}

const getRandomArrayElements = (arr) => {
  return shuffleArray(arr).slice(0, getRandomNumber(1, arr.length));
}

const getRandomLocation = ({ x, y }) => {
  return { x: getRandomNumber(x.min, x.max, 5), y: getRandomNumber(y.min, y.max, 5) };
}

export { getRandomNumber, getRandomArrayElement, getRandomArrayElements, getRandomLocation }
