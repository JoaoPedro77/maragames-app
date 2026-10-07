import { View, Text } from 'react-native'

export function Card(props: any) {

    return (
        <View key={props.id} className='flex w-full gap-3'>
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

            <View>
                <View
                    style={[
                        {
                            width: `${props.progress}%`,
                        }
                    ]}
                />
            </View>
        </View>
    )
}