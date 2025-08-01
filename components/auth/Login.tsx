import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { useTheme } from '@/context/Theme';
import { createStyle } from '@/styles/auth/loginStyles';

type props = {
    setIsLogin: Dispatch<SetStateAction<boolean>>
}

const Login = ({setIsLogin}: props) => {

    const {isDark} = useTheme()
    const styles = createStyle(isDark)

    return (
        <View style={styles.container}>
            {/* Heading Section */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Please sign in to your account</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#8f9095"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#8f9095"
                secureTextEntry
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgot}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.signup}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={()=> setIsLogin(false)}>
                    <Text style={styles.signupLink}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;