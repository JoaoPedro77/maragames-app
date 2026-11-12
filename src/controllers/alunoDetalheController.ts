import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { AlunoInstituicao } from '../../types/User'

const COLUNAS_ALUNO =
  'id, instituicao_id, nome, email, xp, nivel, trilhas_completas, trilhas_andamento, duvidas'
const COLUNAS_RANKING = 'id, xp'

export type AlunoDetalhe = AlunoInstituicao & {
  rank: number | null
}

export function useAlunoDetalheController(id?: string) {
  const { usuario } = useAuth()
  const [aluno, setAluno] = useState<AlunoDetalhe | null>(null)
  const [carregando, setCarregando] = useState(Boolean(id))
  const [erro, setErro] = useState(false)
  const [semPermissao, setSemPermissao] = useState(false)

  const perfil = usuario?.perfil ?? null
  const usuarioId = usuario?.id ?? null
  const instituicaoId = usuario?.instituicaoId ?? null

  const carregarAluno = useCallback(async () => {
    if (!id) {
      setAluno(null)
      setErro(false)
      setSemPermissao(false)
      setCarregando(false)
      return
    }

    const alunoId = Number(id)

    if (Number.isNaN(alunoId)) {
      setAluno(null)
      setErro(true)
      setSemPermissao(false)
      setCarregando(false)
      return
    }

    setCarregando(true)
    setErro(false)
    setSemPermissao(false)

    try {
      if (perfil === 'aluno' && (usuarioId === null || alunoId !== usuarioId)) {
        setAluno(null)
        setSemPermissao(true)
        return
      }

      const escopoInstituicao = perfil === 'admin' ? null : instituicaoId

      if (perfil !== 'admin' && escopoInstituicao === null) {
        setAluno(null)
        setSemPermissao(true)
        return
      }

      let consulta = supabase
        .from('aluno_instituicao')
        .select(COLUNAS_ALUNO)
        .eq('id', alunoId)

      if (escopoInstituicao !== null) {
        consulta = consulta.eq('instituicao_id', escopoInstituicao)
      }

      const { data, error } = await consulta.maybeSingle()

      if (error) {
        setAluno(null)
        setErro(true)
        return
      }

      if (!data) {
        setAluno(null)

        if (perfil === 'gestor') {
          setSemPermissao(true)
        } else {
          setErro(true)
        }

        return
      }

      let rankingQuery = supabase
        .from('aluno_instituicao')
        .select(COLUNAS_RANKING)

      if (escopoInstituicao !== null) {
        rankingQuery = rankingQuery.eq('instituicao_id', escopoInstituicao)
      }

      const { data: ranking, error: rankingError } = await rankingQuery.order(
        'xp',
        { ascending: false }
      )

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
  }, [id, perfil, usuarioId, instituicaoId])

  return {
    aluno,
    carregando,
    erro,
    semPermissao,
    carregarAluno,
  }
}
