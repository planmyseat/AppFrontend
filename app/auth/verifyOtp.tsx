import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView, 
  Platform, 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/Theme";
import { createStyle } from "@/styles/auth/verifyOtp";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import useVerifyOTP from "@/hooks/auth/useVerifyOtp";


const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const { isDark } = useTheme()
  const styles = createStyle(isDark);
  const { width, height } = Dimensions.get("window");
  const {email ,mode} = useLocalSearchParams();
  const { verifyOTP,loading,error} = useVerifyOTP();
  const router = useRouter();
  

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      alert("Please enter a valid 4-digit OTP.");
      return;
    }
    try {
        const response = await verifyOTP(email as string, otp);
        if (response.ok) {
            alert("OTP verified successfully!");
            if (mode === "forgotPassword") {
                router.push({
                    pathname: "/auth/resetPassword",
                    params: { email },
                });
            }
            else{
                router.push("/home/block"); 
            }
            
        } else {
            alert(response.message || "Failed to verify OTP. Please try again.");
        }
        
    } catch (error) {
        
    }
    console.log("Verifying OTP:", otp);
    setOtp(""); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
      >
        <ScrollView
          onContentSizeChange={(contentWidth, contentHeight) => {
            setScrollViewHeight(contentHeight);
          }}
          contentContainerStyle={[
            styles.scrollViewContent,
            { minHeight: height },
          ]}
        >

          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../assets/auth/otpImage.jpg")}
                  style={styles.otpImage}
                />
              </View>
              <Text style={styles.title}>Enter OTP</Text>
              <Text style={styles.subtitle}>
                Please enter the 4-digit code we sent to your Email.
              </Text>
              <Text style={{ fontWeight: '700' }}>{email}</Text>
            </View>

            {/* // error  */}

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
            
            {/* OTP Input Section */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={otp}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, "");
                  if (cleaned.length <= 4) setOtp(cleaned);
                }}
                keyboardType="numeric"
                maxLength={4}
                placeholder="____"
              />
            </View>

            <TouchableOpacity
              onPress={handleVerifyOtp}
              style={styles.buttonWrapper}
            >
              <LinearGradient
                colors={["#5D81F4", "#3E61E0"]}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>{loading ? "Loading..." : "Verify OTP"}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};



export default VerifyOtp;
