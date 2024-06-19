import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Dimensions, Platform, View } from 'react-native'; 
import { AntDesign, Entypo, FontAwesome, Ionicons, Octicons } from '@expo/vector-icons'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get("window")
  return (
    <Tabs

      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // width: width/2,
          // height: 80,
          // background: Colors[colorScheme].background,
          // position: 'absolute',
          // left: 0,
          // right: 0,
          // marginLeft: 'auto',
          // marginRight: 'auto',
          // transform: [{ translateX: Platform.OS !== "web" ? width / 4 : 0 }],
          // borderRadius: 10,
          // bottom: 20
          shadowColor:"none",
          shadowRadius:0,
          elevation:0,
          borderColor:'white',

          shadowOpacity:0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <>
          <Octicons name={"home"} size={22} color={color} />
       {  focused&& <View style={{backgroundColor:'red',padding:2,borderRadius:2}}></View>}

          </>

          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, focused }) => (
            <>
          <Octicons name={"heart"} size={22} color={color} />
       {  focused&& <View style={{backgroundColor:'red',padding:2,borderRadius:2}}></View>}

          </>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <>
            <Octicons name={"apps"} size={22} color={color} />
         {  focused&& <View style={{backgroundColor:'red',
         padding:2,borderRadius:2}}></View>}
  
            </>
          ),
        }}
      />
    </Tabs>
  );
}
