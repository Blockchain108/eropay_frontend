import config from '../_config';
import axios from 'axios'

export const tradeService = {
    getCurrencyChange,
    getBuySellAsset,
    getOrderBook,
    getMyOrder,
    getOrderHistory
};

async function getCurrencyChange(currencyData) {
    return await axios.post(`${config.apiUrl}/currencies/getCurrencyChangeByPeriod`, currencyData);
}

async function getBuySellAsset(data) {
    return await axios.post(`${config.apiUrl}/stellar/stellar_buy_sell`, data);
}

async function getOrderBook(data) {
    return await axios.post(`${config.apiUrl}/stellar/getOrderBook`, data);
}

async function getMyOrder(data) {
    return await axios.post(`${config.apiUrl}/stellar/getMyOrder`, data);
}

async function getOrderHistory(data) {
    return await axios.post(`${config.apiUrl}/stellar/getOrderHistory`, data);
}