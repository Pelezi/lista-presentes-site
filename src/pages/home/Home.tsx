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
            const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
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
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        };

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