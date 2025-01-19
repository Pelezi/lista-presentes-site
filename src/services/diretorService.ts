import api from './api';

export interface Diretor {
    id: string;
    pessoaId: {
        id: string
        nome?: string;
    };
    grupos?: {
            id?: string;
            nome?: string;
            
    }[];
}

export const createDiretor = async (diretor: Diretor): Promise<Diretor> => {
    const response = await api.post<Diretor>('/diretores', diretor);
    return response.data;
}

export const getDiretores = async (): Promise<Diretor[]> => {
    const response = await api.get<Diretor[]>('/diretores');
    return response.data;
}

export const getDiretorById = async (id: string): Promise<Diretor> => {
    const response = await api.get<Diretor>(`/diretores/${id}`);
    return response.data;
}

export const getDiretorByPessoaId = async (id: string): Promise<Diretor> => {
    const response = await api.get<Diretor>(`/diretores/pessoa/${id}`);
    return response.data;

}

export const updateDiretor = async (diretor: Diretor): Promise<Diretor> => {
    const response = await api.put<Diretor>(`/diretores/${diretor.id}`, diretor);
    return response.data;
}

export const deleteDiretor = async (id: string | undefined): Promise<Diretor> => {
    const response = await api.delete<Diretor>(`/diretores/${id}`);
    return response.data;
}

export const createOrUpdateDiretor = async (diretor: Diretor): Promise<Diretor> => {
    if (!diretor.id) {
        return await createDiretor(diretor);
    } else {
        return await updateDiretor(diretor);
    }
}