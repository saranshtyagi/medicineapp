import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export default function SearchBar({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <View className='bg-white rounded-full h-12 flex-row items-center px-4 shadow'>
      <FontAwesome name="search" size={16} color="#9CA3AF" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search Medicines"
        placeholderTextColor="#9CA3AF"
        className="ml-3 flex-1 text-base"
      />
    </View>
  );
}
