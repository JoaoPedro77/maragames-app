export interface Usuario {
    email: string
    senha: string
}

export interface Instituicao extends Usuario {
    id?: number
    nome: string
    tipo: string
}

export interface GestorInstituicao extends Usuario {
    id?: number
    instituicao_id?: number
    nome: string
}

export interface AlunoInstituicao extends Usuario {
    id?: number
    instituicao_id?: number
    xp: number
    nivel: number
    posicao_ranking: number | null
    trilhas_completas: number
    trilhas_andamento: number
    duvidas: string | null
}
