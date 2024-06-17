import { View, Text, SafeAreaView ,FlatList, TouchableOpacity} from 'react-native'
import {Image} from 'expo-image'
import React from 'react'

const settings = () => {
const SettingsData = [
    {
        Label:"Account",
        Onpress:()=>{
            console.log('move to Account screen')
        }
    },
    {
        Label:"Appearence",
        Onpress:()=>{
            console.log('move to Appearence screen')
        }
    },
    {
        Label:"Theme",
        Onpress:()=>{
            console.log('Change theme and store that data locally ')
        }
    },
    {
        Label:"Credits",
        Onpress:()=>{
            console.log('move to Credits screen')
        }
    }
]
  return (
    <SafeAreaView style={{
        flex:1,
        backgroundColor:'white'
    }}>
     {/*settings component*/}
     
     <FlatList
     data={SettingsData}
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}
     ListHeaderComponent={()=>{
         return(
             <Image
             style={{
                 width:"90%",
                 minHeight:300,
                 BorderRadius:200
             }}
             />
         )
     }}
     renderItem={({item})=>{
         return (
         <TouchableOpacity style={{ 
         borderRadius:10,
         margin:10,
         shadowColor:'black',
         shadowOpacity:.2,
         shadowOffset:{
             width:2,
             height:2
         },
         shadowRadius:4,
         backgroundColor:"white"
         }}>
             <Text style={{padding:20,fontFamily:'poppinsreg',color:"gray",}}>{item.Label}</Text>
             </TouchableOpacity>
         )
     }}
     />
     
    </SafeAreaView>
  )
}

export default settings
