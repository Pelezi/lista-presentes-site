import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Layout from '../components/layout';

import { useAuth } from "../contexts/AuthContext";

import Home from '../pages/home';
import ListarPessoas from '../pages/pessoas/ListarPessoas';
import ManipularPessoas from '../pages/pessoas/ManipularPessoas';
import DetalhesPessoa from "../pages/pessoas/DetalhesPessoa";
import CriarPhone from "../pages/pessoas/Phone/CriarPhone";
import CriarEmail from "../pages/pessoas/Email/CriarEmail";

import AdicionarACelula from "../pages/pessoas/Celula/AdicionarACelula";
import AdicionarAGrupo from "../pages/pessoas/Grupo/AdicionarAGrupo";

import ManipularCelula from "../pages/Celulas/ManipularCelula";
import ListarCelulas from "../pages/Celulas/ListarCelulas";
import DetalhesCelula from "../pages/Celulas/DetalhesCelula";

import ManipularGrupo from "../pages/Grupos/ManipularGrupo";
import ListarGrupos from "../pages/Grupos/ListarGrupos";
import DetalhesGrupo from "../pages/Grupos/DetalhesGrupo";

import ManipularLider from "../pages/Lideranca/Lider/ManipularLider";
import ListarLider from "../pages/Lideranca/Lider/ListarLider";
import DetalhesLider from "../pages/Lideranca/Lider/DetalhesLider";

import ManipularDiscipulador from "../pages/Lideranca/Discipulador/ManipularDiscipulador";
import ListarDiscipulador from "../pages/Lideranca/Discipulador/ListarDiscipulador";
import DetalhesDiscipulador from "../pages/Lideranca/Discipulador/DetalhesDiscipulador";

import ManipularDiretor from "../pages/Lideranca/Diretor/ManipularDiretor";
import ListarDiretor from "../pages/Lideranca/Diretor/ListarDiretor";
import DetalhesDiretor from "../pages/Lideranca/Diretor/DetalhesDiretor";

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
                <Route path="/home" element={<Home />} />
                
                <Route path="/pessoas/cadastrar" element={<ManipularPessoas />} />
                <Route path="/pessoas/editar" element={<ManipularPessoas />} />
                <Route path="/pessoas/listar" element={<ListarPessoas />} />
                <Route path="/pessoa/:id" element={<DetalhesPessoa />} />
                <Route path="pessoas/phones/cadastrar/:pessoaId" element={<CriarPhone />}/>
                <Route path="pessoas/emails/cadastrar/:pessoaId" element={<CriarEmail />}/>
                <Route path="pessoas/celula/:pessoaId" element={<AdicionarACelula />} />
                <Route path="pessoas/grupo/:pessoaId" element={<AdicionarAGrupo />} />

                <Route path="/celulas/cadastrar" element={<ManipularCelula />} />
                <Route path="/celulas/editar" element={<ManipularCelula />} />
                <Route path="/celulas/listar" element={<ListarCelulas />} />
                <Route path="/celula/:id" element={<DetalhesCelula />} />

                <Route path="/grupos/cadastrar" element={<ManipularGrupo />} />
                <Route path="/grupos/editar" element={<ManipularGrupo />} />
                <Route path="/grupos/listar" element={<ListarGrupos />} />
                <Route path="/grupo/:id" element={<DetalhesGrupo />} />

                <Route path="/lideres/cadastrar" element={<ManipularLider />} />
                <Route path="/lideres/editar" element={<ManipularLider />} />
                <Route path="/lideres/listar" element={<ListarLider />} />
                <Route path="/lider/:id" element={<DetalhesLider />} />
                
                <Route path="/discipuladores/cadastrar" element={<ManipularDiscipulador />} />
                <Route path="/discipuladores/editar" element={<ManipularDiscipulador />} />
                <Route path="/discipuladores/listar" element={<ListarDiscipulador />} />
                <Route path="/discipulador/:id" element={<DetalhesDiscipulador />} />

                <Route path="/diretores/cadastrar" element={<ManipularDiretor />} />
                <Route path="/diretores/editar" element={<ManipularDiretor />} />
                <Route path="/diretores/listar" element={<ListarDiretor />} />
                <Route path="/diretor/:id" element={<DetalhesDiretor />} />
            </Routes>
        </Layout>
    )
}

export default AuthRoutes;