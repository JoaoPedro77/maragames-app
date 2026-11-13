import { useEffect, useMemo } from 'react'
import { usePathname, useRouter, type Href } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'
import type { Perfil } from '../../types/User'

export function homePorPerfil(perfil: Perfil): Href {
  if (perfil === 'admin') {
    return '/institutions'
  }

  if (perfil === 'gestor') {
    return '/institution'
  }

  return '/profile'
}

export function useRequireRole(permitidos: Perfil[], rota?: string) {
  const { usuario, carregando } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const chavePermitidos = permitidos.join('|')
  const perfisPermitidos = useMemo(
    () => chavePermitidos.split('|') as Perfil[],
    [chavePermitidos]
  )

  useEffect(() => {
    if (carregando) {
      return
    }

    if (!usuario) {
      router.replace('/login')
      return
    }

    if (rota && pathname !== rota) {
      return
    }

    if (!perfisPermitidos.includes(usuario.perfil)) {
      router.replace(homePorPerfil(usuario.perfil))
    }
  }, [usuario, carregando, perfisPermitidos, pathname, rota, router])

  const autorizado =
    !carregando && !!usuario && perfisPermitidos.includes(usuario.perfil)

  return { carregando, autorizado }
}
