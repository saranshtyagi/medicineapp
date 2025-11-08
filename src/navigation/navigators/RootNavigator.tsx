import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootRoutes } from '../Routes';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { useAuthStore } from '../../store/useAuthStore';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const {isAuthenticated} = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useAuthStore.persist.onFinishHydration(() => {
      console.log('Auth state rehydrated', {isAuthenticated, token}); 
      setIsLoading(false);
    })
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