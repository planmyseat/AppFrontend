import { useTheme } from "@/context/Theme";
import { createStyle } from "@/styles/auth/authStyles";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const { isDark } = useTheme();
  const styles = createStyle(isDark);
  const router = useRouter();

  return (
    <ImageBackground
      source={
        isDark
          ? require("../../assets/auth/darkAuthBackground.png")
          : require("../../assets/auth/authBackground.png")
      }
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* welcome text */}
        <View style={styles.topSection}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Let’s sign you in</Text>
        </View>

        {/* buttons */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
              router.push({ pathname: "/auth/auth", params: { mode: "login" } })
            }
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              router.push({
                pathname: "/auth/auth",
                params: { mode: "signup" },
              });
            }}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
