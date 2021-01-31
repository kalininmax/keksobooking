const getRandomInt = (min, max) => {
  if (max < min) [min, max] = [max, min];
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = (min, max, afterComma) => {
  if (max < min) [min, max] = [max, min];
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(afterComma));
}

getRandomInt(0, 5);
getRandomFloat(0, 5, 3);
