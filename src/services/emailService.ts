import api from './api';

export interface Email {
    id: string;
    emailType: string;
    email: string;
    pessoaId?: string;
}

export const createEmail = async (email: Email): Promise<Email> => {
    const response = await api.post<Email>('/emails', email);
    return response.data;
}

export const getEmails = async (): Promise<Email[]> => {
    const response = await api.get<Email[]>('/emails');
    return response.data;
}

export const getEmailsById = async (id: string): Promise<Email> => {
    const response = await api.get<Email>(`/emails/${id}`);
    return response.data;
}

export const updateEmail = async (email: Email): Promise<Email> => {
    const response = await api.put<Email>(`/emails/${email.id}`, email);
    return response.data;
}

export const deleteEmail = async (id: string | undefined): Promise<Email> => {
    const response = await api.delete<Email>(`/emails/${id}`);
    return response.data;
}

export const createOrUpdateEmail = async (email: Email): Promise<Email> => {
    if (!email.id) {
        return await createEmail(email);
    } else {
        return await updateEmail(email);
    }
}