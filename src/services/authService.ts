import api from "./api";

export interface Guest {
    name: string;
    phone: string;
}

const formatPhone = (phone: string): string => {
    return phone.replace(/\D/g, '');
};

export const login = async (guest: Guest): Promise<Guest> => {
    const formattedGuest = {
        ...guest,
        phone: formatPhone(guest.phone),
    };
    const response = await api.get<Guest>(`/guests/phone/${formattedGuest.phone}/name/${formattedGuest.name}`);
    return response.data;
}