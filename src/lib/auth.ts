import { supabase } from '@/lib/supabase'
import type { UsuarioAutenticado } from '../../types/User'

const COLUNAS_ADMIN = 'id, nome, email, ativo'
const COLUNAS_GESTOR = 'id, instituicao_id, nome, email'
const COLUNAS_ALUNO = 'id, instituicao_id, nome, email'

export async function resolvePerfil(email: string): Promise<UsuarioAutenticado | null> {
  const emailNormalizado = email.trim().toLowerCase()

  if (emailNormalizado.length === 0) {
    return null
  }

  const emailPattern = emailNormalizado.replace(/[\\%_]/g, '\\$&')

  const admin = await supabase
    .from('admin_maragames')
    .select(COLUNAS_ADMIN)
    .ilike('email', emailPattern)
    .eq('ativo', true)
    .maybeSingle()

  if (!admin.error && admin.data) {
    return {
      perfil: 'admin',
      id: admin.data.id,
      nome: admin.data.nome,
      email: admin.data.email,
      instituicaoId: null,
    }
  }

  const gestor = await supabase
    .from('gestor_instituicao')
    .select(COLUNAS_GESTOR)
    .ilike('email', emailPattern)
    .maybeSingle()

  if (!gestor.error && gestor.data) {
    return {
      perfil: 'gestor',
      id: gestor.data.id,
      nome: gestor.data.nome,
      email: gestor.data.email,
      instituicaoId: gestor.data.instituicao_id,
    }
  }

  const aluno = await supabase
    .from('aluno_instituicao')
    .select(COLUNAS_ALUNO)
    .ilike('email', emailPattern)
    .maybeSingle()

  if (!aluno.error && aluno.data) {
    return {
      perfil: 'aluno',
      id: aluno.data.id,
      nome: aluno.data.nome,
      email: aluno.data.email,
      instituicaoId: aluno.data.instituicao_id,
    }
  }

  return null
}
