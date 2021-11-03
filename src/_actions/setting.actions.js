import { settingService } from '../_services';

export const settingActions = {
    confirmPassword
};

async function confirmPassword(userData) {
    return await settingService.confirmPassword(userData);
}