import React, { useEffect, useState } from "react";

import styles from "./Home.module.css";

import { FaHouseChimney, FaHouseChimneyUser, FaUser, FaUserGroup, FaUserTie, FaUsers } from "react-icons/fa6";

import Title from "../../components/common/Title";
import InfoBox from "../../components/common/InfoBox";

import { Gift, getGifts } from "../../services/giftService";

import { NavLink } from "react-router-dom";

const Home = () => {
    const [gifts, setGifts] = useState<Gift[]>([]);

    const fetchGifts = async () => {
        try {
            const response = await getGifts();
            setGifts(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGifts();
    }, []);

    return (
        <main className={styles.container}>
            <Title className={styles.title}>Bem-vinda a minha Lista de Presentes</Title>
            <div className={styles.section}>
                {gifts.map((gift) => (
                    <InfoBox
                        key={gift.id}
                        gift={gift}
                    />
                ))}
            </div>
        </main>
    )
};

export default Home;