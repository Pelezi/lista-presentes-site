import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { Table, Column } from "../../../../components/common/Table";

import { Diretor, deleteDiretor, getDiretores } from "../../../../services/diretorService";
import { Grupo } from "../../../../services/grupoService";

const ListarDiretor: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [diretores, setDiretores] = useState<Diretor[]>([]);
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

    const fetchDiretores = async () => {
        try {
            const diretores = await getDiretores();
            setDiretores(diretores);
        } catch (error) {
            console.log('Erro ao buscar líderes', error);
            
        }
    };

    useEffect(() => {
        fetchDiretores();
    }, []);
    
    const handleDelete = async (diretor: Diretor) => {
        try {
            await deleteDiretor(diretor.id);
            fetchDiretores();
            alert("Diretor removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover diretor", error);
            alert("Erro ao remover diretor. Tente novamente.");
            
        }
    };

    const handleEdit = (diretor: Diretor) => {
        navigate("/diretores/editar", { state: diretor });
    }

    const columns: Column<Diretor>[] = [
        { header: "Nome", accessor: (item) => item.pessoaId.nome, type: "diretor/", linkAccessor: (item) => item.id},
        { header: "Grupos", accessor: (item) => item.grupos?.map((grupo) => grupo.nome).join(", "), type: "grupos/listar?filter=", linkAccessor: (item) => item.pessoaId.nome},
    ];

    return (
        <Table 
            columns={columns}
            data={diretores}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            initialFilter={filter}
        />
        
    )
};

export default ListarDiretor;