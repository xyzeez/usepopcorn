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

export const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error('Something went wrong');

    const data = await res.json();

    console.log(data.Response === 'False');

    if (data.Response === 'False') throw new Error('');

    if (options.signal && options.signal.aborted) return;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
