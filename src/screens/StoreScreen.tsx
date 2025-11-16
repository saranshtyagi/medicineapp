import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchMyOrders} from '../api/apiClient';
import {SafeAreaView} from 'react-native-safe-area-context';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderAddress {
  flatNo: string;
  blockName: string;
  locality: string;
  pincode: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  address: OrderAddress;
  createdAt: string;
  paymentMethod: string;
}

const formatDate = (date: string | Date) => {
  return new Date(date)
    .toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', ' •');
};

const StoreScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery<Order[]>({
    queryKey: ['myOrders'],
    queryFn: fetchMyOrders,
  });

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const statusChipClasses = (status: string) => {
    const key = status.toLowerCase();

    if (key.includes('delivered') || key.includes('completed')) {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    }

    if (key.includes('cancel')) {
      return 'bg-rose-50 text-rose-700 border border-rose-100';
    }

    if (key.includes('pending') || key.includes('processing')) {
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    }

    if (key.includes('shipped') || key.includes('out')) {
      return 'bg-blue-50 text-blue-700 border border-blue-100';
    }

    return 'bg-zinc-100 text-zinc-700 border border-zinc-200';
  };

  const OrderSkeleton = () => (
    <View className="mx-4 my-2 rounded-2xl bg-white border border-zinc-200 shadow-sm">
      <View>
        <View className="flex-row items-center justify-between">
          <View className="h-4 w-32 rounded bg-zinc-200 animate-pulse" />
          <View className="h-6 w-20 rounded-full bg-zinc-200 animate-pulse" />
        </View>
        <View className="mt-3 h-3 w-40 rounded bg-zinc-200 animate-pulse" />
        <View className="mt-2 h-3 w-28 rounded bg-zinc-200 animate-pulse" />
        <View className="mt-2 h-3 w-24 rounded bg-zinc-200 animate-pulse" />
        <View className="mt-4 h-3 w-48 rounded bg-zinc-200 animate-pulse" />
        <View className="mt-1 h-3 w-40 rounded bg-zinc-200 animate-pulse" />
        <View className="mt-1 h-3 w-32 rounded bg-zinc-200 animate-pulse" />
        <View className="mt-4 h-3 w-64 rounded bg-zinc-200 animate-pulse" />
      </View>
      <View className="px-4 pb-4">
        <View className="h-[1px] w-full bg-zinc-200" />
        <View className="mt-3 h-4 w-36 rounded bg-zinc-200 animate-pulse" />
      </View>
    </View>
  );

  const OrderCard = ({order}: {order: Order}) => {
    const itemsCount = useMemo(
      () => order.items.reduce((acc, it) => acc + (it.quantity || 0), 0),
      [order.items],
    );
    return (
      <View className="bg-white rounded-2xl mx-4 my-2 border border-zinc-200 shadow-sm overflow-hidden">
        <View className="p-4 pb-3">
          <View className="flex-row items-center justify-between">
            <Text>Order #{order.id.slice(0, 8)}</Text>
            <View
              className={`px-2.5 py-1 rounded-full ${statusChipClasses(
                order.status,
              )}`}>
              <Text className="text-[11px] font-semibold uppercase">
                {order.status}
              </Text>
            </View>
          </View>
          <View className="mt-2 flex-row items-center">
            <Text className="text-xs text-zinc-500">
              📅 {formatDate(order.createdAt)}
            </Text>
            <Text className="mx-2 text-zinc-300">•</Text>
            <Text className="text-xs text-zinc-500">
              💳 {order.paymentMethod}
            </Text>
            <Text className="mx-2 text-zinc-300">•</Text>
            <Text className="text-xs text-zinc-500">
              🛍️ {itemsCount} item{itemsCount === 1 ? '' : 's'}
            </Text>
          </View>
          <View className="mt-3 h-[1px] bg-zinc-100" />
          <View className="px-4">
            <Text className="text-xs font-semibold text-slate-700 mb-1.5">
              Items
            </Text>
            {order?.items.map((it, idx) => (
              <View
                key={idx}
                className="flex-row items-center justify-between py-1">
                <Text className="text-xs text-zinc-600">
                  {it.quantity} x{' '}
                  <Text className="font-medium">Product {it.productId}</Text>
                </Text>
                <Text className="text-xs font-semibold text-slate-600">
                  {it.price.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View className="px-4 mt-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-slate-700">Total</Text>
              <Text className="text-base font-extrabold text-slate-900">
                ₹{order.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>

          <View className="px-4 mt-3 mb-4">
            <Text className="text-xs font-semibold text-slate-700 mb-1.5">
              Delivery Address
            </Text>
            <Text className="text-xs text-zinc-600">
              {order.address.flatNo}, {order.address.blockName},{' '}
              {order.address.locality} - {order.address.pincode}
            </Text>
          </View>
        </View>
        <View className='border-t border-zinc-200 bg-violet-50 px-4 py-2.5'>
          <Text className='text-[12px] font-bold text-violet-700'>📦 Track & Support →</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-4 pt-2 pb-3">
        <Text className="text-xl font-extrabold text-slate-900">My Orders</Text>
        <Text className="mt-0.5 text-xs text-zinc-500">
          View your recent orders and their status
        </Text>
      </View>

      {isLoading ? (
        <View>
          <OrderSkeleton />
          <OrderSkeleton />
          <OrderSkeleton />
        </View>
      ) : orders && orders.length === 0 ? (
        <View className="flex-1 px-6 items-center justify-center">
          <Text className="text-4xl mb-3">CART ICON</Text>
          <Text className="text-base font-semibold text-slate-800">
            No orders yet
          </Text>
          <Text className="mt-1 text-xs text-zinc-500 text-center">
            You haven't placed any orders yet. Start shopping to see your orders
            here.
          </Text>
          <Pressable className="mt-4 px-4 py-2 rounded-full bg-slate-900">
            <Text className="text-white text-sm font-semibold">
              Start Shopping
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({item}) => <OrderCard order={item} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl control={!!isFetching} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({});
