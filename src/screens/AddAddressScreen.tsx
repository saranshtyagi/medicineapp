import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { useAddressStore } from '../store/useAddressStore';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const {addAddress} = useAddressStore();

  const [type, setType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [name, setName] = useState('John Doe');
  const [mobile, setMobile] = useState('+91 9238928922');
  const [flatNo, setFlatNo] = useState('Flat No');
  const [blockName, setBlockName] = useState('Block Name');
  const [buildingName, setBuildingName] = useState('Building Name');
  const [street, setStreet] = useState('Street');
  const [landmark, setLandmark] = useState('Landmark');
  const [pincode, setPincode] = useState('201307');
  const [locality, setLocality] = useState('Noida');

  const handleSave = () => {
    addAddress({
      type,
      name,
      mobile,
      flatNo,
      blockName,
      buildingName,
      street,
      landmark,
      pincode,
      locality,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="text-lg font-bold mb-4 mt-10">New Address</Text>

        <Text className="text-sm text-gray-500 mb-1">NAME</Text>
        <TextInput
          className="border-b border-gray-300 py-2 mb-4"
          value={name}
          onChangeText={setName}
        />
        <Text className="text-sm text-gray-500 mb-1">MOBILE NUMBER</Text>

        <View className="flex-row items-center border-b border-gray-300 py-2 mb-4">
          <Image
            source={{uri: 'https://flagcdn.com/in.svg'}}
            className="w-6 h-4 mr-2"
          />

          <Text className="mr-2">+91</Text>

          <TextInput
            className="flex-1"
            keyboardType="numeric"
            value={mobile.replace('+91 ', '')}
            onChangeText={text => {
              setMobile(`+91 ${text}`);
            }}
            maxLength={10}
            placeholder="Enter mobile number"
          />
        </View>
        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-sm text-gray-500 mb-1">HOUSE/FLAT NO</Text>
            <TextInput
              value={flatNo}
              onChangeText={setFlatNo}
              className="border-b border-gray-300 py-2"
            />
          </View>

          <View className="flex-1 mr-2">
            <Text className="text-sm text-gray-500 mb-1">
              BLOCK NAME (OPTIONAL)
            </Text>
            <TextInput
              value={blockName}
              onChangeText={setBlockName}
              className="border-b border-gray-300 py-2"
            />
          </View>
        </View>
        <Text className="text-sm text-gray-500 mb-1">BUILDING NAME</Text>
        <TextInput
          className="border-b border-gray-300 py-2 mb-4"
          value={buildingName}
          onChangeText={setBuildingName}
        />
        <Text className="text-sm text-gray-500 mb-1">STREET</Text>
        <TextInput
          className="border-b border-gray-300 py-2 mb-4"
          value={street}
          onChangeText={setStreet}
        />
        <Text className="text-sm text-gray-500 mb-1">LANDMARK</Text>
        <TextInput
          className="border-b border-gray-300 py-2 mb-4"
          value={landmark}
          onChangeText={setLandmark}
        />
        <Text className="text-sm text-gray-500 mb-1">PINCODE</Text>
        <TextInput
          className="border-b border-gray-300 py-2 mb-4"
          value={pincode}
          onChangeText={setPincode}
        />
        <Text className="text-sm text-gray-500 mb-1">LOCALITY</Text>
        <TextInput
          className="border-b border-gray-300 py-2 mb-4"
          value={locality}
          onChangeText={setLocality}
        />
        <Text className="text-sm text-gray-500 mb-2">SAVE AS</Text>
        <View className="flex-row mb-6">
          <Pressable
            className={`px-4 py-2 rounded-full mr-2 ${
              type === 'Home' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onPress={() => setType('Home')}>
            <Text
              className={`${
                type === 'Home' ? 'text-white' : 'text-gray-700'
              } font-semibold`}>
              Home
            </Text>
          </Pressable>
          <Pressable
            className={`px-4 py-2 rounded-full mr-2 ${
              type === 'Work' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onPress={() => setType('Work')}>
            <Text
              className={`${
                type === 'Work' ? 'text-white' : 'text-gray-700'
              } font-semibold`}>
              Work
            </Text>
          </Pressable>
          <Pressable
            className={`px-4 py-2 rounded-full ${
              type === 'Other' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onPress={() => setType('Other')}>
            <Text
              className={`${
                type === 'Other' ? 'text-white' : 'text-gray-700'
              } font-semibold`}>
              Other
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <Pressable onPress={handleSave} className="bg-green-600 py-4">
        <Text className="text-white font-bold text-center">SAVE ADDRESS</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
