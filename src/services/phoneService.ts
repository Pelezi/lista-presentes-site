import api from './api';

export interface Phone {
    id: string;
    phoneType: string;
    numero: string;
    pessoaId?: string;
}

export const createPhone = async (phone: Phone): Promise<Phone> => {
    const response = await api.post<Phone>('/phones', phone);
    return response.data;
}

export const getPhones = async (): Promise<Phone[]> => {
    const response = await api.get<Phone[]>('/phones');
    return response.data;
}

export const getPhonesById = async (id: string): Promise<Phone> => {
    const response = await api.get<Phone>(`/phones/${id}`);
    return response.data;
}

export const updatePhone = async (phone: Phone): Promise<Phone> => {
    const response = await api.put<Phone>(`/phones/${phone.id}`, phone);
    return response.data;
}

export const deletePhone = async (id: string | undefined): Promise<Phone> => {
    const response = await api.delete<Phone>(`/phones/${id}`);
    return response.data;
}

export const createOrUpdatePhone = async (phone: Phone): Promise<Phone> => {
    if (!phone.id) {
        return await createPhone(phone);
    } else {
        return await updatePhone(phone);
    }
}