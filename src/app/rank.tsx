import { Card } from '@/components/Card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';

const usuarios = [
    { id: 1, nome: 'Rafael Almeida', xp: 28450, nivel: 15, rank: 1, trilhasConcluidas: 28 },
    { id: 2, nome: 'Mariana Costa', xp: 25320, nivel: 14, rank: 2, trilhasConcluidas: 25 },
    { id: 3, nome: 'Lucas Oliveira', xp: 22890, nivel: 13, rank: 3, trilhasConcluidas: 23 },
    { id: 4, nome: 'Beatriz Santos', xp: 20150, nivel: 12, rank: 4, trilhasConcluidas: 21 },
    { id: 5, nome: 'Gustavo Ferreira', xp: 18760, nivel: 11, rank: 5, trilhasConcluidas: 19 },
    { id: 6, nome: 'Amanda Lima', xp: 16540, nivel: 10, rank: 6, trilhasConcluidas: 17 },
    { id: 7, nome: 'Pedro Henrique', xp: 14890, nivel: 9, rank: 7, trilhasConcluidas: 15 },
    { id: 8, nome: 'Júlia Ribeiro', xp: 13210, nivel: 9, rank: 8, trilhasConcluidas: 14 },
    { id: 9, nome: 'Felipe Martins', xp: 12450, nivel: 8, rank: 9, trilhasConcluidas: 12 },
    { id: 10, nome: 'Larissa Gomes', xp: 11330, nivel: 8, rank: 10, trilhasConcluidas: 11 },
    { id: 11, nome: 'Thiago Pereira', xp: 10120, nivel: 7, rank: 11, trilhasConcluidas: 10 },
    { id: 12, nome: 'Camila Rocha', xp: 9450, nivel: 7, rank: 12, trilhasConcluidas: 9 },
    { id: 13, nome: 'Rodrigo Souza', xp: 8760, nivel: 6, rank: 13, trilhasConcluidas: 8 },
    { id: 14, nome: 'Vanessa Alves', xp: 7890, nivel: 6, rank: 14, trilhasConcluidas: 7 },
    { id: 15, nome: 'Bruno Carvalho', xp: 6540, nivel: 5, rank: 15, trilhasConcluidas: 6 },
]

export default function Rank() {
    const router = useRouter()

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <Header onPress={() => router.back()} icon="arrow-left" size={27} />
            <ScrollView
                className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row justify-between items-end px-1.5">
                    <Text className='text-xl font-bold dark:text-purple-100 my-1'>
                        CLASSIFICAÇÃO GERAL
                    </Text>
                    <Text className='text-md font-bold dark:text-slate-400 mb-1.5'>
                        {usuarios.length} Estudantes
                    </Text>
                </View>
                {usuarios.map((usuario) => (
                    <Card
                        onPress={() => router.push("/profile")}
                        typeCard="rank"
                        key={usuario.id}
                        nome={usuario.nome}
                        xp={usuario.xp}
                        nivel={usuario.nivel}
                        rank={usuario.rank}
                        trilhasConcluidas={usuario.trilhasConcluidas}
                    />
                ))}
            </ScrollView>
            <Footer/>
        </View>
    )
}