import { GetNumOfCols, GetWidth } from '@/hooks/useDimension'
import { getData } from '@/hooks/useStorage'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Favourites() {
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
                flex: 1
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
                        </View>


                    )
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
                            <TouchableOpacity onPress={() => {
                                // Remve the image from favourites
                                //read the data and search for the image remove it

                            }}
                                style={{
                                    padding: 10,
                                    position: 'absolute',
                                    top: 30,
                                    right: 10,
                                    zIndex: 30,
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
                                    zIndex: 5,
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
