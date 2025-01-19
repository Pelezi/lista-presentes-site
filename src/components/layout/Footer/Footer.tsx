import React from "react";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>
                &copy;{new Date().getFullYear()} Lista de presentes - Katarina.
            </p>
        </footer>
    );
};

export default Footer;