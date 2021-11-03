import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userConstants } from '../../../_constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, Button } from 'reactstrap';
import { walletActions } from '../../../_actions'
import WalletModal from '../AddWallet';
import ConfirmModal from '../../Confirm';
import { toast } from 'react-toastify';

export default function MultiWallet() {
    const userInfo = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    const [walletModal, setWalletModal] = useState(false);
    const [confirmToggle, setConfirmToggle] = useState(false);
    const [confirmValue, setConfirmValue] = useState(false);
    const [accountWallets, setAccountWallets] = useState([]);
    const [newWalletStatus, setNewWalletStatus] = useState(null);
    const [editWalletName, setEditWalletName] = useState('');
    const [editWalletPublicKey, setEditWalletPublicKey] = useState(null);
    const [removedIndex, setRemovedIndex] = useState(0);

    const getAccountWallet = async () => {
        setAccountWallets(await walletActions.getWallet(userInfo.id));
    }

    const walletModalToggle = (status, index) => {
        if (status === 'create') {
            setWalletModal(!walletModal);
            setNewWalletStatus(status);
        } else if (status === 'import') {
            setWalletModal(!walletModal);
            setNewWalletStatus(status);
        } else if (status === 'edit') {
            if (accountWallets[index]) {
                setWalletModal(!walletModal);
                setNewWalletStatus(status);
                setEditWalletName(accountWallets[index].walletname);
                setEditWalletPublicKey(accountWallets[index].public_key);
            }
        }
    }

    const setWalletActive = async (walletIndex) => {
        if (!accountWallets[walletIndex].use) {
            var wallets = await walletActions.setWalletActive(userInfo.id, accountWallets[walletIndex].public_key);
            for (let index = 0; index < wallets.length; index++) {
                if (wallets[index].use === true) {
                    var data =  JSON.parse(JSON.stringify(userInfo));
                    data.public_key = wallets[index].public_key;
                    data.keystore = wallets[index].keystore;
                    data.federationAddress = wallets[index].federationAddress;

                    const userData = {
                        isAuth: true,
                        isLoading: false,
                        userData: data
                    }
                    dispatch({ type: userConstants.AUTH_DATA, data: userData });
                }
            }
            setAccountWallets(wallets);
        }
    }

    const removeWallet = async () => {
        var walletInfo = {
            userId: userInfo.id,
            publicKey: accountWallets[removedIndex].public_key
        }

        var result = await walletActions.removeWallet(walletInfo);
        if (result.data.status) {
            getAccountWallet();
        } else {
            toast("Something Wrong!");            
        }
    }

    const confirmWallet = (index) => {
        setConfirmToggle(true);
        setRemovedIndex(index);
    }

    useEffect(() => {
        getAccountWallet();
    }, [])

    useEffect(() => {
        if (confirmValue) {
            setConfirmValue(false);
            removeWallet();
        }
    }, [confirmValue])

    return (
        <>
            <Card className="card-box p-4 mb-5">
                <div className="card-header py-3">
                    <div className="card-header--title font-size-lg">Wallets</div>
                        <div className="card-header--actions">
                            <Button 
                                size="sm" 
                                style={{ backgroundColor: '#54A283', color: '#ffffff' }} 
                                className="mr-2" 
                                onClick={() => walletModalToggle('create')}>
                                <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon icon={['fas', 'plus-circle']} />
                                </span>
                                <span className="btn-wrapper--label">Add Wallet</span>
                            </Button>
                            <Button 
                                size="sm" 
                                style={{ backgroundColor: '#54A283', color: '#ffffff' }} 
                                onClick={() => walletModalToggle('import')}>
                                <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon icon={['fas', 'plus-circle']} />
                                </span>
                                <span className="btn-wrapper--label">Import Wallet</span>
                            </Button>
                        </div>
                    </div>
                    <div className="table-responsive-md">
                    <Table hover className="text-nowrap mb-0">
                        <thead>
                            <tr>
                                <th className="bg-white text-left">ID</th>
                                <th className="bg-white">Wallet Name</th>
                                <th className="bg-white text-center">Public Key</th>
                                <th className="bg-white text-center">Created date</th>
                                <th className="bg-white text-center">Status</th>
                                <th className="bg-white text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                accountWallets.map((wallet, index) => (
                                    <tr key={index}>
                                        <td className="font-weight-bold">{ index + 1 }</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div>{ wallet.walletname }</div>
                                            </div>
                                        </td>
                                        <td className="text-center text-black-50">{ wallet.public_key }</td>
                                        <td className="text-center text-black-50">{ (new Date(wallet.createdAt).toString()).slice(4, 21) }</td>
                                        <td className="text-center">
                                            <Button
                                                size="sm"
                                                color="success"
                                                className="btn-icon hover-scale-sm"
                                                onClick={() => setWalletActive(index)}>
                                                { wallet.use ? 'Active' : 'Inactive' }
                                            </Button>
                                        </td>
                                        <td className="text-right">
                                            <Button
                                                className="mx-1 rounded-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                                                onClick={() => walletModalToggle('edit', index)}>
                                                <FontAwesomeIcon
                                                    icon={['far', 'edit']}
                                                    className="font-size-sm"
                                                />
                                            </Button>
                                            <Button
                                                className="mx-1 rounded-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                                                onClick={()=>confirmWallet(index)}>
                                                <FontAwesomeIcon
                                                    icon={['fas', 'times']}
                                                    className="font-size-sm"
                                                    />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </Table>
                </div>
            </Card>

            {
                walletModal && <WalletModal 
                                    modal={walletModal} 
                                    status={newWalletStatus} 
                                    editWalletName={editWalletName}
                                    editWalletPublicKey={editWalletPublicKey}
                                    toggle={()=>setWalletModal(!walletModal)} 
                                    getAccountWallet={()=>getAccountWallet()} />
            }

            <ConfirmModal 
                modal={confirmToggle}
                confirmToggle={(value)=>setConfirmToggle(value)}
                confirmValue={(value)=>setConfirmValue(value)} 
                title="Do you want to delete this wallet?" 
                btnName="Delete" />
        </>
    );
}
