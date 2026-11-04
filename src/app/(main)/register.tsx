import { Button } from "@/components/Button"
import { View, ScrollView, Text, TextInputProps, KeyboardAvoidingView, Platform } from "react-native"
import { useState } from "react"
import { Input } from "@/components/Input"
import { PageCard } from "@/components/PageCard"
import { Select } from "@/components/Select"
import type { MaterialDesignIconsIconName } from "@react-native-vector-icons/material-design-icons"
import { useRegisterController } from "@/controllers/registerController"
import type { AlunoInstituicao, GestorInstituicao, Instituicao } from "../../../types/User"

type Opcao = string | { label: string; value: string }

type Campo = {
    id: string
    label: string
    icon: MaterialDesignIconsIconName
    keyboardType?: TextInputProps["keyboardType"]
    placeholder?: string
    secureTextEntry?: boolean
    autoComplete?: TextInputProps["autoComplete"]
    options?: Opcao[]
    value?: string
    onChange?: (value: string) => void
}

type AbaId = "instituicao" | "gestor" | "aluno"

type Aba = {
    id: AbaId
    title: string
    icon: MaterialDesignIconsIconName
    campos: Campo[]
}

const instituicoesIniciais: Instituicao[] = [
    { id: 1, nome: "Colégio Maragames", email: "contato@maragames.com", tipo: "Ensino" },
    { id: 2, nome: "Universidade Norte", email: "adm@universidadenorte.com", tipo: "Ensino" },
    { id: 3, nome: "Instituto TechBR", email: "contato@techbr.com", tipo: "Empresa" },
]

const gestoresIniciais: GestorInstituicao[] = [
    { id: 1, instituicao_id: 1, nome: "Maria Souza", email: "maria.souza@maragames.com" },
]

const alunosIniciais: AlunoInstituicao[] = [
    {
        id: 1,
        instituicao_id: 1,
        nome: "João Lima",
        email: "joao.lima@aluno.com",
        xp: 120,
        nivel: 2,
        posicao_ranking: 5,
        trilhas_completas: 1,
        trilhas_andamento: 2,
        duvidas: null,
    },
]

function proximoId(itens: { id: number }[]) {
    return itens.reduce((maior, item) => Math.max(maior, item.id), 0) + 1
}

export default function Cadastro() {
    const [abaAtiva, setAbaAtiva] = useState<AbaId>("instituicao")
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>(instituicoesIniciais)
    const [gestores, setGestores] = useState<GestorInstituicao[]>(gestoresIniciais)
    const [alunos, setAlunos] = useState<AlunoInstituicao[]>(alunosIniciais)

    const {
        erro,
        erroMessage,
        sucesso,
        sucessoMessage,
        inputNome,
        setInputNome,
        inputEmail,
        setInputEmail,
        inputSenha,
        setInputSenha,
        inputTipo,
        setInputTipo,
        inputInstituicaoId,
        setInputInstituicaoId,
        cadastrar,
        limparFormulario
    } = useRegisterController()

    const opcoesInstituicoes: Opcao[] = instituicoes.map((instituicao) => ({
        label: instituicao.nome,
        value: String(instituicao.id),
    }))

    const abas: Aba[] = [
        {
            id: "instituicao", title: "Instituição", icon: "bank",
            campos: [
                { id: "nome", label: "Nome da Instituição", icon: "bank", keyboardType: "default", placeholder: "Ex: Colégio Maragames", value: inputNome, onChange: setInputNome },
                { id: "email", label: "E-mail", icon: "email-outline", keyboardType: "email-address", placeholder: "voce@exemplo.com", autoComplete: "email", value: inputEmail, onChange: setInputEmail },
                { id: "tipo", label: "Tipo", icon: "domain", placeholder: "Selecione o tipo de instituição", options: ["Ensino", "Empresa", "Órgão Público"], value: inputTipo, onChange: setInputTipo },
                { id: "senha", label: "Criar senha", icon: "key-outline", placeholder: "Digite a senha do email da instituição", secureTextEntry: true, autoComplete: "current-password", value: inputSenha, onChange: setInputSenha },
            ]
        },
        {
            id: "gestor", title: "Gestor", icon: "account-tie",
            campos: [
                { id: "nome", label: "Nome do Gestor", icon: "account-tie", keyboardType: "default", placeholder: "Ex: Maria Souza", value: inputNome, onChange: setInputNome },
                { id: "instituicao", label: "Instituição pertencente", icon: "domain", placeholder: "Selecione a instituição", options: opcoesInstituicoes, value: inputInstituicaoId, onChange: setInputInstituicaoId },
                { id: "email", label: "E-mail", icon: "email-outline", keyboardType: "email-address", placeholder: "voce@exemplo.com", autoComplete: "email", value: inputEmail, onChange: setInputEmail },
                { id: "senha", label: "Criar senha", icon: "key-outline", placeholder: "Digite a senha do gestor", secureTextEntry: true, autoComplete: "current-password", value: inputSenha, onChange: setInputSenha }
            ]
        },
        {
            id: "aluno", title: "Aluno", icon: "account-school",
            campos: [
                { id: "nome", label: "Nome do Aluno", icon: "account-school", keyboardType: "default", placeholder: "Ex: Maria Souza", value: inputNome, onChange: setInputNome },
                { id: "instituicao", label: "Instituição pertencente", icon: "domain", placeholder: "Selecione a instituição", options: opcoesInstituicoes, value: inputInstituicaoId, onChange: setInputInstituicaoId },
                { id: "email", label: "E-mail", icon: "email-outline", keyboardType: "email-address", placeholder: "voce@exemplo.com", autoComplete: "email", value: inputEmail, onChange: setInputEmail },
                { id: "senha", label: "Criar senha", icon: "key-outline", placeholder: "Digite a senha do aluno", secureTextEntry: true, autoComplete: "current-password", value: inputSenha, onChange: setInputSenha }
            ]
        },
    ]

    const abaAtivaInfo = abas.find((aba) => aba.id === abaAtiva)

    async function handleSubmit() {
        const emailsExistentes = [...instituicoes, ...gestores, ...alunos].map(
            (usuario) => usuario.email
        )
        const result = await cadastrar(abaAtiva, emailsExistentes)

        if (result.status !== 'sucesso') {
            return
        }

        if (result.role === 'instituicao') {
            setInstituicoes((prev) => [...prev, { ...result.usuario, id: proximoId(prev) }])
        } else if (result.role === 'gestor') {
            setGestores((prev) => [...prev, { ...result.usuario, id: proximoId(prev) }])
        } else {
            setAlunos((prev) => [...prev, { ...result.usuario, id: proximoId(prev) }])
        }

        limparFormulario()
    }

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
                        <Text className="text-sm text-slate-500 dark:text-slate-400">
                            Instituições: {instituicoes.length} | Gestores: {gestores.length} | Alunos: {alunos.length}
                        </Text>
                        <View key={abaAtiva} className="bg-white dark:bg-slate-900">
                            <PageCard
                                title={abaAtivaInfo ? `CADASTRAR ${abaAtivaInfo.title.replace("+ ", "").toUpperCase()}` : undefined}
                                icon="form-select"
                                footer={<Button onPress={handleSubmit} typeButton="default" title="Confirmar" icon="check" />}
                                footerClassName="mt-5"
                            >
                                {abaAtivaInfo && (
                                    <View className="flex-grow gap-5">
                                        {abaAtivaInfo.campos.map((campo, index) => {
                                            if (campo.options) {
                                                return (
                                                    <Select
                                                        key={campo.id}
                                                        icon={campo.icon}
                                                        size={20}
                                                        color="#94a3b8"
                                                        label={campo.label}
                                                        placeholder={campo.placeholder}
                                                        options={campo.options}
                                                        value={campo.value}
                                                        onChange={(value) => campo.onChange?.(value)}
                                                    />
                                                )
                                            }

                                            return (
                                                <Input
                                                    key={campo.id}
                                                    icon={campo.icon}
                                                    size={20}
                                                    color="#94a3b8"
                                                    label={campo.label}
                                                    placeholder={campo.placeholder}
                                                    keyboardType={campo.keyboardType}
                                                    secureTextEntry={campo.secureTextEntry}
                                                    autoComplete={campo.autoComplete}
                                                    value={campo.value}
                                                    onChangeText={campo.onChange}
                                                    autoCapitalize={campo.keyboardType === "email-address" ? "none" : undefined}
                                                    returnKeyType={index === abaAtivaInfo.campos.length - 1 ? "done" : "next"}
                                                />
                                            )
                                        })}
                                    </View>
                                )}
                                {erro && <Text className='text-red-500 text-md font-semibold'>{erroMessage}</Text>}
                                {sucesso && <Text className='text-emerald-600 text-md font-semibold'>{sucessoMessage}</Text>}

                            </PageCard>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}
