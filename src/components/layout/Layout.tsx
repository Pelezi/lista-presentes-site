import React, { useState } from "react";

import Sidebar from "./Sidebar";

import styles from "./Layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.content}>
                    {children}
                </div>
                <div className={styles.sidebar}>
                    <Sidebar/>
                </div>
            </div>
        </div>
    );
};

export default Layout;