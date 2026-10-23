import '../../global.css';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider, usePathname } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { useColorScheme, View, type ColorSchemeName } from 'react-native';
import * as SystemUI from 'expo-system-ui';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BACKGROUND_COLORS = {
  light: '#ffffff',
  dark: '#0f172a',
} as const;

const APP_ROUTES = ['/register', '/institutions', '/rank', '/profile', '/managers', '/institution'];

function getBackgroundColor(colorScheme: ColorSchemeName) {
  return colorScheme === 'dark' ? BACKGROUND_COLORS.dark : BACKGROUND_COLORS.light;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const backgroundColor = getBackgroundColor(colorScheme);
  const showChrome = APP_ROUTES.includes(pathname);
  const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = useMemo(
    () => ({
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: backgroundColor,
      },
    }),
    [baseTheme, backgroundColor]
  );

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(backgroundColor).catch(() => {});
  }, [backgroundColor]);

  return (
    <ThemeProvider value={theme}>
      <View style={{ flex: 1, backgroundColor }}>
        {showChrome && <Header />}
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              animationDuration: 220,
            }}
          >
            <Stack.Screen name="index" options={{ animation: 'none' }} />
            <Stack.Screen
              name="profile"
              options={{ animation: 'fade', animationMatchesGesture: true }}
            />
          </Stack>
        </View>
        {showChrome && <Footer />}
      </View>
    </ThemeProvider>
  );
}
