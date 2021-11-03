import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import {
    Card,
    Container,
    Button
} from 'reactstrap';

import SettinsEditFederation from '../SettingsEditFederation';
import SettingsRevealSecret from '../SettingsRevealSecret';

export default function LivePreviewExample() {
    const [federationModal, setFederationModal] = useState(false);
    const [federationValue, setFederationValue] = useState('');
    const [federationPlaceHolder, setFederationPlaceHolder] = useState('')
    const [secretModal, setSecretModal] = useState(false);
    const userInfo = useSelector(state => state.auth.userData);

    const federationHandler = (value, placeholder) => {
        setFederationModal(!federationModal);
        setFederationValue(value);
        setFederationPlaceHolder(placeholder);
    }

    return (
        <>
            <Card>
                <Container>
                    <div className="pt-4">
                        <div className="font-weight-normal text-primary font-size-lg">
                            Stellar account
                        </div>
                        <div className="font-size-xs">
                            Account holds all your funds on Stellar network
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="font-weight-bold font-size-md">
                            Stellar address
                        </div>
                        <div className="font-size-xs">
                            {userInfo.public_key}
                        </div>
                    </div>
                    <div className="d-flex pt-4">
                        <div className="w-50">
                            <div className="font-weight-bold font-size-md">
                                Federation address
                            </div>
                            <div className="font-size-xs">
                                ronaldohao*lobstr.co
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="font-weight-bold font-size-md">
                                Secret key
                            </div>
                            <div className="font-size-xs">
                                Your secret key is hidden
                            </div>
                        </div>
                    </div>
                    <div className="d-flex pt-3">
                        <div className="w-50">
                            <div 
                                className="font-weight-normal font-size-sm"
                                onClick={()=>federationHandler('federation', '')}
                                style={{color: '#00abff', cursor: 'pointer'}}
                            >
                                Edit federation
                            </div>
                        </div>
                        <div className="w-50">
                            <div 
                                className="font-weight-normal font-size-sm" 
                                onClick={()=>setSecretModal(!secretModal)}
                                style={{color: '#00abff', cursor: 'pointer'}}
                            >
                                Reveal secret key
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="font-weight-normal font-size-sm" style={{color: '#ff451b', cursor: 'pointer'}}>
                            Remove Stellar account
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="font-weight-bold font-size-md">
                            Accept all address
                        </div>
                        <div className="font-size-xs">
                            ronaldohao123@gmail.com*lobstr.co
                        </div>
                    </div>
                    <div className="pt-2">
                        <div 
                            className="font-weight-normal font-size-sm"
                            onClick={()=>federationHandler('', 'Short Alias')}
                            style={{color: '#00abff', cursor: 'pointer'}}
                            >
                            Edit federation
                        </div>
                        <div className="font-size-xs">
                            Use this alternative address to receive any Stellar assets without adding trustlines. You will be informed when you 
                            get a money transfer.
                        </div>
                    </div>
                    <div className="d-flex justify-content-end pt-2">
                        <Button color="light" className="mt-1 mr-2">
                            Disable
                        </Button>
                    </div>
                    <div className="pt-2">
                        <div 
                            className="font-weight-normal font-size-sm"
                            style={{color: '#00abff', cursor: 'pointer'}}
                            >
                            Read More
                        </div>
                    </div>
                    <div className="py-4"></div>
                </Container>
                <SettinsEditFederation 
                    modal={federationModal} 
                    toggle={()=>setFederationModal(!federationModal)}
                    value={federationValue}
                    placeholder={federationPlaceHolder} />
                <SettingsRevealSecret 
                    modal={secretModal} 
                    toggle={()=>setSecretModal(!secretModal)} 
                    secretKey={userInfo.keystore}  />
            </Card>
        </>
    );
}