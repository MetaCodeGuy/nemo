import { GetNumOfCols, GetWidth } from '@/hooks/useDimension'
import { getData, storeData } from '@/hooks/useStorage'
import { Entypo, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

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
                backgroundColor: Colors[colorScheme ?? 'light'].background
            }}
        >

            <FlatList
                data={FavImages}
                ListEmptyComponent={()=>{
                    return(
                        <View style={{
                        marginTop:10,
                        padding:20,
                        justifyContent:'center',
                        flexDirection:'column',
                        display:'flex',
                        gap:20,
                        
}}>
                        <Text style={{
                            fontFamily:"poppinsbold",
                            fontSize:36
                        }}>It Seems Like You Have No Images in Favourites! Add one Now !👇</Text>
                        <TouchableOpacity 
                        onPress={()=>{
                            router.push('(tabs)')
                        }}
                        style={{
                            backgroundColor:'black',
                            borderRadius:10, 
                        }}
                        >
                           <Ionicons name={"add"} style={{padding:20}} size={28} color={"white"} />
                        </TouchableOpacity>
                    </View>
                    )
                }}
                ListHeaderComponent={() => {
                    return (
                        <View style={{ paddingVertical: 20,marginTop:10, }}>
                             <TouchableOpacity
                             onPress={()=>{
                                if(router.canGoBack()){
                                    router.back()
                                }
                             }}
                               style={{
                                borderRadius: 50,
                                alignSelf:'flex-start',
                                marginLeft:10,
                                borderColor: 'lightgray',
                                borderWidth: 1,
                              }}
                              >
                             <MaterialIcons name="navigate-before" style={{padding:8}} size={28} color="black" />
                             </TouchableOpacity>
                        </View>)
                }}
                onRefresh={() => {
                    GetLoalData()
                }}
                refreshing={Refreshing}
                numColumns={GetNumOfCols()}
                renderItem={({ item }) => {
                    console.log(item,'this one is from favourites ');
                    
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
                                    getData('favourites').then((val)=>{
                                        val.map((img) => {
                                            if (img !== item) {
                                                newarr.push(img);
                                            }
                                        })
                                        storeData('favourites', newarr)
                                        .then(() => { 
                                            
                                            setRerender((prev) => !prev)
                                        })
                                    })
                                  
                                }}
                                style={{
                                    padding: 10,
                                    position: 'absolute',
                                    top: 30,
                                    right: 30,
                                    borderWidth:1,
                                    borderColor:"white",
                                    zIndex: 10,
                                    borderRadius: 60,
                                }}
                            >
                                <Ionicons name='trash' size={28} color={"white"} />

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
