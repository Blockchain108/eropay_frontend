import { headerService } from '../_services';
import { toast } from 'react-toastify';

export const headerActions = {
    getCurrentWallet
};

async function getCurrentWallet(userId) {
    const walletData = await headerService.getCurrentWallet(userId);
    if (walletData) {
        return walletData.data.result;
    } else {
        var message = walletData.data.message ? walletData.data.message : "Something wrong problem with Server!";
        toast(message); 
    }
}