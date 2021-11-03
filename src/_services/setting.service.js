import config from '../_config';
import axios from 'axios'

export const settingService = {
    confirmPassword
};

async function confirmPassword(userData) {
    return await axios.post(`${config.apiUrl}/users/confirmPassword`, userData);
}