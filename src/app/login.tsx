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
import { useLoginController } from '@/controllers/loginController';

export default function LoginScreen() {
  const router = useRouter();

  function handleLogin() {
    router.replace('/rank');
  }

  const {
    erro,
    erroMessage,
    inputEmail,
    setInputEmail,
    inputSenha,
    setInputSenha,
    login,
  } = useLoginController()

  async function handleSubmit() {
    const resultado = await login()

    if (resultado === 'sucesso') {
      handleLogin()
    }

    return
  }
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
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
            <Text className="mt-3 text-lg leading-6 text-slate-600 dark:text-slate-400">
              Insira as suas credenciais para acessar a sua conta.
            </Text>
          </View>

          <View className="gap-5">
            <Input
              value={inputEmail}
              onChangeText={setInputEmail}
              icon="email-outline"
              size={20}
              color="#94a3b8"
              label="E-mail"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="voce@exemplo.com"
              returnKeyType="next"
            />

            <Input
              value={inputSenha}
              onChangeText={setInputSenha}
              icon="key-outline"
              size={18.5}
              color="#94a3b8"
              label="Senha"
              autoComplete="current-password"
              autoCapitalize='none'
              placeholder="Digite sua senha"
              returnKeyType="done"
              secureTextEntry
            />

            {erro && <Text className='text-red-500 text-md font-semibold'>{erroMessage}</Text>}

            <Button typeButton='default' title="Entrar" icon='login-variant' size={20} onPress={handleSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
