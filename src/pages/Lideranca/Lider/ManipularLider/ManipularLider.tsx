import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Form from "../../../../components/forms/Form";
import Button from "../../../../components/common/Button";
import Title from "../../../../components/common/Title";
import Datalist from "../../../../components/forms/Datalist/Datalist";

import { Lider, createOrUpdateLider, getLideres } from "../../../../services/liderService";

import MultipleDatalist from "../../../../components/forms/MultipleDatalist";
import { Pessoa, getPessoas } from "../../../../services/pessoaService";
import { Celula, getCelulas, getCelulasByLiderId } from "../../../../services/celulaService";
import { getIn } from "formik";

const ManipularLider: React.FC = () => {
    
    const navigate = useNavigate();
    const lider = useLocation().state as Lider;
    
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [celulas, setCelulas] = useState<Celula[]>([]);
    const [lideres, setLideres] = useState<Lider[]>([]);
    const [lideresIds, setLideresIds] = useState<string[]>([]);
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

    const fetchLideres = async () => {
        try {
            const lideres = await getLideres();
            setLideres(lideres);
            if (lideres.length > 0) {
                const lideresIdsList = lideres.map((lider) => lider.pessoaId.id).filter((id) => id !== undefined) as string[];
                if (lider) {
                    lideresIdsList.splice(lideresIdsList.indexOf(lider.pessoaId.id), 1);
                }
                setLideresIds(lideresIdsList);
            }
        } catch (error) {
            console.error("Erro ao buscar lideres", error);

        }

    };

    const fetchCelulasByLider = async (id: string) => {
        try {
            const celulas = await getCelulasByLiderId(id);
            const celulasIds = celulas.map((celula) => celula.id);
            setSelectedCelulas(celulasIds);
        } catch (error) {
            console.error("Erro ao buscar celulas do lider", error);
        }
    }




    useEffect(() => {
        fetchPessoas();
        fetchCelulas();
        fetchLideres();
        if (lider) {
            fetchCelulasByLider(lider.id);
        }
    }, []);

    const initialValues: Lider = {
        id: "",
        pessoaId: {
            id: "",
        },
        celulas: []
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        pessoaId: Yup.object().shape({
            id: Yup.string().required("Campo obrigatório")
        }),
        celulas: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            nome: Yup.string()
        }))
    });

    const onSubmit = async (values: Lider, { resetForm }: { resetForm: () => void }) => {
        try {
            values.celulas = selectedCelulas.map((celulaId) => ({ id: celulaId }));
            await createOrUpdateLider(values);
            resetForm();
            navigate("/lideres/listar");
            alert("Líder salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar líder", error);
            alert("Erro ao salvar líder. Tente novamente.");
        }
    };


    return (
        <Form
            initialValues={lider || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    {
                        !lider ?
                            <Title>Adicionar Líder</Title>
                            :
                            <Title>Editar Líder</Title>
                    }

                    <Datalist
                        label="Id do membro"
                        name="pessoaId.id"
                        options={pessoas}
                        errors={getIn(errors, "pessoaId.id")}
                        touched={getIn(touched, "pessoaId.id")}
                        optionFilter={lideresIds}
                        filterType="exclude"
                        initialName={lider?.pessoaId.nome}
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

export default ManipularLider;
