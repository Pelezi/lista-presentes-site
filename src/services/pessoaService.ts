import api from './api';

export interface Pessoa {
    id: string;
    nome: string;
    cargo: string;
    enderecoId?: {
        id?: string;
        numero?: string;
        rua?: string;
        bairro?: string;
    };
    phones?: {
        id?: string;
        numero?: string;
        phoneType?: string;
    }[];
    emails?: {
        id?: string;
        email?: string;
        emailType?: string;
    }[];
    celulaId?: {
        id?: string;
        nome?: string;
        liderId?: {
            id?: string,
            pessoaId?: {
                id?: string,
                nome?: string
            }
        };
    };
    grupos?: {
        id?: string,
        nome?: string,
    }[];
}

export const createPessoa = async (pessoa: Pessoa): Promise<Pessoa> => {
    const response = await api.post<Pessoa>('/pessoas', pessoa);
    return response.data;
}

export const getPessoas = async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>('/pessoas');
    return response.data;
}

export const getPessoaById = async (id: string): Promise<Pessoa> => {
    const response = await api.get<Pessoa>(`/pessoas/${id}`);
    return response.data;
}

export const getPessoasByCargo = async (cargo: string): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>(`/pessoas/cargo/${cargo}`);
    return response.data;

}

export const getPessoasByBairro = async (bairro: string): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>(`/pessoas/endereco/bairro/${bairro}`);
    return response.data;


}

export const getPessoasByCelulaId = async (id: string): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>(`/pessoas/celula/${id}`);
    return response.data;

}

export const getPessoasByGrupoId = async (id: string): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>(`/pessoas/grupo/${id}`);
    return response.data;

}

export const updatePessoa = async (pessoa: Pessoa): Promise<Pessoa> => {
    const response = await api.put<Pessoa>(`/pessoas/${pessoa.id}`, pessoa);
    return response.data;
}

export const deletePessoa = async (id: string | undefined): Promise<Pessoa> => {
    const response = await api.delete<Pessoa>(`/pessoas/${id}`);
    return response.data;
}

export const removePessoaFromCelula = async (id: string): Promise<Pessoa> => {
    const response = await api.put<Pessoa>(`/pessoas/removeCelula/${id}`);
    return response.data;
}

export const addPessoaToCelula = async (id: string, celulaId: string): Promise<Pessoa> => {
    const response = await api.put<Pessoa>(`/pessoas/addCelula/${id}/${celulaId}`);
    return response.data;
}

export const removePessoaFromGrupo = async (id: string, grupoId: string): Promise<Pessoa> => {
    const response = await api.put<Pessoa>(`/pessoas/removeGrupo/${id}/${grupoId}`);
    return response.data;
}

export const addPessoaToGrupo = async (id: string, grupoId: string): Promise<Pessoa> => {
    const response = await api.put<Pessoa>(`/pessoas/addGrupo/${id}/${grupoId}`);
    return response.data;
}

export const createOrUpdatePessoa = async (pessoa: Pessoa): Promise<Pessoa> => {
    if (!pessoa.id) {
        return await createPessoa(pessoa);
    } else {
        return await updatePessoa(pessoa);
    }
}