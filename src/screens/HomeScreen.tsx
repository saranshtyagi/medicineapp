import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BannerCarousel from '../components/BannerCarousel';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg Tablets',
      price: 49,
      imageUrl:
        'https://assets.sayacare.in/api/images/product_image/large_image/23/74/Paracetamol-500-mg-Tablet_1.webp',
    },
    {
      id: 2,
      name: 'Dettol Antiseptic Liquid 250ml',
      price: 89,
      imageUrl:
        'https://5.imimg.com/data5/SELLER/Default/2021/4/WX/AP/CZ/125646623/125ml-dettol-antiseptic-liquid-500x500.jpg',
    },
    {
      id: 3,
      name: 'Vicks Vaporub 25ml',
      price: 75,
      imageUrl: 'https://m.media-amazon.com/images/I/71bBjtfhfVL.jpg',
    },
    {
      id: 4,
      name: 'Cofsils Cough Drops (Pack of 10)',
      price: 35,
      imageUrl:
        'https://images.apollo247.in/pub/media/catalog/product/C/O/COF0137_1_1.jpg?tr=q-80,f-webp,w-400,dpr-3,c-at_max%20400w',
    },
  ];

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-green-700">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="#15803d"
        translucent={false}
      />
      <View className="bg-green-700">
        <Header />
        <View className="px-4 pb-4">
          <SearchBar value={query} onChange={setQuery} />
        </View>
      </View>
      <ScrollView className="flex-1 bg-white rounded-t-3xl">
        <View className="pb-10">
          <View className="pt-4">
            <BannerCarousel />
          </View>
          {/* Categories */}
          {/* <View>

            </View> */}
          <View className="px-4 mt-3">
            <View className="flex-row items-center mt-3 justify-between">
              <Text className="text-xl font-bold">Flash Sale</Text>
              <Text className="text-purple-600">View All</Text>
            </View>
          </View>
          <View className="px-4 mt-3">
            <View className="flex-row items-center mt-3 justify-between">
              <Text className="text-xl font-bold">Frequently Purchased</Text>
              <Text className="text-purple-600">View All</Text>
            </View>
          </View>
          <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      className="mt-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {products.map((p) => (
        <View
          key={p.id}
          className="w-64 mr-4 rounded-2xl bg-white border border-gray-300 shadow-sm overflow-hidden"
        >
          <View className="h-40">
            <Image
              source={{ uri: p.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="p-3">
            <Text className="text-lg font-semibold text-gray-800">{p.name}</Text>
            <Text className="text-base text-green-600 mt-1">₹{p.price}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
