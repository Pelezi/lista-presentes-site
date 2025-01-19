import React, { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import styles from "./Layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [hide, setHide] = useState(true);

    const toggleSidebar = () => {
        setHide(prevHide => !prevHide);
    };

    return (
        <div className={styles.container}>
            {/* <Header /> */}
            <div className={styles.main}>
                <div className={`${styles.sidebar} ${hide && styles.hide}`}>
                    <Sidebar 
                    hide={hide}
                    toggleSidebar={toggleSidebar}
                    />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;