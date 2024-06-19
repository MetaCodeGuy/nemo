import { Entypo, FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {ImageModal}  from '@/components/ImageModal'
import FileSystem from 'expo-file-system'
import React, { useEffect } from "react";
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { Dimensions, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { GetWidth, GetNumOfCols, GetHeight } from '../../hooks/useDimension'
import { AddToFavourites} from "@/hooks/useStorage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from '@/constants/Colors'
import { HandleDownload } from "@/hooks/useDownload";
export default function Index() {


  const { width } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  // Get The data from api 
  const [Query, SetQuery] = useState('')
  const [CurrentIndex, setCurrentIndex] = useState(0)
  const [Rerender, setRerender] = useState(false)
  const [FilterModalVis, setFilterModalVis] = useState(false)
  const [ModalVisible,setModalVisible] = useState(false)
  const [ModalImage, setModalImge] = useState('')
  const [IndexRefreshing, SetIndexRefreshing] = useState(false)
  const [Images, setImages] = useState([]) 
  const BaseUrl = 'https://pixabay.com/api/';
  const API_KEY = '44253654-f9603ecba2b1b58bda10d5657';

  const URL = `${BaseUrl}?key=${API_KEY}&q=${Query.trim()}`;
  const RandomQuery = () => {
    let queries = ['space', 'world', 'electron', 'elon musk', 'microsoft', 'apple', 'google', 'meta', 'cosmos', 'jeff bezos', 'green', 'orange', 'coding', 'water', 'lake', 'niagara']
    SetQuery(queries[Math.floor(Math.random() * queries.length)])
  }
 

  const handleDownload = async (url: string) => {
    HandleDownload(url).then((val) => {
      Alert.alert("image is downloaded", "at " + val)
    })

  }

  const GetImageData = (URL: string) => {

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
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
          <View>
            <Text style={{
              fontSize: 24,
              fontFamily: 'poppinsbold',
            }}>Hi , Nithish👋!</Text>
            <Text style={{
              fontFamily: "poppinsreg",
              color: "gray"
            }}>Try Out a New Wallpaper Today!</Text>
          </View>

          {/* Modal Trigger */}
          {/* <Pressable
            onPress={() => {
              setFilterModalVis(true)
            }}
          >
            <Ionicons name='filter' style={{ padding: 10 }} color={'gray'} size={22} />
          </Pressable> */}

          <TouchableOpacity
            onPress={() => {
              router.push('search')
            }}
            style={{
              borderRadius: 50,
              borderColor: 'lightgray',
              borderWidth: 1,
            }}
          >
            <AntDesign name="search1" style={{ padding: 12 }} size={28} />
          </TouchableOpacity>


        </View> 
        
      </View>
      {/* Popular categories */}
      <View style={{
        display: 'flex',
        flexDirection: 'column',

      }}>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}>



          <Text style={{ fontFamily: "poppinsbold" }}>Popular Categories</Text>

          <TouchableOpacity>
            <Text style={{ color: "gray" }}>View All</Text>
          </TouchableOpacity>

        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}

          style={{
            minHeight: 60,
          }}
          horizontal
        >
          {
            [...new Array(6)].map((dat) => {
              return <TouchableOpacity style={{
                borderRadius: 30,
                width: 60,
                height: 60,
                marginLeft: 6,
                elevation:1,
              }}>
                <Image
                  source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperset.com%2Fw%2Ffull%2F5%2F9%2F0%2F80914.jpg&f=1&nofb=1&ipt=a6d83d80f81a587b9b3638cd661547948c93ba315878f4e5f90e323a06872a79&ipo=images' }}
                  style={{
                    flex: 1,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                  }}
                />
              </TouchableOpacity>
            })
          }
        </ScrollView>

      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginTop: 10,
        paddingVertical: 8
      }}>

        <Text style={{ fontFamily: "poppinsbold" }}>Trending</Text>
        <TouchableOpacity>
          <Text style={{ color: "gray" }}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Images}
        numColumns={GetNumOfCols()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={IndexRefreshing}

        contentContainerStyle={{
          justifyContent: 'center',
          alignSelf: 'center',
          columnGap: 10,
        }}
        style={{
          marginHorizontal: 10,
        }}
        onRefresh={() => {
          RandomQuery()
          SetIndexRefreshing(true)
          GetImageData(URL)
        }}
        renderItem={({ item, index }) => { 
          return <TouchableOpacity
            style={{
              width: GetWidth(),
              height: 250,
              elevation:1,
              padding: 6,
            }}
            onPress={() => {
              setCurrentIndex(index);
              setModalVisible(true)
            }} >

            <Image
              source={{ uri: item.largeImageURL }}
              style={{
                flex: 1,
                borderRadius: 10
              }}

            />
          </TouchableOpacity>
        }}
      />

       <ImageModal 
      url={Images[CurrentIndex]?.largeImageURL}
        
       ModalVisible={ModalVisible}
        
       setModalVisible={setModalVisible}
        
       AddToFavourites={AddToFavourites}
            
          />

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
              alignSelf: "flex-end",
              margin: 10,
              backgroundColor: "lightgray",
              borderRadius: 10
            }}
            onPress={() => {
              setFilterModalVis(false)
            }}
          >
            <Ionicons name="close" style={{
              padding: 10,
            }} color={"gray"} size={28} />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  actionBtn: {
    padding: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 16
  }
})
