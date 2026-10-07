import { View, Text, Image } from 'react-native'
import { Button } from './Button'
import { Icon } from './Icon'

export function Header(props: any): any {

    return (
        <View className='w-full px-6 mt-12'>
            <View className='flex-row  items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                    <Button onPress={props.onPress} icon={props.icon}
                        size={props.size} className='flex-row items-center' />
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
                    <Button className='flex-row items-center
                     p-1.5 rounded-xl' icon="cog-outline" size={26} />
                </View>rpx
            </View>
            <View className='border-hairline border-slate-600 mt-3' />
        </View>
    )
}