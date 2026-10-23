import { View, Text, Image } from 'react-native'
import { Button } from './Button'
import { usePathname, useRouter } from 'expo-router'
import { ManagerHeader } from './ManagerHeader'

export function Header(props: any): any {
    const router = useRouter()
    const pathName = usePathname()
    const podeVoltar = pathName === '/profile' || pathName === '/institution' || pathName === '/managers'
    const podeSair = pathName !== '/profile'

    function routeLogout() {
        router.replace('/login')
    }

    function routeBack() {
        router.back()
    }

    if (pathName === '/institution') {
        return <ManagerHeader onBack={routeBack} onLogout={routeLogout} />
    }

    return (
        <View className='w-full px-6 mt-12'>
            <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                    {podeVoltar === true &&
                        <Button typeButton='default' onPress={routeBack} icon='arrow-left' color='#94a3b8' darkColor='#cbd5e1'
                            size={22} className='flex-row items-center
                            p-2.5 rounded-lg dark:bg-slate-900 active:bg-slate-100 
                            dark:active:bg-slate-700 border-slate-400 dark:shadow-slate-800'/>
                    }
                    <View className='flex-row'>
                        <Image
                            source={require('../../assets/images/maralogo.png')}
                            className="h-8 w-8"
                            resizeMode="contain"
                        />
                        <Text className="text-xl font-extrabold uppercase tracking-widest mt-1 text-red-600">
                            MaraGames
                        </Text>
                    </View>
                </View>
                <View className='flex-row gap-2'>
                    <Text className='text-white'></Text>
                    {podeSair &&
                        <Button onPress={routeLogout} typeButton='default' className='flex-row items-center
                        p-2.5 rounded-lg dark:bg-slate-900 active:bg-slate-100 dark:active:bg-slate-700 border-slate-200' color='#94a3b8' darkColor='#cbd5e1' icon="logout" size={22} />
                    }
                </View>
            </View>
            <View className='mt-3' />
        </View>
    )
}
