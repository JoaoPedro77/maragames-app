import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { GestorInstituicao } from '../../types/User'

const COLUNAS_GESTOR = 'id, instituicao_id, nome, email'

export function useManagersController(instituicaoId?: number | null) {
  const [gestores, setGestores] = useState<GestorInstituicao[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(false)

  const carregarGestores = useCallback(async () => {
    if (!instituicaoId || Number.isNaN(instituicaoId)) {
      setGestores([])
      setErro(false)
      setCarregando(false)
      return
    }

    setCarregando(true)
    setErro(false)

    try {
      const { data, error } = await supabase
        .from('gestor_instituicao')
        .select(COLUNAS_GESTOR)
        .eq('instituicao_id', instituicaoId)
        .order('nome')

      if (error) {
        setGestores([])
        setErro(true)
        return
      }

      setGestores((data ?? []) as GestorInstituicao[])
    } catch {
      setGestores([])
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [instituicaoId])

  return {
    gestores,
    carregando,
    erro,
    carregarGestores,
  }
}
