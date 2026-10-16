import { View, Text, Pressable } from 'react-native'

type DiscenteProps = {
    id?: number;
    typeCard: 'discente';
    title: string;
    progress: string;
    restante: number;
};

type RankProps = {
    id?: number;
    typeCard: 'rank';
    nome: string;
    xp: number;
    nivel: number;
    rank: number;
    trilhasConcluidas: number;
    onPress?: () => void;
};

export function Card(props: DiscenteProps | RankProps) {
    switch (props.typeCard) {
        case "discente":
            return <DiscenteCard {...props} />
        case 'rank':
            return <RankCard {...props} />;
    }
}

export function RankCard(props: RankProps) {

    return (
        <Pressable accessibilityRole="button" onPress={props.onPress} key={props.id} className='flex w-full gap-3 my-1'>
            <View className={
                props.rank === 1 
                ? 'bg-slate-50 flex-row justify-between items-center w-full dark:border dark:border-purple-700 shadow-md shadow-slate-500 dark:shadow-slate-900 dark:bg-slate-800 rounded-xl p-4' 
                : 'bg-slate-50 flex-row justify-between items-center w-full dark:border dark:border-slate-700 shadow-md shadow-slate-500 dark:shadow-slate-900 dark:bg-slate-800 rounded-xl p-4'
                }>
                <View className='flex-row items-center gap-3'>
                    <Text className="text-slate-100 dark:text-red-200 text-2xl font-semibold">
                        {props.rank >= 10 ? props.rank : '0' + props.rank}
                    </Text>

                    <View className='bg-slate-100 dark:bg-slate-700 rounded-full w-12 h-12 items-center justify-center'>
                        <Text className="text-slate-600 dark:text-slate-300 text-lg font-bold">
                            {props.nome[0]}
                        </Text>
                    </View>

                    <View>
                        <Text className="text-slate-100 dark:text-slate-00 text-lg font-semibold">
                            {props.nome}
                        </Text>

                        <Text className="font-bold text-slate-400 dark:text-[#bda3ff]">
                            Nível: {props.nivel}
                        </Text>
                    </View>
                </View>
                <View className='flex-grow items-end'>
                    <Text className="text-red-500 text-xl font-bold ">
                        {props.xp}
                    </Text>
                    <Text className="text-red-200 text-md font-bold">
                        XP
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

function DiscenteCard(props: DiscenteProps) {
    return (
        <View key={props.id} className='flex w-full gap-3 m-1'>
            <View className='bg-slate-50 flex-row justify-between items-center w-full dark:border
             dark:border-slate-700 shadow-md shadow-slate-500 dark:shadow-slate-800 dark:bg-slate-800 rounded-xl p-4'>
                <View>
                    <Text className="text-slate-100 dark:text-slate-00 text-lg font-semibold">
                        {props.title}
                    </Text>

                    <Text className="font-bold text-slate-400 dark:text-slate-500">
                        Quizzes restantes: {props.restante}
                    </Text>
                </View>

                <Text className="text-red-500 text-2xl font-bold">
                    {props.progress}
                </Text>
            </View>
        </View>
    )
}