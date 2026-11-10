import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { AlunoInstituicao } from '../../types/User'

const COLUNAS_ALUNO =
  'id, instituicao_id, nome, email, xp, nivel, trilhas_completas, trilhas_andamento, duvidas'

export type AlunoRanking = AlunoInstituicao & {
  rank: number
  trilhasConcluidas: number
}

export function useRankController() {
  const [alunos, setAlunos] = useState<AlunoRanking[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(false)

  const carregarRanking = useCallback(async () => {
    setCarregando(true)
    setErro(false)

    try {
      const { data, error } = await supabase
        .from('aluno_instituicao')
        .select(COLUNAS_ALUNO)
        .order('xp', { ascending: false })

      if (error) {
        setAlunos([])
        setErro(true)
        return
      }

      const ranking = ((data ?? []) as AlunoInstituicao[]).map((aluno, index) => ({
        ...aluno,
        rank: index + 1,
        trilhasConcluidas: aluno.trilhas_completas,
      }))

      setAlunos(ranking)
    } catch {
      setAlunos([])
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [])

  return {
    alunos,
    carregando,
    erro,
    carregarRanking,
  }
}
