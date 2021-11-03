import { walletService } from '../_services';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import config from '../_config';

export const walletActions = {
    getWallet,
    setWalletActive,
    createWallet,
    removeWallet,
    editWallet
};

async function getWallet(userId) {
    var myWallets = await walletService.getWallet(userId);
    if (myWallets.data.status) {
        for (let index = 0; index < myWallets.data.result.length; index++) {
            jwt.verify(myWallets.data.result[index].keystore, config.JWT_SECRET_KEY, function(err, keystore) {
                myWallets.data.result[index].keystore = keystore;
            });
        }
        return myWallets.data.result;
    } else {
        toast.warning("Something Server Problem!");
    }
}

async function setWalletActive(userId, public_key) {
    var activeWallet = await walletService.setWalletActive(userId, public_key);
    if (activeWallet.data.status) {
        var myWallets = await walletService.getWallet(userId);
        if (myWallets.data.status) {
            toast.success("Successful, Set Wallet!");

            for (let index = 0; index < myWallets.data.result.length; index++) {
                jwt.verify(myWallets.data.result[index].keystore, config.JWT_SECRET_KEY, function(err, keystore) {
                    myWallets.data.result[index].keystore = keystore;
                });
            }
            return myWallets.data.result;
        } else {
            toast.warning("Something Server Problem!");
        }
    } else {
        toast.warning("Something Server Problem!");
    }
}

async function createWallet(walletInfo) {
    return await walletService.createWallet(walletInfo);
}

async function removeWallet(walletInfo) {
    return await walletService.removeWallet(walletInfo);
}

async function editWallet(walletInfo) {
    return await walletService.editWallet(walletInfo);
}