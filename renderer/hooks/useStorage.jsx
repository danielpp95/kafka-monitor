import { useEffect, useState } from 'react'
import Store from 'electron-store';

export default function useStorage(collection, defaultValue) {
  const [storage, setStorage] = useState(defaultValue);
  const store = new Store({ name: collection });

  useEffect(() => {
    function GetStorage() {
      const storage = store.get(collection) || [];
      
      if (Object.keys(storage).length === 0) {
          return [];
      }
  
      setStorage(storage || []);
    }
    GetStorage();
  }, [])

  const SetNewStorage = (newValue) => {
    store.set(collection, newValue);
    setStorage(newValue);
  }

  return [storage, SetNewStorage]
}
