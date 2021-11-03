import { dashboardService } from '../_services';

export const dashboardActions = {
    getBalance,
    getTransaction
};

async function getBalance(signer) {
    const stellarData = await dashboardService.getBalance(signer);
    if (stellarData.data.status) {
        return stellarData.data.data.balances;
    } else {
        return [];
    }
}

async function getTransaction(signer) {
    const transactionData = await dashboardService.getTransaction(signer);
    if (transactionData.data.status) {
        return transactionData.data.data;
    } else {
        return [];
    }
}