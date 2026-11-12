import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Instituicao } from '../../types/User'

const COLUNAS_INSTITUICAO = 'id, nome, email, tipo'

export function useInstitutionController(id?: number | null) {
  const [instituicao, setInstituicao] = useState<Instituicao | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(false)

  const carregarInstituicao = useCallback(async () => {
    if (!id) {
      setInstituicao(null)
      setErro(false)
      setCarregando(false)
      return
    }

    setCarregando(true)
    setErro(false)

    try {
      const { data, error } = await supabase
        .from('instituicao')
        .select(COLUNAS_INSTITUICAO)
        .eq('id', id)
        .maybeSingle()

      if (error || !data) {
        setInstituicao(null)
        setErro(true)
        return
      }

      setInstituicao(data as Instituicao)
    } catch {
      setInstituicao(null)
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [id])

  return {
    instituicao,
    carregando,
    erro,
    carregarInstituicao,
  }
}
