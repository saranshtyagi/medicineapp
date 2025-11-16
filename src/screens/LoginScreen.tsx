import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthRoutes, AuthStackParamList} from '../navigation/Routes';
import {useAuthStore} from '../store/useAuthStore';
import {googleLogin, login} from '../api/apiClient';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:"1035962711654-phu6j7v8h4roqt4trhcok9u56sllimsc.apps.googleusercontent.com", 
  iosClientId:"",
  androidClientId:"1035962711654-bn76ptkj9a7jupuh6gee23udrod1ktbi.apps.googleusercontent.com",
  scopes: ['profile', 'email'],
})

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {email: '', password: ''},
  });
  const {setAuth} = useAuthStore();

  const onSubmit = async (data: FormData) => {
    try {
      const {user, token} = await login(data);
      setAuth(user, token);
    } catch (error) {
      console.error('Login Error', error);
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data && userInfo.data.idToken) {
        const {user, token} = await googleLogin(userInfo?.data?.idToken);
        setAuth(user, token);
      } else {
        throw new Error('No idToken received');
      }
    } catch (error: any) {
      console.error('Google Sign-In error:', error, 'Code:', error.code);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Google sign-in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Error', 'Google sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services is not available');
      } else {
        Alert.alert('Error', `Google sign-in failed: ${error.message}`);
      }
    }
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  return (
    <View className="flex-1 bg-white p-4 justify-center">
      <Text className="text-2xl font-bold text-center text-green-600">
        Get Started
      </Text>
      <Text className="text-center text-gray-600 mt-2">
        Enter your details to order medicines
      </Text>
      <Text className="text-sm font-medium mt-6">Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{required: true}}
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
      <Text className="text-sm font-medium mt-6">Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{required: true}}
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
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-green-600 p-3 rounded-full mt-6">
        <Text className="text-white text-center font-bold">CONTINUE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleGoogleSignIn}
        className="bg-white border border-gray-300 p-3 rounded-full mt-4 flex-row justify-center items-center">
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg',
          }}
          className="w-5 h-5 mr-2"
        />
        <Text className="text-gray-800 font-bold">Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(AuthRoutes.SignUp)}
        className="mt-4">
        <Text className="text-center text-blue-600">
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
