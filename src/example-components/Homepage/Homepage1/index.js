import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Button } from 'reactstrap';

import { NavLink } from 'react-router-dom';

import hero8 from '../../../assets/images/hero-bg/hero-8.jpg';

import CryptoHeader from './CryptoHeader.js';

export default function LivePreviewExample() {

    return (
        <>
            <div 
                className="hero-wrapper bg-composed-wrapper"
                style={{ backgroundImage: 'url(' + hero8 + ')' }}>
                <div className="header-top-section pb-2">
                    <CryptoHeader />
                </div>
                <div className="hero-wrapper--content">
                    <div className="bg-composed-wrapper--image bg-composed-filter-rm"></div>
                    <div className="bg-composed-wrapper--bg bg-second"></div>
                    <div className="bg-composed-wrapper--content">
                        <Container className="z-over shadow-container-content-5">
                            <Row className="py-5">
                                <Col lg="6">
                                    <div className="pt-3 text-white pt-xl-5 pr-0">
                                        <div className="d-flex">
                                            <span className="display-2 font-Montserrat font-weight-200 d-flex flex-column align-items-end" style={{fontSize: '100px'}}>
                                                Wallet
                                                <p className="font-size-lg font-Montserrat font-weight-200" style={{ marginTop: '-12px', marginLeft: '3px' }}>
                                                    powered by EroPay
                                                </p>
                                            </span>
                                        </div>
                                        <div className="pt-5">
                                            <Button
                                                tag={NavLink}
                                                to="/dashboard"
                                                size="lg"
                                                className="text-white home-btn">
                                                <span className="btn-wrapper--label">
                                                    Dashboard Overview
                                                </span>
                                                <span className="btn-wrapper--icon">
                                                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                                                </span>
                                            </Button>
                                            <Button
                                                tag={NavLink}
                                                to="/wallets"
                                                size="lg"
                                                className="rounded-sm bg-white-10 text-white ml-3 home-btn">
                                                <span>My Wallets</span>
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="6" className="d-flex align-items-center">
                                    <div className="pt-3 text-white pt-xl-5 pr-0 pr-xl-2">
                                        <p className="font-size-xxl m-0 py-1 font-Montserrat font-weight-200">
                                            - Safe, secure with 2FA security
                                        </p>
                                        <p className="font-size-xl m-0 py-1 font-Montserrat font-weight-200">
                                            - Connect to Stellar network via our validator node
                                        </p>
                                        <p className="font-size-xxl m-0 py-1 font-Montserrat font-weight-200">
                                            - Manage multiple wallets with ease
                                        </p>
                                        <p className="font-size-xxl m-0 py-1 font-Montserrat font-weight-200">
                                            - Accept any stellar based coin
                                        </p>
                                        <p className="font-size-xxl m-0 py-1 font-Montserrat font-weight-200">
                                            - Store, buy or trade direct on Stellar DEX
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
}
