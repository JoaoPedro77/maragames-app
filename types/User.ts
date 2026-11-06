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

export type CadastroResult =
    | { status: 'erro'; message: string }
    | { status: 'sucesso'; role: 'instituicao'; usuario: Instituicao }
    | { status: 'sucesso'; role: 'gestor'; usuario: GestorInstituicao }
    | { status: 'sucesso'; role: 'aluno'; usuario: AlunoInstituicao }
