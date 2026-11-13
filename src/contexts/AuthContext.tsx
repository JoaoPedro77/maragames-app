import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { resolvePerfil } from '@/lib/auth'
import type { UsuarioAutenticado } from '../../types/User'

type AuthContextValue = {
  session: Session | null
  usuario: UsuarioAutenticado | null
  carregando: boolean
  sair: () => Promise<void>
  recarregarPerfil: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null)
  const [carregando, setCarregando] = useState(true)

  const carregarPerfil = useCallback(async (sessao: Session | null) => {
    const email = sessao?.user?.email

    if (!email) {
      setUsuario(null)
      return
    }

    const perfil = await resolvePerfil(email)
    setUsuario(perfil)
  }, [])

  useEffect(() => {
    let ativo = true

    supabase.auth.getSession().then(async ({ data }) => {
      if (!ativo) {
        return
      }

      setSession(data.session)
      await carregarPerfil(data.session)

      if (ativo) {
        setCarregando(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, novaSessao) => {
      if (!ativo) {
        return
      }

      setSession(novaSessao)
      carregarPerfil(novaSessao).finally(() => {
        if (ativo) {
          setCarregando(false)
        }
      })
    })

    return () => {
      ativo = false
      subscription.unsubscribe()
    }
  }, [carregarPerfil])

  const sair = useCallback(async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUsuario(null)
  }, [])

  const recarregarPerfil = useCallback(async () => {
    const { data } = await supabase.auth.getSession()
    setSession(data.session)
    await carregarPerfil(data.session)
  }, [carregarPerfil])

  const value = useMemo(
    () => ({ session, usuario, carregando, sair, recarregarPerfil }),
    [session, usuario, carregando, sair, recarregarPerfil]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContext)

  if (!contexto) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return contexto
}
