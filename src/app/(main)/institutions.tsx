import { Button } from "@/components/Button"
import { View, Text, ScrollView } from "react-native"
import { Icon } from "@/components/Icon"
import { PageCard } from "@/components/PageCard"
import { Badge } from "@/components/Badge"
import type { MaterialDesignIconsIconName } from "@react-native-vector-icons/material-design-icons"
import { useRouter } from "expo-router"

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
    return (
        <View className="bg-white dark:bg-slate-900">
            <ScrollView
                className="bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-5">
                    <View className="flex-row">
                        <View>
                            <Text className="text-3xl font-extrabold dark:text-slate-100">
                                Instituições
                            </Text>
                            <Text className="text-md text-slate-600 dark:text-slate-400">
                                Escolha uma instituição para gerenciá-la
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row gap-3">
                        {dados.map((dado) => (
                            <PageCard key={dado.title} className="flex-1">
                                <View className='flex-row gap-1 items-center'>
                                    <Icon name={dado.icon} size={16} color="#94a3b8" darkColor="#cbd5e1" />
                                    <Text className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                        {dado.title}
                                    </Text>
                                </View>
                                <Text className="text-2xl font-extrabold dark:text-slate-100">
                                    {dado.number}
                                </Text>
                            </PageCard>
                        ))}
                    </View>
                    <View className="gap-2">
                        <Text className="text-xl font-extrabold dark:text-slate-100">
                            Exibindo {instituicoes.length} Resultados
                        </Text>
                        <View className="gap-3">
                            {instituicoes.map((inst) => (
                                <PageCard
                                    key={inst.nome}
                                    contentClassName="flex-col"
                                >
                                    <View className="flex-row justify-between items-center">
                                        <View className="flex-col gap-1">
                                            <Text className="text-xl font-extrabold dark:text-slate-100 max-w-40">
                                                {inst.nome}
                                            </Text>
                                            <Text className="text-md font-semibold text-slate-600 dark:text-slate-400">
                                                {inst.tipo}
                                            </Text>
                                        </View>
                                        <View className="flex-col gap-1 items-end">
                                            <Badge label="Gestores" value={inst.gestores} />
                                            <Badge label="Alunos" value={inst.alunos} />
                                        </View>
                                    </View>
                                    <View>
                                        <Button className="mt-3 h-10 items-center text-slate-50 justify-center rounded-lg bg-slate-500 active:bg-slate-400 dark:bg-slate-700 dark:active:bg-slate-600"
                                            typeButton="default"
                                            title="Detalhes"
                                            onPress={() => router.push('/institution')}
                                            icon='information-slab-circle-outline'
                                            size={18}
                                        />
                                    </View>
                                </PageCard>
                            ))}
                        </View>
                    </View>
                </View>
                <View className='mb-10' />
            </ScrollView>
        </View>
    )
}
