import config from '../_config';
import axios from 'axios'

export const dashboardService = {
    getBalance,
    getTransaction
};

async function getBalance(signer) {
    return await axios.post(`${config.apiUrl}/stellar/account`, { signer : signer });
}

async function getTransaction(signer) {
    return await axios.post(`${config.apiUrl}/stellar/payment_for_account`, { account_id : signer });
}