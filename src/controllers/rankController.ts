import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { AlunoInstituicao } from '../../types/User'

const COLUNAS_ALUNO =
  'id, instituicao_id, nome, email, xp, nivel, trilhas_completas, trilhas_andamento, duvidas'

export type AlunoRanking = AlunoInstituicao & {
  rank: number
  trilhasConcluidas: number
}

export function useRankController() {
  const { usuario } = useAuth()
  const [alunos, setAlunos] = useState<AlunoRanking[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(false)

  const porInstituicao = usuario?.perfil === 'gestor'
  const instituicaoId = porInstituicao ? usuario?.instituicaoId ?? null : null

  const carregarRanking = useCallback(async () => {
    setCarregando(true)
    setErro(false)

    if (porInstituicao && instituicaoId === null) {
      setAlunos([])
      setErro(true)
      setCarregando(false)
      return
    }

    try {
      let consulta = supabase.from('aluno_instituicao').select(COLUNAS_ALUNO)

      if (instituicaoId !== null) {
        consulta = consulta.eq('instituicao_id', instituicaoId)
      }

      const { data, error } = await consulta.order('xp', { ascending: false })

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
  }, [porInstituicao, instituicaoId])

  return {
    alunos,
    carregando,
    erro,
    porInstituicao,
    carregarRanking,
  }
}
