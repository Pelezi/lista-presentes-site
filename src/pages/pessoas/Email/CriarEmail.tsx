// src/components/ManipularEmail.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { Email, createOrUpdateEmail } from "../../../services/emailService";
import Select from "../../../components/forms/Select/Select";

const ManipularEmail: React.FC = () => {
    const { pessoaId } = useParams();
    const navigate = useNavigate();

    const initialValues: Email = {
        id: "",
        email: "",
        emailType: "",
        pessoaId: pessoaId // Set the pessoaId here
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        email: Yup.string().required("Campo obrigatório"),
        emailType: Yup.string().required("Campo obrigatório"),
        pessoaId: Yup.string().required("Campo obrigatório")
    });

    const onSubmit = async (values: Email, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateEmail(values);
            resetForm();
            navigate(`/pessoa/${pessoaId}`); // Navigate back to DetalhesPessoa
            alert("Email salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar email", error);
            alert("Erro ao salvar email. Tente novamente.");
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
                    <Title>Adicionar Email</Title>

                    <Input
                        label="Pessoa ID"
                        name="pessoaId"
                        errors={errors.pessoaId}
                        touched={touched.pessoaId}
                        hidden
                    />

                    <Input
                        label="Email"
                        name="email"
                        errors={errors.email}
                        touched={touched.email}
                    />

                    <Select 
                        label="Tipo de Email"
                        name="emailType"
                        options={[
                            { value: "pessoal", label: "Pessoal"},
                            { value: "trabalho", label: "Comercial" },
                            { value: "outro", label: "Outro" },
                        ]}
                        errors={errors.emailType}
                        touched={touched.emailType}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularEmail;
