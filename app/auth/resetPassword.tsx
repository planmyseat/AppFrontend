import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
    Image,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useResetPassword from "@/hooks/auth/useResetPassword";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {resetPassword,loading,error} = useResetPassword();

  const router = useRouter();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    try {
      const success = await resetPassword(password);
      if (success) {
        Alert.alert("Success", "Password reset successfully!");
        router.push("/home/block"); 
      } else {
        Alert.alert("Error", "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      Alert.alert("Error", "An error occurred while resetting the password.");
    }

  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >

        <Image
          source={require("../../assets/auth/otpImage.jpg")} 
            style={{ width: 200, height: 200, alignSelf: "center", marginBottom: 20 }}
        />

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Form Title */}
      <Text style={styles.title}>Reset Your Password</Text>

      {/* Password Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="New Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          !(password && confirmPassword) && { opacity: 0.5 },
        ]}
        onPress={handleResetPassword}
        disabled={!(password && confirmPassword)}
      >
        <Text style={styles.submitButtonText}>{loading ? "Loading...": "Change Password"}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
