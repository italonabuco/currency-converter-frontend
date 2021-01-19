import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import App from './App';
import appConfig from './appConfig';

function sleep(ms: number) {
    return new Promise<undefined>((resolve) => setTimeout(resolve, ms));
}
describe('App start', () => {
    const codes = ['USD', 'EUR', 'JPY'];

    beforeEach(async () => {
        axios.get = jest.fn().mockResolvedValue({ data: { codes } });
        act(() => {
            render(<App />);
        });
        await act(() => sleep(10));
    });

    it('should fetch codes list and set them on select menu', () => {
        expect(axios.get).toBeCalledWith(`${appConfig.API_URL}converter/list`);

        const FromInput = screen.getAllByTestId('currency-input-select')[0];
        const selectButton = FromInput.querySelector('[role="button"]');
        let currencyItems = [];
        if (selectButton) {
            userEvent.click(selectButton);
            currencyItems = screen.getAllByTestId('currency-input-item');
        }
        expect(currencyItems.length).toBe(codes.length);
    });
});
