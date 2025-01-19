import React from "react";

import Input, { InputProps } from "../Input";

interface Options {
    value: string;
    label: string;
}

interface SelectProps extends InputProps {
    options: Options[];
}

const Select: React.FC < SelectProps > = ({ label, name, options, errors, touched, as="select" }) => {
    return ( 
        <Input
            label={label}
            name={name}
            as={as}
            errors={errors}
            touched={touched}
        >
            <option value="">Selecione uma opção</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Input>
    );
};

export default Select;