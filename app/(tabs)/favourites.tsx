import { GetWidth } from '@/hooks/useDimension'
import { getData } from '@/hooks/useStorage'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Favourites() {
    const [FavImages, setFavImages] = useState([])
    useEffect(() => {
        getData('favourites').then((val) => {
            setFavImages(val)
        })
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <Text style={{
                fontFamily: "poppinsreg",
                fontSize: 28,
                textAlign: 'center'
            }}>Favourites</Text>

<FlatList 
data={FavImages}
renderItem={({item})=>{
    return (
        <View style={{
            width:GetWidth() ,
            height:300,
            borderRadius:10,
            padding:10
        }}>
            <TouchableOpacity onPress={()=>{
                // Remve the image from favourites
                //read the data and search for the image remove it

            }}
            style={{
                padding:10
            }}
            >
            <Ionicons name='trash' size={28}  color={"gray"}/>

            </TouchableOpacity>
<Image 
source={{uri:item}}
style={{
    width:"100%",
    height:'100%'
}}
/>
        </View>
    )
}}
/>



        </SafeAreaView>
    )
} 
