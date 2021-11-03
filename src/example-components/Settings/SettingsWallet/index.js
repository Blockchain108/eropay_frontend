import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import {
    Container,
    FormGroup,
    Button
} from 'reactstrap';

import SettinsEditFederation from '../SettingsEditFederation';
import SettingsRevealSecret from '../SettingsRevealSecret';

export default function SettingsWallet() {
    const [federationModal, setFederationModal] = useState(false);
    const [secretModal, setSecretModal] = useState(false);
    const userInfo = useSelector(state => state.auth.userData);

    const federationHandler = (value) => {
        setFederationModal(!federationModal);
    }

    return (
        <Container>
            <FormGroup className="pt-4">
                <h4 className="font-weight-normal">
                    Stellar account
                </h4>
                <div className="font-size-sm">
                    Account holds all your funds on Stellar network
                </div>
            </FormGroup>
            <FormGroup className="pt-4">
                <h6 className="font-weight-bold">
                    Stellar address
                </h6>
                <div className="font-size-sm">
                    {userInfo.public_key}
                </div>
            </FormGroup>
            <FormGroup className="d-flex pt-4">
                <div className="w-50">
                    <h6 className="font-weight-bold">
                        Federation address
                    </h6>
                    <div className="font-size-sm">
                        { userInfo.federationAddress }
                    </div>
                </div>
                <div className="w-50">
                    <h6 className="font-weight-bold">
                        Secret key
                    </h6>
                    <div className="font-size-sm">
                        Your secret key is hidden
                    </div>
                </div>
            </FormGroup>
            <FormGroup className="d-flex pt-3">
                <div className="w-50">
                    <div className="font-weight-normal font-size-sm" style={{color: '#00abff', cursor: 'pointer'}}
                        onClick={()=>federationHandler()} >
                        Edit federation
                    </div>
                </div>
                <div className="w-50">
                    <div className="font-weight-normal font-size-sm" style={{color: '#00abff', cursor: 'pointer'}}
                        onClick={()=>setSecretModal(!secretModal)}>
                        Reveal secret key
                    </div>
                </div>
            </FormGroup>
            <FormGroup className="pt-2">
                <div className="font-weight-normal font-size-sm" style={{color: '#ff451b', cursor: 'pointer'}}>
                    Remove Stellar account
                </div>
            </FormGroup>
            <div className="py-4"></div>

            <SettinsEditFederation 
                modal={federationModal} 
                toggle={()=>setFederationModal(!federationModal)}/>
            <SettingsRevealSecret 
                modal={secretModal} 
                toggle={()=>setSecretModal(!secretModal)} 
                secretKey={userInfo.keystore}  />
        </Container>
    );
}