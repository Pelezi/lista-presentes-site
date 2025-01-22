import React, { useEffect, useState, useRef } from "react";

import styles from "./Bio.module.css";
import SocialMedia from "../../components/common/SocialMedia";
import { sendTelegramMessage } from "../../services/giftService";
import { useAuth } from "../../contexts/AuthContext";

const Bio = () => {
    const [countdown, setCountdown] = useState(5);
    const hasOpenedUrl = useRef(false);

    const { guest } = useAuth();

    const socialMediaData = [
        {
            "name": "Instagram",
            "image": "https://i.imgur.com/eabx72O.png",
            "userName": "@opelezi",
            "url": "https://www.instagram.com/thepelezi/"
        },
        {
            "name": "Linkedin",
            "image": "https://i.imgur.com/d4l2c30.png",
            "userName": "/alessandro-cardoso-500418163",
            "url": "https://www.linkedin.com/in/alessandro-cardoso-500418163/"
        },
        {
            "name": "Github",
            "image": "https://i.imgur.com/57uuR09.png",
            "userName": "/Pelezi",
            "url": "https://github.com/Pelezi"
        },
        {
            "name": "Steam",
            "image": "https://i.imgur.com/OOp3NFZ.png",
            "userName": "opelezi",
            "url": "https://steamcommunity.com/id/Thepelezi/"
        },
        {
            "name": "Discord",
            "image": "https://i.imgur.com/VgKBKH2.png",
            "userName": "pelezi#9095",
        },
        {
            "name": "Genshin",
            "image": "https://i.imgur.com/1cs0bA2.png",
            "userName": "Pelezi 619260893i",
            "url": "https://www.hoyolab.com/accountCenter/postList?id=108271312"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 1 && !hasOpenedUrl.current) {
                    try {
                        clearInterval(timer);
                        hasOpenedUrl.current = true;
                        sendTelegramMessage("rickroll", guest.name);
                        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                    } catch (error) {
                        console.log(error);
                    }
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.container}>
            <p>Parabéns, você encontrou o meu segredo!</p>
            <p>Aguarde a contagem regressiva para uma surpresa incrível.</p>
            <main className={styles.container}>
                <p className={styles.countdown}>{countdown}</p>
            </main>
            Site feito por Alessandro Cardoso
            {socialMediaData.map((social, index) => (
                <SocialMedia
                    key={index}
                    name={social.name}
                    userName={social.userName}
                    url={social.url}
                    image={social.image}
                />
            ))}

        </div>
    )
};

export default Bio;