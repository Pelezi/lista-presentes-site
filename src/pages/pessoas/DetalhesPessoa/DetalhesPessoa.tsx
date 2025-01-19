import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Pessoa, deletePessoa, getPessoaById, removePessoaFromCelula, removePessoaFromGrupo } from "../../../services/pessoaService";
import { Gift, getGiftsById } from "../../../services/giftService";

import Button from "../../../components/common/Button";

import { useParams } from "react-router-dom";

import styles from "./DetalhesPessoa.module.css";
import { FaPencil, FaPlus, FaRegTrashCan } from "react-icons/fa6";


const DetalhesPessoa: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [gift, setGift] = useState<Gift>({} as Gift);

    const fetchPessoa = async () => {
        try {
            const pessoa = await getPessoaById(String(id));
            setPessoa(pessoa);
            try { const gift = await getGiftsById(String(pessoa.celulaId?.id)); setGift(gift); } catch (error) { console.log('Erro ao buscar gift', error); }
        } catch (error) {
            console.log('Erro ao buscar pessoas', error);

        }
    };

    useEffect(() => {
        fetchPessoa();
    }, []);

    const handleEditPessoa = (pessoa: Pessoa) => {
        navigate("/pessoas/editar", { state: pessoa });
    }

    const handleDeletePessoa = async (pessoa: Pessoa) => {
        try {
            await deletePessoa(pessoa.id);
            fetchPessoa();
            alert("Pessoa removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa", error);
            alert("Erro ao remover pessoa. Tente novamente.");

        }
    };

    const handleAddPhone = () => {
        navigate(`/pessoas/phones/cadastrar/${id}`);
    };

    const handleAddEmail = () => {
        navigate(`/pessoas/emails/cadastrar/${id}`);
    };

    const handleGiftProfile = () => {
        navigate(`/gift/${gift.id}`);
    }

    const handleGrupoProfile = (grupoId: string) => {
        navigate(`/grupo/${grupoId}`);
    }

    const handleRemoveFromGift = async (id: string) => {
        try {
            await removePessoaFromCelula(id);
            fetchPessoa();
            alert("Pessoa removida da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa da célula", error);
            alert("Erro ao remover pessoa da célula. Tente novamente.");

        }
    }

    const handleAddToGift = () => {
        navigate(`/pessoas/gift/${id}`);
    }

    const handleAddToGrupo = () => {
        navigate(`/pessoas/grupo/${id}`);
    }

    const capitalize = (str: string) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className={styles.detalhesPage}>
            <div className={styles.section}>
                <h1>{pessoa.nome}</h1>
                <div className={styles.profiles}>
                    <Button selected>{capitalize(pessoa.cargo)}</Button>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => handleEditPessoa(pessoa)}><FaPencil /></Button>
                <Button onClick={() => handleDeletePessoa(pessoa)}><FaRegTrashCan /></Button>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Endereço:</h3>
                        </div>
                        <div className={styles.contentRow}>
                            <p>Rua: {pessoa.enderecoId?.rua}, {pessoa.enderecoId?.numero}</p>
                        </div>
                        <div className={styles.contentRow}>
                            <p>Bairro: {pessoa.enderecoId?.bairro}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Telefones:</h3>
                            <Button green onClick={handleAddPhone}><FaPlus /></Button>
                        </div>
                        {pessoa.phones?.map((phone) => (
                            <div className={styles.contentRow}>
                                <p key={phone.id}>{phone.numero}</p>
                                <p key={phone.id}>{phone.phoneType}</p>
                                <Button deleteButton onClick={() => ({})}><FaRegTrashCan /></Button>
                            </div>
                        ))}
                    </div>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Emails:</h3>
                            <Button green onClick={handleAddEmail}><FaPlus /></Button>
                        </div>
                        {pessoa.emails?.map((email) => (
                            <div className={styles.contentRow}>
                                <p key={email.id}>{email.email}</p>
                                <p key={email.id}>{email.emailType}</p>
                                <Button deleteButton onClick={() => ({})}><FaRegTrashCan /></Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Célula:</h3>
                            {gift ?
                                <div className={styles.sectionButtons}>
                                    <Button blue onClick={handleAddToGift}><FaPencil /></Button>
                                    <Button deleteButton onClick={() => handleRemoveFromGift(String(pessoa.id))}><FaRegTrashCan /></Button>
                                </div>
                                :
                                <Button green onClick={handleAddToGift}><FaPlus /></Button>
                            }
                        </div>
                        <div className={styles.contentSection}>
                            {/* {pessoa.celulaId ?
                                <div className={styles.contentBlock}>
                                    <h3>{celula.nome}</h3>
                                    <div className={styles.contentRow}>
                                        <p>{celula.enderecoId?.bairro}</p>
                                        <p>{celula.diaDaSemana}</p>
                                        <p>{celula.horario}</p>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p>Líder: {celula.liderId?.pessoaId?.nome}</p>
                                        <p>Discipulador: {celula.discipuladorId?.pessoaId?.nome}</p>
                                        <br />
                                    </div>
                                    <br />
                                    <div className={styles.contentRow}>
                                        <Button blue onClick={handleGiftProfile}>Ver Célula</Button>
                                    </div>
                                </div>

                                :
                                null
                            } */}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Grupos:</h3>
                            <Button green onClick={handleAddToGrupo}><FaPlus /></Button>
                        </div>
                        <div className={styles.contentSection}>
                            {/* {grupos.map((grupo) => (
                                <div className={styles.contentBlock}>
                                    <div className={styles.contentTitle}>
                                        <h3 key={grupo.id}>{grupo.nome}</h3>
                                        <Button deleteButton onClick={() => handleRemoveFromGrupo(String(pessoa.id), String(grupo.id))}><FaRegTrashCan /></Button>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p key={grupo.id}>Grupo de {grupo.grupoType}</p>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p key={grupo.id}>Diretor: {grupo.diretorId?.pessoaId?.nome}</p>
                                    </div>
                                    <br />
                                    <div className={styles.contentRow}>
                                        <Button blue onClick={() => handleGrupoProfile(grupo.id)}>Ver Grupo</Button>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />


        </div>
    )
};

export default DetalhesPessoa;