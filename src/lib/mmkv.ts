import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export const clientStorage = {
  setItem: (key: string, value: any) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};
