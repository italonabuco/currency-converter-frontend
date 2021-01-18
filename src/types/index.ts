export type T_CurrencyInfo = {
	abbr: string;
	rate: number;
	value: string;
};

export type T_HistoryItem = {
	date: string;
	to: T_CurrencyInfo;
	from: T_CurrencyInfo;
};
