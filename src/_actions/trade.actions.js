import { tradeService } from '../_services';
import { toast } from 'react-toastify';

export const tradeActions = {
    getCurrencyChange,
    getBuySellAsset,
    getOrderBook,
    getMyOrder,
    getOrderHistory
};

async function getCurrencyChange(currencyData = null) {
    const priceData = await tradeService.getCurrencyChange(currencyData);

    if (priceData.data.status) {
        return priceData.data.data;
    } else {
        var message = priceData.data.data.status.error_message ? priceData.data.data.status.error_message : "Something wrong problem with Server!";
        toast.warn(message); 
    }
}

async function getBuySellAsset(data) {
    return await tradeService.getBuySellAsset(data);
}

async function getOrderBook(data) {
    var result = await tradeService.getOrderBook(data);

    if (result.data.status) {
        return result.data;
    } else {
        return [];
    }
}

async function getMyOrder(data) {
    var result = await tradeService.getMyOrder(data);

    if (result.data.status) {
        return result.data;
    } else {
        return [];
    }
}

async function getOrderHistory(data) {
    var result = await tradeService.getOrderHistory(data);

    if (result.data.status) {
        console.log(result.data.data._embedded.records);
        return result.data.data._embedded.records;
    } else {
        return [];
    }
}