import { View } from "react-native";
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { Button } from "./Button";
import { usePathname, useRouter } from "expo-router";

import type { Href } from "expo-router";

const buttons = [
    { title: 'Cadastros', size: 22, icon: 'account-plus' as MaterialDesignIconsIconName, route: "/register" as Href},
    { title: 'Instituições', size: 22, icon: 'bank' as MaterialDesignIconsIconName, route: "/institutions" as Href, match: ['institution', '/managers']},
    { title: 'Alunos', size: 22, icon: 'account-school' as MaterialDesignIconsIconName, route: "/rank" as Href,  match: ['/profile']}
]

export function Footer() {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <View className='w-full px-6'>
            <View className="dark:bg-slate-700"/>
            <View className="w-full flex-row justify-between items-center bg-white dark:bg-slate-900 h-28">
                <View className="w-full flex-row justify-between items-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    {buttons.map((button, index) => (
                        <Button
                            typeButton="footer"
                            key={index}
                            title={button.title}
                            size={button.size}
                            icon={button.icon}
                            color='#334155' 
                            darkColor='white'
                            route={button.route}
                            onPress={() => {
                                if (pathname === '/profile') {
                                    router.dismissTo(button.route)
                                } else {
                                    router.navigate(button.route)
                                }
                            }}
                            ativo={pathname === button.route || button.match?.includes(pathname)}
                        />
                    ))}
                </View>
            </View>
            <View className='h-10'></View>
        </View>

    )
}
