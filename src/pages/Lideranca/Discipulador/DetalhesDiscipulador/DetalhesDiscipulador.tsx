import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Discipulador, deleteDiscipulador, getDiscipuladorById } from "../../../../services/discipuladorService";
import { Pessoa, deletePessoa, getPessoaById, removePessoaFromCelula, removePessoaFromGrupo } from "../../../../services/pessoaService";
import { deletePhone } from "../../../../services/phoneService";
import { deleteEmail } from "../../../../services/emailService";
import { Celula, getCelulasById, getCelulasByDiscipuladorId, removeDiscipuladorFromCelula } from "../../../../services/celulaService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesDiscipulador.module.css";
import Button from "../../../../components/common/Button";
import { FaPencil, FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { Diretor, getDiretorByPessoaId } from "../../../../services/diretorService";
import { Lider, getLiderByPessoaId } from "../../../../services/liderService";


const DetalhesDiscipulador: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [discipulador, setDiscipulador] = useState<Discipulador>({} as Discipulador);
    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [celulas, setCelula] = useState<Celula[]>([] as Celula[]);
    const [diretor, setDiretor] = useState<Diretor>({} as Diretor);
    const [lider, setLider] = useState<Lider>({} as Lider);

    const fetchDiscipulador = async () => {
        try {
            const discipulador = await getDiscipuladorById(String(id));
            setDiscipulador(discipulador);
            const pessoa = await getPessoaById(String(discipulador.pessoaId?.id));
            setPessoa(pessoa);
            try {
                const celula = await getCelulasByDiscipuladorId(String(discipulador.id));
                setCelula(celula);
            } catch (error) { console.log("Erro ao buscar celulas do discipulador", error); }
            try { const lider = await getLiderByPessoaId(String(pessoa.id)); setLider(lider); } catch (error) { console.log('Erro ao buscar lider', error); }
            try { const diretor = await getDiretorByPessoaId(String(pessoa.id)); setDiretor(diretor); } catch (error) { console.log('Erro ao buscar diretor', error); }
        } catch (error) {
            console.log('Erro ao buscar discipulador', error);

        }
    }

    useEffect(() => {
        fetchDiscipulador();
    }, []);

    const handleEditDiscipulador = (discipulador: Discipulador) => {
        navigate("/discipuladores/editar", { state: discipulador });
    }

    const handleDeleteDiscipulador = async (discipulador: Discipulador) => {
        try {
            await deleteDiscipulador(discipulador.id);
            fetchDiscipulador();
            alert("Discipulador removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover discipulador", error);
            alert("Erro ao remover discipulador. Tente novamente.");

        }
    };
    const handleRemoveDiscipuladorFromCelula = async (celulaId: string) => {
        try {
            await removeDiscipuladorFromCelula(celulaId);
            fetchDiscipulador();
            alert("Discipulador removido da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover discipulador da célula", error);
            alert("Erro ao remover discipulador da célula. Tente novamente.");

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
                    {lider.id ? <Button onClick={handleLiderProfile}>Líder</Button> : null}
                    {discipulador.id ? <Button selected>Discipulador</Button> : null}
                    {diretor.id ? <Button onClick={handleDiretorProfile}>Diretor</Button> : null}
                </div>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => handleEditDiscipulador(discipulador)}><FaPencil /></Button>
                <Button onClick={() => handleDeleteDiscipulador(discipulador)}><FaRegTrashCan /></Button>
            </div>
            <div className={styles.section}>
                <div className={styles.contentSection}>
                    <div className={styles.contentBlock}>
                        <div className={styles.contentTitle}>
                            <h3>Células:</h3>
                            <Button green onClick={() => handleEditDiscipulador(discipulador)}><FaPlus /></Button>
                        </div>
                        <div className={styles.contentSection}>
                            {celulas.map((celula) => (
                                <div className={styles.contentBlock}>
                                    <div className={styles.contentTitle}>
                                        <h3 key={celula.id}>{celula.nome}</h3>
                                        <Button deleteButton onClick={() => handleRemoveDiscipuladorFromCelula(String(celula.id))}><FaRegTrashCan /></Button>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p key={celula.id}>{celula.enderecoId?.bairro}</p>
                                        <p key={celula.id}>{celula.diaDaSemana}</p>
                                        <p key={celula.id}>{celula.horario}</p>
                                    </div>
                                    <div className={styles.contentRow}>
                                        <p key={celula.id}>Líder: {celula.liderId?.pessoaId?.nome}</p>
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

export default DetalhesDiscipulador;