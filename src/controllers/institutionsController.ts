import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Instituicao } from '../../types/User'

const COLUNAS_INSTITUICAO = 'id, nome, email, tipo'

export function useInstitutionsController() {
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([])

  const carregarInstituicoes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('instituicao')
        .select(COLUNAS_INSTITUICAO)
        .order('nome')

      if (error) {
        setInstituicoes([])
        return
      }

      setInstituicoes((data ?? []) as Instituicao[])
    } catch {
      setInstituicoes([])
    }
  }, [])

  return {
    instituicoes,
    carregarInstituicoes,
  }
}
