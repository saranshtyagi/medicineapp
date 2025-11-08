import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';
import Ionicons from '@react-native-vector-icons/ionicons';

type ProfileItem = {
  icon?:string; 
  title?:string; 
  subtitle?:string; 
  divider?:boolean;
}

const profileItems: ProfileItem[] = [
  { icon: 'gift-outline', title: 'Earn Rewards', subtitle: 'Invite friends and earn rewards' }, 
  { icon: 'call-outline', 'title': 'Contact Us', subtitle: 'Help regarding your recent purchase' },
  { divider: true}, 
  { icon: 'help-circle-outline', title: 'FAQs', subtitle: 'Frequently Asked Questions' }, 
  { icon: 'document-text-outline', title: 'Terms & Conditions' },
  { icon: 'shield-checkmark-outline', title: 'Privacy Policy' },
  { icon: 'information-circle-outline', title: 'Seller Information' }, 
  { icon: 'log-in-outline' , title: 'Login' },
  { icon: 'earth-outline', title: 'Change Language' },
]

const ProfileScreen = () => {
  const insets = useSafeAreaInsets(); 
  const navigation = useNavigation(); 
  const {isAuthenticated, user, logout} = useAuthStore();
  const maskedPhone = user?.phone ? `${user?.phone?.slice(0,3)} XXXX${user.phone.slice(-5)}` : '';
  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} className='px-4' contentContainerStyle={{paddingBottom:Math.max(insets.bottom, 24)}}>
        <View className='pt-4 pb-2'>
          <Text className='text-2xl font-extrabold text-gray-900 mt-2'>{isAuthenticated ? `Hi, ${user?.name || user?.email}` : "Hi, Guest"}</Text>
          {!isAuthenticated ? (
            <View className='flex-row items-center mt-1'>
              <Text className='text-sm text-gray-500'>Please</Text>
              <Pressable className='mx-1'>
                <Text></Text>
              </Pressable>
              <Text className='text-sm text-gray-500'>to enjoy your shopping</Text>
            </View>
          ) : (
            <View className='mt-1'>
              <Text className='text-sm text-gray-600'>{user?.email}</Text>
              <Text className='text-sm text-gray-600 mt-1'>{maskedPhone}</Text>
              <Pressable onPress={() => logout()}>
                <Text className='text-sm text-red-600 font-semibold'>Logout</Text>
              </Pressable>
            </View>
          )}
        </View>
        <View>
          {profileItems.map((item, idx) =>
          item?.divider ? (
            <View key={idx} className='h-px bg-gray-200 my-2 mx-1' />
          ) : ( 
            <Pressable className='flex-row items-center py-3' key={idx}>
              <View className='w-11 h-11 rounded-lg bg-gray-100 items-center justify-center mr-3'>
                <Ionicons name={item?.icon as any} size={18} color="#4b5563" />
              </View>
              <View className='flex-1'>
                <Text className='text-base font-semibold text-gray-900'>{item?.title}</Text>
                {item?.subtitle && <Text className='text-sm text-gray-500 mt-1'>{item?.subtitle}</Text>}
              </View>
              <Ionicons name='chevron-forward' size={20} color='#9ca3af' />
            </Pressable>
          ))}
        </View>
        <View className='mt-10 pb-8 items-center'>
          <View className='flex-row items-center'>
            <Ionicons name='medkit-outline' size={26} color="#7c3aed" />
            <Text className='text-2xl font-extrabold text-purple-600 ml-2'>Medicines</Text>
            <Text className='text-2xl font-extrabold text-green-600 ml-1'>to your</Text>
            <Text className='text-2xl font-extrabold text-purple-600 ml-1'>home</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})