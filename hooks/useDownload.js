import { shareAsync } from 'expo-sharing';
import * as FileSystem from "expo-file-system"
import { Alert, Platform } from 'react-native';

export const HandleDownload = async (url) => {
    if (Platform.OS == "web") {
        alert("Download Feature Will be Added Soon!....")
    } 
    const Fname = `Nemo-${new Date().getTime()}`
    const result = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + Fname, {
        headers: {
            "Myheaders": "myValues"
        }
    })
    save(result.uri, Fname, result.headers["content-type"] || result.headers["Content-Type"])
}

const save = async (uri, Fname, mimetype) => {
    if (Platform.OS == "android") {
        const permission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permission.granted) {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            await FileSystem.StorageAccessFramework.createFileAsync(permission.directoryUri, Fname, mimetype)
                .then(async (uri) => { 
                    await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 })
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
    else {
        shareAsync(uri)
    }
}



