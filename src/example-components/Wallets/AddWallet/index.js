import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import config from '../../../_config';

import {
    Card,
    CardBody,
    CardTitle,
    Button,
    FormGroup,
    Input,
    Modal,
} from 'reactstrap';

import { walletActions } from '../../../_actions'

export default function EditFederation(props) {
    const { modal, status, editWalletName, editWalletPublicKey, toggle, getAccountWallet } = props;
    const userInfo = useSelector(state => state.auth.userData);
    const [walletName, setWalletName] = useState(editWalletName);
    const [walletSecret, setWalletSecret] = useState('');

    const createWallet = async () => {
        var walletInfo = {
            partner_id: userInfo.id,
            email: userInfo.email,
            keystore: walletSecret,
            publicKey: '',
            name: walletName,
            addMode: status
        }

        if (status === 'create' || status === 'import') {
            if (status === 'import') {
                walletInfo.keystore = walletSecret; 
            }

            walletInfo.keystore = jwt.sign({ keystore: walletInfo.keystore }, config.JWT_SECRET_KEY);

            var result = await walletActions.createWallet(walletInfo);
            if (result.data.status) {
                if (status === 'create') {
                    toast.success("Wallet is inactive until xlm's are deposited");
                }
                getAccountWallet();
                toggle();
            } else {
                toast.warning(result.data.message);
            }
        } else if (status === 'edit') {
            walletInfo.publicKey = editWalletPublicKey;

            result = await walletActions.editWallet(walletInfo);
            if (result.data.status) {
                getAccountWallet();
                toggle();
            } else {
                toast.warning(result.data.message);
            }
        }
    }

    return (
        <>
            <Modal
                size="md"
                centered
                isOpen={modal}
                zIndex={1300}
                toggle={()=>toggle()}
                contentClassName="border-0 bg-white">
                <Card className="card-box">.
                    <CardBody>
                        <CardTitle className="font-weight-bold font-size-lg">
                            { status === 'create'? 'Add Wallet' : status === 'import' ? 'Import Wallet' : 'Edit Wallet' }
                        </CardTitle>                        
                        <FormGroup>
                            <Input
                                type="text"
                                placeholder="New Wallet Name"
                                value={walletName}
                                onChange={(e)=>setWalletName(e.currentTarget.value)}
                            />
                        </FormGroup>
                        {
                            status === 'import' &&
                                <FormGroup>
                                    <Input
                                        type="text"
                                        placeholder="Existed Wallet SecretKey"
                                        onChange={(e)=>setWalletSecret(e.currentTarget.value)}
                                    />
                                </FormGroup>
                        }
                        <FormGroup className="d-flex justify-content-end">
                            <Button size="sm" color="light" className="mt-1 mr-2" onClick={()=>toggle()}>
                                Cancel
                            </Button>
                            <Button size="sm" color="success" className="mt-1" onClick={()=>createWallet()}>
                                { status === 'create' ? 'Create' : status === 'import' ? 'Import' : 'Edit' }
                            </Button>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Modal>
        </>
    );
}
