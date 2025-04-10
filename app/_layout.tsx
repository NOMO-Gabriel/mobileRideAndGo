import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../hooks/useTheme';
import { ThemeProvider } from '../theme/ThemeContext';
export default function RootLayout() {
  const { theme } = useTheme();
  return (
    <ThemeProvider>
    <Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
    </ThemeProvider>
  );
}
