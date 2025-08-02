import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { useTheme } from '@/context/Theme';
import { createStyle } from '@/styles/auth/loginStyles';
import useLogin from '@/hooks/auth/useLogin';
import { useRouter } from 'expo-router';

type Props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setIsLogin }: Props) => {
  const { isDark } = useTheme();
  const styles = createStyle(isDark);
  const { Login: loginUser, loading, error } = useLogin();
    const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const {verified,success} = await loginUser(email, password);
        
      if(success){
        if (verified) {
          alert('Login successful!');
          router.push('/home/student'); 
        } else {
          alert('Please verify your email before logging in.');
          router.push({
            pathname: '/auth/verifyOtp',
            params: { email },
          });
        }

      }
       
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Please sign in to your account</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8f9095"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8f9095"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgot} onPress={() => router.push('/auth/forgotPassword')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signup}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text style={styles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
