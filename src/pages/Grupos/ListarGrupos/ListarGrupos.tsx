import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Grupo, deleteGrupo, getGrupos } from "../../../services/grupoService";
import { Column, Table } from "../../../components/common/Table";


const ListarGrupos: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        // Get the filter value from the query parameters
        const queryParams = new URLSearchParams(location.search);
        const filterParam = queryParams.get("filter");
        if (filterParam) {
            setFilter(filterParam);
        }
    }, [location.search]);

    const fetchGrupos = async () => {
        try {
            const grupos = await getGrupos();
            setGrupos(grupos);
        } catch (error) {
            console.log('Erro ao buscar grupos', error);
        }
    };

    useEffect(() => {
        fetchGrupos();
    }, []);

    const handleEdit = (grupo: Grupo) => {
        navigate("/grupos/editar", { state: grupo });
    }

    const handleDelete = async (grupo: Grupo) => {
        try {
            await deleteGrupo(grupo.id);
            fetchGrupos();
            alert("Grupo removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover grupo", error);
            alert("Erro ao remover grupo. Tente novamente.");
        }
    };

    const capitalize = (str?: string) => {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const columns: Column<Grupo>[] = [
        { header: "Nome", accessor: (item) => item.nome, type: "grupo/", linkAccessor: (item) => item.id},
        { header: "Diretor", accessor: (item) => item.diretorId?.pessoaId?.nome, type: "diretor/", linkAccessor: (item) => item.diretorId?.id},
        { header: "Tipo", accessor: (item) => capitalize(item.grupoType), type: "grupos/listar?filter=", linkAccessor: (item) => item.grupoType},
    ];
    return (
        <Table
            columns={columns}
            data={grupos}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            initialFilter={filter}
        />
    )
};

export default ListarGrupos;