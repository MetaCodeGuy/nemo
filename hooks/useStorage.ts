import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from 'react-native'


export const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      return e
    }
  };


  //read local object data
  export const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      return e
    }
  };
  
  
export  const AddToFavourites = (image: string) => {
     //  store data locally
     try {
       getData("favourites")
         .then((val) => {
           if (val) {
             if (val.includes(image)) {
               //image already exist
               Alert.alert("image already in favourites")
             } else {
               // new image
               storeData('favourites', [...val, image])
             }
           } else {
             storeData('favourites', [image]).then(() => {
               Alert.alert("Added To Favourites ", " image is added to your favourites you can view them at anytime ")
             })
           }
 
         })
     } catch (error) {
       console.log(error)
     }
 
 
   }
  
