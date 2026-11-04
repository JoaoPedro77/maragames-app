export interface Usuario {
    email: string
    senha: string
}

export interface Instituicao {
    id: number
    nome: string
    email: string
    tipo: string
}

export interface GestorInstituicao {
    id: number
    instituicao_id: number
    nome: string
    email: string
}

export interface AlunoInstituicao {
    id: number
    instituicao_id: number
    nome: string
    email: string
    xp: number
    nivel: number
    posicao_ranking: number | null
    trilhas_completas: number
    trilhas_andamento: number
    duvidas: string | null
}

export type Role = 'instituicao' | 'gestor' | 'aluno'

export type CadastroInput = {
    role: Role
    nome: string
    email: string
    senha: string
    tipo?: string
    instituicaoId?: number
}

export type NovaInstituicao = Omit<Instituicao, 'id'>
export type NovoGestor = Omit<GestorInstituicao, 'id'>
export type NovoAluno = Omit<AlunoInstituicao, 'id'>

export type CadastroResult =
    | { status: 'erro'; message: string }
    | { status: 'sucesso'; role: 'instituicao'; usuario: NovaInstituicao }
    | { status: 'sucesso'; role: 'gestor'; usuario: NovoGestor }
    | { status: 'sucesso'; role: 'aluno'; usuario: NovoAluno }
