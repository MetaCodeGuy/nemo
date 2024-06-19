import react from 'react'
import {Image} from 'expo-image'
import {Modal , Text ,View, TouchableOpacity,StyleSheet} from 'react-native'
import { Entypo, FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import {HandleDownload} from '@/hooks/useDownload'
import React from 'react';
import { AddToFavourites } from '@/hooks/useStorage';

export const ImageModal = ({url,ModalVisible,setModalVisible})=>{
 
     
    return (
         <Modal
           visible={ModalVisible}
           animationType="slide"
         >
           <View style={{
             flex: 1,
           }} >
             <View
               style={{
                 width: '100%',
                 flex: 1,
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center'
               }} > 
   
               <Image
                 source={{ uri:url }}
                 style={{
                   flex: 1,
                   height: '100%',
                   position: 'absolute',
                   width: "100%"
                 }} 
               />  
   
               <View
                 style={{
                   display: 'flex',
                   flexDirection: 'row',
                   marginTop: 16,
                   position: 'absolute',
                   bottom: 20,
   
                 }}
               >
                 <TouchableOpacity style={Styles.actionBtn} onPress={() => {
                   setModalVisible(false)
                 }}>
                   <Ionicons name="close" size={28} color={'white'} />
                 </TouchableOpacity >
                 <TouchableOpacity style={Styles.actionBtn} onPress={() => {
                   AddToFavourites(url);
                 }}>
                   <Ionicons name="heart" size={28} color={'white'} />
                 </TouchableOpacity>
                 <TouchableOpacity style={Styles.actionBtn} onPress={() => {
                   HandleDownload(url);
                 }}>
                   <Octicons name="image" size={24} color="white" />
                 </TouchableOpacity>
               </View>
    
             </View>
           </View>
         </Modal>
    )
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
