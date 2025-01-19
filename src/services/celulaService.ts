import api from './api';

export interface Celula {
    id: string;
    nome: string;
    diaDaSemana?: string;
    horario?: string;
    liderId?: {
        id?: string,
        pessoaId?: {
            id?: string,
            nome?: string
        }
    };
    discipuladorId?: {
        id?: string,
        pessoaId?: {
            id?: string,
            nome?: string
        }
    };
    enderecoId?: {
        id?: string;
        numero?: string;
        rua?: string;
        bairro?: string;
    };
    pessoas?: Array<
        {
            id?: string;
            nome?: string;
        }
    >;
}

export const createCelula = async (celula: Celula): Promise<Celula> => {
    const response = await api.post<Celula>('/celulas', celula);
    return response.data;
}

export const getCelulas = async (): Promise<Celula[]> => {
    const response = await api.get<Celula[]>('/celulas');
    return response.data;
}

export const getCelulasById = async (id: string): Promise<Celula> => {
    const response = await api.get<Celula>(`/celulas/${id}`);
    return response.data;
}

export const getCelulasByLiderId = async (id: string): Promise<Celula[]> => {
    const response = await api.get<Celula[]>(`/celulas/lider/${id}`);
    return response.data;
}

export const getCelulasByDiscipuladorId = async (id: string): Promise<Celula[]> => {
    const response = await api.get<Celula[]>(`/celulas/discipulador/${id}`);
    return response.data;
}

export const getCelulasByDiaDaSemana = async (dia: string): Promise<Celula[]> => {
    const response = await api.get<Celula[]>(`/celulas/diaDaSemana/${dia}`);
    return response.data;
}

export const getCelulasByHorario = async (horario: string): Promise<Celula[]> => {
    const response = await api.get<Celula[]>(`/celulas/horario/${horario}`);
    return response.data;
}

export const getCelulasByBairro = async (bairro: string): Promise<Celula[]> => {
    const response = await api.get<Celula[]>(`/celulas/enderecoIdBairro/${bairro}`);
    return response.data;
}

export const updateCelula = async (celula: Celula): Promise<Celula> => {
    const response = await api.put<Celula>(`/celulas/${celula.id}`, celula);
    return response.data;
}

export const deleteCelula = async (id: string | undefined): Promise<Celula> => {
    const response = await api.delete<Celula>(`/celulas/${id}`);
    return response.data;
}

export const removeLiderFromCelula = async (celulaId: string): Promise<Celula> => {
    const response = await api.put<Celula>(`/celulas/removeLider/${celulaId}`);
    return response.data;
}

export const addLiderToCelula = async (celulaId: string, liderId: string): Promise<Celula> => {
    const response = await api.put<Celula>(`/celulas/addLider/${celulaId}/${liderId}`);
    return response.data;
}

export const removeDiscipuladorFromCelula = async (celulaId: string): Promise<Celula> => {
    const response = await api.put<Celula>(`/celulas/removeDiscipulador/${celulaId}`);
    return response.data;
}

export const addDiscipuladorToCelula = async (celulaId: string, discipuladorId: string): Promise<Celula> => {
    const response = await api.put<Celula>(`/celulas/addDiscipulador/${celulaId}/${discipuladorId}`);
    return response.data;
}

export const createOrUpdateCelula = async (celula: Celula): Promise<Celula> => {
    if (!celula.id) {
        return await createCelula(celula);
    } else {
        return await updateCelula(celula);
    }
}