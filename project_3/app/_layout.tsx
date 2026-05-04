import { DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { lightTheme, darkTheme } from '@/constants/theme';
import { GameProvider } from './context/GameContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const styledTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={styledTheme}>
        <NavThemeProvider value={colorScheme === 'dark' ? NavDarkTheme : NavDefaultTheme}>
          <GameProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
          </GameProvider>
        </NavThemeProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
