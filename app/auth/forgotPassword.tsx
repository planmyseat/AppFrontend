import React, { useEffect } from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useForgotPassword from "@/hooks/auth/useForgotPassword";

const { width } = Dimensions.get("window");

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const { forgotPassword, loading, error } = useForgotPassword();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [errorMsg, setErrorMsg] = useState(error)

  useEffect(() => {
    if (error) {
      setErrorMsg(error);
    }
     const timer = setTimeout(() => {
       setErrorMsg("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);
 
  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    const { success } = await forgotPassword(email);
    if (success) {
      alert("OTP sent to your email!");
      router.push({
        pathname: "/auth/verifyOtp",
        params: { email, mode: "forgotPassword" },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Illustration Section */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require("../../assets/auth/forgotImg.jpg")}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          {/* Title and Subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Don't worry!! It happens, please enter the address associated with
              your account
            </Text>
          </View>

          {!isValidEmail && email !== "" && (
            <Text style={{ color: "red", fontSize: 13 }}>
              Please enter a Valid Mail
            </Text>
          )}
          {/* Error message display */}
          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          {/* Email Input Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="Email ID"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
                setIsValidEmail(valid);
              }}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Loading..." : "Send OTP"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfeafd", // Kept the original background color
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center", // Center content vertically
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 20,
    position: "absolute",
    top: 20,
    left: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  iconButton: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  illustrationContainer: {
    width: width * 0.8,
    height: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  illustrationImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    width: "100%",
    alignItems: "center", // Centered the text for better balance
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3b3a5b",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 55, // Slightly increased height for better touch target
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 15,
    fontSize: 20,
    color: "#666",
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#4e5aef",
    width: "100%",
    height: 55, // Matched height of input field
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
