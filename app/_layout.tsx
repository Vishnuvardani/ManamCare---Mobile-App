import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="screening" />
        <Stack.Screen name="resources" />
        <Stack.Screen name="counselling" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="settings" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
