import { useState } from "react"
import { View, Text, Pressable } from 'react-native'
import { GradientText } from "./GradientText";

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
    const [pressed, setPressed] = useState(false)

    const baseClasses = props.rank === 1
        ? 'flex-row justify-between items-center w-full dark:border-2 dark:border-violet-700 border-2 border-[#3a2681] rounded-xl p-4'
        : 'flex-row justify-between items-center w-full bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl p-4'

    const bgClasses = pressed
        ? 'bg-slate-300 dark:bg-slate-600'
        : 'bg-slate-50 dark:bg-slate-800'

    return (
        <Pressable
            accessibilityRole="button"
            onPress={props.onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            className='flex w-full gap-3 my-1'
        >
            <View className={`${baseClasses} ${bgClasses}`}>
                <View className='flex-row items-center gap-3'>
                    <Text className="text-slate-900 dark:text-red-200 text-2xl font-semibold">
                        {props.rank >= 10 ? props.rank : '0' + props.rank}
                    </Text>

                    <View className='bg-slate-300 dark:bg-slate-700 rounded-full w-12 h-12 items-center justify-center'>
                        {
                            props.rank === 1
                                ? <GradientText className="text-2xl font-bold">
                                    {props.nome[0]}
                                </GradientText>
                                : <Text className="text-slate-800 dark:text-slate-300 text-lg font-bold">
                                    {props.nome[0]}
                                </Text>
                        }
                    </View>

                    <View>
                        {
                            props.rank === 1
                                ? <GradientText className="text-lg font-semibold">
                                    {props.nome}
                                </GradientText>
                                : <Text className="text-slate-900 dark:text-slate-100 text-lg font-semibold">
                                    {props.nome}
                                </Text>
                        }


                        <Text className="font-bold text-slate-400 dark:text-[#bda3ff]">
                            Nível: {props.nivel}
                        </Text>
                    </View>
                </View>
                <View className='flex-grow items-end'>
                    <Text className="text-red-500 text-xl font-bold ">
                        {props.xp}
                    </Text>
                    <Text className="dark:text-red-200 text-slate-900 text-md font-extrabold">
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
            <View className='bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 flex-row justify-between items-center w-full dark:border rounded-xl p-4'>
                <View>
                    <Text className="text-slate-900 dark:text-slate-100 text-lg font-semibold">
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
