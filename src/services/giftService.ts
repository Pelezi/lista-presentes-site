import api from './api';

export interface Gift {
    id: string;
    name: string;
    photoUrl: string;
    quantity: number;
    description: string;
    guests?: Array<
        {
            count: number; // changed from string to number
            guest:{
                id: string;
                name: string;
                phone: string;
                
            };
        }
    >;
}

export const createGift = async (gift: Gift): Promise<Gift> => {
    const response = await api.post<Gift>('/gifts', gift);
    return response.data;
}

export const getGifts = async (): Promise<Gift[]> => {
    const response = await api.get<Gift[]>('/gifts');
    return response.data;
}

export const getGiftsById = async (id: string): Promise<Gift> => {
    const response = await api.get<Gift>(`/gifts/info/${id}`);
    return response.data;
}

export const getGiftsByGuestId = async (id: string): Promise<Gift[]> => {
    const response = await api.get<Gift[]>(`/gifts/guest/${id}`);
    return response.data;
}

export const updateGift = async (gift: Gift): Promise<Gift> => {
    const response = await api.put<Gift>(`/gifts/${gift.id}`, gift);
    return response.data;
}

export const deleteGift = async (id: string ): Promise<Gift> => {
    const response = await api.delete<Gift>(`/gifts/${id}`);
    return response.data;
}

export const addGuiftToGuest = async (giftId: string, guestId: string): Promise<Gift> => {
    const response = await api.post<Gift>(`/gifts/${giftId}/guest/${guestId}`);
    return response.data;
}

export const removeGiftFromGuest = async (giftId: string, guestId: string): Promise<Gift> => {
    const response = await api.delete<Gift>(`/gifts/${giftId}/guest/${guestId}`);
    return response.data;
}

export const createOrUpdateGift = async (gift: Gift): Promise<Gift> => {
    if (!gift.id) {
        return await createGift(gift);
    } else {
        return await updateGift(gift);
    }
}