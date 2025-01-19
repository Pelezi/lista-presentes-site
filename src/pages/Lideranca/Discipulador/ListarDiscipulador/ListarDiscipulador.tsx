import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { Table, Column } from "../../../../components/common/Table";

import { Discipulador, deleteDiscipulador, getDiscipuladores } from "../../../../services/discipuladorService";
import { Celula } from "../../../../services/celulaService";

const ListarDiscipulador: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [discipuladores, setDiscipuladores] = useState<Discipulador[]>([]);
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

    const fetchDiscipuladores = async () => {
        try {
            const discipuladores = await getDiscipuladores();
            setDiscipuladores(discipuladores);
        } catch (error) {
            console.log('Erro ao buscar líderes', error);
            
        }
    };

    useEffect(() => {
        fetchDiscipuladores();
    }, []);
    
    const handleDelete = async (discipulador: Discipulador) => {
        try {
            await deleteDiscipulador(discipulador.id);
            fetchDiscipuladores();
            alert("Discipulador removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover discipulador", error);
            alert("Erro ao remover discipulador. Tente novamente.");
            
        }
    };

    const handleEdit = (discipulador: Discipulador) => {
        navigate("/discipuladores/editar", { state: discipulador });
    }

    const columns: Column<Discipulador>[] = [
        { header: "Nome", accessor: (item) => item.pessoaId.nome, type: "discipulador/", linkAccessor: (item) => item.id},
        { header: "Células", accessor: (item) => item.celulas?.map((celula) => celula.nome).join(", "), type: "celulas/listar?filter=", linkAccessor: (item) => item.pessoaId.nome},
    ];

    return (
        <Table 
            columns={columns}
            data={discipuladores}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            initialFilter={filter}
        />
        
    )
};

export default ListarDiscipulador;