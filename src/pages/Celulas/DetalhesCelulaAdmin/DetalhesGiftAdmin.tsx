import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { deletePhone } from "../../../services/phoneService";
import { deleteEmail } from "../../../services/emailService";
import { Gift, deleteGift, getGiftsById } from "../../../services/giftService";
import { Grupo, getGruposByIntegranteId } from "../../../services/grupoService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesGiftAdmin.module.css";
import Button from "../../../components/common/Button";
import { FaPencil, FaPlus, FaRegTrashCan } from "react-icons/fa6";


const DetalhesGift: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [gift, setGift] = useState<Gift>({} as Gift);

    const fetchGift = async () => {
        try {
            const gift = await getGiftsById(String(id));
            setGift(gift);
        } catch (error) {
            console.log('Erro ao buscar gifts', error);

        }
    };

    useEffect(() => {
        fetchGift();
    }, []);

    const handleEditGift = (gift: Gift) => {
        navigate("/gifts/editar", { state: gift });
    }

    const handleDeleteGift = async (gift: Gift) => {
        try {
            await deleteGift(gift.id);
            fetchGift();
            alert("Gift removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover gift", error);
            alert("Erro ao remover gift. Tente novamente.");

        }
    };

    const capitalize = (str?: string) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        // <div className={styles.detalhesPage}>
        //     <div className={styles.section}>
        //         <h1>{gift.nome}</h1>
        //         <div className={styles.profiles}>
        //             {gift.liderId?.id ? <Button onClick={handleLiderProfile}>Líder</Button> : null}
        //             {gift.discipuladorId?.id ? <Button onClick={handleDiscipuladorProfile}>Discipulador</Button> : null}
        //         </div>
        //     </div>
        //     <div className={styles.buttons}>
        //         <Button onClick={() => handleEditGift(gift)}><FaPencil /></Button>
        //         <Button onClick={() => handleDeleteGift(gift)}><FaRegTrashCan /></Button>
        //     </div>
        //     <div className={styles.section}>
        //         <div className={styles.contentSection}>
        //             <div className={styles.contentBlock}>
        //                 <div className={styles.contentTitle}>
        //                     <h3>Info</h3>
        //                 </div>
        //                 <div className={styles.contentRow}>
        //                     <p>{capitalize(gift.diaDaSemana)}</p>
        //                     <p>{gift.horario}</p>
        //                 </div>
        //                 <div className={styles.contentRow}>
        //                     <p className={styles.link} onClick={handleLiderProfile}>Líder: {gift.liderId?.pessoaId?.nome}</p>
        //                 </div>
        //                 <div className={styles.contentRow}>
        //                     <p className={styles.link} onClick={handleDiscipuladorProfile}>Discipulador: {gift.discipuladorId?.pessoaId?.nome}</p>
        //                 </div>
        //             </div>
        //             <div className={styles.contentBlock}>
        //                 <div className={styles.contentTitle}>
        //                     <h3>Endereço:</h3>
        //                 </div>
        //                 <div className={styles.contentRow}>
        //                     <p>Bairro: {gift.enderecoId?.bairro}</p>
        //                 </div>
        //                 <div className={styles.contentRow}>
        //                     <p>Rua: {gift.enderecoId?.rua}</p>
        //                 </div>
        //                 <div className={styles.contentRow}>
        //                     <p>Número: {gift.enderecoId?.numero}</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <br />
        //     </div>
        //     <div className={styles.section}>
        //         <div className={styles.contentSection}>
        //             <div className={styles.contentBlock}>
        //                 <div className={styles.contentTitle}>
        //                     <h3>Membros:</h3>
        //                     <Button green onClick={() => handleEditGift(gift)}><FaPlus /></Button>
        //                 </div>
        //                 <div className={styles.contentSection}>
        //                     {pessoas.map((pessoa) => (
        //                         <div className={styles.contentBlock}>
        //                             <div className={styles.contentTitle}>
        //                                 <h3 key={pessoa.id}>{pessoa.nome}</h3>
        //                                 <Button deleteButton onClick={() => handleRemovePessoa(String(pessoa.id))}><FaRegTrashCan /></Button>
        //                             </div>
        //                             <div className={styles.contentRow}>
        //                                 <p key={pessoa.id}>Cargo: {pessoa.cargo}</p>
        //                             </div>
        //                             <div className={styles.contentRow}>
        //                                 <p>Bairro: {pessoa.enderecoId?.bairro}</p>
        //                             </div>
        //                             <br />
        //                             <div className={styles.contentRow}>
        //                                 <Button blue onClick={() => handlePessoaProfile(pessoa.id)}>Ver Pessoa</Button>
        //                             </div>
        //                             <br />
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div>hi</div>
    )
};

export default DetalhesGift;