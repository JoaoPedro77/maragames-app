import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Instituicao, InstituicaoResumo } from '../../types/User'

const COLUNAS_INSTITUICAO = 'id, nome, email, tipo'

type Contagem = { instituicao_id: number }

function contarPorInstituicao(linhas: Contagem[] | null) {
  const contagens = new Map<number, number>()

  linhas?.forEach(({ instituicao_id }) => {
    contagens.set(instituicao_id, (contagens.get(instituicao_id) ?? 0) + 1)
  })

  return contagens
}

export function useInstitutionsController() {
  const [instituicoes, setInstituicoes] = useState<InstituicaoResumo[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(false)

  const carregarInstituicoes = useCallback(async () => {
    setCarregando(true)
    setErro(false)

    try {
      const [instituicoesResult, gestoresResult, alunosResult] = await Promise.all([
        supabase.from('instituicao').select(COLUNAS_INSTITUICAO).order('nome'),
        supabase.from('gestor_instituicao').select('instituicao_id'),
        supabase.from('aluno_instituicao').select('instituicao_id'),
      ])

      if (instituicoesResult.error || gestoresResult.error || alunosResult.error) {
        setInstituicoes([])
        setErro(true)
        return
      }

      const gestoresPorInstituicao = contarPorInstituicao(
        gestoresResult.data as Contagem[] | null
      )
      const alunosPorInstituicao = contarPorInstituicao(
        alunosResult.data as Contagem[] | null
      )

      const resumo = ((instituicoesResult.data ?? []) as Instituicao[]).map(
        (instituicao) => ({
          ...instituicao,
          gestoresCount: gestoresPorInstituicao.get(instituicao.id) ?? 0,
          alunosCount: alunosPorInstituicao.get(instituicao.id) ?? 0,
        })
      )

      setInstituicoes(resumo)
    } catch {
      setInstituicoes([])
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [])

  return {
    instituicoes,
    carregando,
    erro,
    carregarInstituicoes,
  }
}
