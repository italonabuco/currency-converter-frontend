import React, { useState } from 'react';
import styled from 'styled-components';

import { Box, Paper } from '@material-ui/core';
import CurrencyInput from './CurrencyInput/CurrencyInput.component';
import { formatTextToStringNumber } from '../../helpers/utils';
import ConverterServices from '../../services/converter.services';
import { T_HistoryItem } from '../../types';

const CurrencyConverterWrapper = styled(Paper)`
    &.currency-converter {
        border-radius: 8px;
        width: 100%;

        .currency-converter__container {
            display: flex;
            flex-direction: column;
            padding: 16px 24px;
            justifycontent: space-between;
            alignitems: center;
        }
    }
`;

type T_Field = 'from' | 'to';

type T_UpdatedData = {
    fromCode: string;
    toCode: string;
    fromValue: string;
    toValue: string;
    inputChanged: T_Field;
};

interface I_CurrencyConverterProps {
    codes: string[];
    addToHistory: (item: T_HistoryItem) => void;
}

const CurrencyConverter: React.FC<I_CurrencyConverterProps> = ({
    codes,
    addToHistory,
}) => {
    const [fromCode, setFromCode] = useState(codes[0]);
    const [toCode, setToCode] = useState(codes[1]);
    const [fromValue, setFromValue] = useState('0');
    const [toValue, setToValue] = useState('0');
    const [timer, setTimer] = useState(0);

    const getUpdatedValues = (
        name: 'fromCode' | 'toCode' | 'fromValue' | 'toValue',
        field: T_Field,
        value: string
    ): T_UpdatedData => {
        return {
            fromCode,
            toCode,
            fromValue,
            toValue,
            inputChanged: field,
            [name]: value,
        };
    };

    const fetchConvertionResponse = (data: T_UpdatedData) => {
        clearTimeout(timer);
        const timeout = setTimeout(() => {
            const getValueToInput = (response: number) => {
                return response.toString().replace('.', ',');
            };
            if (
                parseFloat(data.fromValue.replace(',', '.')) === 0 &&
                parseFloat(data.toValue.replace(',', '.')) === 0
            ) {
                return;
            }
            if (data.inputChanged === 'from') {
                const value = parseFloat(data.fromValue.replace(',', '.'));
                ConverterServices.getConversionResponse(
                    data.fromCode,
                    data.toCode,
                    value
                ).then((res) => {
                    setFromValue(getValueToInput(value));
                    setToValue(getValueToInput(res.data.response));
                    addToHistory({
                        date: res.data.date,
                        from: {
                            value: getValueToInput(value),
                            abbr: data.fromCode,
                            rate: 1,
                        },
                        to: {
                            value: getValueToInput(res.data.response),
                            abbr: data.toCode,
                            rate: res.data.rate,
                        },
                    });
                });
            } else {
                const value = parseFloat(data.toValue.replace(',', '.'));
                ConverterServices.getConversionResponse(
                    data.toCode,
                    data.fromCode,
                    value
                ).then((res) => {
                    setFromValue(getValueToInput(res.data.response));
                    setToValue(getValueToInput(value));
                    addToHistory({
                        date: res.data.date,
                        to: {
                            value: getValueToInput(value),
                            abbr: data.fromCode,
                            rate: 1,
                        },
                        from: {
                            value: getValueToInput(res.data.response),
                            abbr: data.toCode,
                            rate: res.data.rate,
                        },
                    });
                });
            }
        }, 750);
        setTimer(timeout);
    };

    const handleSelect = (field: T_Field) => (code: string) => {
        switch (field) {
            case 'from':
                setFromCode(code);
                return fetchConvertionResponse(
                    getUpdatedValues('fromCode', 'from', code)
                );
            case 'to':
                setToCode(code);
                return fetchConvertionResponse(
                    getUpdatedValues('toCode', 'from', code)
                );
            default:
                return;
        }
    };

    const handleValueChange = (field: T_Field) => (value: string) => {
        const formattedValue = formatTextToStringNumber(value);
        switch (field) {
            case 'from':
                setFromValue(formattedValue);
                return fetchConvertionResponse(
                    getUpdatedValues('fromValue', field, formattedValue)
                );
            case 'to':
                setToValue(formattedValue);
                return fetchConvertionResponse(
                    getUpdatedValues('toValue', field, formattedValue)
                );
            default:
                return;
        }
    };

    return (
        <CurrencyConverterWrapper
            data-testid="currency-converter"
            className="currency-converter"
            elevation={4}
        >
            <Box className="currency-converter__container">
                <CurrencyInput
                    label="From"
                    codes={codes}
                    selected={fromCode}
                    value={fromValue}
                    onSelect={handleSelect('from')}
                    onChange={handleValueChange('from')}
                />
                <CurrencyInput
                    label="To"
                    codes={codes}
                    selected={toCode}
                    value={toValue}
                    onSelect={handleSelect('to')}
                    onChange={handleValueChange('to')}
                />
            </Box>
        </CurrencyConverterWrapper>
    );
};

export default CurrencyConverter;
