import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import React, {memo, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {CartItem, useCartStore} from '../store/useCartStore';

const screenW = Dimensions.get('window').width;
const GAP = 16;
const PRODUCT_CARD_WIDTH = (screenW - GAP * 3) / 2;

type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
  unit?: string;
  etaText?: string;
  mrp?: string;
};

type Props = {
  item: Product;
};

function ProductCardBase({item}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();
  };

  const displayUnit = '1 pack';
  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 6,
    }).start();
  const onpressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();

  const quantity = useCartStore(
    (s: any) =>
      s.items.find((ci: CartItem) => ci.id == item?.id)?.quantity || 0,
  );

  const addItem = useCartStore((s: any) => s.addItem);
  const updateQuantity = useCartStore((s: any) => s.updateQuantity);

  const handleAdd = () => addItem(item);
  const handleIncrement = () => updateQuantity(item.id, 1);
  const handleDecrement = () => updateQuantity(item.id, -1);

  return (
    <Animated.View style={{transform: [{scale}], width: PRODUCT_CARD_WIDTH}}>
      <Pressable
        className="mb-4 rounded-xl overflow-hidden bg-white shadow-md android:elevation-2"
        onPressIn={onPressIn}
        onPressOut={onpressOut}
        onPress={() => {}}>
        <View className="h-36 bg-gray-100 dark:bg-zinc-900 relative rounded-xll overflow-hidden">
          <Image
            source={{uri: item?.imageUrl}}
            resizeMode="cover"
            className="w-full h-full"
          />
          <View className="absolute left-2 bottom-2 px-2 py-1 rounded-full border border-gray-200 bg-white">
            <Text
              numberOfLines={1}
              className="text-[11px] font-semibold text-gray-600">
              {displayUnit}
            </Text>
          </View>
          <Pressable
            onPress={() => {}}
            hitSlop={10}
            className="absolute right-2 top-2 px-2 py-1 rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <Text className="text-sm">♡</Text>
          </Pressable>
        </View>
        <View className="px-4 py-3">
          <View className="h-[40px]">
            <Text
              className="font-semibold text-[14px] leading-5 text-slate-900"
              numberOfLines={2}>
              {item?.name}
            </Text>
          </View>
          <View className="mt-1 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-[16px] font-extrabold text-slate-900 dark:text-zinc-100">
                ₹{Number(item.price).toFixed(0)}
              </Text>
            </View>
            {quantity > 0 ? (
              <View className='w-[96px] h-[34px] px-2 py-1.5 rounded-full border border-emerald-100 bg-emerald-50 dark:bg-emerald-100/10 dark:border-emerald-200/10 flex-row items-center justify-between'>
                <Pressable
                  onPress={handleDecrement}
                  hitSlop={8}
                  className="min-w-[28px] items-center">
                  <Text>-</Text>
                </Pressable>
                <Text className="text-[13px] font-extrabold text-emerald-700 dark:text-emerald-400">
                  {quantity}
                </Text>
                <Pressable
                  onPress={handleIncrement}
                  hitSlop={8}
                  className="min-w-[28px] items-center">
                  <Text className="text-[18px] font-black text-emerald-600 dark:text-emerald-400">
                    +
                  </Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={handleAdd}
                className="w-[96px] h-[34px] px-2 py-1.5 rounded-full border border-emerald-100 items-center justify-center">
                <Text className="text-[12px] font-extrabold tracking-[0.5px] text-emerald-600">
                  ADD
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        <View className="borde-t border-gray-200 items-center justify-between bg-violet-50 py-2">
          <Text
            numberOfLines={1}
            className="text-[12px] font-bold tracing-tight text-violet-700">
            ⚡ GET IN 16 Mins
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default memo(ProductCardBase);

const styles = StyleSheet.create({});
