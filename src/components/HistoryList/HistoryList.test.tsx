import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { T_HistoryItem } from '../../types';

import HistoryList from './HistoryList.component';

const mockedHistoryItems: T_HistoryItem[] = [
    {
        date: '',
        from: { abbr: 'USD', value: '1,0', rate: 1 },
        to: { abbr: 'EUR', value: '1,0', rate: 1 },
    },
    {
        date: '',
        from: { abbr: 'USD', value: '1,0', rate: 1 },
        to: { abbr: 'EUR', value: '1,0', rate: 1 },
    },
];

const setup = (items: T_HistoryItem[]) => {
    const onClearHistory = jest.fn();

    const history = render(
        <HistoryList items={items} onClearHistory={onClearHistory} />
    );

    const clickClear = () =>
        userEvent.click(history.getByTestId('clear-button'));
    return { history, onClearHistory, items, clickClear };
};

describe('Show correct content', () => {
    test('Show empty history message and disabled clear button', () => {
        const { history } = setup([]);
        expect(history.container).toHaveTextContent(/Empty/i);
        expect(history.getByTestId('clear-button')).toBeDisabled();
    });
    test('Show correct quantity of history items and enabled clear button', () => {
        const { history } = setup(mockedHistoryItems);
        const historyItems = history.getAllByTestId('history-list-item');
        expect(historyItems.length).toBe(mockedHistoryItems.length);
        expect(history.getByTestId('clear-button')).toBeEnabled();
    });
});

test('Simulating clear button', () => {
    const { clickClear, onClearHistory } = setup(mockedHistoryItems);
    act(() => {
        clickClear();
    });
    expect(onClearHistory).toBeCalledTimes(1);
});
