import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {fetchCategories} from '../api/apiClient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProductCard from '../components/ProductCard';

type Route = {
  params: {categoryName?: string};
};

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const initialCategoryName = route.params?.categoryName;

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const [selectedCategoryName, setSelectedCategoryName] = useState(
    initialCategoryName || categories?.[0]?.name,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCategory = categories?.find(
    (c: any) => c.name === selectedCategoryName,
  );
  const products = selectedCategory?.products || [];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="px-4 pt-3 pb-2 bg-white">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-between">
            <Pressable className="p-2" onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color="#000" />
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(true)}
              className="flex-row items-center gap-1">
              <Text>{selectedCategoryName}</Text>
              <Ionicons name="chevron-down-outline" size={18} color="#000" />
            </Pressable>
          </View>
          <Pressable>
            <Ionicons name="search-outline" size={22} color="#000" />
          </Pressable>
        </View>
      </View>
      <View className="flex-1 px-4 mt-4">
        <FlatList
          data={products}
          keyExtractor={i => i.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ProductCard item={item} />}
          // contentContainerStyle = {{ paddingBottom: totalItems > 0 ? 80 : 0}}
          ListEmptyComponent={
            <Text className="text-gray-500 text-center">
              No products in this category
            </Text>
          }
        />
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-center p-6">
          <View className="bg-white rounded-2xl max-h-[70%] p-4">
            <Text className="text-lg font-bold mb-3">Categories</Text>
            <ScrollView>
              {categories?.map((cat: any) => (
                <Pressable key={cat.id}>
                  <Text
                    className={`text-base ${
                      selectedCategoryName == cat.name
                        ? 'font-bold'
                        : 'font-normal'
                    }`}>
                    {cat?.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
