import React, { useEffect, useRef, useState } from "react";

import { Field, ErrorMessage, useFormikContext } from "formik";

import styles from "./Datalist.module.css";

interface Options {
    id: string;
    nome?: string;
    pessoaId?: {
        id: string;
        nome?: string;
    };
}

interface DatalistProps {
    label: string;
    name: string;
    type?: string;
    as?: string;
    errors?: string;
    touched?: boolean;
    className?: string;
    children?: React.ReactNode;
    hidden?: boolean;
    options: Options[];
    optionFilter?: string[];
    filterType: "exclude" | "include";
    initialName?: string;
}

const Datalist: React.FC<DatalistProps> = ({ label, name, options, errors, touched, as, hidden, className, optionFilter, filterType, initialName }) => {
    const { setFieldValue, setFieldError, setFieldTouched } = useFormikContext();

    const [selectedNome, setSelectedNome] = useState("");


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFieldValue(name, value);

        const selectedOption = options.find(option => option.id === value);
        if (selectedOption) {
            setFieldValue(name, selectedOption.id);
            setSelectedNome(selectedOption.nome || selectedOption.pessoaId?.nome || "");
        } else {
            setSelectedNome("");
        }
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const selectedOption = options.find(option => option.id === value);

        if (!selectedOption && value !== "") {
            setSelectedNome("");
            alert("Opção inválida, por favor selecione uma opção válida");
        } else if (selectedOption) {
            setSelectedNome(selectedOption.nome || selectedOption.pessoaId?.nome || "");
            setFieldValue(name, selectedOption.id);
        }
        setFieldTouched(name, true);
    }

    return (
        <fieldset className={`${styles.formGroup} ${hidden && styles.hidden}`}>
            <label htmlFor={name} className={styles.label}>
                {label}:
            </label>
            <Field
                id={name}
                name={name}
                as={as ? as : undefined}
                className={`${className ? className : styles.input} ${touched && errors && styles.error}`}
                list={label}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Selecione uma opção"
            >
            </Field>
            <ErrorMessage name={name} component="div" className={styles.errorMsg} />
            <datalist id={label}>
                <option value="">Selecione uma opção</option>
                {optionFilter ? options
                    .filter((option) => {
                        if (filterType === "include" && option.nome != null) {
                            return optionFilter && optionFilter.includes(option.id);
                        } else if (filterType === "include" && option.pessoaId?.nome != null) {
                            return optionFilter && optionFilter.includes(option.pessoaId.id);
                        } else if (filterType === "exclude" && option.nome != null) {
                            return !optionFilter || !optionFilter.includes(option.id)
                        } else if (filterType === "exclude" && option.pessoaId?.nome != null) {
                            return !optionFilter || !optionFilter.includes(option.pessoaId.id)
                        }
                    })
                    .map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.nome || option.pessoaId?.nome}
                        </option>
                    ))
                    :
                    options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.nome || option.pessoaId?.nome}
                        </option>
                    ))}
            </datalist>

            <input
                type="text"
                value={selectedNome || initialName}
                disabled
                className={`${className ? className : styles.input}`}
                placeholder="Nome da opção selecionada"
                autoComplete="off"
            />
        </fieldset>
    );
};

export default Datalist;