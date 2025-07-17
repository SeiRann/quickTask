import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { SQLiteProvider } from 'expo-sqlite';
import {useMigrations} from "drizzle-orm/expo-sqlite/migrator"
import migrations from '../drizzle/migrations';
import { View,Text } from 'react-native';

const expo = SQLite.openDatabaseSync('db.db');

const db = drizzle(expo);

export default function RootLayout() {
  const {success, error} = useMigrations(db, migrations)
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (error) {
    console.log("Sqlite error:",error)
  }

  if (success) {
    console.log("Migration success")
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName='db.db'>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SQLiteProvider>
    </ThemeProvider>
  );
}
