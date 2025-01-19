import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Pessoa, deletePessoa, getPessoasByCelulaId, getPessoaById, removePessoaFromCelula, addPessoaToCelula } from "../../../services/pessoaService";
import { deletePhone } from "../../../services/phoneService";
import { deleteEmail } from "../../../services/emailService";
import { Celula, deleteCelula, getCelulasById } from "../../../services/celulaService";
import { Grupo, getGruposByIntegranteId } from "../../../services/grupoService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesCelula.module.css";
import Button from "../../../components/common/Button";
import { FaPencil, FaPlus, FaRegTrashCan } from "react-icons/fa6";


const DetalhesCelula: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [celula, setCelula] = useState<Celula>({} as Celula);
    const [pessoas, setPessoas] = useState<Pessoa[]>([] as Pessoa[]);

    const fetchCelula = async () => {
        try {
            const celula = await getCelulasById(String(id));
            setCelula(celula);
            const pessoa = await getPessoasByCelulaId(String(celula.id));
            setPessoas(pessoa);
        } catch (error) {
            console.log('Erro ao buscar celulas', error);

        }
    };

    useEffect(() => {
        fetchCelula();
    }, []);

    const handleEditCelula = (celula: Celula) => {
        navigate("/celulas/editar", { state: celula });
    }

    const handleDeleteCelula = async (celula: Celula) => {
        try {
            await deleteCelula(celula.id);
            fetchCelula();
            alert("Celula removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover celula", error);
            alert("Erro ao remover celula. Tente novamente.");

        }
    };

    const handleRemovePessoa = async (id: string) => {
        try {
            await removePessoaFromCelula(id);
            fetchCelula();
            alert("Pessoa removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa", error);
            alert("Erro ao remover pessoa. Tente novamente.");

        }
    }

    const handleLiderProfile = () => {
        navigate(`/lider/${celula.liderId?.id}`);
    }

    const handleDiscipuladorProfile = () => {
        navigate(`/discipulador/${celula.discipuladorId?.id}`);
    }

    const handlePessoaProfile = async (id: string) => {
        navigate(`/pessoa/${id}`);
    }

    const capitalize = (str?: string) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className={styles.detalhesPage}>
            <div className={styles.section}>
                <h1>{celula.nome}</h1>
                <div className={styles.profiles}>
                    {celula.liderId?.id ? <Button onClick={handleLiderProfile}>Líder</Button> : null}
                    {celula.discipuladorId?.id ? <Button onClick={handleDiscipuladorProfile}>Discipulador</Button> : null}
                </div>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => handleEditCelula(celula)}><FaPencil /></Button>
                <Button onClick={() => handleDeleteCelula(celula)}><FaRegTrashCan /></Button>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Info</h3>
                        </div>
                        <div className={styles.contentRow}>
                            <p>{capitalize(celula.diaDaSemana)}</p>
                            <p>{celula.horario}</p>
                        </div>
                        <div className={styles.contentRow}>
                            <p className={styles.link} onClick={handleLiderProfile}>Líder: {celula.liderId?.pessoaId?.nome}</p>
                        </div>
                        <div className={styles.contentRow}>
                            <p className={styles.link} onClick={handleDiscipuladorProfile}>Discipulador: {celula.discipuladorId?.pessoaId?.nome}</p>
                        </div>
                    </div>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Endereço:</h3>
                        </div>
                        <div className={styles.contentRow}>
                            <p>Bairro: {celula.enderecoId?.bairro}</p>
                        </div>
                        <div className={styles.contentRow}>
                            <p>Rua: {celula.enderecoId?.rua}</p>
                        </div>
                        <div className={styles.contentRow}>
                            <p>Número: {celula.enderecoId?.numero}</p>
                        </div>
                    </div>
                </div>
                <br />
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Membros:</h3>
                            <Button green onClick={() => handleEditCelula(celula)}><FaPlus /></Button>
                        </div>
                        <div className={styles.contentSection}>
                            {pessoas.map((pessoa) => (
                                <div className={styles.contentBlock}>
                                    <div className={styles.contentTitle}>
                                        <h3 key={pessoa.id}>{pessoa.nome}</h3>
                                        <Button deleteButton onClick={() => handleRemovePessoa(String(pessoa.id))}><FaRegTrashCan /></Button>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p key={pessoa.id}>Cargo: {pessoa.cargo}</p>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p>Bairro: {pessoa.enderecoId?.bairro}</p>
                                    </div>
                                    <br />
                                    <div className={styles.contentRow}>
                                        <Button blue onClick={() => handlePessoaProfile(pessoa.id)}>Ver Pessoa</Button>
                                    </div>
                                    <br />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DetalhesCelula;