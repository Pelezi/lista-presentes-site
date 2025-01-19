// src/components/ManipularCelula.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { Grupo, createOrUpdateGrupo, getGrupos, getGruposByIntegranteId } from "../../../services/grupoService";
import Select from "../../../components/forms/Select/Select";
import { Pessoa, addPessoaToGrupo } from "../../../services/pessoaService";
import Datalist from "../../../components/forms/Datalist";
import { getIn } from "formik";

const AdicionarAGrupo: React.FC = () => {
    const { pessoaId } = useParams();
    const navigate = useNavigate();

    const [grupos, setGrupos] = React.useState<Grupo[]>([]),
        [selectedGrupos, setSelectedGrupos] = React.useState<Grupo[]>([]),
        [gruposIds, setGruposIds] = React.useState<string[]>([]);

    const fetchGrupos = async () => {
        try {
            const grupos = await getGrupos();
            setGrupos(grupos);
            try {
                const gruposIntegrante = await getGruposByIntegranteId(pessoaId || "");
                setSelectedGrupos(gruposIntegrante);
                setGruposIds(gruposIntegrante.map(grupo => grupo.id));
            } catch (error) {
                console.error("Erro ao buscar grupos do integrante", error);
            }
        } catch (error) {
            console.error("Erro ao buscar grupos", error);
        }
    }

    React.useEffect(() => {
        fetchGrupos();
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
        ]
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
            await addPessoaToGrupo(pessoaId || "", values.grupos?.[0].id || ""); 
            resetForm();
            navigate(`/pessoa/${pessoaId}`); // Navigate back to DetalhesPessoa
            alert("Grupo salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar grupo", error);
            alert("Erro ao salvar grupo. Tente novamente.");
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
                    <Title>Adicionar Pessoa a Grupo</Title>

                    <Datalist
                        label="Grupo"
                        name="grupos.[0].id"
                        options={grupos}
                        optionFilter={gruposIds}
                        filterType="exclude"
                        errors={getIn(errors, "grupos.[0].id")}
                        touched={getIn(touched, "grupos.[0].id")}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default AdicionarAGrupo;
