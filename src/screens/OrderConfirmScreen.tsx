import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

const OrderConfirmScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const {order} = route?.params;
  return (
    <View className="flex-1 bg-white items-center justify-center p-4">
      <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-4">
        <Ionicons name="checkmark-circle" size={48} color="#16a34a" />
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Order Placed!
      </Text>
      <Text className="text-sm text-gray-500 text-center mb-6">
        Your order #{order.id} has been placed successfully
      </Text>
      <View className="w-full bg-gray-50 rounded-lg p-4 mb-6">
        <Text className="font-semibold mb-2">Order Details</Text>
        <Text className="text-sm text-gray-600">
          Total: {order?.totalAmount.toFixed(0)}
        </Text>
        <Text className="text-sm text-gray-600">
          Items: {order?.items.length}
        </Text>
        <Text className="text-sm text-gray-600">Status: {order?.status}</Text>
        <Text className="text-sm text-gray-600">
          Payment: {order?.paymentMethod}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'MainTabs'}],
          })
        }
        className="bg-green-600 py-3 px-6 rounded-full">
        <Text className="text-white font-semibold">Continue Shopping</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4">
        <Text className="text-green-600 font-semibold">View Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderConfirmScreen;

const styles = StyleSheet.create({});
