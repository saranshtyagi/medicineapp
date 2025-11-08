import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthRoutes, AuthStackParamList} from '../navigation/Routes';
import {Controller, useForm} from 'react-hook-form';
import { signUp } from '../api/apiClient';
import { useAuthStore } from '../store/useAuthStore';

type FormData = {
  email: string;
  password: string;
  phone: string;
};

const SignUpScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {email: '', password: '', phone: ''},
  });

  const {setAuth} = useAuthStore();

  const onSubmit = async(data: FormData) => {
    console.log('Submitting signup:', data); 
    try {
      const {user, token} = await signUp(data); 
      console.log('Signup successful:', user, token);
      setAuth(user, token);
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert(
        'Error', 
        error?.response?.data?.error || 'Signup failed. Please check your details and try again.'
      )
    }
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
      }}>
      <Text className="text-2xl font-bold text-center text-green-600">
        Sign Up
      </Text>
      <Text className="text-sm font-medium mt-6">Email</Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address'},
        }}
        render={({field: {value, onChange, onBlur}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter Email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            className="border-b border-gray-300 py-2"
          />
        )}
      />
      {errors?.email && (
        <Text className="text-red-500 mt-2">{errors?.email?.message}</Text>
      )}

      <Text className="text-sm font-medium mt-6">Password</Text>

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        }}
        render={({field: {value, onChange, onBlur}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            className="border-b border-gray-300 py-2 text-black"
          />
        )}
      />
      {errors?.password && (
        <Text className="text-red-500 mt-2">{errors?.password?.message}</Text>
      )}

      <Text className="text-sm font-medium mt-6">Phone Number</Text>

      <Controller
        control={control}
        name="phone"
        rules={{
          required: 'Phone Number is required',
        }}
        render={({field: {value, onChange, onBlur}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter Phone Number"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="phone-pad"
            className="border-b border-gray-300 py-2"
          />
        )}
      />
      {errors?.phone && (
        <Text className="text-red-500 mt-2">{errors?.phone?.message}</Text>
      )}
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-green-600 p-3 rounded-full mt-6">
        <Text className="text-white text-center font-bold">Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mt-4">
        <Text className="text-center text-blue-600">
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
