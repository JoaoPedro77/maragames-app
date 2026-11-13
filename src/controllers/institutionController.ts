import { useCallback, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { AlunoInstituicao, Instituicao } from '../../types/User'

const COLUNAS_INSTITUICAO = 'id, nome, email, tipo'
const COLUNAS_ALUNO =
  'id, instituicao_id, nome, email, xp, nivel, trilhas_completas, trilhas_andamento, duvidas'

export type MetricasInstituicao = {
  totalAlunos: number
  trilhasConcluidas: number
  nivelMedio: number
  xpMedio: number
  alunosComDuvidas: number
}

export function useInstitutionDashboardController(
  instituicaoId?: number | null
) {
  const [instituicao, setInstituicao] = useState<Instituicao | null>(null)
  const [alunos, setAlunos] = useState<AlunoInstituicao[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(false)

  const metricas = useMemo<MetricasInstituicao>(() => {
    const totalAlunos = alunos.length

    if (totalAlunos === 0) {
      return {
        totalAlunos: 0,
        trilhasConcluidas: 0,
        nivelMedio: 0,
        xpMedio: 0,
        alunosComDuvidas: 0,
      }
    }

    const somaNivel = alunos.reduce((soma, aluno) => soma + aluno.nivel, 0)
    const somaXp = alunos.reduce((soma, aluno) => soma + aluno.xp, 0)
    const trilhasConcluidas = alunos.reduce(
      (soma, aluno) => soma + aluno.trilhas_completas,
      0
    )
    const alunosComDuvidas = alunos.filter(
      (aluno) => aluno.duvidas?.trim().length
    ).length

    return {
      totalAlunos,
      trilhasConcluidas,
      nivelMedio: Math.round((somaNivel / totalAlunos) * 10) / 10,
      xpMedio: Math.round(somaXp / totalAlunos),
      alunosComDuvidas,
    }
  }, [alunos])

  const topAlunos = useMemo(
    () =>
      [...alunos]
        .sort((a, b) => b.xp - a.xp)
        .slice(0, 3),
    [alunos]
  )

  const dificuldades = useMemo(
    () =>
      alunos
        .filter((aluno) => aluno.duvidas?.trim().length)
        .slice(0, 3),
    [alunos]
  )

  const carregarDashboard = useCallback(async () => {
    if (!instituicaoId || Number.isNaN(instituicaoId)) {
      setInstituicao(null)
      setAlunos([])
      setErro(false)
      setCarregando(false)
      return
    }

    setCarregando(true)
    setErro(false)

    try {
      const [instituicaoResult, alunosResult] = await Promise.all([
        supabase
          .from('instituicao')
          .select(COLUNAS_INSTITUICAO)
          .eq('id', instituicaoId)
          .maybeSingle(),
        supabase
          .from('aluno_instituicao')
          .select(COLUNAS_ALUNO)
          .eq('instituicao_id', instituicaoId)
          .order('xp', { ascending: false }),
      ])

      if (instituicaoResult.error || !instituicaoResult.data || alunosResult.error) {
        setInstituicao(null)
        setAlunos([])
        setErro(true)
        return
      }

      setInstituicao(instituicaoResult.data as Instituicao)
      setAlunos((alunosResult.data ?? []) as AlunoInstituicao[])
    } catch {
      setInstituicao(null)
      setAlunos([])
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [instituicaoId])

  return {
    instituicao,
    alunos,
    metricas,
    topAlunos,
    dificuldades,
    carregando,
    erro,
    carregarDashboard,
  }
}
