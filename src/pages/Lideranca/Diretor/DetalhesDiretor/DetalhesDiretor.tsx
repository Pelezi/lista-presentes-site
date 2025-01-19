import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Diretor, deleteDiretor, getDiretorById } from "../../../../services/diretorService";
import { Pessoa, deletePessoa, getPessoaById, removePessoaFromGrupo } from "../../../../services/pessoaService";
import { deletePhone } from "../../../../services/phoneService";
import { deleteEmail } from "../../../../services/emailService";
import { Grupo, getGruposById, getGruposByDiretorId, removeDiretorFromGrupo } from "../../../../services/grupoService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesDiretor.module.css";
import { Lider, getLiderByPessoaId } from "../../../../services/liderService";
import { Discipulador, getDiscipuladorByPessoaId } from "../../../../services/discipuladorService";
import Button from "../../../../components/common/Button";
import { FaPencil, FaPlus, FaRegTrashCan } from "react-icons/fa6";


const DetalhesDiretor: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [diretor, setDiretor] = useState<Diretor>({} as Diretor);
    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [lider, setLider] = useState<Lider>({} as Lider);
    const [discipulador, setDiscipulador] = useState<Discipulador>({} as Discipulador);
    const [grupos, setGrupo] = useState<Grupo[]>([] as Grupo[]);

    const fetchDiretor = async () => {
        try {
            const diretor = await getDiretorById(String(id));
            setDiretor(diretor);
            const pessoa = await getPessoaById(String(diretor.pessoaId?.id));
            setPessoa(pessoa);
            try {
                const grupo = await getGruposByDiretorId(String(diretor.id));
                setGrupo(grupo);
            } catch (error) { console.log("Erro ao buscar grupos do diretor", error); }
            try { const lider = await getLiderByPessoaId(String(pessoa.id)); setLider(lider); } catch (error) { console.log('Erro ao buscar lider', error); }
            try { const discipulador = await getDiscipuladorByPessoaId(String(pessoa.id)); setDiscipulador(discipulador); } catch (error) { console.log('Erro ao buscar discipulador', error); }
        } catch (error) {
            console.log('Erro ao buscar diretor', error);

        }
    }

    useEffect(() => {
        fetchDiretor();
    }, []);

    const handleEditDiretor = (diretor: Diretor) => {
        navigate("/diretores/editar", { state: diretor });
    }

    const handleDeleteDiretor = async (diretor: Diretor) => {
        try {
            await deleteDiretor(diretor.id);
            fetchDiretor();
            alert("Diretor removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover diretor", error);
            alert("Erro ao remover diretor. Tente novamente.");

        }
    };
    const handleRemoveDiretorFromGrupo = async (grupoId: string) => {
        try {
            await removeDiretorFromGrupo(grupoId);
            fetchDiretor();
            alert("Diretor removido da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover diretor da célula", error);
            alert("Erro ao remover diretor da célula. Tente novamente.");

        }
    }

    const handleAddPhone = () => {
        navigate(`/pessoas/phones/cadastrar/${diretor.pessoaId?.id}`);
    };

    const handleAddEmail = () => {
        navigate(`/pessoas/emails/cadastrar/${diretor.pessoaId?.id}`);
    };

    const handlePessoaProfile = () => {
        navigate(`/pessoa/${pessoa.id}`);
    }

    const handleLiderProfile = () => {
        navigate(`/lider/${lider.id}`);
    }

    const handleDiscipuladorProfile = () => {
        navigate(`/discipulador/${discipulador.id}`);
    }

    const handleDiretorProfile = () => {
        navigate(`/diretor/${diretor.id}`);
    }

    const handleGrupoProfile = (grupoId: string) => {
        navigate(`/grupo/${grupoId}`);
    }

    const capitalize = (str: string) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className={styles.detalhesPage}>
            <div className={styles.section}>
                <h1>{capitalize(pessoa.nome)}</h1>
                <div className={styles.profiles}>
                    <Button onClick={handlePessoaProfile}>{capitalize(pessoa.cargo)}</Button>
                    {lider.id ? <Button onClick={handleLiderProfile}>Líder</Button> : null}
                    {discipulador.id ? <Button onClick={handleDiscipuladorProfile}>Discipulador</Button> : null}
                    {diretor.id ? <Button selected>Diretor</Button> : null}
                </div>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => handleEditDiretor(diretor)}><FaPencil /></Button>
                <Button onClick={() => handleDeleteDiretor(diretor)}><FaRegTrashCan /></Button>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Grupos:</h3>
                            <Button green onClick={() => handleEditDiretor(diretor)}><FaPlus /></Button>
                        </div>
                        <div className={styles.contentSection}>

                            {grupos.map((grupo) => (
                                <div className={styles.contentBlock}>
                                    <div className={styles.contentTitle}>
                                        <h3 key={grupo.id}>{grupo.nome}</h3>
                                        <Button deleteButton onClick={() => handleRemoveDiretorFromGrupo(String(grupo.id))}><FaRegTrashCan /></Button>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p key={grupo.id}>Grupo de {grupo.grupoType}</p>
                                    </div>
                                    <br />
                                    <div className={styles.contentRow}>
                                        <Button blue onClick={() => handleGrupoProfile(String(grupo.id))}>Ver Grupo</Button>
                                    </div>
                                    <br />
                                </div>
                            ))}
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DetalhesDiretor;