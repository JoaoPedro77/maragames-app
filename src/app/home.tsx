import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          MaraGames
        </Text>
        <Text className="mt-3 text-center text-base text-slate-600 dark:text-slate-400">
          Bem-vindo à página inicial.
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
