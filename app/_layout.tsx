import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "@/context/Theme";
import { AuthProvider } from "@/context/AuthContext";

function MainLayout() {
  const { isDark } = useTheme();

  return (
    <SafeAreaView
      style={[style.container, { backgroundColor: !isDark ? "#fff" : "#000" }]}
    >
      <StatusBar style={!isDark ? "dark" : "light"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/index" />
        <Stack.Screen name="auth/auth" />
        <Stack.Screen name="auth/verifyOtp" />
        <Stack.Screen name="auth/forgotPassword" />
      </Stack>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
