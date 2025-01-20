import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { Gift, createOrUpdateGift } from "../../../services/giftService";
import style from "./ManipularGift.module.css";

const ManipularGift: React.FC = () => {

    const navigate = useNavigate();
    const gift = useLocation().state as Gift;


    const initialValues: Gift = {
        id: "",
        name: "",
        photoUrl: "",
        quantity: 0,
        description: "",
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().required("Campo obrigatório"),
        photoUrl: Yup.string().url("URL inválida"),
        quantity: Yup.number().required("Campo obrigatório").min(1, "Quantidade deve ser pelo menos 1"),
        description: Yup.string().required("Campo obrigatório"),
        guests: Yup.array().of(
            Yup.object().shape({
                count: Yup.number().required(),
                guest: Yup.object().shape({
                    id: Yup.string().required(),
                    name: Yup.string().required(),
                    phone: Yup.string().required(),
                }).required(),
            })
        ),
        count: Yup.number(),
    });

    const onSubmit = async (values: Gift, { resetForm }: { resetForm: () => void }) => {
        try {
            const { guests, count, ...filteredValues } = values;
            await createOrUpdateGift(filteredValues);
            resetForm();
            navigate("/admin");
            alert("Presente salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar presente", error);
            alert("Erro ao salvar presente. Tente novamente." + error);
        }
    }

    return (
        <Form
            initialValues={gift || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    {gift ? <Title>Editar Presente</Title> : <Title>Cadastrar Presente</Title>}

                    <Input
                        label="Nome"
                        name="name"
                        errors={errors.name}
                        touched={touched.name}
                    />
                    <Input
                        label="URL da Foto"
                        name="photoUrl"
                        errors={errors.photoUrl}
                        touched={touched.photoUrl}
                    />
                    <Input
                        label="Quantidade"
                        name="quantity"
                        type="number"
                        errors={errors.quantity}
                        touched={touched.quantity}
                    />
                    <Input
                        label="Descrição"
                        name="description"
                        errors={errors.description}
                        touched={touched.description}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularGift;