import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootRoutes } from '../Routes';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { useAuthStore } from '../../store/useAuthStore';
import Ionicons from '@react-native-vector-icons/ionicons';

const Stack = createNativeStackNavigator();

const SplashScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-green-700 justify-center items-center'>
      <Image />
      <View className='mt-10 pb-8 items-center'>
        <View className='flex-row items-center gap-2'>
          <Ionicons name='medkit-outline' size={26} color="#7c3aed" />
          <Text className='text-2xl font-extrabold text-white'>Bringing the Pharmacy to You</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const RootNavigator = () => {
    const {isAuthenticated, token} = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useAuthStore.persist.onFinishHydration(() => {
      console.log('Auth state rehydrated', {isAuthenticated, token}); 
      setIsLoading(false);
    }); 

    if(isLoading) {
      return <SplashScreen />
    }

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        {isAuthenticated ? (
            <Stack.Screen name={RootRoutes.MainTabs} component={MainNavigator} />
        ) : (
            <Stack.Screen name={RootRoutes.AuthStack} component={AuthNavigator} />
        )}
    </Stack.Navigator>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})