// src/components/ManipularGift.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { Gift, createOrUpdateGift, getGifts, addGuiftToGuest } from "../../../services/giftService";
import Select from "../../../components/forms/Select/Select";
import { Pessoa, addPessoaToCelula } from "../../../services/pessoaService";
import Datalist from "../../../components/forms/Datalist";
import { getIn } from "formik";

const AdicionarAGift: React.FC = () => {
    const { pessoaId } = useParams();
    const navigate = useNavigate();

    const [gifts, setGifts] = React.useState<Gift[]>([]);

    const fetchGifts = async () => {
        try {
            const gifts = await getGifts();
            setGifts(gifts);
        } catch (error) {
            console.error("Erro ao buscar gifts", error);
        }
    }

    React.useEffect(() => {
        fetchGifts();
    }, []);

    const initialValues: Pessoa = {
        id: pessoaId || "",
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
        ],
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        nome: Yup.string(),
        cargo: Yup.string(),
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
        giftId: Yup.object().shape({
            id: Yup.string().required("Campo obrigatório"),
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
        ),
    });

    const onSubmit = async (values: Pessoa, { resetForm }: { resetForm: () => void }) => {
        try {
            await addPessoaToCelula(values.id, values.celulaId?.id || "");
            resetForm();
            navigate(`/pessoa/${pessoaId}`); // Navigate back to DetalhesPessoa
            alert("Célula salva com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar gift", error);
            alert("Erro ao salvar gift. Tente novamente.");
        }
    }

    return (
        // <Form
        //     initialValues={initialValues}
        //     validationSchema={validationSchema}
        //     onSubmit={onSubmit}
        // >
        //     {({ errors, touched }) => (
        //         <>
        //             <Title>Adicionar Pessoa a Gift</Title>

        //             <Datalist
        //                         label="Célula"
        //                         name="celulaId.id"
        //                         options={gifts}
        //                         filterType="include"
        //                         errors={getIn(errors, "giftId.id")}
        //                         touched={getIn(touched, "giftId.id")}
        //                     />

        //             <Button type="submit">Salvar</Button>
        //         </>
        //     )}
        // </Form>
        <div>hi</div>
    );
};

export default AdicionarAGift;
