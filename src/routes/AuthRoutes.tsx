import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Layout from '../components/layout';

import { useAuth } from "../contexts/AuthContext";

import Home from '../pages/home';
import Admin from '../pages/Admin';

import MeusPresentes from '../pages/pessoas/MeusPresentes';

import DetalhesCelula from "../pages/Celulas/DetalhesCelulaAdmin";
import DetalhesGiftGuest from "../pages/Celulas/DetalhesGiftGuest";
import RemoveGiftGuest from "../pages/Celulas/RemoveGiftGuest";
import ManipularGift from "../pages/Celulas/ManipularGift";

const AuthRoutes: React.FC = () => {
    const { authenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>
    }

    if (!authenticated) {
        return <Navigate to="/login" />
    }


    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/gift/:id/admin" element={<DetalhesCelula />} />
                <Route path="/gift/:id" element={<DetalhesGiftGuest />} />
                <Route path="/gift/:id/remove" element={<RemoveGiftGuest />} />
                <Route path="/gifts/cadastrar" element={<ManipularGift />} />
                <Route path="/gifts/editar" element={<ManipularGift />} />
                <Route path="/meus-presentes" element={<MeusPresentes />} />

                <Route path="/admin" element={<Admin />} />

            </Routes>
        </Layout>
    )
}

export default AuthRoutes;