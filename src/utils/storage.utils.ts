import AsyncStorage from '@react-native-async-storage/async-storage';

const createStorageItem = <T>(key: string) => {
  return {
    async get(): Promise<T | null> {
      let item = null;
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        try {
          item = JSON.parse(value);
        } catch (e) {
          item = value;
        }
      }
      return item;
    },
    set(data: T) {
      return AsyncStorage.setItem(key, JSON.stringify(data));
    },
    remove() {
      return AsyncStorage.removeItem(key);
    },
  };
};

export { createStorageItem };
