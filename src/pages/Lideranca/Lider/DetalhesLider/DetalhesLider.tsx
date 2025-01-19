import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Lider, deleteLider, getLiderById } from "../../../../services/liderService";
import { Pessoa, deletePessoa, getPessoaById, removePessoaFromCelula, removePessoaFromGrupo } from "../../../../services/pessoaService";
import { deletePhone } from "../../../../services/phoneService";
import { deleteEmail } from "../../../../services/emailService";
import { Celula, getCelulasById, getCelulasByLiderId, removeLiderFromCelula } from "../../../../services/celulaService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesLider.module.css";
import Button from "../../../../components/common/Button";
import { Discipulador, getDiscipuladorByPessoaId } from "../../../../services/discipuladorService";
import { Diretor, getDiretorByPessoaId } from "../../../../services/diretorService";
import { FaPencil, FaPlus, FaRegTrashCan } from "react-icons/fa6";


const DetalhesLider: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [lider, setLider] = useState<Lider>({} as Lider);
    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [celulas, setCelula] = useState<Celula[]>([] as Celula[]);
    const [discipulador, setDiscipulador] = useState<Discipulador>({} as Discipulador);
    const [diretor, setDiretor] = useState<Diretor>({} as Diretor);

    const fetchLider = async () => {
        try {
            const lider = await getLiderById(String(id));
            setLider(lider);
            const pessoa = await getPessoaById(String(lider.pessoaId?.id));
            setPessoa(pessoa);
            try {
                const celula = await getCelulasByLiderId(String(lider.id));
                setCelula(celula);
            } catch (error) { console.log("Erro ao buscar celulas do lider", error); }
            try { const discipulador = await getDiscipuladorByPessoaId(String(pessoa.id)); setDiscipulador(discipulador); } catch (error) { console.log('Erro ao buscar discipulador', error); }
            try { const diretor = await getDiretorByPessoaId(String(pessoa.id)); setDiretor(diretor); } catch (error) { console.log('Erro ao buscar diretor', error); }
        } catch (error) {
            console.log('Erro ao buscar lider', error);

        }
    }

    useEffect(() => {
        fetchLider();
    }, []);

    const handleEditLider = (lider: Lider) => {
        navigate("/lideres/editar", { state: lider });
    }

    const handleDeleteLider = async (lider: Lider) => {
        try {
            await deleteLider(lider.id);
            fetchLider();
            alert("Lider removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover lider", error);
            alert("Erro ao remover lider. Tente novamente.");

        }
    };
    const handleRemoveLiderFromCelula = async (celulaId: string) => {
        try {
            await removeLiderFromCelula(celulaId);
            fetchLider();
            alert("Líder removido da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover líder da célula", error);
            alert("Erro ao remover líder da célula. Tente novamente.");

        }
    }

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

    const handleCelulaProfile = (celulaId: string) => {
        navigate(`/celula/${celulaId}`);
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
                    <Button onClick={handlePessoaProfile}>{capitalize(pessoa.cargo)}</Button>
                    {lider.id ? <Button selected>Líder</Button> : null}
                    {discipulador.id ? <Button onClick={handleDiscipuladorProfile}>Discipulador</Button> : null}
                    {diretor.id ? <Button onClick={handleDiretorProfile}>Diretor</Button> : null}
                </div>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => handleEditLider(lider)}><FaPencil /></Button>
                <Button onClick={() => handleDeleteLider(lider)}><FaRegTrashCan /></Button>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Células:</h3>
                            <Button green onClick={() => handleEditLider(lider)}><FaPlus /></Button>
                        </div>
                        <div className={styles.contentSection}>
                            {celulas.map((celula) => (
                                <div className={styles.contentBlock}>
                                    <div className={styles.contentTitle}>
                                        <h3 key={celula.id}>{celula.nome}</h3>
                                        <Button deleteButton onClick={() => handleRemoveLiderFromCelula(String(celula.id))}><FaRegTrashCan /></Button>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p key={celula.id}>{celula.enderecoId?.bairro}</p>
                                        <p key={celula.id}>{celula.diaDaSemana}</p>
                                        <p key={celula.id}>{celula.horario}</p>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p key={celula.id}>Discipulador: {celula.discipuladorId?.pessoaId?.nome}</p>
                                    </div>
                                    <br />
                                    <div className={styles.contentRow}>
                                        <Button blue onClick={() => handleCelulaProfile(String(celula.id))}>Ver Célula</Button>
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

export default DetalhesLider;