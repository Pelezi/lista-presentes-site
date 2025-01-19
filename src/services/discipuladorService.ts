import api from './api';

export interface Discipulador {
    id: string;
    pessoaId: {
        id: string
        nome?: string;
    };
    rede?: string;
    celulas?: {
            id?: string;
            nome?: string;
            
    }[];
}

export const createDiscipulador = async (discipulador: Discipulador): Promise<Discipulador> => {
    const response = await api.post<Discipulador>('/discipuladores', discipulador);
    return response.data;
}

export const getDiscipuladores = async (): Promise<Discipulador[]> => {
    const response = await api.get<Discipulador[]>('/discipuladores');
    return response.data;
}

export const getDiscipuladorById = async (id: string): Promise<Discipulador> => {
    const response = await api.get<Discipulador>(`/discipuladores/${id}`);
    return response.data;
}

export const getDiscipuladorByPessoaId = async (id: string): Promise<Discipulador> => {
    const response = await api.get<Discipulador>(`/discipuladores/pessoa/${id}`);
    return response.data;
}

export const updateDiscipulador = async (discipulador: Discipulador): Promise<Discipulador> => {
    const response = await api.put<Discipulador>(`/discipuladores/${discipulador.id}`, discipulador);
    return response.data;
}

export const deleteDiscipulador = async (id: string | undefined): Promise<Discipulador> => {
    const response = await api.delete<Discipulador>(`/discipuladores/${id}`);
    return response.data;
}

export const createOrUpdateDiscipulador = async (discipulador: Discipulador): Promise<Discipulador> => {
    if (!discipulador.id) {
        return await createDiscipulador(discipulador);
    } else {
        return await updateDiscipulador(discipulador);
    }
}