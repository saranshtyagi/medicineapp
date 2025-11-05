import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export default function CategoryCard({
  name,
  image,
  onPress,
}: {
  name: string;
  image?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="mr-3">
      <View className="bg-[#f1f1f1] w-28 h-28 rounded-2xl items-center justify-center p-2 shadow">
        <Image
          source={{uri: image}}
          resizeMode="cover"
          className="w-20 h-20 rounded-full"
        />
      </View>
      <Text className="text-center text-sm font-semibold mt-2 w-28">
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
