import React, { useEffect, useState } from "react";
import styles from "./InfoBox.module.css";
import { NavLink } from "react-router-dom";
import { Gift, getGiftsById } from "../../../services/giftService";

interface InfoboxProps {
    gift: Gift;
}

const InfoBox: React.FC<InfoboxProps> = ({ gift }) => {
    const [isUnavailable, setIsUnavailable] = useState(false);

    useEffect(() => {
        const fetchGiftData = async () => {
            const updatedGift = await getGiftsById(gift.id);
            const totalCount = updatedGift.guests?.reduce((sum, guest) => sum + guest.count, 0) || 0;
            setIsUnavailable(totalCount >= updatedGift.quantity);
        };

        fetchGiftData();
    }, []);

    return (
        <div className={`${styles.card} ${isUnavailable ? styles.unavailable : ''}`}>
            <div className={styles.cardBody}>
                <img src={gift.photoUrl} className={styles.cardImage} alt={gift.name} />
                <h2 className={styles.cardTitle}>{gift.name}</h2>
                <p className={styles.cardDescription}>{gift.description}</p>
                {gift.quantity === 1 ? <></> : 
                <p className={styles.cardQuantity}>Restam: 2/{gift.quantity}</p> }
            </div>
            <NavLink to={`/gift/${gift.id}`} className={styles.cardBtn}>Escolher presente</NavLink>
        </div>
    );
};

export default InfoBox;