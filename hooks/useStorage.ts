import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key:string,value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      return e
    }
  };


  //read local object data
  export const getData = async (key:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      return e
    }
  };
