import { useRouter } from "expo-router"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/Button"
import { View, ScrollView, Text, TextInputProps } from "react-native"
import { useState } from "react"
import { Input } from "@/components/Input"
import { Icon } from "@/components/Icon"
import type { MaterialDesignIconsIconName } from "@react-native-vector-icons/material-design-icons"

type Campo = {
    label: string
    icon: MaterialDesignIconsIconName
    keyboardType?: TextInputProps["keyboardType"]
    placeholder?: string
    secureTextEntry?: boolean
    autoComplete?: TextInputProps["autoComplete"]
}

type AbaId = "instituicao" | "gestor" | "aluno"

type Aba = {
    id: AbaId
    title: string
    icon: MaterialDesignIconsIconName
    campos: Campo[]
}

const abas: Aba[] = [
    {
        id: "instituicao", title: "+ Instituição", icon: "bank",
        campos: [
            { label: "Nome da Instituição", icon: "bank", keyboardType: "default", placeholder: "Ex: Colégio Maragames" },
            { label: "E-mail", icon: "email-outline", keyboardType: "email-address", placeholder: "voce@exemplo.com", autoComplete: "email" },
            { label: "Tipo", icon: "domain", placeholder: "Selecione o tipo de instituição" },
            { label: "Criar senha", icon: "key-outline", placeholder: "Digite a senha do email da instituição", secureTextEntry: true, autoComplete: "current-password" },
        ]
    },
    {
        id: "gestor", title: "+ Gestor", icon: "account-tie",
        campos: [
            { label: "Nome do Gestor", icon: "account-tie", keyboardType: "default", placeholder: "Ex: Maria Souza" },
            { label: "Instituição pertencente", icon: "domain", placeholder: "Selecione a instituição" },
            { label: "E-mail", icon: "email-outline", keyboardType: "email-address", placeholder: "voce@exemplo.com", autoComplete: "email" },
            { label: "Criar senha", icon: "key-outline", placeholder: "Digite a senha do gestor", secureTextEntry: true, autoComplete: "current-password" }
        ]
    },
    {
        id: "aluno", title: "+ Aluno", icon: "account-school",
        campos: [
            { label: "Nome do Aluno", icon: "account-school", keyboardType: "default", placeholder: "Ex: Maria Souza" },
            { label: "Instituição pertencente", icon: "domain", placeholder: "Selecione a instituição" },
            { label: "E-mail", icon: "email-outline", keyboardType: "email-address", placeholder: "voce@exemplo.com", autoComplete: "email" },
            { label: "Criar senha", icon: "key-outline", placeholder: "Digite a senha do aluno", secureTextEntry: true, autoComplete: "current-password" }
        ]
    },
]

export default function Cadastro() {
    const [abaAtiva, setAbaAtiva] = useState<AbaId>("instituicao")
    const router = useRouter()

    function routeBack() {
        router.back()
    }

    const abaAtivaInfo = abas.find((aba) => aba.id === abaAtiva)

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <Header onPress={routeBack} icon="arrow-left" size={27} />
            <ScrollView
                className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-grow gap-5">
                    <View className="flex-row h-10 justify-between bg-slate-800 rounded-full">
                        {abas.map((aba) => (
                            <View key={aba.id} className="w-1/3">
                                <Button
                                    typeButton="tabs"
                                    title={aba.title}
                                    icon={aba.icon}
                                    size={15}
                                    ativo={abaAtiva === aba.id}
                                    onPress={() => setAbaAtiva(aba.id)}
                                />
                            </View>
                        ))}
                    </View>
                    <View className="flex-grow p-5 bg-slate-800 border-slate-500 rounded-2xl w-full">
                        <Text className="text-xl font-bold dark:text-purple-100 mb-4">
                            <Icon name="form-select" size={22} color="white" /> CADASTRAR{" "}
                            {abaAtivaInfo?.title.replace("+ ", "").toUpperCase()}
                        </Text>
                        {abaAtivaInfo && (
                            <View key={abaAtiva} className="flex-grow gap-5">
                                {abaAtivaInfo.campos.map((campo, index) => (
                                    <Input
                                        key={campo.label}
                                        icon={campo.icon}
                                        size={20}
                                        color="#94a3b8"
                                        label={campo.label}
                                        placeholder={campo.placeholder}
                                        keyboardType={campo.keyboardType}
                                        secureTextEntry={campo.secureTextEntry}
                                        autoComplete={campo.autoComplete}
                                        autoCapitalize={campo.keyboardType === "email-address" ? "none" : undefined}
                                        returnKeyType={index === abaAtivaInfo.campos.length - 1 ? "done" : "next"}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}