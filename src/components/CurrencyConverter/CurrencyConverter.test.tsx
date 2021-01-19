import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import appConfig from '../../appConfig';
import { T_HistoryItem } from '../../types';
import CurrencyConverter from './CurrencyConverter.component';

const setup = () => {
    const mockAddToHistory = jest.fn();
    const renderConverter = () =>
        render(
            <CurrencyConverter
                codes={['USD', 'EUR', 'JPY']}
                addToHistory={mockAddToHistory}
            />
        );
    return { mockAddToHistory, renderConverter };
};

function sleep(ms: number) {
    return new Promise<undefined>((resolve) => setTimeout(resolve, ms));
}

describe('Currency Converter', () => {
    it('should type amount and return correct response', async () => {
        const from = 'USD';
        const to = 'EUR';
        const amount = '1,2';
        const date = '19-01-2021';
        const rate = 2;
        const response = 1.4;

        const mockHistoryItem: T_HistoryItem = {
            date,
            from: { abbr: from, rate: 1, value: amount },
            to: {
                abbr: to,
                rate,
                value: response.toString().replace('.', ','),
            },
        };

        axios.get = jest.fn().mockResolvedValue({
            data: {
                from,
                to,
                response,
                rate,
                date,
            },
        });

        const { renderConverter, mockAddToHistory } = setup();
        let converter = renderConverter();
        const firstInput = converter.getAllByTestId('currency-input-base')[0];

        act(() => {
            userEvent.type(firstInput, amount[0]);
        });
        act(() => {
            userEvent.type(firstInput, amount[1]);
        });
        act(() => {
            userEvent.type(firstInput, amount[2]);
        });

        await act(() => sleep(750));

        expect(axios.get).toBeCalledWith(
            `${appConfig.API_URL}converter/${from}/${to}/${amount.replace(
                ',',
                '.'
            )}`
        );

        expect(mockAddToHistory).toHaveBeenCalledWith(mockHistoryItem);
    });
});
