import { useCallback, useState } from 'react';
import { supabase, supabaseCadastro } from '@/lib/supabase';
import type {
  AlunoInstituicao,
  CadastroResult,
  GestorInstituicao,
  Instituicao,
  Role,
} from '../../types/User';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SENHA_MIN_LENGTH = 6

const COLUNAS_INSTITUICAO = 'id, nome, email, tipo'
const COLUNAS_GESTOR = 'id, instituicao_id, nome, email'
const COLUNAS_ALUNO =
  'id, instituicao_id, nome, email, xp, nivel, trilhas_completas, trilhas_andamento, duvidas'

export type DadosCadastro = {
  instituicoes: Instituicao[]
  gestores: GestorInstituicao[]
  alunos: AlunoInstituicao[]
}

export function useRegisterController() {
  const [erro, setErro] = useState(false)
  const [erroMessage, setErroMessage] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [sucessoMessage, setSucessoMessage] = useState('')
  const [inputNome, setInputNome] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputSenha, setInputSenha] = useState('')
  const [inputTipo, setInputTipo] = useState('')
  const [inputInstituicaoId, setInputInstituicaoId] = useState('')

  function limparFormulario() {
    setInputNome('')
    setInputEmail('')
    setInputSenha('')
    setInputTipo('')
    setInputInstituicaoId('')
  }

  function falhar(message: string): CadastroResult {
    setErroMessage(message)
    setErro(true)

    return { status: 'erro', message }
  }

  const carregarDados = useCallback(async (): Promise<DadosCadastro | null> => {
    const [instituicoesResult, gestoresResult, alunosResult] = await Promise.all([
      supabase.from('instituicao').select(COLUNAS_INSTITUICAO).order('nome'),
      supabase.from('gestor_instituicao').select(COLUNAS_GESTOR).order('nome'),
      supabase.from('aluno_instituicao').select(COLUNAS_ALUNO).order('nome'),
    ])

    if (instituicoesResult.error || gestoresResult.error || alunosResult.error) {
      setErroMessage("Não foi possível carregar os dados.")
      setErro(true)

      return null
    }

    return {
      instituicoes: (instituicoesResult.data ?? []) as Instituicao[],
      gestores: (gestoresResult.data ?? []) as GestorInstituicao[],
      alunos: (alunosResult.data ?? []) as AlunoInstituicao[],
    }
  }, [])

  async function inserirPerfil(
    role: Role,
    dados: { nome: string; email: string; tipo: string; instituicaoId: number }
  ): Promise<CadastroResult> {
    if (role === 'instituicao') {
      const { data, error } = await supabase
        .from('instituicao')
        .insert({ nome: dados.nome, email: dados.email, tipo: dados.tipo })
        .select(COLUNAS_INSTITUICAO)
        .single()

      if (error || !data) {
        return falhar("Não foi possível concluir o cadastro. Tente novamente.")
      }

      return { status: 'sucesso', role, usuario: data as Instituicao }
    }

    if (role === 'gestor') {
      const { data, error } = await supabase
        .from('gestor_instituicao')
        .insert({
          nome: dados.nome,
          email: dados.email,
          instituicao_id: dados.instituicaoId,
        })
        .select(COLUNAS_GESTOR)
        .single()

      if (error || !data) {
        return falhar("Não foi possível concluir o cadastro. Tente novamente.")
      }

      return { status: 'sucesso', role, usuario: data as GestorInstituicao }
    }

    const { data, error } = await supabase
      .from('aluno_instituicao')
      .insert({
        nome: dados.nome,
        email: dados.email,
        instituicao_id: dados.instituicaoId,
      })
      .select(COLUNAS_ALUNO)
      .single()

    if (error || !data) {
      return falhar("Não foi possível concluir o cadastro. Tente novamente.")
    }

    return { status: 'sucesso', role, usuario: data as AlunoInstituicao }
  }

  async function cadastrar(role: Role, emailsExistentes: string[] = []): Promise<CadastroResult> {
    setErro(false)
    setErroMessage('')
    setSucesso(false)
    setSucessoMessage('')

    const nome = inputNome.trim()
    const email = inputEmail.trim().toLowerCase()
    const senha = inputSenha
    const tipo = inputTipo.trim()
    const instituicaoId = Number(inputInstituicaoId)
    const instituicaoSelecionada = inputInstituicaoId.trim().length > 0 && !Number.isNaN(instituicaoId)

    const faltaNome = nome.length === 0
    const faltaEmail = email.length === 0
    const faltaSenha = role !== 'instituicao' && senha.length === 0
    const faltaTipo = role === 'instituicao' && tipo.length === 0
    const faltaInstituicao = role !== 'instituicao' && !instituicaoSelecionada

    if (faltaNome || faltaEmail || faltaSenha || faltaTipo || faltaInstituicao) {
      return falhar("Preencha todos os campos.")
    }

    if (!EMAIL_REGEX.test(email)) {
      return falhar("Informe um e-mail válido.")
    }

    if (role !== 'instituicao' && senha.length < SENHA_MIN_LENGTH) {
      return falhar(`A senha deve ter no mínimo ${SENHA_MIN_LENGTH} caracteres.`)
    }

    const emailDuplicado = emailsExistentes.some(
      (existente) => existente.trim().toLowerCase() === email
    )

    if (emailDuplicado) {
      return falhar("E-mail já cadastrado.")
    }

    const criaContaAuth = role !== 'instituicao'

    try {
      if (criaContaAuth) {
        const { data: authData, error: authError } = await supabaseCadastro.auth.signUp({
          email,
          password: senha,
        })

        const mensagemAuth = authError?.message.toLowerCase() ?? ''
        const identidadesVazias = authData?.user?.identities?.length === 0
        const erroDuplicado = authError?.status === 422 || mensagemAuth.includes('already registered')

        if (erroDuplicado || identidadesVazias) {
          return falhar("E-mail já cadastrado.")
        }

        if (authError || !authData?.user) {
          return falhar(authError?.message ?? "Não foi possível realizar o cadastro. Tente novamente.")
        }
      }

      const result = await inserirPerfil(role, { nome, email, tipo, instituicaoId })

      if (criaContaAuth) {
        await supabaseCadastro.auth.signOut().catch(() => undefined)
      }

      if (result.status === 'erro') {
        return result
      }

      setSucesso(true)
      setSucessoMessage("Cadastro realizado com sucesso.")

      return result
    } catch {
      if (criaContaAuth) {
        await supabaseCadastro.auth.signOut().catch(() => undefined)
      }

      return falhar("Não foi possível conectar. Tente novamente.")
    }
  }

  return {
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
    carregarDados,
    limparFormulario,
  }
}
