import React, { useEffect, useState } from "react";

import { Field, ErrorMessage, useFormikContext } from "formik";

import styles from "./MultipleDatalist.module.css";

interface Options {
    id: string;
    nome: string;
}

interface MultipleDatalistProps {
    label: string;
    name: string;
    options: Options[];
    errors?: string;
    touched?: boolean;
    className?: string;
    selectedGrupos: string[];
    setSelectedGrupos: (selectedGrupos: string[]) => void;
}

const MultipleDatalist: React.FC<MultipleDatalistProps> = ({ label, name, options, touched, className, errors, selectedGrupos, setSelectedGrupos }) => {
    const { setFieldValue } = useFormikContext();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (selectedGrupos) {
            setSelectedItems(selectedGrupos);
        }
    })

    const handleInputChange = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const selectedOption = options.find(option => option.id === value);

        if (!selectedOption) {
            setFieldValue(name, "");
            setInputValue("");
            alert("Opção inválida, por favor selecione uma opção válida");
        } else if (!selectedItems.includes(selectedOption.id)){
            setSelectedItems([...selectedItems, selectedOption.id]);
            setSelectedGrupos([...selectedItems, selectedOption.id]);
            setInputValue("");
            if (!selectedItems.includes(inputValue)) {
                setFieldValue(name, selectedItems);
                setInputValue("");
            }
        }
    };

    const handleItemRemove = (itemId: string) => {
        setSelectedItems(selectedItems.filter((item) => item !== itemId));
        setSelectedGrupos(selectedItems.filter((item) => item !== itemId));
        console.log("remove selectedGrupos", selectedGrupos);
    }

    return (
        <fieldset className={styles.formGroup}>
            <label htmlFor={name} className={styles.label}>
                {label}:
            </label>
            <div className={styles.selectedItems}>
                {selectedItems.map(itemId => (
                    <div key={itemId} className={styles.selectedItem}>
                        {options.find(option => option.id === itemId)?.nome}
                        <span onClick={() => handleItemRemove(itemId)}>x</span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className={`${className ? className : styles.input} ${touched && errors && styles.error}`}
                list={`${name}-datalist`}
                autoComplete="off"
            />
            <datalist id={`${name}-datalist`}>
                {options
                    .filter(option => !selectedItems.includes(option.id))
                    .map(option => (
                        <option key={option.id} value={option.id} >
                            {option.nome}
                        </option>
                    ))}
            </datalist>

            <ErrorMessage name={name} component="div" className={styles.errorMsg} />
        </fieldset>
    );
};

export default MultipleDatalist;