import React from "react";

import styles from "./InfoBox.module.css";
import { NavLink } from "react-router-dom";
import { Gift } from "../../../services/giftService";

interface InfoboxProps {
    gift: Gift;
}

const InfoBox: React.FC<InfoboxProps> = ({ gift }) => {
    return (
        <NavLink to={`/gift/${gift.id}`} className={styles.giftCard}>
            <div className={styles.infoBox}>
                <h3>{gift.name}</h3>
            </div>
        </NavLink>
    );
};

export default InfoBox;