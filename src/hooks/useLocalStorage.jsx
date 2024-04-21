import { useState, useEffect } from 'react';

// Helpers
import { getLocalData, setLocalData } from '../helpers';

const useLocalStorage = (initialData, key) => {
  const [data, setData] = useState(getLocalData(key) || initialData);

  useEffect(() => setLocalData(key, data), [data, key]);

  return [data, setData];
};

export default useLocalStorage;
