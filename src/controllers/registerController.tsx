import { useState } from 'react';
import type {
  AlunoInstituicao,
  CadastroResult,
  GestorInstituicao,
  Instituicao,
  Role,
} from '../../types/User';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SENHA_MIN_LENGTH = 6

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
    const faltaSenha = senha.length === 0
    const faltaTipo = role === 'instituicao' && tipo.length === 0
    const faltaInstituicao = role !== 'instituicao' && !instituicaoSelecionada

    if (faltaNome || faltaEmail || faltaSenha || faltaTipo || faltaInstituicao) {
      return falhar("Preencha todos os campos.")
    }

    if (!EMAIL_REGEX.test(email)) {
      return falhar("Informe um e-mail válido.")
    }

    if (senha.length < SENHA_MIN_LENGTH) {
      return falhar(`A senha deve ter no mínimo ${SENHA_MIN_LENGTH} caracteres.`)
    }

    const emailDuplicado = emailsExistentes.some(
      (existente) => existente.trim().toLowerCase() === email
    )

    if (emailDuplicado) {
      return falhar("E-mail já cadastrado.")
    }

    setSucesso(true)
    setSucessoMessage("Cadastro realizado com sucesso.")

    if (role === 'instituicao') {
      const usuario: Omit<Instituicao, 'id'> = { nome, email, tipo }

      return { status: 'sucesso', role, usuario }
    }

    if (role === 'gestor') {
      const usuario: Omit<GestorInstituicao, 'id'> = {
        nome,
        email,
        instituicao_id: instituicaoId,
      }

      return { status: 'sucesso', role, usuario }
    }

    const usuario: Omit<AlunoInstituicao, 'id'> = {
      nome,
      email,
      instituicao_id: instituicaoId,
      xp: 0,
      nivel: 1,
      posicao_ranking: null,
      trilhas_completas: 0,
      trilhas_andamento: 0,
      duvidas: null,
    }

    return { status: 'sucesso', role, usuario }
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
    limparFormulario,
  }
}
