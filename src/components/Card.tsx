import { View, Text } from 'react-native'

export function Card(props: any) {

    return (
        <View key={props.id} className='flex w-full gap-2'>
            <View className='bg-slate-50 flex-row justify-between items-center w-full shadow-md dark:shadow-md shadow-slate-600
             dark:shadow-purple-700 dark:bg-slate-800 rounded-2xl p-4'>
                <View>
                    <Text className="text-slate-600 dark:text-slate-300 text-lg font-semibold">
                        {props.title}
                    </Text>

                    <Text className="font bold text-slate-400 dark:text-slate-500">
                        Quizzes restantes: {props.restante}
                    </Text>
                </View>

                <Text className="font-nunito text-red-500 text-2xl font-bold">
                    {props.progress}%
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

