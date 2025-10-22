import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainRoutes} from '../Routes';
import HomeScreen from '../../screens/HomeScreen';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import StoreScreen from '../../screens/StoreScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor:"#1E88E5", 
        headerShown: false
    }}>
      <Tab.Screen
        name={MainRoutes.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}: {color: string}) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoutes.Store}
        component={StoreScreen}
        options={{
          tabBarIcon: ({color}: {color: string}) => (
            <FontAwesome name="shopping-cart" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
