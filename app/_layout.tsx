// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
// import 'react-native-reanimated'; 
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    poppinsreg: require('../assets/fonts/Poppins-Regular.ttf'),
    poppinsbold: require('../assets/fonts/Poppins-SemiBold.ttf'),

  });



  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
    </Stack>
  );
}
