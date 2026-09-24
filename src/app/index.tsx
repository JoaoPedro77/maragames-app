import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-3xl font-bold text-slate-900">MaraGames</Text>
      <Text className="mt-2 text-center text-base text-slate-500">
        Configuração inicial
      </Text>
      <StatusBar style="dark" />
    </View>
  );
}
