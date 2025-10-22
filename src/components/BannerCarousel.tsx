import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';


const BannerCarousel = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4 pt-4">
      <View className="mr-3">
        <Image
          source={require('../assets/medicine1.png')}
          className="w-80 h-44 rounded-xl"
          resizeMode="cover"
        />
      </View>
      <View className="mr-3">
        <Image
          source={require('../assets/medicine2.png')}
          className="w-80 h-44 rounded-xl"
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({});
