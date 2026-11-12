import { Card } from '@/components/Card';
import { useRouter } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Icon } from '@/components/Icon';
import { useEffect } from 'react';
import { useRankController } from '@/controllers/rankController';
import { RoleGate } from '@/components/RoleGate';

export default function RankScreen() {
    return (
        <RoleGate permitidos={['gestor', 'admin']} rota="/rank">
            <RankContent />
        </RoleGate>
    )
}

function RankContent() {
    const router = useRouter()
    const { alunos, carregarRanking } = useRankController()

    useEffect(() => {
        carregarRanking()
    }, [carregarRanking])

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <ScrollView
                className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row justify-between items-center pb-2">
                    <View className='flex-row items-center gap-2'>
                        <Icon name="trophy" size={20} color="#facc15" darkColor="#facc15" />
                        <Text className='text-xl font-bold dark:text-slate-200'>
                            CLASSIFICAÇÃO GERAL
                        </Text>
                    </View>
                    <View/>
                    <Text className='text-md font-bold dark:text-slate-400'>
                        {alunos.length} Estudantes
                    </Text>
                </View>
                {alunos.map((aluno) => (
                    <Card
                        onPress={() =>
                            router.push({
                                pathname: '/profile',
                                params: { id: String(aluno.id) },
                            })
                        }
                        typeCard="rank"
                        key={aluno.id}
                        nome={aluno.nome}
                        xp={aluno.xp}
                        nivel={aluno.nivel}
                        rank={aluno.rank}
                        trilhasConcluidas={aluno.trilhasConcluidas}
                    />
                ))}
                <View className='mb-10' />
            </ScrollView>
        </View>
    )
}
