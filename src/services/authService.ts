import api from "./api";

export interface Guest {
    name: string;
    phone: string;
}

export const login = async (Guest: Guest): Promise<Guest> => {
    const response = await api.post<Guest>(`/guests/phone/${Guest.phone}/name/${Guest.name}`);
    return response.data;
} 