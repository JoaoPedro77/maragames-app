import { Button } from '@/components/Button';
import { GradientText } from '@/components/GradientText';
import { Input } from '@/components/Input';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();

  function handleLogin() {
    router.replace('/home');
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-center px-6 py-10"
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-10 flex flex-row items-center">
            <Image
              source={require('../../assets/images/maralogo.png')}
              className="h-12 w-12"
              resizeMode="contain"
            />
            <Text className="text-3xl font-black uppercase tracking-widest text-red-500">
              MaraGames
            </Text>
          </View>

          <View className="mb-10">
            <GradientText>Bem-vindo de volta</GradientText>
            <Text className="mt-3 text-base leading-6 text-slate-600 dark:text-slate-400">
              Insira suas credenciais para acessar a sua conta.
            </Text>
          </View>

          <View className="gap-5">
            <Input
              label="E-mail"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="voce@exemplo.com"
              returnKeyType="next"
            />

            <Input
              label="Senha"
              autoComplete="current-password"
              onSubmitEditing={handleLogin}
              placeholder="Digite sua senha"
              returnKeyType="done"
              secureTextEntry
            />

            <Button title="Entrar" onPress={handleLogin} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
