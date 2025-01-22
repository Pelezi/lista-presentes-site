import React, { useState } from "react";

import buqueLeft from "../../Assets/img/floral-header-left.png";
import buqueRight from "../../Assets/img/floral-header-right.png";

import Menu from "./Menu";

import styles from "./Layout.module.css";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <img className={`${styles.buque} ${styles.buquel}`} src={buqueLeft} alt="" />
                <img className={`${styles.buque} ${styles.buquer}`} src={buqueRight} alt="" />
                <div className={styles.content}>
                    {children}
                </div>
                <div className={styles.menu}>
                    <Menu />
                </div>
            </div>
        </div>
    );
};

export default Layout;