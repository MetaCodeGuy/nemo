import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const showAlert = () =>
    Alert.alert(
      'Are You Sure ?',
      'by clicking ok all of your data will be deleted permenantly !',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
            text:'Delete',
            onPress:()=>{AsyncStorage.clear()},
            style:"destructive"
        }
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  