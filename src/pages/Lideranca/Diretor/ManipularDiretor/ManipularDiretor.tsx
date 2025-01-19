import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Form from "../../../../components/forms/Form";
import Button from "../../../../components/common/Button";
import Title from "../../../../components/common/Title";
import Datalist from "../../../../components/forms/Datalist/Datalist";

import { Diretor, createOrUpdateDiretor, getDiretores } from "../../../../services/diretorService";

import MultipleDatalist from "../../../../components/forms/MultipleDatalist";
import { Pessoa, getPessoas } from "../../../../services/pessoaService";
import { Grupo, getGrupos, getGruposByDiretorId } from "../../../../services/grupoService";
import { getIn } from "formik";

const ManipularDiretor: React.FC = () => {

    const navigate = useNavigate();
    const diretor = useLocation().state as Diretor;

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [diretores, setDiretores] = useState<Diretor[]>([]);
    const [diretoresIds, setDiretoresIds] = useState<string[]>([]);
    const [selectedGrupos, setSelectedGrupos] = useState<string[]>([]);

    const fetchPessoas = async () => {
        try {
            const pessoas = await getPessoas();
            setPessoas(pessoas);
        } catch (error) {
            console.error("Erro ao buscar pessoas", error);

        }
    };

    const fetchGrupos = async () => {
        try {
            const grupos = await getGrupos();
            setGrupos(grupos);
        } catch (error) {
            console.error("Erro ao buscar grupos", error);

        }
    };

    const fetchDiretores = async () => {
        try {
            const diretores = await getDiretores();
            setDiretores(diretores);
            if (diretores.length > 0) {
                const diretoresIdsList = diretores.map((diretor) => diretor.pessoaId.id).filter((id) => id !== undefined) as string[];
                setDiretoresIds(diretoresIdsList);
            }
        } catch (error) {
            console.error("Erro ao buscar diretores", error);

        }

    };


    const fetchGruposByDiretor = async (id: string) => {
        try {
            const grupos = await getGruposByDiretorId(id);
            const gruposIds = grupos.map((grupo) => grupo.id);
            setSelectedGrupos(gruposIds);
        } catch (error) {
            console.error("Erro ao buscar grupos do diretor", error);

        }
    }

    useEffect(() => {
        fetchPessoas();
        fetchGrupos();
        fetchDiretores();
        if (diretor) {
            fetchGruposByDiretor(diretor.id);
        }
    }, []);

    const initialValues: Diretor = {
        id: "",
        pessoaId: {
            id: "",
        },
        grupos: []
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        pessoaId: Yup.object().shape({
            id: Yup.string().required("Campo obrigatório")
        }),
        grupos: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            nome: Yup.string()
        }))
    });

    const onSubmit = async (values: Diretor, { resetForm }: { resetForm: () => void }) => {
        try {
            values.grupos = selectedGrupos.map((grupoId) => ({ id: grupoId }));
            await createOrUpdateDiretor(values);
            resetForm();
            navigate("/diretores/listar");
            alert("Diretor salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar diretor", error);
            alert("Erro ao salvar diretor. Tente novamente.");
        }
    };


    return (
        <Form
            initialValues={diretor || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    {
                        !diretor ?
                            <Title>Adicionar Diretor</Title>
                            :
                            <Title>Editar Diretor</Title>
                    }

                    <Datalist
                        label="Id do membro"
                        name="pessoaId.id"
                        options={pessoas}
                        errors={getIn(errors, "pessoaId.id")}
                        touched={getIn(touched, "pessoaId.id")}
                        optionFilter={diretoresIds}
                        filterType="exclude"
                    />

                    <MultipleDatalist
                        label="Grupos"
                        name="grupos.id"
                        options={grupos}
                        errors={getIn(errors, "grupos.id")}
                        touched={getIn(touched, "grupos.id")}
                        selectedGrupos={selectedGrupos}
                        setSelectedGrupos={setSelectedGrupos}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularDiretor;
