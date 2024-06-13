import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { useState } from "react";
import { Dimensions, Button, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { GetWidth, GetNumOfCols } from '../../hooks/useDimension'
import { getData, storeData } from "@/hooks/useStorage";

export default function Index() {
  const { width } = Dimensions.get('window')
  // Get The data from api 
  const [Query, SetQuery] = useState('')
  const [ModalImage, setModalImge] = useState('')
  const [Images, setImages] = useState([])
  const [ModalVisible, setModalVisible] = useState(false)
  const BaseUrl = 'https://pixabay.com/api/';
  const API_KEY = '44253654-f9603ecba2b1b58bda10d5657';

  const URL = `${BaseUrl}?key=${API_KEY}&q=${Query.trim()}`;


  const AddToFavourites = (image: string) => {
    //  store data locally
    getData("favourites").then((val) => {
      if (val.includes(image)) {
        //image already exist
        Alert.alert("image already in favourites")
      } else {
        // new image
        storeData('favourites', [...val, image])
      }
    })

  }

  useEffect(() => {
    fetch(URL).then((res) => res.json()).then((data) => {
      setImages(data.hits);
    })
  }, [Query])

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      {/* Header */}

      <View style={{
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>

        {/* Logo and filters */}

        <View style={{
          width: "100%",
          display: 'flex',
          flexDirection: "row",
          alignContent: "center",
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
          <Text style={{
            fontSize: 24,
            fontFamily: 'poppinsreg',
          }}>Nemo</Text>
          <Pressable >
            <Ionicons name='filter' style={{ padding: 10 }} color={'black'} size={22} />
          </Pressable>
        </View>
        {/* search bar */}
        <View style={{
          backgroundColor: 'rgba(0,0,0,.03)',
          display: 'flex',
          marginVertical: 10,
          flexDirection: 'row',
          borderRadius: 10,
        }}>


          <Ionicons name="search" size={24} style={{ padding: 16 }} color={"gray"} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search For Image Here.."
            onChangeText={(txt) => {
              SetQuery(txt)
            }}
          />
        </View>
      </View>
      {/* display the Images  */}


      <FlatList
        data={Images}
        numColumns={GetNumOfCols()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      
        renderItem={({ item }) => {
          return <Pressable 
          style={{
            padding:10,
            width: GetWidth(),
            height: 300,
          }}
          onPress={() => {
            setModalImge(item.webformatURL);
            setModalVisible(true)
          }} >
            <Image
              source={{ uri: item.webformatURL }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,  
              }}

            />
          </Pressable>
        }}
      />

      <Modal
        visible={ModalVisible}
        animationType="fade"
      >
        <View style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} >

          <Image
            source={{ uri: ModalImage }}
            style={{
              width: "90%",
              height: 350,
              maxWidth: 600,
              borderRadius: 20
            }}
          />
          {/* action btns */}

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 16,
            }}
          >
            <TouchableOpacity style={Styles.actionBtn} onPress={() => {
              setModalVisible(false)
            }}>
              <Ionicons name="close" size={28} color={'gray'} />
            </TouchableOpacity >
            <TouchableOpacity style={Styles.actionBtn} onPress={() => {
              AddToFavourites(ModalImage);
            }}>
              <Ionicons name="heart" size={28} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.actionBtn} >
              <Ionicons name="save" size={28} color={'gray'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  actionBtn: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginHorizontal: 16
  }
})