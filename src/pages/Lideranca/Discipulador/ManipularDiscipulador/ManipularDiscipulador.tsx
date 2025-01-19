import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Form from "../../../../components/forms/Form";
import Button from "../../../../components/common/Button";
import Title from "../../../../components/common/Title";
import Datalist from "../../../../components/forms/Datalist/Datalist";

import { Discipulador, createOrUpdateDiscipulador, getDiscipuladores } from "../../../../services/discipuladorService";

import MultipleDatalist from "../../../../components/forms/MultipleDatalist";
import { Pessoa, getPessoas } from "../../../../services/pessoaService";
import { Celula, getCelulas, getCelulasByDiscipuladorId } from "../../../../services/celulaService";
import { getIn } from "formik";
import Select from "../../../../components/forms/Select";

const ManipularDiscipulador: React.FC = () => {

    const navigate = useNavigate();
    const discipulador = useLocation().state as Discipulador;

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [celulas, setCelulas] = useState<Celula[]>([]);
    const [discipuladores, setDiscipuladores] = useState<Discipulador[]>([]);
    const [discipuladoresIds, setDiscipuladoresIds] = useState<string[]>([]);
    const [selectedCelulas, setSelectedCelulas] = useState<string[]>([]);

    const fetchPessoas = async () => {
        try {
            const pessoas = await getPessoas();
            setPessoas(pessoas);
        } catch (error) {
            console.error("Erro ao buscar pessoas", error);

        }
    };

    const fetchCelulas = async () => {
        try {
            const celulas = await getCelulas();
            setCelulas(celulas);
        } catch (error) {
            console.error("Erro ao buscar celulas", error);

        }
    };

    const fetchDiscipuladores = async () => {
        try {
            const discipuladores = await getDiscipuladores();
            setDiscipuladores(discipuladores);
            if (discipuladores.length > 0) {
                const discipuladoresIdsList = discipuladores.map((discipulador) => discipulador.pessoaId.id).filter((id) => id !== undefined) as string[];
                setDiscipuladoresIds(discipuladoresIdsList);
            }
        } catch (error) {
            console.error("Erro ao buscar discipuladores", error);

        }

    };

    const fetchCelulasByDiscipulador = async (id: string) => {
        try {
            const celulas = await getCelulasByDiscipuladorId(id);
            const celulasIds = celulas.map((celula) => celula.id);
            setSelectedCelulas(celulasIds);
        } catch (error) {
            console.error("Erro ao buscar celulas do discipulador", error);
        }

    }


    useEffect(() => {
        fetchPessoas();
        fetchCelulas();
        fetchDiscipuladores();
        if (discipulador) {
            fetchCelulasByDiscipulador(discipulador.id);
        }
    }, []);

    const initialValues: Discipulador = {
        id: "",
        pessoaId: {
            id: "",
        },
        rede: "",
        celulas: []
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        pessoaId: Yup.object().shape({
            id: Yup.string().required("Campo obrigatório")
        }),
        rede: Yup.string(),
        celulas: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            nome: Yup.string()
        }))
    });

    const onSubmit = async (values: Discipulador, { resetForm }: { resetForm: () => void }) => {
        try {
            values.celulas = selectedCelulas.map((celulaId) => ({ id: celulaId }));
            await createOrUpdateDiscipulador(values);
            resetForm();
            navigate("/discipuladores/listar");
            alert("Discipulador salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar discipulador", error);
            alert("Erro ao salvar discipulador. Tente novamente.");
        }
    };


    return (
        <Form
            initialValues={discipulador || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    {
                        !discipulador ?
                            <Title>Adicionar Discipulador</Title>
                            :
                            <Title>Editar Discipulador</Title>
                    }

                    <Datalist
                        label="Id do membro"
                        name="pessoaId.id"
                        options={pessoas}
                        errors={getIn(errors, "pessoaId.id")}
                        touched={getIn(touched, "pessoaId.id")}
                        optionFilter={discipuladoresIds}
                        filterType="exclude"
                    />
                    
                    <Select
                        label="Rede"
                        name="rede"
                        options={[
                            { value: "Jovens", label: "Jovens" },
                            { value: "Adultos", label: "Adultos" },
                            { value: "Crianças", label: "Crianças" },
                        ]}
                        errors={errors.rede}
                        touched={touched.rede}
                    />

                    <MultipleDatalist
                        label="Celulas"
                        name="celulas.id"
                        options={celulas}
                        errors={getIn(errors, "celulas.id")}
                        touched={getIn(touched, "celulas.id")}
                        selectedGrupos={selectedCelulas}
                        setSelectedGrupos={setSelectedCelulas}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularDiscipulador;
