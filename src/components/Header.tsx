import { View, Text, Image } from 'react-native'
import { Button } from './Button'
import { useRouter } from 'expo-router'

export function Header(props: any): any {
    const router = useRouter()

    function routeLogout() {
        router.replace('/login')
    }

    function routeBack() {
        router.back()
    }

    return (
        <View className='w-full px-6 mt-12'>
            <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                    <Button typeButton='default' onPress={routeBack} icon='arrow-left'
                    size={22} className='flex-row items-center
                     p-2.5 rounded-xl active:bg-slate-700 border-slate-700 border-[1px]'/>
                    <View className='flex-row'>
                        <Image
                            source={require('../../assets/images/maralogo.png')}
                            className="h-8 w-8"
                            resizeMode="contain"
                        />
                        <Text className="text-xl font-extrabold uppercase tracking-widest mt-1 text-red-500">
                            MaraGames
                        </Text>
                    </View>
                </View>
                <View className='flex-row gap-2'>
                    <Text className='text-white'></Text>
                    <Button onPress={routeLogout} typeButton='default' className='flex-row items-center
                     p-2.5 rounded-xl active:bg-slate-700 border-slate-700 border-[1px]' icon="logout" size={22} />
                </View>
            </View>
            <View className='border-hairline border-slate-600 mt-3' />
        </View>
    )
}