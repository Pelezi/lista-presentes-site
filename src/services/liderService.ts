import api from './api';

export interface Lider {
    id: string;
    pessoaId: {
        id: string
        nome?: string;
    };
    celulas?: {
            id?: string;
            nome?: string;
            
    }[];
}

export const createLider = async (lider: Lider): Promise<Lider> => {
    const response = await api.post<Lider>('/lideres', lider);
    return response.data;
}

export const getLideres = async (): Promise<Lider[]> => {
    const response = await api.get<Lider[]>('/lideres');
    return response.data;
}

export const getLiderById = async (id: string): Promise<Lider> => {
    const response = await api.get<Lider>(`/lideres/${id}`);
    return response.data;
}

export const getLiderByPessoaId = async (id: string): Promise<Lider> => {
    const response = await api.get<Lider>(`/lideres/pessoa/${id}`);
    return response.data;
}

export const updateLider = async (lider: Lider): Promise<Lider> => {
    const response = await api.put<Lider>(`/lideres/${lider.id}`, lider);
    return response.data;
}

export const deleteLider = async (id: string | undefined): Promise<Lider> => {
    const response = await api.delete<Lider>(`/lideres/${id}`);
    return response.data;
}

export const createOrUpdateLider = async (lider: Lider): Promise<Lider> => {
    if (!lider.id) {
        return await createLider(lider);
    } else {
        return await updateLider(lider);
    }
}