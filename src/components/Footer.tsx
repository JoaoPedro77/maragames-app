import { View } from "react-native";
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { Button } from "./Button";
import { usePathname } from "expo-router";

import type { Href } from "expo-router";

const buttons = [
    { title: 'Cadastrar', size: 22, icon: 'account-plus' as MaterialDesignIconsIconName, route: "/register" as Href },
    { title: 'Instituição', size: 22, icon: 'bank' as MaterialDesignIconsIconName, route: "/institutions" as Href },
    { title: 'Alunos', size: 22, icon: 'account-school' as MaterialDesignIconsIconName, route: "/rank" as Href }
]

export function Footer() {
    const pathname = usePathname()

    return (
        <View className='w-full px-6'>

            <View className='border-hairline border-slate-600' />
            <View className="w-full flex-row justify-around items-center bg-slate-900 h-24">
                {buttons.map((button, index) => (
                    <Button
                        typeButton="footer"
                        key={index}
                        title={button.title}
                        size={button.size}
                        icon={button.icon}
                        route={button.route}
                        ativo={pathname === button.route}
                    />
                ))}
            </View>
            <View className='h-10'></View>
        </View>

    )
}