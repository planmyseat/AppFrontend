import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function RootLayout() {

  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name='index' options={{headerShown: true}} />
      </Stack>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})
