import React from 'react';
import {
    Box,
    InputBase,
    MenuItem,
    Select,
    Typography,
} from '@material-ui/core';
import styled from 'styled-components';

const SelectOptionWrapper = styled.div`
    &.select-option {
        display: flex;
        align-items: center;
        .select-option__label {
            margin-left: 8px;
            font-weight: 500;
            color: #3e4851;
        }
    }
`;

const SelectOption: React.FC<{ label: string }> = ({ label }) => {
    return (
        <SelectOptionWrapper className="select-option">
            <div
                className={`currency-flag currency-flag-lg currency-flag-${label.toLocaleLowerCase()}`}
            ></div>
            {/* <Avatar variant="square" src={img}/> */}
            <Typography className="select-option__label">{label}</Typography>
        </SelectOptionWrapper>
    );
};

const CurrencyInputWrapper = styled(Box)`
    &.currency-input {
        width: 100%;
        margin-bottom: 16px;
        .currency-input__label {
            color: #8995a0;
        }
        .currency-input__container {
            display: flex;
            border: 1px solid #8995a0;
            border-radius: 8px;
            overflow: hidden;
            .currency-input__container__field {
                flex: 1;
                padding: 0px 16px;
                font-size: 18px;
            }
            .currency-input__container__select {
                min-width: 120px;
                background-color: #cfdde8;
                .MuiSelect-root {
                    padding-left: 16px;
                    padding-top: 12px;
                    padding-bottom: 12px;
                }
            }
        }
    }
`;

interface I_CurrencyInputProps {
    codes: string[];
    value: string;
    selected: string;
    label: string;
    onSelect: (code: string) => void;
    onChange: (value: string) => void;
}

const CurrencyInput: React.FC<I_CurrencyInputProps> = ({
    value,
    codes,
    label,
    selected,
    onSelect,
    onChange,
}) => {
    return (
        <CurrencyInputWrapper className="currency-input">
            <Typography className="currency-input__label">{label}</Typography>
            <div className="currency-input__container">
                <InputBase
                    value={value}
                    className="currency-input__container__field"
                    onChange={(e) => onChange(e.target.value)}
                />
                <Select
                    value={selected}
                    className="currency-input__container__select"
                    disableUnderline
                    onChange={(e) => onSelect('' + e.target.value)}
                >
                    {codes.map((code) => (
                        <MenuItem value={code} key={code}>
                            <SelectOption label={code} />
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </CurrencyInputWrapper>
    );
};

export default CurrencyInput;
