import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useCartStore} from '../store/useCartStore';
import {useAuthStore} from '../store/useAuthStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAddressStore} from '../store/useAddressStore';
import Ionicons from '@react-native-vector-icons/ionicons';

const SlotChip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className={`px-3 py-2 rounded-lg mr-2 ${
      selected ? 'bg-green-600' : 'bg-white'
    } border ${selected ? 'border-green-600' : 'border-gray-200'}`}>
    <Text
      className={`${selected ? 'text-white' : 'text-gray-800'} font-semibold`}>
      {label}
    </Text>
  </Pressable>
);
const CheckoutScreen = () => {
  const navigation = useNavigation();
  const {items: cartItems, clearCart} = useCartStore();
  const {user} = useAuthStore();
  const {addresses, selectedAddressId, selectAddress, removeAddress} =
    useAddressStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState('ASAP');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Online'>(
    'Online',
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const selectedAddress = useMemo(
    () => addresses.find(a => a.id === selectedAddressId) || addresses[0],
    [addresses, selectedAddressId],
  );
  const slotOptions = [
    'ASAP',
    'Today 6-8 PM',
    'Tomorrow 10-12 AM',
    'Tomorrow 6-8 PM',
  ];
  const cartTotalItems = cartItems?.reduce((sum, it) => sum + it.quantity, 0);
  const cartTotalPrice = cartItems?.reduce(
    (sum, it) => sum + it.price * (it.quantity || 0),
    0,
  );
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View>
        <Text className="text-xl font-extrabold text-center mt-4">
          Checkout
        </Text>
      </View>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
        <Text className="text-gray-700 font-semibold mt-6 mb-3">
          Deliver to
        </Text>
        <View className="bg-white rounded-2xl p-4 shadow">
          <View className="flex-row items-start">
            <View className="w-12 h-12 rounded-md bg-green-50 items-center justify-center mr-3">
              <Ionicons name="home-outline" size={22} color="#16a34a" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-base font-bold">
                    {selectedAddress?.type}
                  </Text>
                  <Text className="text-gray-700 font-medium mt-1">
                    {selectedAddress?.name}
                  </Text>
                </View>
                <Pressable className="px-2 py-1">
                  <Text className="text-purple-600 font-semibold">Change</Text>
                </Pressable>
              </View>
              <Text className="text-gray-500 mt-2">
                {selectedAddress?.flatNo}
              </Text>
              <Text className="text-gray-500">
                {selectedAddress?.blockName}, {selectedAddress.buildingName}
              </Text>
              <Text className="text-gray-500">
                {selectedAddress?.street}, {selectedAddress?.landmark}
              </Text>
              <Text className="text-gray-500">
                {selectedAddress?.locality} - {selectedAddress?.pincode}
              </Text>
              <View className="mt-3 flex-row items-center">
                <Ionicons name="star" size={14} color="#f59e0b" />
                <Text className="text-sm text-gray-500 ml-2">
                  Preferred Delivery address
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text className="text-gray-700 font-semibold mt-6 mb-3">
          Delivery Slot
        </Text>
        <View className="bg-white rounded-2xl p-4 shadow">
          <Text className="text-sm text-gray-500 mb-3">
            Choose when you'd like your order
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row">
            {slotOptions?.map(s => (
              <SlotChip
                key={s}
                label={s}
                selected={deliverySlot == s}
                onPress={() => setDeliverySlot(s)}
              />
            ))}
          </ScrollView>
          <View className="mt-4">
            <Text className="text-sm text-gray-500 mb-2">
              Add note for delivery (optional)
            </Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Leave at door/gate, Call on arrival, etc."
              className="bg-gray-100 rounded-lg px-3 py-2 text-sm"
            />
          </View>
        </View>
        <Text className="text-gray-700 font-semibold mt-6 mb-3">
          Payment Method
        </Text>
        <View className="bg-white rounded-2xl p-4 shadow">
          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => setPaymentMethod('Online')}>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                paymentMethod == 'Online'
                  ? 'border-green-600 bg-green-600'
                  : 'border-gray-400'
              }`}
            />
            <Text className="ml-3 text-gray-800">Pay Online (Razorpay)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setPaymentMethod('COD')}>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                paymentMethod == 'COD'
                  ? 'border-green-600 bg-green-600'
                  : 'border-gray-400'
              }`}
            />
            <Text className="ml-3 text-gray-800">Cash On Delivery</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-gray-700 font-semibold mt-6 mb-3">
          Order Summary
        </Text>
        <View className="bg-white rounded-2xl p-4 shadow">
          {cartItems?.length === 0 ? (
            <View>
              <Text>No items in cart</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={it => it.id}
                renderItem={({item}) => (
                  <View className="flex-row items-center py-3 border-b border-gray-100">
                    <Image
                      source={{
                        uri: item?.imageUrl || 'https://via.placeholder.com/80',
                      }}
                      className="w-16 h-16 rounded-md mr-3"
                    />
                    <View className="flex-1">
                      <Text className="font-semibold" numberOfLines={2}>
                        {item?.name}
                      </Text>
                      <Text className="text-sm text-gray-500 mt-1">
                        {item.quantity} x ₹{item.price}
                      </Text>
                    </View>
                    <Text className="font-semibold">
                      ₹{(item.price * (item.quantity || 1)).toFixed(0)}
                    </Text>
                  </View>
                )}
              />
              <View className="mt-4">
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Sub Total</Text>
                  <Text className="font-semibold">
                    ₹{cartTotalPrice.toFixed(0)}
                  </Text>
                </View>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-gray-600">Delivery Fee</Text>
                  <Text className="font-semibold">Free</Text>
                </View>
                <View className="flex-row justify-between mt-3 border-t border-gray-100 pt-3">
                  <Text className="text-gray-800 font-bold">Total</Text>
                  <Text className="font-semibold">
                    ₹{cartTotalPrice.toFixed(0)}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <View className='absolute left-4 right-4 bottom-6'>
        <Pressable className={`bg-green-600 rounded-2xl py-4 flex-row justify-between items-center px-5 shadow-lg ${isProcessing ? 'opacity-50' : ''}`}>
          <View>
            <Text className='text-white font-semibold'>Proceed to Payment</Text>
            <Text className='text-white text-sm opacity-90'>
              {cartTotalItems} items{cartTotalItems !== 1 ? 's' : ''} ·{' '}
              {cartTotalPrice.toFixed(0)}
            </Text>
          </View>
          <View className='bg-white px-4 py-2 rounded-lg'>
            <Text>{isProcessing ? "Processing" : "CONTINUE"}</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
