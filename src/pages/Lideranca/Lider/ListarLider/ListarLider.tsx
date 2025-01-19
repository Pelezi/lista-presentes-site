import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { Table, Column } from "../../../../components/common/Table";

import { Lider, deleteLider, getLideres } from "../../../../services/liderService";
import { Celula } from "../../../../services/celulaService";

const ListarLider: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [lideres, setLideres] = useState<Lider[]>([]);
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

    const fetchLideres = async () => {
        try {
            const lideres = await getLideres();
            setLideres(lideres);
        } catch (error) {
            console.log('Erro ao buscar líderes', error);
            
        }
    };

    useEffect(() => {
        fetchLideres();
    }, []);

    const handleEdit = (lider: Lider) => {
        navigate("/lideres/editar", { state: lider });
    }
    
    const handleDelete = async (lider: Lider) => {
        try {
            await deleteLider(lider.id);
            fetchLideres();
            alert("Lider removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover lider", error);
            alert("Erro ao remover lider. Tente novamente.");
            
        }
    };

    const columns: Column<Lider>[] = [
        { header: "Nome", accessor: (item) => item.pessoaId.nome, type: "lider/", linkAccessor: (item) => item.id},
        { header: "Células", accessor: (item) => item.celulas?.map((celula) => celula.nome).join(", "), type: "celulas/listar?filter=", linkAccessor: (item) => item.pessoaId.nome},
    ];

    return (
        <Table 
            columns={columns}
            data={lideres}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            initialFilter={filter}
        />
        
    )
};

export default ListarLider;