import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Select from "../../../components/forms/Select/Select";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { Grupo, createOrUpdateGrupo } from "../../../services/grupoService";
import { getIn } from "formik";
import Datalist from "../../../components/forms/Datalist";
import { Diretor, getDiretores } from "../../../services/diretorService";
import { Pessoa, getPessoas, getPessoasByGrupoId } from "../../../services/pessoaService";
import MultipleDatalist from "../../../components/forms/MultipleDatalist";

const ManipularGrupo: React.FC = () => {

    const navigate = useNavigate();
    const grupo = useLocation().state as Grupo;

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [diretores, setDiretores] = useState<Diretor[]>([]);
    const [diretoresIds, setDiretoresIds] = useState<string[]>([]);
    const [selectedPessoas, setSelectedPessoas] = useState<string[]>([]);

    const fetchDiretores = async () => {
        try {
            const diretores = await getDiretores();
            setDiretores(diretores);
            console.log("diretores", diretores);
            if (diretores.length > 0) {
                const diretoresIdsList = diretores.map((diretor) => diretor.pessoaId.id).filter((id) => id !== undefined) as string[];
                setDiretoresIds(diretoresIdsList);
                console.log("diretoresIdsList", diretoresIdsList);
            }
        } catch (error) {
            console.error("Erro ao buscar diretores", error);
        }
    }

    const fetchPessoas = async () => {
        try {
            const pessoas = await getPessoas();
            setPessoas(pessoas);
        } catch (error) {
            console.error("Erro ao buscar pessoas", error);
        }

    }

    const fetchPessoasFromGrupo = async (id: string) => {
        try {
            const pessoas = await getPessoasByGrupoId(id);
            const pessoasIds = pessoas.map((pessoa) => pessoa.id);
            setSelectedPessoas(pessoasIds);
            console.log("pessoasIds", pessoasIds);
        } catch (error) {
            console.error("Erro ao buscar pessoas do grupo", error);
        }

    }

    useEffect(() => {
        fetchDiretores();
        fetchPessoas();
        if (grupo) {
            fetchPessoasFromGrupo(grupo.id);
        }
    }, []);


    const initialValues: Grupo = {
        id: "",
        nome: "",
        grupoType: "",
        diretorId: {
            id: "",
            pessoaId: {
                id: "",
                nome: "",
            },
        },
        integrantes: [
            {
                id: "",
                nome: "",
            },
        ],
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        nome: Yup.string().required("Campo obrigatório"),
        grupoType: Yup.string(),
        horario: Yup.string(),
        diretorId: Yup.object().shape({
            id: Yup.string(),
            pessoaId: Yup.object().shape({
                id: Yup.string(),
                nome: Yup.string(),
            }),
        }),
        integrantes: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                nome: Yup.string(),
            })
        )

    });

    const onSubmit = async (values: Grupo, { resetForm }: { resetForm: () => void }) => {
        console.log("values", values);
        try {
            values.integrantes = selectedPessoas.map((pessoaId) => ({ id: pessoaId }))
            values.diretorId = { id: diretores.find((diretor) => diretor.id === values.diretorId?.id)?.id, pessoaId: undefined}
            await createOrUpdateGrupo(values);
            resetForm();
            navigate("/grupos/listar");
            alert("Grupo salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar grupo", error);
            alert("Erro ao salvar grupo. Tente novamente.");
        }
    }

    return (
        <Form
            initialValues={grupo || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    {
                        grupo ? <Title>Editar Grupo</Title> : <Title>Cadastrar Grupo</Title>
                    }

                    <Input
                        label="Nome"
                        name="nome"
                        errors={errors.nome}
                        touched={touched.nome}
                    />

                    <Select
                        label="Tipo de grupo"
                        name="grupoType"
                        options={[
                            { value: "louvor", label: "Louvor" },
                            { value: "midia", label: "Mídia" },
                            { value: "danca", label: "Dança" },
                            { value: "teatro", label: "Teatro" },
                        ]}
                        errors={errors.grupoType}
                        touched={touched.grupoType}
                    />

                    <Datalist
                        label="Diretor"
                        name="diretorId.id"
                        options={diretores}
                        optionFilter={diretoresIds}
                        filterType="include"
                        errors={getIn(errors, "diretorId.id")}
                        touched={getIn(touched, "diretorId.id")}
                        initialName={grupo && grupo.diretorId?.pessoaId?.nome}
                    />

                    <MultipleDatalist
                        label="Pessoas"
                        name="pessoas.id"
                        options={pessoas}
                        errors={getIn(errors, "integrantes.id")}
                        touched={getIn(touched, "integrantes.id")}
                        selectedGrupos={selectedPessoas}
                        setSelectedGrupos={setSelectedPessoas}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularGrupo;