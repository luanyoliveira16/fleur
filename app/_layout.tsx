import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts as useFontsManjari, Manjari_100Thin, Manjari_400Regular, Manjari_700Bold } from '@expo-google-fonts/manjari';
import { useFonts as useFontsManrope, Manrope_400Regular, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Text } from 'react-native';
import React from 'react';

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [manjariLoaded] = useFontsManjari({
        Manjari_100Thin,
        Manjari_400Regular,
        Manjari_700Bold,
    });

    const [manropeLoaded] = useFontsManrope({
        Manrope_400Regular,
        Manrope_700Bold,
    });

    const loaded = manjariLoaded && manropeLoaded;

    if (!loaded) {
        return null;
    }

    // 🔹 Define Manjari como fonte padrão global para todos os <Text>
    const oldRender = Text.render;
    Text.render = function (...args) {
        const origin = oldRender.call(this, ...args);
        return React.cloneElement(origin, {
            style: [{ fontFamily: 'Manrope_400Regular' }, origin.props.style],
        });
    };

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
