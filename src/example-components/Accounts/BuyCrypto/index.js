import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    Card,
    CardHeader,
    Row,
    Col,
    FormText,
    NavLink
} from 'reactstrap';

import {
    ChevronRight,
  } from 'react-feather';

import cryptoBtc from '../../../assets/images/buy_lumens/icons-crypto-btc.png';
import cryptoEth from '../../../assets/images/buy_lumens/icons-crypto-eth.png';
import cryptoLtc from '../../../assets/images/buy_lumens/icons-crypto-ltc.png';
import cryptoOther from '../../../assets/images/buy_lumens/icons-crypto-other.png';

export default function LivePreviewExample() {
  return (
    <>
        <Card className="mb-5">
            <CardHeader className="d-flex align-items-center justify-content-between card-header-alt pb-0 p-4">
                <div>
                    <h6 className="font-weight-bold font-size-lg mb-2 text-black">
                        Buy other crypto
                    </h6>
                    <FormText color="muted">
                        Purchase Lumens, Bitcoin, Ethereum, Litecoin and other cryptocurrencies using US Dollars or Euro, instantly and with low fees.
                    </FormText>
                </div>
            </CardHeader>
            <div className="divider" />
            <div className="p-4">
                <Row>
                    <Col sm="6" md="3" lg="3" xl="3">
                        <NavLink
                            href="#/">
                            <Row className="no-gutters p-3 d-flex align-items-center">
                                <div className="nav-link-icon opacity-7 mr-2">
                                    <img alt="" src={cryptoBtc} />
                                </div>
                                <span>Bitcon</span>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                        icon={['fas', 'chevron-right']}
                                        className="font-size-xs opacity-3"
                                    />
                                </div>
                            </Row>         
                        </NavLink>
                    </Col>
                    <Col sm="6" md="3" lg="3" xl="3">
                        <NavLink
                            href="#/">
                            <Row className="no-gutters p-3 d-flex align-items-center">
                                <div className="nav-link-icon opacity-7 mr-2">
                                    <img alt="" src={cryptoEth} />
                                </div>
                                <span>Ethereum</span>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                        icon={['fas', 'chevron-right']}
                                        className="font-size-xs opacity-3"
                                    />
                                </div>
                            </Row>         
                        </NavLink>
                    </Col>
                    <Col sm="6" md="3" lg="3" xl="3">
                        <NavLink
                            href="#/">
                            <Row className="no-gutters p-3 d-flex align-items-center">
                                <div className="nav-link-icon opacity-7 mr-2">
                                    <img alt="" src={cryptoLtc} />
                                </div>
                                <span>Litecoin</span>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                        icon={['fas', 'chevron-right']}
                                        className="font-size-xs opacity-3"
                                    />
                                </div>
                            </Row>         
                        </NavLink>
                    </Col>
                    <Col sm="6" md="3" lg="3" xl="3">
                        <NavLink
                            href="#/">
                            <Row className="no-gutters p-3 d-flex align-items-center">
                                <div className="nav-link-icon opacity-7 mr-2">
                                    <img alt="" src={cryptoOther} />
                                </div>
                                <span>Other cypto</span>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                        icon={['fas', 'chevron-right']}
                                        className="font-size-xs opacity-3"
                                    />
                                </div>
                            </Row>         
                        </NavLink>
                    </Col>
                </Row>
            </div>
        </Card>

        <div className="p-4">
            <Row style={{ color: '#fff' }}>
                <Col sm="6" md="6" lg="6" xl="6" className="p-3 d-flex">
                    <div className="mr-2">
                        <FontAwesomeIcon
                            icon={['fas', 'chevron-left']}
                            className="font-size-xs opacity-3"
                            style={{ transform: 'rotate(-90deg)', color: '#00abff' }}
                        />
                    </div>
                    <span>Available in 70+ countries (and selected US states)</span>
                </Col>
                <Col sm="6" md="6" lg="6" xl="6" className="p-3 d-flex">
                    <div className="mr-2">
                        <FontAwesomeIcon
                            icon={['fas', 'chevron-left']}
                            className="font-size-xs opacity-3"
                            style={{ transform: 'rotate(-90deg)', color: '#00abff' }}
                        />
                    </div>
                    <span>Verification typically takes about 30 minutes</span>
                </Col>
                <Col sm="6" md="6" lg="6" xl="6" className="p-3 d-flex">
                    <div className="mr-2">
                        <FontAwesomeIcon
                            icon={['fas', 'chevron-left']}
                            className="font-size-xs opacity-3"
                            style={{ transform: 'rotate(-90deg)', color: '#00abff' }}
                        />
                    </div>
                    <span>Supports most major credit cards, including virtual, prepaid and debit cards</span>
                </Col>
                <Col sm="6" md="6" lg="6" xl="6" className="p-3 d-flex">
                    <div className="mr-2">
                        <FontAwesomeIcon
                            icon={['fas', 'chevron-left']}
                            className="font-size-xs opacity-3"
                            style={{ transform: 'rotate(-90deg)', color: '#00abff' }}
                        />
                    </div>
                    <span>One-time KYC verification (passport, phone number) may be required by the provider</span>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex align-items-center pl-5" style={{color: '#00abff'}}>
                    <span>Read More</span>
                    <div className="ml-2">
                        <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                            <ChevronRight />
                        </span>
                    </div>
                </Col>
            </Row>
        </div>
    </>
  );
}
