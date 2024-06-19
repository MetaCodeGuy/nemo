import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import {   Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react' 
import { router } from 'expo-router'
import {ImageModal} from '@/components/ImageModal'
import { GetNumOfCols, GetWidth } from '@/hooks/useDimension';


const BaseUrl = 'https://pixabay.com/api/';
const API_KEY = '44253654-f9603ecba2b1b58bda10d5657';

const search = () => { 
  const [ModalVisible,setModalVisible] = useState(false)
  const [ModalImage, setModalImge] = useState('')
  const [page, setpage] = useState(10)
  const [SearchQuery, setSearchQuery] = useState('space')
  const [Images, setImages] = useState([])
  const URL = `${BaseUrl}?key=${API_KEY}&q=${SearchQuery}&per_page=${page}`;
  const GetImageData = (URL: string) => {
    try {
      fetch(URL)
        .then((res) => res.json())
        .then((val) => {
          setImages(val?.hits)
        })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    GetImageData(URL)
  }, [SearchQuery])
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",

      }}
    >
      
      <View style={{
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
      }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 50,
            marginRight: 'auto',
            borderColor: 'lightgray',
          }}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}

        >

          <MaterialIcons name="navigate-before" style={{ padding: 16 }} size={28} color="black" />
        </TouchableOpacity>


        <View style={{
          display: 'flex',
          flexDirection: 'row',
          borderWidth: 1,
          flex: 1,
          marginLeft: 10,
          borderColor: 'lightgray',
          borderRadius: 60,
        }}>

          <TextInput
            style={{
              flex: 1,
              fontSize: 16, paddingHorizontal: 10,

              fontFamily: 'poppinsreg'
            }}
            placeholder="Search For Image Here.."
            onChangeText={(txt) => {
              setSearchQuery(txt)
            }}
          />
          <TouchableOpacity style={{ padding: 16 }}
           onPress={() => {
          
            }} >
           <Ionicons name="search" size={24} color={"black"} /></TouchableOpacity>
        </View>
      </View>

      {/*the iamge flatlsit comes here*/}
      
      
      <FlatList
        data={Images}
        style={{
          alignSelf: 'center',
          gap: 10,
        }}

        numColumns={GetNumOfCols()}
        renderItem={({ item }) => { 

          return (
            <TouchableOpacity style={{
              width: GetWidth(),
              height: 300,
              position: 'relative',
              borderRadius: 10,  
              padding:10,
            }}

              onPress={() => {
                //open  the modal 
                 setModalVisible(true)
                 setModalImge(item.largeImageURL)
              }}
            >
              <Image
                source={{ uri: item.largeImageURL }}
                style={{
                  width: "100%", 
                  height: '100%',
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          )
        }}
        ListFooterComponent={() => {
          // show load more btn when search 
          return (
            SearchQuery && (<TouchableOpacity
              onPress={() => {
                // increase the page by one 
                setpage(prev => prev + prev)
              }}
              style={{
                padding: 16,
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <Text style={{ fontFamily: 'poppinsreg' }}>Show more</Text>
            </TouchableOpacity>)
          )
        }}
      />
        <ImageModal url={ModalImage}  setModalVisible={setModalVisible} ModalVisible={ModalVisible}/>
    </SafeAreaView>
  )
}

export default search
