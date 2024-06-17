import { GetNumOfCols, GetWidth } from '@/hooks/useDimension'
import { getData, storeData } from '@/hooks/useStorage'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import {useColorScheme} from '@/hooks/useColorScheme'
import {Colors} from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'

export default function Favourites() {
  const colorScheme = useColorScheme();

    const [FavImages, setFavImages] = useState([])
    const [Refreshing, setRefreshing] = useState(false)
    const [Rerender, setRerender] = useState(false)
    const GetLoalData = () => {
        setRefreshing(true)
        getData('favourites').then((val) => {
            setFavImages(val)
            setRefreshing(false)
        })
    }
    useEffect(() => {
        GetLoalData()
    }, [Rerender])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                background:Colors[colorScheme ?? 'light'].background
            }}
        >

            <FlatList
                data={FavImages}
                ListHeaderComponent={() => {
                    return (
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={{
                                fontFamily: "poppinsreg",
                                fontSize: 28,
                                textAlign: 'center'
                            }}>Favourites</Text>
                        </View>)
                }}
                onRefresh={() => {
                    GetLoalData()
                }}
                refreshing={Refreshing}
                numColumns={GetNumOfCols()}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            width: GetWidth(),
                            height: 300,
                            position: 'relative',
                            borderRadius: 10,
                            padding: 10
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    // Remve the image from favourites
                                    //read the data and search for the image remove it
                                    //need a new array without this image
                                    let newarr = [];
                                    FavImages.map((img) => {
                                        if (img !== item) {
                                            newarr.push(img);
                                        }
                                    })
                                    storeData('favourites', newarr).then(() => {
                                        setRerender((prev) => !prev)
                                    })
                                }}
                                style={{
                                    padding: 10,
                                    position: 'absolute',
                                    top: 30,
                                    right: 30,
                                    zIndex: 10,
                                    borderRadius: 10,
                                    backgroundColor: "lightgray"
                                }}
                            >
                                <Ionicons name='trash' size={28} color={"gray"} />

                            </TouchableOpacity>
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: "100%",
                                    borderRadius: 10,
                                    height: '100%'
                                }}
                            />
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
} 
