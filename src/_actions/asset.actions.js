import { assetService } from '../_services';
import { assetConstants } from '../_constants'
import { toast } from 'react-toastify';

export const assetActions = {
    getAccountAsset,
    getAsset,
    addAsset,
    sendAsset,
    getLumensPrice,
    getAssetSupply
};

async function getAccountAsset(publicKey) {
    var result = await assetService.getAccountAsset(publicKey);
    if (result.data.status) {
        return result.data.data.balances;
    } else {
        return [];
    }
}

async function getAsset(filter) {
    const assets = await assetService.getAsset(filter);
    if (assets.data.status) {
        return assets.data.data;
    } else {
        return [];
    }
}

async function addAsset(data) {
    var result = await assetService.addAsset(data);
    return result.data;
}

async function sendAsset(data) {
    const result = await assetService.sendAsset(data);
    return result.data;
}

async function getLumensPrice() {
    var result = await assetService.getLumensPrice();
    return result.data;
}

async function getAssetSupply(data) {
    var result = await assetService.getAssetSupply(data);
    return result.data.data;
}