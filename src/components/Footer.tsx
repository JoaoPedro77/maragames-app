import { View } from "react-native";
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { Button } from "./Button";
import { usePathname, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import type { Perfil } from "../../types/User";

import type { Href } from "expo-router";

type BotaoFooter = {
    title: string;
    size: number;
    icon: MaterialDesignIconsIconName;
    route: Href;
    match?: string[];
}

const botoesPorPerfil: Record<Perfil, BotaoFooter[]> = {
    admin: [
        { title: 'Cadastros', size: 22, icon: 'account-plus' as MaterialDesignIconsIconName, route: "/register" as Href },
        { title: 'Instituições', size: 22, icon: 'bank' as MaterialDesignIconsIconName, route: "/institutions" as Href, match: ['/institution', '/managers'] },
        { title: 'Alunos', size: 22, icon: 'account-school' as MaterialDesignIconsIconName, route: "/rank" as Href, match: ['/profile'] },
    ],
    gestor: [
        { title: 'Instituição', size: 22, icon: 'bank' as MaterialDesignIconsIconName, route: "/institution" as Href, match: ['/managers'] },
        { title: 'Alunos', size: 22, icon: 'account-school' as MaterialDesignIconsIconName, route: "/rank" as Href, match: ['/profile'] },
    ],
    aluno: [
        { title: 'Alunos', size: 22, icon: 'account-school' as MaterialDesignIconsIconName, route: "/rank" as Href },
        { title: 'Perfil', size: 22, icon: 'account-circle-outline' as MaterialDesignIconsIconName, route: "/profile" as Href },
    ],
}

export function Footer() {
    const pathname = usePathname()
    const router = useRouter()
    const { usuario } = useAuth()

    if (!usuario) {
        return null
    }

    const botoes = botoesPorPerfil[usuario.perfil]

    return (
        <View className='w-full px-6'>
            <View className="dark:bg-slate-700"/>
            <View className="w-full flex-row justify-between items-center bg-white dark:bg-slate-900 h-28">
                <View className="w-full flex-row justify-between items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {botoes.map((botao) => (
                        <Button
                            typeButton="footer"
                            key={botao.title}
                            title={botao.title}
                            size={botao.size}
                            icon={botao.icon}
                            color='#334155'
                            darkColor='white'
                            route={botao.route}
                            onPress={() => {
                                if (pathname === '/profile') {
                                    router.dismissTo(botao.route)
                                } else {
                                    router.navigate(botao.route)
                                }
                            }}
                            ativo={pathname === botao.route || botao.match?.includes(pathname)}
                        />
                    ))}
                </View>
            </View>
            <View className='h-10'></View>
        </View>

    )
}
