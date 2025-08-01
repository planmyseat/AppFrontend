import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from '@/context/Theme';

function MainLayout() {

  const {isDark} = useTheme()

  return (
    <SafeAreaView style={[style.container, {backgroundColor:!isDark ? "#fff" : "#000"}]}>
      <StatusBar style={!isDark? "dark": "light"} />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='auth/index' />
        <Stack.Screen name='auth/auth' />
      </Stack>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})
