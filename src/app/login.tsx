import { Button } from '@/components/Button';
import { GradientText } from '@/components/GradientText';
import { Input } from '@/components/Input';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';
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
import { useAuth } from '@/contexts/AuthContext';
import { homePorPerfil } from '@/hooks/useRequireRole';

export default function LoginScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { usuario, carregando: carregandoSessao } = useAuth();
  const [enviando, setEnviando] = useState(false);

  const {
    erro,
    erroMessage,
    inputEmail,
    setInputEmail,
    inputSenha,
    setInputSenha,
    login,
  } = useLoginController()

  useEffect(() => {
    if (!carregandoSessao && usuario) {
      router.replace(homePorPerfil(usuario.perfil))
    }
  }, [carregandoSessao, usuario, router])

  async function handleSubmit() {
    if (enviando) {
      return
    }

    setEnviando(true)
    const resultado = await login()
    setEnviando(false)

    if (resultado.status === 'sucesso') {
      router.replace(homePorPerfil(resultado.perfil))
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View
        pointerEvents="none"
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        className="absolute inset-0 overflow-hidden"
      >
        <Image
          source={require('../../assets/images/maralogooutline.png')}
          className="absolute -bottom-40 -right-43 h-[560px] w-[560px] opacity-50"
          resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-start px-6 pt-4 pb-10"
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-10 items-center">
            <View className="h-40 w-40 items-center justify-center">
              <Image
                accessible={false}
                source={require('../../assets/images/maralogo.png')}
                className="h-36 w-36"
                tintColor={isDark ? '#ffffff' : undefined}
                resizeMode="contain"
              />
            </View>
            <Text
              className="absolute top-36 text-center text-3xl font-black uppercase tracking-widest text-red-500 dark:text-white"
            >
              MaraGames
            </Text>
          </View>

          <View className="mb-10 mt-7">
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

            <Button
              typeButton='default'
              title={enviando ? 'Entrando...' : 'Entrar'}
              icon='login-variant'
              size={20}
              disabled={enviando}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
