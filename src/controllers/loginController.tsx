import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Usuario } from '../../types/User';

export function useLoginController() {
  const [ erro, setErro ] = useState(false)
  const [ erroMessage, setErroMessage ] = useState('')
  const [ inputEmail, setInputEmail ] = useState('')
  const [ inputSenha, setInputSenha ] = useState('')

  async function login() {
    setInputEmail(inputEmail)
    setInputSenha(inputSenha)
    
    if (inputEmail.trim().length === 0 || inputSenha.trim().length === 0) {
      setErroMessage("Preencha todos os campos.")
      setErro(true)

      return
    }

    const usuario : Usuario = {
      email: inputEmail,
      senha: inputSenha
    }

    const { error } = await supabase.auth.signInWithPassword({
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
      return 
    }

    return 'sucesso'
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
