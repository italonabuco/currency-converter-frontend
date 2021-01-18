import axios from 'axios';
import appConfig from '../appConfig';

const ConverterServices = {
	getCodesList: async () => {
		return await axios.get(`${appConfig.API_URL}converter/list`);
	},
	getConversionResponse: async (from: string, to: string, amount: number) => {
		return await axios.get(`${appConfig.API_URL}converter/${from}/${to}/${amount}`);
	}
};

export default ConverterServices;
