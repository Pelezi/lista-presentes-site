import React, { useEffect } from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Select from "../../../components/forms/Select/Select";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";

import { Pessoa, createOrUpdatePessoa } from "../../../services/pessoaService";
import { getIn } from "formik";

import styles from "./ManipularPessoa.module.css";

const ManipularPessoa: React.FC = () => {

    const navigate = useNavigate();
    const pessoa = useLocation().state as Pessoa;

    useEffect(() => {
        if (pessoa && !pessoa?.celulaId?.id) {
            pessoa.celulaId = {
                id: "",
                nome: "",
            }
        }
    }, [pessoa]);

    const initialValues: Pessoa = {
        id: "",
        nome: "",
        cargo: "",
        enderecoId: {
            bairro: "",
            rua: "",
            numero: "",
        },
        phones: [
            {
                id: "",
                numero: "",
                phoneType: "",
            }
        ],
        emails: [
            {
                id: "",
                email: "",
                emailType: "",
            }
        ],
        celulaId: {
            id: "",
            nome: "",
            liderId: {
                id: "",
                pessoaId: {
                    id: "",
                    nome: "",
                },
            },
        },
        grupos: [
            {
                id: "",
                nome: "",
            }
        ]
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        nome: Yup.string().required("Campo obrigatório"),
        cargo: Yup.string().required("Campo obrigatório"),
        enderecoId: Yup.object().shape({
            id: Yup.string(),
            bairro: Yup.string(),
            rua: Yup.string(),
            numero: Yup.string(),
        }),
        phones: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                numero: Yup.string(),
                phoneType: Yup.string(),
            })
        ),
        emails: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                email: Yup.string(),
                emailType: Yup.string(),
            })
        ),
        celulaId: Yup.object().shape({
            id: Yup.string(),
            nome: Yup.string(),
            liderId: Yup.object().shape({
                id: Yup.string(),
                pessoaId: Yup.object().shape({
                    id: Yup.string(),
                    nome: Yup.string(),
                })
            })
        }),
        grupos: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                nome: Yup.string(),
            })
        )
    });

    const onSubmit = async (values: Pessoa, { resetForm }: { resetForm: () => void }) => {
        try {
            if (values.celulaId?.id === "") {
                delete values.celulaId
            }
            if (values.enderecoId?.id === "") {
                delete values.enderecoId
            }
            if (values.phones?.[0]?.id === "") {
                delete values.phones
            }
            if (values.emails?.[0]?.id === "") {
                delete values.emails
            }
            await createOrUpdatePessoa(values);
            resetForm();
            navigate("/pessoas/listar");
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar formulário", error);
            alert("Erro ao enviar formulário. Tente novamente.");
        }
    }

    return (
        <Form
            initialValues={pessoa || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>

                    {
                        !pessoa ?
                            <Title>Cadastrar Pessoa</Title>
                            :
                            <Title>Editar Pessoa</Title>
                    }

                    <Input
                        label="Nome"
                        name="nome"
                        errors={errors.nome}
                        touched={touched.nome}
                    />

                    <Select
                        label="Cargo"
                        name="cargo"
                        options={[
                            { value: "visitante", label: "Visitante" },
                            { value: "frequentador_assiduo", label: "Frequentador assíduo" },
                            { value: "membro", label: "Membro" },
                        ]}
                        errors={errors.cargo}
                        touched={touched.cargo}
                    />

                    <Input
                        label="id"
                        name="enderecoId.id"
                        errors={getIn(errors, "enderecoId.id")}
                        touched={getIn(touched, "enderecoId.id")}
                        hidden
                    />


                    <Input
                        label="Bairro"
                        name="enderecoId.bairro"
                        errors={getIn(errors, "enderecoId.bairro")}
                        touched={getIn(touched, "enderecoId.bairro")}
                    />

                    <div className={styles.inputRow}>
                        <div className={styles.flex2}>
                            <Input
                                label="Rua"
                                name="enderecoId.rua"
                                errors={getIn(errors, "enderecoId.rua")}
                                touched={getIn(touched, "enderecoId.rua")}
                            />
                        </div>
                        <div className={styles.flex1}>
                            <Input
                                label="Número"
                                name="enderecoId.numero"
                                errors={getIn(errors, "enderecoId.numero")}
                                touched={getIn(touched, "enderecoId.numero")}
                            />
                        </div>
                    </div>
                    <Button type="submit">Salvar</Button>

                </>
            )}
        </Form>
    );
};

export default ManipularPessoa;