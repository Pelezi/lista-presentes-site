import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pessoa, deletePessoa, getPessoas } from "../../../services/pessoaService";

const ListarPessoa: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        // Get the filter value from the query parameters
        const queryParams = new URLSearchParams(location.search);
        const filterParam = queryParams.get("filter");
        if (filterParam) {
            setFilter(filterParam);
        }
    }, [location.search]);

    const fetchPessoas = async () => {
        try {
            const pessoas = await getPessoas();
            setPessoas(pessoas);
        } catch (error) {
            console.log('Erro ao buscar pessoas', error);
        }
    };

    useEffect(() => {
        fetchPessoas();
    }, []);

    const handleEdit = (pessoa: Pessoa) => {
        navigate("/pessoas/editar", { state: pessoa });
    };

    const handleDelete = async (pessoa: Pessoa) => {
        try {
            await deletePessoa(pessoa.id);
            fetchPessoas();
            alert("Pessoa removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa", error);
            alert("Erro ao remover pessoa. Tente novamente.");
        }
    };

    const capitalize = (str: string) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // const columns: Column<Pessoa>[] = [
    //     { header: "Nome", accessor: (item) => item.nome, type: "pessoa/", linkAccessor: (item) => item.id },
    //     { header: "Cargo", accessor: (item) => item.cargo === "frequentador_assiduo" ? "Frequentador assíduo" : item.cargo ? capitalize(item.cargo) : undefined, type: "pessoas/listar?filter=", linkAccessor: (item) => item.cargo },
    //     { header: "Bairro", accessor: (item) => item.enderecoId?.bairro ? capitalize(item.enderecoId?.bairro) : undefined, type: "pessoas/listar?filter=", linkAccessor: (item) => item.enderecoId?.bairro},
    //     { header: "Célula", accessor: (item) => item.celulaId?.nome ? capitalize(item.celulaId?.nome) : undefined, type: "celula/", linkAccessor: (item) => item.celulaId?.id},
    // ];

    return (
        // <Table
        //     columns={columns}
        //     data={pessoas}
        //     handleEdit={handleEdit}
        //     handleDelete={handleDelete}
        //     initialFilter={filter}  // Pass initial filter to Table component
        // />
        <div>hi</div>
    );
};

export default ListarPessoa;
