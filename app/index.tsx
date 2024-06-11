import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { useState } from "react";
import { Dimensions, Button, FlatList, Modal, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { GetWidth, GetNumOfCols } from '.././hooks/useDimension'

export default function Index() {
  const { width } = Dimensions.get('window')
  // Get The data from api 
  const [Query, SetQuery] = useState('')
  const [ModalImage, setModalImge] = useState('')
  const [Images, setImages] = useState([])
  const [ModalVisible, setModalVisible] = useState(false)
  const BaseUrl = 'https://pixabay.com/api/';
  const API_KEY = '44253654-f9603ecba2b1b58bda10d5657';

  const URL = `${BaseUrl}?key=${API_KEY}&q=${Query}&image_type=photo&pretty=true`;

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
          paddingVertical: 16,
          display: 'flex',
          flexDirection: "row",
          alignContent: "center",
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
          <Text style={{
            fontSize: 24,
            marginVertical: 10,
            fontWeight: 900
          }}>Nemo</Text>
          <Pressable >
            <Ionicons name='filter' style={{ padding: 10 }} color={'black'} size={22} />
          </Pressable>
        </View>

        <View style={{
          backgroundColor: 'rgba(0,0,0,.1)',
          display: 'flex',
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
        style={{
          alignSelf: 'center'
        }}
        renderItem={({ item }) => {
          return <Pressable onPress={() => {
            setModalImge(item.webformatURL);
            setModalVisible(true)
          }} >
            <Image
              source={{ uri: item.webformatURL }}
              style={{
                width: GetWidth(),
                height: 300,
                borderRadius: 10,
                margin: 10,

              }}
              resizeMode="cover"
            />
          </Pressable>
        }}
      />

      <Modal
        visible={ModalVisible}
        
      >
        <View style={{
          width: '100%',
          height: "100%", 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} >
        </View>
        <Text>Hello World</Text>
        <Image
          source={{uri : ModalImage}}
          style={{
            width: 255,
            height: 200,
            borderRadius: 20
          }}
           resizeMode="cover"
        />
        <Text>Hello world!</Text>
      </Modal>
    </SafeAreaView>
  );
}
