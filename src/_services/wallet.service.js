import config from '../_config';
import axios from 'axios'

export const walletService = {
    getWallet,
    setWalletActive,
    createWallet,
    removeWallet,
    editWallet
};

async function getWallet(userId) {
    return await axios.post(`${config.apiUrl}/wallets/mywallets`, { data: userId });
}

async function setWalletActive(userId, public_key) {
    return await axios.post(`${config.apiUrl}/wallets/activewallet`, { partner_id: userId, public_key: public_key });
}

async function createWallet(walletInfo) {
    return await axios.post(`${config.apiUrl}/wallets/create`, walletInfo);
}

async function removeWallet(walletInfo) {
    return await axios.post(`${config.apiUrl}/wallets/remove`, walletInfo);
}

async function editWallet(walletInfo) {
    return await axios.post(`${config.apiUrl}/wallets/edit`, walletInfo);
}