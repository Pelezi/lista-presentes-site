import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Celula, deleteCelula, getCelulas } from "../../../services/celulaService";
import { Column, Table } from "../../../components/common/Table";


const ListarCelulas: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [celulas, setCelulas] = useState<Celula[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        // Get the filter value from the query parameters
        const queryParams = new URLSearchParams(location.search);
        const filterParam = queryParams.get("filter");
        if (filterParam) {
            setFilter(filterParam);
        }
    }, [location.search]);

    const fetchCelulas = async () => {
        try {
            const celulas = await getCelulas();
            setCelulas(celulas);
        } catch (error) {
            console.log('Erro ao buscar celulas', error);
        }
    };

    useEffect(() => {
        fetchCelulas();
    }, []);

    const handleEdit = (celula: Celula) => {
        navigate("/celulas/editar", { state: celula });
    }

    const handleDelete = async (celula: Celula) => {
        try {
            await deleteCelula(celula.id);
            fetchCelulas();
            alert("Celula removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover celula", error);
            alert("Erro ao remover celula. Tente novamente.");
        }
    };

    const capitalize = (str?: string) => {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const columns: Column<Celula>[] = [
        { header: "Nome", accessor: (item) => item.nome, type: "celula/", linkAccessor: (item) => item.id},
        { header: "Discipulador", accessor: (item) => item.discipuladorId?.pessoaId?.nome, type: "discipulador/", linkAccessor: (item) => item.discipuladorId?.id},
        { header: "Lider", accessor: (item) => item.liderId?.pessoaId?.nome, type: "lider/", linkAccessor: (item) => item.liderId?.id},
        { header: "Dia", accessor: (item) => capitalize(item.diaDaSemana), type: "celulas/listar?filter=", linkAccessor: (item) => item.diaDaSemana},
        { header: "Horário", accessor: (item) => item.horario?.split(':').slice(0, 2).join(':'), type: "celulas/listar?filter=", linkAccessor: (item) => item.horario},
        { header: "Bairro", accessor: (item) => item.enderecoId?.bairro, type: "celulas/listar?filter=", linkAccessor: (item) => item.enderecoId?.bairro},
    ];
    return (
        <Table
            columns={columns}
            data={celulas}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            initialFilter={filter}
        />
    )
};

export default ListarCelulas;