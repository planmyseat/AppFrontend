import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function RootLayout() {

  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="dark" />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='auth/index' />
      </Stack>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})
