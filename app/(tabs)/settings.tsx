import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showAlert } from '@/components/PromptAlert'
import { Ionicons } from '@expo/vector-icons'



const settings = () => {
    const SettingsData = [
        {
            Label: "Account",
            Onpress: () => {
                console.log('move to Account screen')
            },
            Icon: <Ionicons name="person" color={'black'} size={28} />
        },
        {
            Label: "Delete Data",
            Onpress: () => {
                showAlert()
            }
        },
        {
            Label: "Theme",
            Onpress: () => {
                console.log('Change theme and store that data locally ')
            }
        },
        {
            Label: "Credits",
            Onpress: () => {
                console.log('move to Credits screen')
            }
        },
        {
            Label: "Buy Me a Coffee",
            Onpress: () => {
                console.log('move to Buy me a coffe screen')
            }
        }
    ]
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            {/*settings component*/}

            <FlatList
                data={SettingsData}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => {
                    return (
                        <View style={{
                            marginTop: 20,
                            flex: 1,
                            minHeight: 350,
                            justifyContent: "center",
                            paddingVertical: 20,
                        }}>
                            <Image
                                source={require('../../assets/images/NemoLogo.png')}
                                style={{
                                    flex: 1,
                                    minHeight: 350,
                                    width: '90%',
                                    alignSelf: 'center',
                                    borderRadius: 20
                                }}
                            />
                            <Text style={{ fontFamily: "poppinsbold", textAlign: "center", marginTop: 20 }}>Nemo</Text>
                            <Text style={{ fontFamily: "poppinsreg", textAlign: "center", color: 'gray' }}>Version 0.1.6</Text>
                        </View>
                    )
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{
                            borderRadius: 5,
                            elevation: 1,
                            margin: 10,
                            shadowColor: 'black',
                            shadowOpacity: .2,
                            flex: 1,
                            shadowOffset: {
                                width: 2,
                                height: 2
                            },
                            shadowRadius: 4,
                            backgroundColor: "white"
                        }}
                            onPress={item.Onpress}
                        >
                            <Text style={{ padding: 12, fontFamily: 'poppinsreg', }}>{item.Label}</Text>

                        </TouchableOpacity>
                    )
                }}
            />

        </SafeAreaView>
    )
}

export default settings
