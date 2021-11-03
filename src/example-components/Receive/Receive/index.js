import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import QRCode from 'qrcode.react';
import clsx from 'clsx';

import {
    Card,
    CardHeader,
    CardTitle,
    CardSubtitle,
    FormGroup,
    FormText,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    Button,
    Modal
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

const Receive = ({modal, toggleModal}) => {
    const [activeTab, setActiveTab] = useState('1');
    const userInfo = useSelector(state => state.auth.userData);

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <Modal
                size="md"
                centered
                isOpen={modal}
                zIndex={1300}
                toggle={()=>toggleModal()}
                contentClassName="border-0 bg-white">
                <Card>
                    <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-0">
                        <div className="nav-line-alt w-100">
                            <div className="p-4">
                                <CardTitle>Receive tokens</CardTitle>
                                <CardSubtitle className="font-size-xs">Sending funds to your wallet is fast and easy.</CardSubtitle>
                            </div>
                            
                            <Nav className="nav-line d-flex justify-content-center">
                                <NavItem>
                                    <NavLinkStrap
                                        className={clsx('px-4 py-3', { active: activeTab === '1' })}
                                        onClick={() => {
                                            toggle('1');
                                        }}>
                                        <span className="">
                                            Federation
                                        </span>
                                        <div className="divider" />
                                    </NavLinkStrap>
                                </NavItem>
                                <NavItem>
                                    <NavLinkStrap
                                        className={clsx('px-4 py-3', { active: activeTab === '2' })}
                                        onClick={() => {
                                            toggle('2');
                                        }}>
                                        <span className="">
                                            Stellar Address
                                        </span>
                                        <div className="divider" />
                                    </NavLinkStrap>
                                </NavItem>
                                <NavItem>
                                    <NavLinkStrap
                                        className={clsx('px-4 py-3', { active: activeTab === '3' })}
                                        onClick={() => {
                                            toggle('3');
                                        }}>
                                        <span className="">
                                            Accept All
                                        </span>
                                        <div className="divider" />
                                    </NavLinkStrap>
                                </NavItem>
                            </Nav>
                        </div>
                    </CardHeader>
                    <TabContent className="p-4" activeTab={activeTab}>
                        <TabPane tabId="1">
                            <FormGroup style={{ height: '250px' }} className="d-flex flex-column justify-content-center align-items-center">
                                <QRCode style={{ height: '120px', width: '120px' }} value={userInfo.federationAddress} />
                                <div>{userInfo.federationAddress}</div>
                                <FormText color="muted">No memo required</FormText>
                            </FormGroup>
                            <FormGroup>
                                <FormText color="muted">
                                    Share this address with other users so they can send you tokens. 
                                    It is linked to your Stellar address.
                                </FormText>
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <CopyToClipboard
                                    text={userInfo.federationAddress}
                                    onCopy={()=>toast.success("Successfully! Copied")}>
                                    <Button color="success" className="btn-sm ml-3">
                                        <span className="btn-wrapper--label">Copy Address</span>
                                    </Button>
                                </CopyToClipboard>
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            <FormGroup style={{ height: '250px' }} className="d-flex flex-column justify-content-center align-items-center">
                                <QRCode style={{ height: '120px', width: '120px' }} value={ userInfo.public_key }/>
                                <div>{ userInfo.public_key.slice(0, 8) + '...' + userInfo.public_key.slice(-8) }</div>
                                <FormText color="muted">No memo required</FormText>
                            </FormGroup>
                            <FormGroup>
                                <FormText color="muted">
                                    Stellar address (or public key) is used to identify your account on the network. 
                                    It can be safely shared to received funds.
                                </FormText>
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <CopyToClipboard
                                    text={userInfo.public_key}
                                    onCopy={()=>toast.success("Successfully! Copied")}>
                                    <Button color="success" className="btn-sm ml-3">
                                        <span className="btn-wrapper--label">Copy Address</span>
                                    </Button>
                                </CopyToClipboard>
                            </div>
                        </TabPane>
                        <TabPane tabId="3">
                            <FormGroup style={{ height: '250px' }} className="d-flex flex-column justify-content-center align-items-center">
                                <QRCode style={{ height: '120px', width: '120px' }} value={userInfo.email + '*wallet.eropay.com'} />
                                <div>{userInfo.email + '*wallet.eropay.com'}</div>
                                <FormText color="muted">Memo required and will be filled automatically</FormText>
                            </FormGroup>
                            <FormGroup>
                                <FormText color="muted">
                                    Use this alternative address to receive any Stellar assets without manually adding trustlines. 
                                    You will be informed when you get an money transfer.
                                </FormText>
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <CopyToClipboard
                                    text={userInfo.email + '*wallet.eropay.com'}
                                    onCopy={()=>toast.success("Successfully! Copied")}>
                                    <Button color="success" className="btn-sm ml-3">
                                        <span className="btn-wrapper--label">Copy Address</span>
                                    </Button>
                                </CopyToClipboard>
                            </div>
                        </TabPane>
                    </TabContent>
                </Card>
            </Modal>
        </>
    );
};

export default Receive;
