export const getLocalData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalData = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const isAdded = (array, id) => {
  return array.map((item) => item.imdbID).includes(id);
};

export const getRating = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].imdbID === id) {
      return array[i].userRating;
    }
  }
  return false;
};

export const average = (arr) => {
  return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(2);
};
