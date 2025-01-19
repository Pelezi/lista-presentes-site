// src/components/ManipularPhone.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { Phone, createOrUpdatePhone } from "../../../services/phoneService";
import Select from "../../../components/forms/Select/Select";

const ManipularPhone: React.FC = () => {
    const { pessoaId } = useParams();
    const navigate = useNavigate();

    const initialValues: Phone = {
        id: "",
        numero: "",
        phoneType: "",
        pessoaId: pessoaId // Set the pessoaId here
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        numero: Yup.string().required("Campo obrigatório"),
        phoneType: Yup.string().required("Campo obrigatório"),
        pessoaId: Yup.string().required("Campo obrigatório")
    });

    const onSubmit = async (values: Phone, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdatePhone(values);
            resetForm();
            navigate(`/pessoa/${pessoaId}`); // Navigate back to DetalhesPessoa
            alert("Telefone salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar telefone", error);
            alert("Erro ao salvar telefone. Tente novamente.");
        }
    }

    return (
        <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    <Title>Adicionar Telefone</Title>

                    <Input
                        label="Pessoa ID"
                        name="pessoaId"
                        errors={errors.pessoaId}
                        touched={touched.pessoaId}
                        hidden
                    />

                    <Input
                        label="Número"
                        name="numero"
                        errors={errors.numero}
                        touched={touched.numero}
                    />

                    <Select 
                        label="Tipo de Telefone"
                        name="phoneType"
                        options={[
                            { value: "pessoal", label: "Pessoal"},
                            { value: "casa", label: "Residencial" },
                            { value: "trabalho", label: "Comercial" },
                            { value: "outro", label: "Outro" },
                        ]}
                        errors={errors.phoneType}
                        touched={touched.phoneType}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularPhone;
