import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Gift, deleteGift, getGifts } from "../../../services/giftService";


const ListarGifts: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        // Get the filter value from the query parameters
        const queryParams = new URLSearchParams(location.search);
        const filterParam = queryParams.get("filter");
        if (filterParam) {
            setFilter(filterParam);
        }
    }, [location.search]);

    const fetchGifts = async () => {
        try {
            const gifts = await getGifts();
            setGifts(gifts);
        } catch (error) {
            console.log('Erro ao buscar gifts', error);
        }
    };

    useEffect(() => {
        fetchGifts();
    }, []);

    const handleEdit = (gift: Gift) => {
        navigate("/gifts/editar", { state: gift });
    }

    const handleDelete = async (gift: Gift) => {
        try {
            await deleteGift(gift.id);
            fetchGifts();
            alert("Gift removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover gift", error);
            alert("Erro ao remover gift. Tente novamente.");
        }
    };

    const capitalize = (str?: string) => {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    // const columns: Column<Gift>[] = [
    //     { header: "Nome", accessor: (item) => item.name, type: "gift/", linkAccessor: (item) => item.id},
    //     // { header: "Discipulador", accessor: (item) => item.discipuladorId?.pessoaId?.nome, type: "discipulador/", linkAccessor: (item) => item.discipuladorId?.id},
    //     // { header: "Lider", accessor: (item) => item.liderId?.pessoaId?.nome, type: "lider/", linkAccessor: (item) => item.liderId?.id},
    //     // { header: "Dia", accessor: (item) => capitalize(item.diaDaSemana), type: "gifts/listar?filter=", linkAccessor: (item) => item.diaDaSemana},
    //     // { header: "Horário", accessor: (item) => item.horario?.split(':').slice(0, 2).join(':'), type: "gifts/listar?filter=", linkAccessor: (item) => item.horario},
    //     // { header: "Bairro", accessor: (item) => item.enderecoId?.bairro, type: "gifts/listar?filter=", linkAccessor: (item) => item.enderecoId?.bairro},
    // ];
    return (
        <div>hi</div>
    )
};

export default ListarGifts;