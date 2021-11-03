import config from '../_config';
import axios from 'axios'

export const assetService = {
    getAccountAsset,
    getAsset,
    addAsset,
    sendAsset,
    getLumensPrice,
    getAssetSupply
};

async function getAccountAsset(publicKey) {
    return await axios.post(`${config.apiUrl}/stellar/account`, { signer: publicKey })
}

async function getAsset(filter) {
    return await axios.post(`${config.apiUrl}/stellar/getAsset`, { filter: filter });
}

async function addAsset(data) {
    return await axios.post(`${config.apiUrl}/stellar/addtrustline`, data);
}

async function sendAsset(data) {
    return await axios.post(`${config.apiUrl}/stellar/send`, data);
}

async function getLumensPrice() {
    return await axios.post(`${config.apiUrl}/currencies/getLumensPrice`);
}

async function getAssetSupply(data) {
    return await axios.post(`${config.apiUrl}/stellar/getSupply`, data);
}