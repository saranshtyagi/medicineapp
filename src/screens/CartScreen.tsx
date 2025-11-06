import {StyleSheet, Text, View, Pressable, Image, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/Routes';
import {CartItem, useCartStore} from '../store/useCartStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

const CartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const items = useCartStore(s => s.items);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const removeItem = useCartStore(s => s.removeItem);
  const addItem = useCartStore(s => s.addItem);

  const exclusiveDeals = [
    {
        id: 'deal1', 
        title: '2 Pack Condoms @ 299',
        price: 299,
        image: 'https://onemg.gumlet.io/l_watermark_346,w_150,h_150/w_150,c_fit,q_auto,f_auto,h_150/51244dd6f95f454990cc69ab2217ea93.jpg', 
        badge: '56% OFF'
    }, {
        id: 'deal2',
        title: 'Vitamin C 1000mg Tablets',
        price: 199,
        image: 'https://onemg.gumlet.io/l_watermark_346,w_150,h_150/q_auto,f_auto,w_150,c_fit,h_150/pharmacy-production-rxs%2F1738667483_crop_38.png',
        badge: '30% OFF'
    }
  ]

  const renderDeal = (d:typeof exclusiveDeals[0]) => {
    const quantity = items?.find((i:any) => i.id == d.id)?.quantity || 0;
    return (
        <View key={d.id} className='bg-white rounded-lg p-3 w-48 mr-4 shadow-sm flex-col justify-between'>
            <Text className='bg-pink-500 text-white px-2 py-1 rounded-full mb-2 text-xs font-bold self-start'>{d.badge}</Text>
            <Image source={{uri:d.image}} className='h-28 w-full rounded-md mb-2' />
            <Text className='text-sm font-semibold mb-1' numberOfLines={2}>{d.title}</Text>
            <Text className='text-lg font-extrabold mb-2'>₹{d.price}</Text>
            {quantity > 0 ? (
                <View className='flex-row items-center border border-gray-200 rounded-lg px-3 py-1 justify-between w-full'>
                    <Pressable onPress={() => updateQuantity(d.id, -1)}>
                        <Text>-</Text>
                    </Pressable>
                    <Text className='text-base font-semibold'>{quantity}</Text>
                    <Pressable onPress={() => updateQuantity(d.id, 1)}>
                        <Text className='text-lg font-bold text-green-600'>+</Text>
                    </Pressable>
                </View>
            ): (
                <Pressable onPress={() => addItem({id:d.id, name:d.title, price:d.price,imageUrl:d.image})} className='bg-green-600 py-2 rounded-md items-center'>
                    <Text className='text-white font-bold'>Add to Cart</Text>
                </Pressable>
            )}
        </View>
    )
  }

  const renderItem = ({item}: {item: CartItem}) => (
    <View className='bg-white rounded-xl p-4 mb-4 flex-row shadow-sm'>
      <View className='flex-1 pr-3'> 
        <Text className="text-base font-semibold">{item?.name}</Text>
        <Text className="text-lg font-extrabold">
          {item?.price * (item.quantity || 1)}
        </Text>
        <Text className="text-sm text-gray-500">1 Pack</Text>

        <View className="flex-row items-center mt-2">
          <Ionicons name="bicycle" size={16} color="#6B7280" />
          <Text>Today in 16 minutes</Text>
        </View>
        <Pressable
          className="flex-row items-center mt-2"
          onPress={() => removeItem(item?.id)}>
          <Ionicons name="trash-outline" size={16} color="#6B7280" />
          <Text className="text-sm text-gray-500 ml-2">Remove</Text>
        </Pressable>
      </View>
      <View className='items-center w-28'>
        <Image source={{uri:item?.imageUrl}} className='w-24 h-24 rounded-lg mb-3' />
        <View className='flex-row items-center border border-green-200 rounded-lg px-3 py-1 justify-between w-full'>
            <Pressable onPress={() => updateQuantity(item.id, -1)}>
                <Text className='text-lg font-bold text-green-600'>-</Text>
            </Pressable>
            <Text className='text-base font-semibold'>{item?.quantity}</Text>
            <Pressable onPress={() => updateQuantity(item.id, 1)}>
                <Text className='text-lg font-bold text-green-600'>+</Text>
            </Pressable>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Text className="text-xl font-bold text-center py-4">Your Cart</Text>
      <View className="bg-purple-50 border border-purple-300 border-dashed rounded-lg mx-4 p-3 mb-4">
        <Text>Get 2 Pack Condoms @ 299 | Use Code: 299P (TCA)</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        className="px-4"
        ListFooterComponent={
            <View className='mt-6'>
                <Text className='text-lg font-bold mb-4'>Exclusive Offers for you</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='pb-6'>
                    {exclusiveDeals?.map(renderDeal)}
                </ScrollView>
            </View>
        }
      />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
