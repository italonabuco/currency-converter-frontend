import { T_HistoryItem } from '../types';

export const formatTextToStringNumber = (text: string): string => {
	if (!text) return '0';
	let newText = text.replace(/[^0-9,]/g, '');
	if (newText.includes(',')) {
		const split = newText.split(',');
		newText = split.shift() + ',' + split.join('');
	}
	return newText;
};

export const getHistory = (): T_HistoryItem[] => {
	const history: string = localStorage.getItem('currency-converter-history') || '[]';
	return JSON.parse(history);
};

export const addToHistory = (item: T_HistoryItem): T_HistoryItem[] => {
	const history = getHistory();
	if (history.length === 10) {
		history.pop();
	}
	history.unshift(item);
	localStorage.setItem('currency-converter-history', JSON.stringify(history));
	return history;
};

export const clearHistory = (): void => {
	localStorage.setItem('currency-converter-history', JSON.stringify([]));
};
