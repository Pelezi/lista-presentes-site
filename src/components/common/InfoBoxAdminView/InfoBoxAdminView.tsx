import React, { useEffect, useState } from "react";
import styles from "./InfoBoxAdminView.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Gift, deleteGift, getGiftsById } from "../../../services/giftService";

import Button from "../Button";

interface InfoboxProps {
    gift: Gift;
}

const InfoBoxAdminView: React.FC<InfoboxProps> = ({ gift }) => {
    const navigate = useNavigate();
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [giftInfo, setGiftInfo] = useState<Gift>();

    const fetchGiftData = async () => {
        const info = await getGiftsById(gift.id);
        setGiftInfo(info);
        setAvailableQuantity(gift.quantity - (gift.count ?? 0));
    };

    useEffect(() => {
        fetchGiftData();
    }, [gift.id]);

    const handleEdit = (gift: Gift) => {
        navigate("/gifts/editar", { state: gift });
    }

    const handleDelete = async (gift: Gift) => {
        try {
            await deleteGift(gift.id);
            fetchGiftData();
            alert("Gift removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover gift", error);
            alert("Erro ao remover gift. Tente novamente.");

        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>
                <img src={gift.photoUrl} className={styles.cardImage} alt={gift.name} /> {/* Added fallback for photoUrl */}
                <h2 className={styles.cardTitle}>{gift.name}</h2>
                <p className={styles.cardDescription}>{gift.description}</p>
                <p className={styles.cardQuantity}>Quantidade Disponível: {availableQuantity}/{gift.quantity}</p>
                {giftInfo?.guests?.map((guest) => (
                    <p className={styles.cardDescription} key={guest.guest.id}>{guest.guest.name} - {guest.count}</p>
                ))
                }
            </div>
            <div>
                <Button onClick={() => handleEdit(gift)}>Editar presente</Button>
                <Button deleteButton onClick={() => handleDelete(gift)} >Remover presente</Button>
            </div>
        </div>
    );
};

export default InfoBoxAdminView;