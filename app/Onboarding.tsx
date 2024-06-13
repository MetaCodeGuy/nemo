// import react from 'react'
// import { Image } from 'expo-image'
// import { SafeAreaView, TouchableOpacity, Text } from 'react-native'
// import React from 'react'
// export default function Onbaording() {
//     return (
//         <SafeAreaView
//             style={{
//                 flex: 1,
//                 width: '100%',
//                 backgroundColor:'red',
//                 height: "100%",
//             }}
//         >
//             <Image
//                 style={{
//                     width: '100%',
//                     height: '80%',
//                 }}
//             />

//             <TouchableOpacity style={{
//                 paddingVertical: 10,
//                 paddingHorizontal: 20,
//                 backgroundColor: 'black',
//                 alignSelf: "center"
//             }}>
//                 <Text style={{ color: "white" }} >Get Started</Text>
//             </TouchableOpacity>

//             </SafeAreaView>
// )
// }
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Onboarding = () => {
  console.log("onboarding rendered")
  return (
    <View>
      <Text>Onboarding</Text>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({})
