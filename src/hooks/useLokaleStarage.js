import { useEffect, useState } from 'react';

// third option
const useLocalStorage = (storageKey, defoltInital) => {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(storageKey)) ?? defoltInital
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);
  return [value, setValue];
};

export default useLocalStorage;