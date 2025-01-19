import React, { createContext, useContext, useEffect, useState } from "react";

import { Guest } from "../services/authService";

interface AuthContextProps {
    authenticated: boolean;
    guest: Guest;
    login: (guest: Guest) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(true);
    const [guest, setGuest] = useState({} as Guest);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedGuest = localStorage.getItem("guest");
        if(storedGuest) {
            setGuest(JSON.parse(storedGuest));
            setAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (loggedGuest: Guest) => {
        setGuest(loggedGuest);
        setAuthenticated(true);
        localStorage.setItem("guest", JSON.stringify(loggedGuest));
    };

    const logout = () => {
        setGuest({} as Guest);
        setAuthenticated(false);
        localStorage.removeItem("guest");
    };

    return (
        <AuthContext.Provider value={{ authenticated, guest, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}