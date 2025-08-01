import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/context/Theme';
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';
import { useLocalSearchParams } from 'expo-router';
import ThemeToggler from '@/components/layout/ThemeToggler';
import { createtyle } from '@/styles/auth/authScreenStyles';

const Auth = () => {

    const { isDark } = useTheme()
    const styles = createtyle(isDark)
    const {mode} = useLocalSearchParams()
    const [islogin, setIsLogin] = useState(mode == "login")

    return (
        <View style={styles.container}>
            <View style={{position: "absolute", top: 25, right: 20, zIndex: 20}}>
                <ThemeToggler />
            </View>
            <Image
                source={isDark ? require('@/assets/auth/darkLoginBackground.png') : require('@/assets/auth/loginBackground.png')}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={{ position: "relative", height: "100%" }}>
                <View style={styles.bottomSheet}>
                    {islogin ? <Login setIsLogin={setIsLogin} /> : <Signup />}
                </View>
            </View>
        </View>
    );
};

export default Auth;