import React, { useEffect, useState } from "react";

import styles from "./Home.module.css";

import Title from "../../components/common/Title";
import InfoBox from "../../components/common/InfoBox";

import { Gift, getGifts, sendTelegramMessage } from "../../services/giftService";

import { useAuth } from "../../contexts/AuthContext";

import tardis from "../../Assets/img/Small TARDIS.png";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const { guest } = useAuth();
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    const navigate = useNavigate();

    const fetchGifts = async () => {
        try {
            const response = await getGifts();
            setGifts(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleScroll = () => {
            const isBottom = (window.innerHeight * 1.5) + window.scrollY >= document.documentElement.scrollHeight;
            setIsScrolledToBottom(isBottom);
        };
    
        useEffect(() => {
            fetchGifts();
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);
    
        const handleBioButtonClick = () => {
            try {
                sendTelegramMessage("bio", guest.name);
                setTimeout(() => {
                    navigate("/bio");
                }, 400);
            } catch (error) {
                console.log(error);
            }
        };

    return (
        <main className={styles.container}>
            <Title className={styles.title}>Bem-vinda a minha Lista de Presentes</Title>
            <p className={styles.infoText}>
                As imagens são apenas ilustrativas, então não se preocupe em encontrar exatamente o que está na foto.
                <br />
                E lembre-se, o presente não é obrigatório, a sua presença é mais importante que qualquer presente!
            </p>
            <div className={styles.section}>
                {gifts.map((gift) => (
                    <InfoBox
                        key={gift.id}
                        gift={gift}
                    />
                ))}
            </div>
            <img
                className={`${styles.bioButton} ${isScrolledToBottom ? styles.bioButtonVisible : ""}`}
                src={tardis}
                alt=""
                onClick={handleBioButtonClick}
            />
        </main>
    )
};

export default Home;