export type Instituicao = {
    id: number
    nome: string
    email: string
    tipo: string
}

export type GestorInstituicao = {
    id: number
    instituicao_id: number
    nome: string
    email: string
}

export type AlunoInstituicao = {
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
