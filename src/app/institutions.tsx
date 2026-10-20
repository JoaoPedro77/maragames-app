import { useRouter } from "expo-router"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/Button"
import { View, Text, ScrollView } from "react-native"
import { Icon } from "@/components/Icon"
import type { MaterialDesignIconsIconName } from "@react-native-vector-icons/material-design-icons"

type Dado = {
    icon: MaterialDesignIconsIconName
    title: string
    number: number
}

const dados: Dado[] = [
    { icon: "bank", title: "Instituições", number: 12 },
    { icon: "account-tie", title: "Gestores", number: 34 },
    { icon: "account-school", title: "Alunos", number: 156 },
]

type Instituicao = {
    nome: string
    tipo: string
    gestores: number
    alunos: number
}

const instituicoes: Instituicao[] = [
    { nome: "Colégio Maragames", tipo: "Escola", gestores: 3, alunos: 48 },
    { nome: "Universidade Norte", tipo: "Universidade", gestores: 12, alunos: 320 },
    { nome: "Instituto TechBR", tipo: "Instituto Técnico", gestores: 5, alunos: 96 },
    { nome: "Escola Municipal Centro", tipo: "Escola", gestores: 2, alunos: 74 },
    { nome: "Faculdade São Lucas", tipo: "Faculdade", gestores: 7, alunos: 210 },
]

export default function Cadastro() {
    const router = useRouter()

    function coco() {
        router.back()
    }

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <Header onPress={coco} icon="arrow-left" size={27} />
            <ScrollView
                className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-grow gap-5">
                    <View className="flex-row">
                        <View className="flex-grow gap-1 w-1/3">
                            <Text className="text-3xl font-extrabold dark:text-slate-100">
                                Instituições
                            </Text>
                            <Text className="text-md text-slate-600 dark:text-slate-400">
                                Escolha uma instituição para gerenciá-la
                            </Text>
                        </View>
                        <View>
                            <Button onPress={() => router.replace('/register')} className="w-28 p-2 rounded-xl bg-red-600 active:bg-red-900" typeButton="default" title="+ Nova" />
                        </View>
                    </View>
                    <View className="flex-row gap-3">
                        {dados.map((dado) => (
                            <View
                                key={dado.title}
                                className="flex-1 gap-1 p-4 bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl"
                            >
                                <View className='flex-row gap-1 items-center'>
                                    <Icon name={dado.icon} size={16} color="#94a3b8" darkColor="#cbd5e1" />
                                    <Text className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                        {dado.title}
                                    </Text>
                                </View>
                                <Text className="text-2xl font-extrabold dark:text-slate-100">
                                    {dado.number}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View className="flex-grow gap-2">
                        <Text className="text-xl font-extrabold dark:text-slate-100">
                            Exibindo {instituicoes.length} Resultados
                        </Text>
                        <View className="flex-grow gap-3">
                            {instituicoes.map((inst) => (
                                <View
                                    key={inst.nome}
                                    className="flex-grow justify-between p-4 bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl"
                                >
                                    <View className="flex-row gap-6">
                                        <View className="flex-grow gap-1">
                                            <Text className="text-xl font-extrabold dark:text-slate-100">
                                                {inst.nome}
                                            </Text>
                                            <Text className="text-md font-semibold text-slate-600 dark:text-slate-400">
                                                {inst.tipo}
                                            </Text>
                                        </View>
                                        <View className="flex-row gap-2 rounded-lg bg-slate-200 dark:bg-[#192231] p-2">
                                            <View className="items-center ">
                                                <Text className="text-md  font-semibold text-slate-600 dark:text-slate-400">
                                                    Gestores
                                                </Text>
                                                <Text className="text-xl font-extrabold dark:text-slate-100">
                                                    {inst.gestores}
                                                </Text>
                                            </View>
                                            <View className="items-center">
                                                <Text className="text-md font-semibold text-slate-600 dark:text-slate-400">
                                                    Alunos
                                                </Text>
                                                <Text className="text-xl font-extrabold dark:text-slate-100">
                                                    {inst.alunos}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Button className="mt-3 h-10 items-center text-slate-50 justify-center rounded-lg bg-slate-700 active:bg-slate-400 dark:bg-slate-700 dark:active:bg-slate-600"
                                            typeButton="default"
                                            title="Detalhes"
                                            icon='information-slab-circle-outline'
                                            size={18}
                                        />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                <View className='mb-10' />
            </ScrollView>
            <Footer />
        </View>
    )
}