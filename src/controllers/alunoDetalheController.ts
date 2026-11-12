import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { AlunoInstituicao } from '../../types/User'

const COLUNAS_ALUNO =
  'id, instituicao_id, nome, email, xp, nivel, trilhas_completas, trilhas_andamento, duvidas'
const COLUNAS_RANKING = 'id, xp'

export type AlunoDetalhe = AlunoInstituicao & {
  rank: number | null
}

export function useAlunoDetalheController(id?: string) {
  const [aluno, setAluno] = useState<AlunoDetalhe | null>(null)
  const [carregando, setCarregando] = useState(Boolean(id))
  const [erro, setErro] = useState(false)

  const carregarAluno = useCallback(async () => {
    if (!id) {
      setAluno(null)
      setErro(false)
      setCarregando(false)
      return
    }

    const alunoId = Number(id)

    if (Number.isNaN(alunoId)) {
      setAluno(null)
      setErro(true)
      setCarregando(false)
      return
    }

    setCarregando(true)
    setErro(false)

    try {
      const { data, error } = await supabase
        .from('aluno_instituicao')
        .select(COLUNAS_ALUNO)
        .eq('id', alunoId)
        .maybeSingle()

      if (error || !data) {
        setAluno(null)
        setErro(true)
        return
      }

      const { data: ranking, error: rankingError } = await supabase
        .from('aluno_instituicao')
        .select(COLUNAS_RANKING)
        .order('xp', { ascending: false })

      let rank: number | null = null

      if (!rankingError && ranking) {
        const posicao = ranking.findIndex((item) => item.id === alunoId)
        rank = posicao >= 0 ? posicao + 1 : null
      }

      setAluno({ ...(data as AlunoInstituicao), rank })
    } catch {
      setAluno(null)
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [id])

  return {
    aluno,
    carregando,
    erro,
    carregarAluno,
  }
}
