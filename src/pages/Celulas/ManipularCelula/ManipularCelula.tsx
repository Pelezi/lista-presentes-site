import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Select from "../../../components/forms/Select/Select";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { Celula, createOrUpdateCelula } from "../../../services/celulaService";
import { getIn } from "formik";
import Datalist from "../../../components/forms/Datalist";
import { Lider, getLideres } from "../../../services/liderService";
import { Discipulador, getDiscipuladores } from "../../../services/discipuladorService";
import { Pessoa, getPessoas, getPessoasByCelulaId } from "../../../services/pessoaService";
import MultipleDatalist from "../../../components/forms/MultipleDatalist";
import style from "./ManipularCelula.module.css";

const ManipularCelula: React.FC = () => {

    const navigate = useNavigate();
    const celula = useLocation().state as Celula;

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [lideres, setLideres] = useState<Lider[]>([]);
    const [lideresIds, setLideresIds] = useState<string[]>([]);
    const [discipuladores, setDiscipuladores] = useState<Discipulador[]>([]);
    const [discipuladoresIds, setDiscipuladoresIds] = useState<string[]>([]);
    const [selectedPessoas, setSelectedPessoas] = useState<string[]>([]);

    const fetchLideres = async () => {
        try {
            const lideres = await getLideres();
            setLideres(lideres);
            if (lideres.length > 0) {
                const lideresIdsList = lideres.map((lider) => lider.pessoaId.id).filter((id) => id !== undefined) as string[];
                setLideresIds(lideresIdsList);
            }
        } catch (error) {
            console.error("Erro ao buscar líderes", error);
        }
    }

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
    }

    const fetchPessoas = async () => {
        try {
            const pessoas = await getPessoas();
            setPessoas(pessoas);
        } catch (error) {
            console.error("Erro ao buscar pessoas", error);
        }

    }

    const fetchPessoasFromCelula = async (id: string) => {
        try {
            const pessoas = await getPessoasByCelulaId(id);
            const pessoasIds = pessoas.map((pessoa) => pessoa.id);
            setSelectedPessoas(pessoasIds);
        } catch (error) {
            console.error("Erro ao buscar pessoas da célula", error);
        }

    }

    useEffect(() => {
        fetchLideres();
        fetchDiscipuladores();
        fetchPessoas();
        if (celula) {
            fetchPessoasFromCelula(celula.id);
        }
    }, []);


    const initialValues: Celula = {
        id: "",
        nome: "",
        diaDaSemana: "",
        horario: "",
        enderecoId: {
            id: "",
            bairro: "",
            rua: "",
            numero: "",
        },
        liderId: {
            id: "",
            pessoaId: {
                id: "",
                nome: "",
            },
        },
        discipuladorId: {
            id: "",
            pessoaId: {
                id: "",
                nome: "",
            },
        },
        pessoas: [
            {
                id: "",
                nome: "",
            },
        ],
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        nome: Yup.string().required("Campo obrigatório"),
        diaDaSemana: Yup.string(),
        horario: Yup.string(),
        enderecoId: Yup.object().shape({
            id: Yup.string(),
            bairro: Yup.string().required("Campo obrigatório"),
            rua: Yup.string(),
            numero: Yup.string(),
        }),
        liderId: Yup.object().shape({
            id: Yup.string().required("Campo obrigatório"),
            pessoaId: Yup.object().shape({
                id: Yup.string(),
                nome: Yup.string(),
            }),
        }),
        discipuladorId: Yup.object().shape({
            id: Yup.string().required("Campo obrigatório"),
            pessoaId: Yup.object().shape({
                id: Yup.string(),
                nome: Yup.string(),
            }),
        }),
        pessoas: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                nome: Yup.string(),
            })
        )

    });

    const onSubmit = async (values: Celula, { resetForm }: { resetForm: () => void }) => {
        console.log("values", values);
        try {
            if (values.enderecoId?.id === "") {
                delete values.enderecoId?.id;
            }
            values.pessoas = selectedPessoas.map((pessoaId) => ({ id: pessoaId }))
            values.liderId = { id: lideres.find((lider) => lider.id === values.liderId?.id)?.id, pessoaId: undefined };
            values.discipuladorId = { id: discipuladores.find((discipulador) => discipulador.id === values.discipuladorId?.id)?.id, pessoaId: undefined };
            await createOrUpdateCelula(values);
            resetForm();
            navigate("/celulas/listar");
            alert("Célula salva com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar célula", error);
            alert("Erro ao salvar célula. Tente novamente.");
        }
    }

    return (
        <Form
            initialValues={celula || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    {
                        celula ? <Title>Editar Célula</Title> : <Title>Cadastrar Célula</Title>
                    }

                    <Input
                        label="Nome"
                        name="nome"
                        errors={errors.nome}
                        touched={touched.nome}
                    />
                    <div className={style.inputRow}>
                        <div className={style.flex2}>
                            <Select
                                label="Dia da semana"
                                name="diaDaSemana"
                                options={[
                                    { value: "domingo", label: "Domingo" },
                                    { value: "segunda", label: "Segunda" },
                                    { value: "terça", label: "Terça" },
                                    { value: "quarta", label: "Quarta" },
                                    { value: "quinta", label: "Quinta" },
                                    { value: "sexta", label: "Sexta" },
                                    { value: "sabado", label: "Sábado" },
                                ]}
                                errors={errors.diaDaSemana}
                                touched={touched.diaDaSemana}
                            />
                        </div>
                        <div className={style.flex1}>
                            <Input
                                label="Horário"
                                name="horario"
                                type="time"
                                errors={errors.horario}
                                touched={touched.horario}
                            />
                        </div>
                    </div>

                    <div className={style.inputRow}>
                        <div className={style.flex1}>
                            <Input
                                label="Bairro"
                                name="enderecoId.bairro"
                                errors={getIn(errors, "enderecoId.bairro")}
                                touched={getIn(touched, "enderecoId.bairro")}
                            />
                        </div>
                    </div>
                    <div className={style.inputRow}>
                        <div className={style.flex2}>

                            <Input
                                label="Rua"
                                name="enderecoId.rua"
                                errors={getIn(errors, "enderecoId.rua")}
                                touched={getIn(touched, "enderecoId.rua")}
                            />
                        </div>
                        <div className={style.flex1}>

                            <Input
                                label="Número"
                                name="enderecoId.numero"
                                errors={getIn(errors, "enderecoId.numero")}
                                touched={getIn(touched, "enderecoId.numero")}
                            />
                        </div>
                    </div>
                    <div className={style.inputRow}>
                        <div className={style.flex1}>
                            <Datalist
                                label="Líder"
                                name="liderId.id"
                                options={lideres}
                                optionFilter={lideresIds}
                                filterType="include"
                                errors={getIn(errors, "liderId.id")}
                                touched={getIn(touched, "liderId.id")}
                                initialName={celula && celula.liderId?.pessoaId?.nome}
                            />
                        </div>
                        <div className={style.flex1}>
                            <Datalist
                                label="Discipulador"
                                name="discipuladorId.id"
                                options={discipuladores}
                                optionFilter={discipuladoresIds}
                                filterType="include"
                                errors={getIn(errors, "discipuladorId.id")}
                                touched={getIn(touched, "discipuladorId.id")}
                                initialName={celula && celula.discipuladorId?.pessoaId?.nome}
                            />
                        </div>
                    </div>

                    <MultipleDatalist
                        label="Pessoas"
                        name="pessoas.id"
                        options={pessoas}
                        errors={getIn(errors, "celulas.id")}
                        touched={getIn(touched, "celulas.id")}
                        selectedGrupos={selectedPessoas}
                        setSelectedGrupos={setSelectedPessoas}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularCelula;