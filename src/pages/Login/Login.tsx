import React from "react";

// import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import Input from "../../components/forms/Input";
import Form from "../../components/forms/Form";
import Button from "../../components/common/Button";
import Title from "../../components/common/Title";

import { Guest, login as loginService } from "../../services/authService";

import { useAuth } from "../../contexts/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const initialValues: Guest = {
        name: "",
        phone: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Nome é obrigatório"),
        phone: Yup.string()
            .required("Telefone é obrigatório"),
    });

    const onSubmit = async (values: Guest) => {
        try {
            const guest = await loginService(values);
            login(guest);
            navigate('/home');
        } catch (error) {
            console.log(error);
            alert('Erro ao realizar login');
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <img className={`${styles.buque} ${styles.buquel}`} src="https://i.imgur.com/WUCmF9r.png" alt="" />
            <img className={`${styles.buque} ${styles.buquer}`} src="https://i.imgur.com/hQ48o4g.png" alt="" />
            <div className={styles.contentBox}>
                <div className={styles.formBox}>
                    <h2>Login</h2>
                    <Form
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched}) => (
                            <>
                        <div className={styles.inputBox}>
                            <Input 
                                label="Nome"
                                name="name"
                                type="text"
                                errors={errors.name}
                                touched={touched.name} 
                                placeholder="Nome completo" 
                            />
                        </div>

                        <div className={styles.inputBox}>
                            <Input 
                                label="Telefone"
                                name="phone"
                                type="text"
                                phone
                                errors={errors.phone}
                                touched={touched.phone} 
                                placeholder="(xx) x xxxx-xxxx"
                            />
                        </div>
                        <Button type="submit">Entrar</Button>

                        <div className={styles.inputBox}>
                            <p>Não Tem Uma Conta? <a href="#">Inscrever-se</a></p>
                        </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;