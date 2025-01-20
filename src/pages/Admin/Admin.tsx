import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Admin.module.css";

import InfoBoxAdminView from "../../components/common/InfoBoxAdminView";

import { Gift, getGifts } from "../../services/giftService";

const Home = () => {
    const [gifts, setGifts] = useState<Gift[]>([]);
    const navigate = useNavigate();

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
            <div className={styles.section}>
                {gifts.map((gift) => (
                    <InfoBoxAdminView
                        key={gift.id}
                        gift={gift}
                        fetchGifts={fetchGifts}
                    />
                ))}
            </div>
            <button className={styles.addButton} onClick={() => navigate("/gifts/cadastrar")}>
                +
            </button>
        </main>
    )
};

export default Home;