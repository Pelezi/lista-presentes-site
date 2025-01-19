import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Pessoa, deletePessoa, getPessoasByGrupoId, getPessoaById, removePessoaFromGrupo, addPessoaToGrupo } from "../../../services/pessoaService";
import { deletePhone } from "../../../services/phoneService";
import { deleteEmail } from "../../../services/emailService";
import { Grupo, deleteGrupo, getGruposById } from "../../../services/grupoService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesGrupo.module.css";
import Button from "../../../components/common/Button";
import { FaPencil, FaPlus, FaRegTrashCan } from "react-icons/fa6";


const DetalhesGrupo: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [grupo, setGrupo] = useState<Grupo>({} as Grupo);
    const [pessoas, setPessoas] = useState<Pessoa[]>([] as Pessoa[]);

    const fetchGrupo = async () => {
        try {
            const grupo = await getGruposById(String(id));
            setGrupo(grupo);
            const pessoa = await getPessoasByGrupoId(String(grupo.id));
            setPessoas(pessoa);
        } catch (error) {
            console.log('Erro ao buscar grupos', error);

        }
    };

    useEffect(() => {
        fetchGrupo();
    }, []);

    const handleEditGrupo = (grupo: Grupo) => {
        navigate("/grupos/editar", { state: grupo });
    }

    const handleDeleteGrupo = async (grupo: Grupo) => {
        try {
            await deleteGrupo(grupo.id);
            fetchGrupo();
            alert("Grupo removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover grupo", error);
            alert("Erro ao remover grupo. Tente novamente.");

        }
    };

    const handleRemovePessoa = async (id: string) => {
        try {
            await removePessoaFromGrupo(id, grupo.id);
            fetchGrupo();
            alert("Pessoa removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa", error);
            alert("Erro ao remover pessoa. Tente novamente.");

        }
    }

    const handleaddPessoaToGrupo = async (id: string) => {
        try {
            await addPessoaToGrupo(id, grupo.id);
            fetchGrupo();
            alert("Pessoa adicionada com sucesso!");
        } catch (error) {
            console.log("Erro ao adicionar pessoa", error);
            alert("Erro ao adicionar pessoa. Tente novamente.");

        }
    }

    const handleRemoveFromGrupo = async (id: string) => {
        try {
            await removePessoaFromGrupo(id, grupo.id);
            fetchGrupo();
            alert("Pessoa removida da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa da célula", error);
            alert("Erro ao remover pessoa da célula. Tente novamente.");

        }
    }

    const handleDiretorProfile = () => {
        navigate(`/diretor/${grupo.diretorId?.id}`);
    }

    const handlePessoaProfile = async (id: string) => {
        navigate(`/pessoa/${id}`);
    }
    

    return (
        <div className={styles.detalhesPage}>
            <div className={styles.section}>
                <h1>{grupo.nome}</h1>
                <div className={styles.profiles}>
                    {grupo.diretorId?.id ? <Button onClick={handleDiretorProfile}>Diretor</Button> : null}
                </div>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => handleEditGrupo(grupo)}><FaPencil /></Button>
                <Button onClick={() => handleDeleteGrupo(grupo)}><FaRegTrashCan /></Button>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <p>Grupo de {grupo.grupoType}</p>
                        <a className={styles.link} onClick={handleDiretorProfile}>Diretor: {grupo.diretorId?.pessoaId?.nome}</a>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Membros:</h3>
                            <Button green onClick={() => handleEditGrupo(grupo)}><FaPlus /></Button>
                        </div>
                        <div className={styles.contentSection}>
                            {pessoas.map((pessoa) => (
                                <div className={styles.contentBlock}>
                                    <div className={styles.contentTitle}>
                                        <h3 key={pessoa.id}>{pessoa.nome}</h3>
                                        <Button deleteButton onClick={() => handleRemoveFromGrupo(String(pessoa.id))}><FaRegTrashCan /></Button>
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

export default DetalhesGrupo;