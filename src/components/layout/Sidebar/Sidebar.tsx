import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

import { useAuth } from "../../../contexts/AuthContext";
import { FaAngleRight, FaCaretDown, FaCaretUp, FaHouse, FaUser, FaUsers } from "react-icons/fa6";
import { MdDashboard, MdLogout } from "react-icons/md";

interface SidebarProps {
    hide?: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ hide, toggleSidebar }) => {

    const [dropdownStates, setDropdownStates] = useState<{ [key: string]: boolean }>({
        dropdown1: false,
        dropdown2: false,
        dropdown3: false,
    });

    const toggleDropdown = (dropdownKey: string) => {
        !hide ?
        setDropdownStates(prevState => ({
            ...prevState,
            [dropdownKey]: !prevState[dropdownKey],
        }))
        :
        toggleSidebar();
    };

    const toggleactiveDropdowns = () => {
        setDropdownStates(prevState => ({
            dropdown1: false,
            dropdown2: false,
            dropdown3: false,
        }));
    }

    const { logout } = useAuth();

    return (
        <nav className={`${styles.navigation} ${hide && styles.hide}`}>
            <header>
                <div className={styles.imageText}>
                    <span className={styles.image}>
                        <img src="https://i.imgur.com/VQDMsMa.png" alt="" />
                    </span>
                    <div className={`${styles.text} ${hide && styles.hide}`}>
                        <span className={styles.name}>Uvas</span>
                    </div>
                </div>
                <button className={styles.sidebarToggle} id="sidebarToggle" onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}>
                    <FaAngleRight />
                </button>
            </header>
            <div className={styles.menuBar}>
                <div className={styles.menu}>
                    <ul>
                        <li>
                            <NavLink
                                className={({ isActive }) =>(
                                    isActive ? `${styles.link} ${styles.activeLink}` : styles.link

                                )
                                }
                                to="/home"
                                onClick={() => { if(!hide){ toggleSidebar(); toggleactiveDropdowns();} else {} }}
                            >
                                <MdDashboard className={styles.icon} />
                                <span className={`${styles.text} ${hide && styles.hide}`}>Dashboard</span>
                            </NavLink>
                        </li>
                        {/* Dropdown 1 */}
                        <button className={`${styles.dropdownBtn} ${dropdownStates.dropdown1 && styles.active}`} onClick={() => toggleDropdown('dropdown1')}>
                            <FaUser className={styles.icon} />
                            <span className={`${styles.text} ${hide && styles.hide}`}>
                                Pessoas
                                {dropdownStates.dropdown1 ? <FaCaretUp className={styles.dropdownIcon} /> : <FaCaretDown className={styles.dropdownIcon} />}
                            </span>
                        </button>
                        <div className={`${styles.dropdownContainer} ${dropdownStates.dropdown1 && styles.show}`}>
                            <ul>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/pessoas/cadastrar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Cadastrar pessoa
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/pessoas/listar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Listar pessoas
                                </NavLink>
                            </ul>
                        </div>

                        {/* Dropdown 2 */}
                        <button className={`${styles.dropdownBtn} ${dropdownStates.dropdown2 && styles.active}`} onClick={() => toggleDropdown('dropdown2')}>
                            <FaHouse className={styles.icon} />
                            <span className={`${styles.text} ${hide && styles.hide}`}>
                                Células
                                {dropdownStates.dropdown2 ? <FaCaretUp className={styles.dropdownIcon} /> : <FaCaretDown className={styles.dropdownIcon} />}
                            </span>
                        </button>
                        <div className={`${styles.dropdownContainer} ${dropdownStates.dropdown2 && styles.show}`}>
                            <ul>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/celulas/cadastrar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Cadastrar célula
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/celulas/listar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Listar células
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/lideres/cadastrar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Cadastrar líder
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/lideres/listar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Listar líderes
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/discipuladores/cadastrar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Cadastrar discipulador
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/discipuladores/listar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Listar discipuladores
                                </NavLink>
                            </ul>
                        </div>

                        {/* Dropdown 3 */}
                        <button className={`${styles.dropdownBtn} ${dropdownStates.dropdown3 && styles.active}`} onClick={() => toggleDropdown('dropdown3')}>
                            <FaUsers className={styles.icon} />
                            <span className={`${styles.text} ${hide && styles.hide}`}>
                                Grupos
                                {dropdownStates.dropdown3 ? <FaCaretUp className={styles.dropdownIcon} /> : <FaCaretDown className={styles.dropdownIcon} />}
                            </span>
                        </button>
                        <div className={`${styles.dropdownContainer} ${dropdownStates.dropdown3 && styles.show}`}>
                            <ul>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/grupos/cadastrar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Cadastrar grupo
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/grupos/listar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Listar grupos
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/diretores/cadastrar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Cadastrar diretor
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? `${styles.dropdownLink} ${styles.activeDropdownLink}` : styles.dropdownLink
                                    }
                                    to="/diretores/listar"
                                    onClick={() => { toggleSidebar(); toggleactiveDropdowns(); }}
                                >
                                    Listar diretores
                                </NavLink>
                            </ul>
                        </div>
                    </ul>
                </div>
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                            }
                            to="/"
                            onClick={logout}
                        >
                            <MdLogout className={`${styles.icon} ${styles.logout}`} />
                            <span className={`${styles.text} ${hide && styles.hide}`}>Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;