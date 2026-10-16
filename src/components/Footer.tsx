import { View } from "react-native";
import { ButtonFooter } from '@/components/ButtonFooter';
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';

const buttons = [
    { title: 'Cadastrar', size: 22, icon: 'account-plus' as MaterialDesignIconsIconName, route: "/register" },
    { title: 'Instituição', size: 22, icon: 'bank' as MaterialDesignIconsIconName, route: "/institutions" },
    { title: 'Alunos', size: 22, icon: 'account-school' as MaterialDesignIconsIconName, route: "/rank" }
]

export function Footer() {

    return (
        <View className='w-full px-6'>

            <View className='border-hairline border-slate-600' />
            <View className="w-full flex-row justify-around items-center bg-slate-900 h-24">
                {buttons.map((button, index) => (
                    <ButtonFooter
                        key={index}
                        title={button.title}
                        size={button.size}
                        icon={button.icon}
                        route={button.route}
                    />
                ))}
            </View>
            <View className='h-10'></View>
        </View>

    )
}