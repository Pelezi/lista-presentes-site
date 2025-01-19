import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

import { useAuth } from "../../../contexts/AuthContext";
import { FaGift } from "react-icons/fa6";
import { MdOutlineShoppingCart, MdLogout } from "react-icons/md";


const Sidebar: React.FC = ({ }) => {

    const { logout } = useAuth();

    return (
        <nav className={`${styles.navigation}`}>
            <NavLink
                className={({ isActive }) => (
                    isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                )
                }
                to="/"
                onClick={() => { { } }}
            >
                <FaGift className={styles.icon} />
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                }
                to="/pessoas/listar"
                onClick={() => { }}
            >
                <MdOutlineShoppingCart className={styles.icon} />
            </NavLink>



            <NavLink
                className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                }
                to="/Login"
                onClick={logout}
            >
                <MdLogout className={`${styles.icon} ${styles.logout}`} />
            </NavLink>
        </nav>
    );
};

export default Sidebar;