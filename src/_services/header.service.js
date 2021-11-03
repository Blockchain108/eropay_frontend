import config from '../_config';
import axios from 'axios'

export const headerService = {
    getCurrentWallet
};

async function getCurrentWallet(userId) {
    return await axios.post(`${config.apiUrl}/wallets/currentwallet`, { data: userId });
}