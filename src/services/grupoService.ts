import api from './api';

export interface Grupo {
    id: string;
    nome: string;
    grupoType?: string;
    diretorId?: {
        id?: string,
        pessoaId?: {
            id?: string,
            nome?: string
        }
    };
    integrantes?: Array<
        {
            id?: string;
            nome?: string;
        }
    >
}

export const createGrupo = async (grupo: Grupo): Promise<Grupo> => {
    const response = await api.post<Grupo>('/grupos', grupo);
    return response.data;
}

export const getGrupos = async (): Promise<Grupo[]> => {
    const response = await api.get<Grupo[]>('/grupos');
    return response.data;
}

export const getGruposById = async (id: string): Promise<Grupo> => {
    const response = await api.get<Grupo>(`/grupos/${id}`);
    return response.data;
}

export const getGruposByDiretorId = async (id: string): Promise<Grupo[]> => {
    const response = await api.get<Grupo[]>(`/grupos/diretor/${id}`);
    return response.data;
}

export const getGruposByType = async (type: string): Promise<Grupo[]> => {
    const response = await api.get<Grupo[]>(`/grupos/grupoType/${type}`);
    return response.data;

}

export const getGruposByIntegranteId = async (id: string): Promise<Grupo[]> => {
    const response = await api.get<Grupo[]>(`/grupos/integrante/${id}`);
    return response.data;

}

export const updateGrupo = async (grupo: Grupo): Promise<Grupo> => {
    const response = await api.put<Grupo>(`/grupos/${grupo.id}`, grupo);
    return response.data;
}

export const deleteGrupo = async (id: string | undefined): Promise<Grupo> => {
    const response = await api.delete<Grupo>(`/grupos/${id}`);
    return response.data;
}

export const removeDiretorFromGrupo = async (id: string): Promise<Grupo> => {
    const response = await api.put<Grupo>(`/grupos/removeDiretor/${id}`);
    return response.data;
}

export const createOrUpdateGrupo = async (grupo: Grupo): Promise<Grupo> => {
    if (!grupo.id) {
        return await createGrupo(grupo);
    } else {
        return await updateGrupo(grupo);
    }
}