import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { resolvePerfil } from '@/lib/auth';
import type { Perfil, Usuario } from '../../types/User';

export type LoginResult =
  | { status: 'sucesso'; perfil: Perfil }
  | { status: 'erro' }

export function useLoginController() {
  const [ erro, setErro ] = useState(false)
  const [ erroMessage, setErroMessage ] = useState('')
  const [ inputEmail, setInputEmail ] = useState('')
  const [ inputSenha, setInputSenha ] = useState('')

  async function login(): Promise<LoginResult> {
    setErro(false)
    setErroMessage('')

    if (inputEmail.trim().length === 0 || inputSenha.trim().length === 0) {
      setErroMessage("Preencha todos os campos.")
      setErro(true)

      return { status: 'erro' }
    }

    const usuario : Usuario = {
      email: inputEmail.trim().toLowerCase(),
      senha: inputSenha
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: usuario.email,
      password: usuario.senha
    })

    if (error) {
      if (error.status !== 400) {
        setErroMessage(error.message)
      }
      else {
        setErroMessage("Credenciais incorretas, tente novamente.")
      }

      setErro(true)
      return { status: 'erro' }
    }

    const emailAutenticado = data.user?.email ?? usuario.email
    const perfil = await resolvePerfil(emailAutenticado)

    if (!perfil) {
      await supabase.auth.signOut().catch(() => undefined)
      setErroMessage("Usuário sem perfil autorizado nesta aplicação.")
      setErro(true)

      return { status: 'erro' }
    }

    return { status: 'sucesso', perfil: perfil.perfil }
  }

  return {
    erro,
    erroMessage,
    inputEmail,
    setInputEmail,
    inputSenha,
    setInputSenha,
    login,
  }
}
