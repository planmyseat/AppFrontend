import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useTheme } from "@/context/Theme";
import { createStyle } from "@/styles/auth/loginStyles";
import { useRouter } from "expo-router";
import useSignup from "@/hooks/auth/useSignup";

type props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Signup = ({ setIsLogin }: props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { signup, loading, error } = useSignup();

  const { isDark } = useTheme();
  const styles = createStyle(isDark);
  const router = useRouter();

  const handleSignup = async () => {
    console.log("Signup Data:", {
      name,
      email,
      password,
      confirmPassword,
    });

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
        
        const success = await signup(name, email, password);
        if (success) {
            router.push({
                pathname: "/auth/verifyOtp",
                params: { email },
            });
        } else {
            alert("Signup failed. Please try again.");
        }

    } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred during signup. Please try again.");
    }

  };

  return (
    <View style={styles.container}>
      {/* Heading Section */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Please sign in to your account</Text>
      {error && (
        <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
          {error}
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#8f9095"
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#8f9095"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Signup"}</Text>
      </TouchableOpacity>

      <View style={styles.signup}>
        <Text style={styles.signupText}>Already have an account ?</Text>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text style={styles.signupLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
