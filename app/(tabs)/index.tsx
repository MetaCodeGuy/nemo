import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { Dimensions, Button, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { GetWidth, GetNumOfCols } from '../../hooks/useDimension'
import { getData, storeData } from "@/hooks/useStorage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from '@/constants/Colors'
export default function Index() {


  const { width } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  // Get The data from api 
  const [Query, SetQuery] = useState('')
  const [Rerender, setRerender] = useState(false)
  const [FilterModalVis, setFilterModalVis] = useState(false)
  const [ModalImage, setModalImge] = useState('')
  const [IndexRefreshing, SetIndexRefreshing] = useState(false)
  const [Images, setImages] = useState([])
  const [ModalVisible, setModalVisible] = useState(false)
  const BaseUrl = 'https://pixabay.com/api/';
  const API_KEY = '44253654-f9603ecba2b1b58bda10d5657';

  const URL = `${BaseUrl}?key=${API_KEY}&q=${Query.trim()}`;
  const RandomQuery = () => {
    let queries = ['space', 'world', 'electron', 'elon musk', 'microsoft', 'apple', 'google', 'meta', 'cosmos', 'jeff bezos', 'green', 'orange', 'coding', 'water', 'lake', 'niagara']
    SetQuery(queries[Math.floor(Math.random() * queries.length)])
  }
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

  const GetImageData = (URL) => {

    fetch(URL).then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        SetIndexRefreshing(false)
      })
  }

  useEffect(() => {
    GetImageData(URL)
  }, [Rerender])

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}
    >
      {/* display the Images  */}
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
            color: 'gray',
            fontFamily: 'poppinsreg',
          }}>Nemo</Text>
          <Pressable
            onPress={() => {
              setFilterModalVis(true)
            }}
          >
            <Ionicons name='filter' style={{ padding: 10 }} color={'gray'} size={22} />
          </Pressable>
        </View>
        {/* search bar */}
        <View style={{
          backgroundColor: 'rgba(0,0,0,.03)',
          display: 'flex',
          marginTop: 10,
          flexDirection: 'row',
          borderRadius: 10,
        }}>



          <TextInput
            style={{ flex: 1, fontSize: 18, color: "gray", paddingHorizontal: 10, fontFamily: 'poppinsreg' }}
            placeholder="Search For Image Here.."
            onChangeText={(txt) => {
              SetQuery(txt)
            }}
          />
          <TouchableOpacity style={{ padding: 16 }} onPress={() => {
            setRerender(prev => !prev)
          }}><Ionicons name="search" size={24} color={"gray"} /></TouchableOpacity>
        </View>
      </View>


      <FlatList
        data={Images}
        numColumns={GetNumOfCols()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={IndexRefreshing}
        onRefresh={() => {
          RandomQuery()
          SetIndexRefreshing(true)
          GetImageData(URL)
        }}
        renderItem={({ item }) => {
          return <Pressable
            style={{
              padding: 10,
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
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ backgroundColor: "white", borderRadius: 20 }}>
              <AntDesign style={{ padding: 16 }} name="caretleft" size={28} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "white", borderRadius: 20 }}>
              <AntDesign style={{ padding: 16 }} name="caretright" size={28} color={'gray'} />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: ModalImage }}
            style={{
              width: "90%",
              height: 350,
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: .2,
              shadowRadius: 4,
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
              <Ionicons name="download" size={28} color={'gray'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*Filter Modal*/}
      <Modal
        visible={FilterModalVis}
      >
        <View
          style={{
            flex: 1,

          }}>
          <TouchableOpacity
            style={{
              background: 'lightgray',
              alignSelf: "end",
              margin: 20,
              borderRadius: 10
            }}
            onPress={() => {
              setFilterModalVis(false)
            }}
          >
            <Ionicons name="close" style={{ padding: 10 }} color={"gray"} size={28} />
          </TouchableOpacity>
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
