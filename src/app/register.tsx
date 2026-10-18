import { useRouter } from "expo-router"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/Button"
import { View, ScrollView } from "react-native"
import { useState } from "react"
import { Input } from "@/components/Input"

export default function Cadastro() {
    const [abaAtiva, setAbaAtiva] = useState<'instituicao' | 'gestor' | 'aluno'>('instituicao')

    const router = useRouter()
    function routeBack() {
        router.back()
    }

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <Header onPress={routeBack} icon="arrow-left" size={27} />
            <ScrollView
                className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row h-14 justify-between bg-slate-800 rounded-full">
                    <View className="w-1/3">
                        <Button typeButton='tabs' title="+ Instituição" icon="account-tie" size={22} ativo={abaAtiva === 'instituicao'} onPress={() => setAbaAtiva('instituicao')} />
                    </View>
                    <View className="w-1/3">
                        <Button typeButton='tabs' title="+ Gestor" icon="account-tie" size={22} ativo={abaAtiva === 'gestor'} onPress={() => setAbaAtiva('gestor')} />
                    </View>
                    <View className="w-1/3">
                        <Button typeButton='tabs' title="+ Aluno" icon="account-tie" size={22} ativo={abaAtiva === 'aluno'} onPress={() => setAbaAtiva('aluno')} />
                    </View>
                </View>
                <View className="flex-grow gap-5 bg-slate-800 border-slate-500 rounded-2xl w-full">
                    <Input
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
                        icon="key-outline"
                        size={18.5}
                        color="#94a3b8"
                        label="Senha"
                        autoComplete="current-password"
                        placeholder="Digite sua senha"
                        returnKeyType="done"
                        secureTextEntry
                    />
                    <Input
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
                        icon="key-outline"
                        size={18.5}
                        color="#94a3b8"
                        label="Senha"
                        autoComplete="current-password"
                        placeholder="Digite sua senha"
                        returnKeyType="done"
                        secureTextEntry
                    />

                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}