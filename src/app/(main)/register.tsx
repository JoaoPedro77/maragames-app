import { Button } from "@/components/Button"
import { View, ScrollView, Text, TextInputProps, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react"
import { Input } from "@/components/Input"
import { PageCard } from "@/components/PageCard"
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
        id: "instituicao", title: "Instituição", icon: "bank",
        campos: [
            { label: "Nome da Instituição", icon: "bank", keyboardType: "default", placeholder: "Ex: Colégio Maragames" },
            { label: "E-mail", icon: "email-outline", keyboardType: "email-address", placeholder: "voce@exemplo.com", autoComplete: "email" },
            { label: "Tipo", icon: "domain", placeholder: "Selecione o tipo de instituição" },
            { label: "Criar senha", icon: "key-outline", placeholder: "Digite a senha do email da instituição", secureTextEntry: true, autoComplete: "current-password" },
        ]
    },
    {
        id: "gestor", title: "Gestor", icon: "account-tie",
        campos: [
            { label: "Nome do Gestor", icon: "account-tie", keyboardType: "default", placeholder: "Ex: Maria Souza" },
            { label: "Instituição pertencente", icon: "domain", placeholder: "Selecione a instituição" },
            { label: "E-mail", icon: "email-outline", keyboardType: "email-address", placeholder: "voce@exemplo.com", autoComplete: "email" },
            { label: "Criar senha", icon: "key-outline", placeholder: "Digite a senha do gestor", secureTextEntry: true, autoComplete: "current-password" }
        ]
    },
    {
        id: "aluno", title: "Aluno", icon: "account-school",
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

    const abaAtivaInfo = abas.find((aba) => aba.id === abaAtiva)

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : "padding"}
            >
                <ScrollView
                    className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-grow gap-5">
                        <Text className="text-lg leading-6 text-slate-600 dark:text-slate-400">
                            Selecione o tipo de cadastro:
                        </Text>
                        <View className="flex-row h-10 justify-between bg-slate-100 dark:bg-slate-800 rounded-xl">
                            {abas.map((aba) => (
                                <View key={aba.id} className="w-1/3">
                                    <Button
                                        typeButton="tabs"
                                        title={aba.title}
                                        color='#334155'
                                        darkColor='white'
                                        icon={aba.icon}
                                        size={15}
                                        ativo={abaAtiva === aba.id}
                                        onPress={() => setAbaAtiva(aba.id)}
                                    />
                                </View>
                            ))}
                        </View>
                        <View key={abaAtiva} className="bg-white dark:bg-slate-900">
                            <PageCard
                                title={abaAtivaInfo ? `CADASTRAR ${abaAtivaInfo.title.replace("+ ", "").toUpperCase()}` : undefined}
                                icon="form-select"
                                footer={<Button typeButton="default" title="Confirmar" icon="check" />}
                                footerClassName="mt-5"
                            >
                                {abaAtivaInfo && (
                                    <View className="flex-grow gap-5">
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
                            </PageCard>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}
