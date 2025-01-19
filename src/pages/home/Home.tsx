import React, { useEffect, useState } from "react";

import styles from "./Home.module.css";

import { FaHouseChimney, FaHouseChimneyUser, FaUser, FaUserGroup, FaUserTie, FaUsers } from "react-icons/fa6";

import Title from "../../components/common/Title";
import InfoBox from "../../components/common/InfoBox";

import { Pessoa, getPessoas } from "../../services/pessoaService";
import { Lider, getLideres } from "../../services/liderService";
import { Discipulador, getDiscipuladores } from "../../services/discipuladorService";
import { Diretor, getDiretores } from "../../services/diretorService";
import { Celula, getCelulas } from "../../services/celulaService";
import { Grupo, getGrupos } from "../../services/grupoService";
import { NavLink } from "react-router-dom";

const Home = () => {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [lideres, setLideres] = useState<Lider[]>([]);
    const [discipuladores, setDiscipuladores] = useState<Discipulador[]>([]);
    const [celulas, setCelulas] = useState<Celula[]>([]);
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [diretores, setDiretores] = useState<Diretor[]>([]);

    const fetchPessoas = async () => {
        try {
            const response = await getPessoas();
            setPessoas(response);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchLideres = async () => {
        try {
            const response = await getLideres();
            setLideres(response);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDiscipuladores = async () => {
        try {
            const response = await getDiscipuladores();
            setDiscipuladores(response);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDiretores = async () => {
        try {
            const response = await getDiretores();
            setDiretores(response);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCelulas = async () => {
        try {
            const response = await getCelulas();
            setCelulas(response);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchGrupos = async () => {
        try {
            const response = await getGrupos();
            setGrupos(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPessoas();
        fetchLideres();
        fetchDiscipuladores();
        fetchDiretores();
        fetchCelulas();
        fetchGrupos();
    }, []);

    return (
        <main className={styles.container}>
            <Title className={styles.title}>Bem-vindo ao Uvas</Title>
            <p>Esta é a página inicial onde podemos encontrar algumas estatísticas.</p>
            <div className={styles.infoBoxContainer}>
                <div className={styles.section}>
                        <InfoBox
                            title="Pessoas cadastradas"
                            value={pessoas.length}
                            icon={<FaUser size={65} />}
                            link="/pessoas/listar"
                        />
                    <InfoBox
                        title="Células cadastradas"
                        value={celulas.length}
                        icon={<FaHouseChimney size={65} />}
                        link="/celulas/listar"
                    />
                    <InfoBox
                        title="Líderes cadastrados"
                        value={lideres.length}
                        icon={<FaHouseChimneyUser size={65} />}
                        link="/lideres/listar"
                    />
                    <InfoBox
                        title="Discipuladores cadastrados"
                        value={discipuladores.length}
                        icon={<FaUserGroup size={65} />}
                        link="/discipuladores/listar"
                    />
                </div>
                <div className={styles.section}>
                    <InfoBox
                        title="Grupos cadastrados"
                        value={grupos.length}
                        icon={<FaUsers size={65} />}
                        link="/grupos/listar"
                    />
                    <InfoBox
                        title="Diretores cadastrados"
                        value={diretores.length}
                        icon={<FaUserTie size={65} />}
                        link="/diretores/listar"
                    />
                </div>
            </div>
        </main>
    )
};

export default Home;