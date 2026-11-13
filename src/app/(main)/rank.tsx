import { Card } from '@/components/Card';
import { useRouter } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Icon } from '@/components/Icon';
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { useRankController } from '@/controllers/rankController';
import { RoleGate } from '@/components/RoleGate';
import { Pagination } from '@/components/Pagination';
import { useAuth } from '@/contexts/AuthContext';

const PAGE_SIZE = 6;

export default function RankScreen() {
    return (
        <RoleGate permitidos={['aluno', 'gestor', 'admin']} rota="/rank">
            <RankContent />
        </RoleGate>
    )
}

function RankContent() {
    const router = useRouter()
    const { usuario } = useAuth()
    const { alunos, porInstituicao, carregarRanking } = useRankController()
    const podeAbrirPerfil = usuario?.perfil !== 'aluno'

    useEffect(() => {
        carregarRanking()
    }, [carregarRanking])

    const [page, setPage] = useState(1)
    const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null)
    const totalPages = Math.max(1, Math.ceil(alunos.length / PAGE_SIZE))
    const paginaAtual = Math.min(page, totalPages)
    const alunosDaPagina = alunos.slice((paginaAtual - 1) * PAGE_SIZE, paginaAtual * PAGE_SIZE)

    function changePage(nextPage: number) {
        setPage(Math.min(totalPages, Math.max(1, nextPage)))
        scrollRef.current?.scrollTo({ y: 0, animated: true })
    }

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <ScrollView
                ref={scrollRef}
                className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row justify-between items-center pb-2">
                    <View className='flex-row items-center gap-2'>
                        <Icon name="trophy" size={20} color="#facc15" darkColor="#facc15" />
                        <Text className='text-xl font-bold dark:text-slate-200'>
                            {porInstituicao ? 'CLASSIFICAÇÃO' : 'CLASSIFICAÇÃO GERAL'}
                        </Text>
                    </View>
                    <View/>
                    <Text className='text-md font-bold dark:text-slate-400'>
                        {alunos.length} Estudantes
                    </Text>
                </View>
                {alunosDaPagina.map((aluno) => (
                    <Card
                        onPress={
                            podeAbrirPerfil
                                ? () =>
                                      router.push({
                                          pathname: '/profile',
                                          params: { id: String(aluno.id) },
                                      })
                                : undefined
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
                <Pagination page={paginaAtual} totalPages={totalPages} onPageChange={changePage} />
                <View className='mb-10' />
            </ScrollView>
        </View>
    )
}
