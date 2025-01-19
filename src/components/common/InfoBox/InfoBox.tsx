import React from "react";

import styles from "./InfoBox.module.css";
import { NavLink } from "react-router-dom";

interface InfoboxProps {
    title: string;
    value: number | string;
    icon?: React.ReactNode;
    link: string;
}

const InfoBox: React.FC<InfoboxProps> = ({ title, value, icon, link }) => {
    return (
        <NavLink to={link} className={styles.link}>
            <div className={styles.infoBox}>
                <h3>{title}</h3>
                <div className={styles.infoBoxContainer}>
                    {icon}
                    <h1>{value}</h1>
                </div>
            </div>
        </NavLink>
    );
};

export default InfoBox;