import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import clsx from 'clsx';

import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  FormText,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import { dashboardActions } from '../../../_actions';
import { assetActions } from '../../../_actions';
import Label from 'reactstrap/lib/Label';

const Send = ({modal, toggleModal}) => {
    const [activeTab, setActiveTab] = useState('1');
    const [stelAccInfo, setStelAccInfo] = useState([]);
    const [assetIndex, setassetIndex] = useState(0);
    const [stellarAddress, setStellarAddress] = useState('');
    const [assetAmount, setAssetAmount] = useState(0);
    const [assetMemo, setAssetMemo] = useState('');
    const [memoStatus, setMemoStatus] = useState(false);
    const [memoIntroStatus, setMemoIntroStatus] = useState(false);
    const userInfo = useSelector(state => state.auth.userData);
    const [modal1, setModal1] = useState(false);
    const [isFederation, setIsFederation] = useState(false);

    const getAccountBalance = async () => {
        setStelAccInfo((await dashboardActions.getBalance(userInfo.public_key)).reverse());
    }

    const toggle = (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    };

    const toggle1 = () => setModal1(!modal1);

    const setMemo = () => {
        if (memoStatus) { setAssetMemo(''); }
        setMemoStatus(!memoStatus);
        setMemoIntroStatus(false);
    }

    const setMemoIntro = () => {
        setMemoIntroStatus(!memoIntroStatus);
        setMemoStatus(false);
        setAssetMemo('');
    }

    const confirmAsset = () => {
        if (stellarAddress == '') { toast.warning("Please enter receiver address"); return; }
        if (assetAmount === 0) { toast.warning("You did't enter asset amount"); return; };
        if (stelAccInfo.length == 0) { toast.warning("Your account is not actived yet"); return; }
        if (assetAmount > parseFloat(stelAccInfo[assetIndex].balance)) {
            toast.warn('This amount exceeds the maximum that you can send');
            return;
        }

        toggle1();
    }

    const sendAsset = async () => {
        toggle1();
        const data = {
            id: userInfo.id,
            assetCode: stelAccInfo[assetIndex].asset_type === 'native' ? 'XLM' : stelAccInfo[assetIndex].asset_code,
            assetIssuer: stelAccInfo[assetIndex].asset_type === 'native' ? null : stelAccInfo[assetIndex].asset_issuer,
            amount: assetAmount,
            receiver: stellarAddress,
            memo: memoStatus ? assetMemo : null,
            isFederation: isFederation
        }

        var result = await assetActions.sendAsset(data);
        if (result.status) { 
            console.log("this is sent success");
            toast.success("Your transaction has been sent");
            toggleModal();  
            
        } else {
            console.log(result);
            var message = result.message ? result.message : 'Something problem with server';
            toast.warning(message);
        }
    }

    useEffect(() => {
        getAccountBalance();
    }, [])

    return (
        <>
            <Modal
                centered
                isOpen={modal}
                zIndex={1300}
                toggle={()=>toggleModal()}
                contentClassName="border-0 bg-white">
                <Card>
                    <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-0">
                        <div className="nav-line-alt w-100">
                            <div className="p-4">
                                <CardTitle className="font-size-lg font-weight-bold">New payment</CardTitle>
                                <CardSubtitle className="font-size-xs">Send assets directly to any Stellar wallet.</CardSubtitle>
                            </div>
                            <Nav className="nav-line d-flex justify-content-center font-size-sm">
                                <NavItem>
                                    <NavLinkStrap
                                        className={clsx('px-4 py-3', { active: activeTab === '1' })}
                                        onClick={() => {
                                            toggle('1');
                                        }}>
                                        <span className="">
                                            Stellar Wallet
                                        </span>
                                        <div className="divider" />
                                    </NavLinkStrap>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLinkStrap
                                        className={clsx('px-4 py-3', { active: activeTab === '2' })}
                                        onClick={() => {
                                            toggle('2');
                                        }}>
                                        <span className="">
                                            Phone Number
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
                                            Email Address
                                        </span>
                                        <div className="divider" />
                                    </NavLinkStrap>
                                </NavItem> */}
                            </Nav>
                        </div>
                    </CardHeader>
                    <TabContent className="p-4" activeTab={activeTab}>
                        <TabPane tabId="1">
                            <FormGroup>
                                <label className="font-weight-bold">
                                    Recipient
                                </label>
                                <Input
                                    placeholder="Stellar or federation address"
                                    type="text" 
                                    name="stellarAddress"
                                    className=""
                                    value={stellarAddress}
                                    onChange={(e)=>setStellarAddress(e.currentTarget.value)}
                                />
                                <div className="d-flex align-items-center mt-1">
                                    <input
                                        type="checkbox" 
                                        name="stellarAddress"
                                        onClick={()=>setIsFederation(!isFederation)}
                                    />
                                    <Label className="font-size-sm ml-2 mb-0">Select Federation Address</Label>
                                </div>
                            </FormGroup>
                            <Row>
                                <Col md="8">
                                    <FormGroup>
                                        <label className="font-weight-bold">
                                            Amount
                                        </label>
                                        <div>
                                            <Input
                                                placeholder="Enter amount"
                                                type="number" 
                                                name="currencyAmount"
                                                onChange={(e)=>setAssetAmount(e.currentTarget.value)}
                                            />
                                            <FormText color="muted">*1 XLM are reserved in your wallet by Stellar network</FormText>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label className="font-weight-bold">
                                            Currency
                                        </label>
                                        <div>
                                            <UncontrolledDropdown tag="span" className="w-100">
                                                <DropdownToggle color="neutral-dark" caret className="text-left w-100 d-inline-flex justify-content-between align-items-center">
                                                    { 
                                                        !stelAccInfo[assetIndex] ?   'XLM' : 
                                                                                    stelAccInfo[assetIndex].asset_type === 'native' ? 
                                                                                        'XLM' : 
                                                                                        stelAccInfo[assetIndex].asset_code
                                                    }
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    {
                                                        stelAccInfo.map((asset, index) => (
                                                            <Fragment key={index}>
                                                                {
                                                                    parseFloat(asset.balance) > 0 && 
                                                                        <DropdownItem value={asset.asset_code} onClick={()=>setassetIndex(index)}>
                                                                            { asset.asset_type === 'native' ? 'XLM' : asset.asset_code} {asset.domain ? ' (' + asset.domain + ')' : ''}
                                                                        </DropdownItem>
                                                                }
                                                            </Fragment>
                                                        ))
                                                    }
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <FormText className="text-right">
                                                Balance: 
                                                <pre style={{color: '#00abff'}}>
                                                    { stelAccInfo[assetIndex] ? parseFloat(stelAccInfo[assetIndex].balance) : '0' }
                                                </pre>
                                            </FormText>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <div className="d-flex justify-content-start">
                                    <div className="custom-control custom-control-alternative d-flex align-items-center custom-checkbox pr-3">
                                        <input
                                            className="custom-control-input"
                                            id=" customCheckLogin55"
                                            type="checkbox"
                                            checked={memoStatus}
                                            onChange={()=>setMemo()}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor=" customCheckLogin55">
                                            <span>Add memo</span>
                                        </label>
                                    </div>
                                    <div>
                                        <div
                                            href="#/"
                                            onClick={() => setMemoIntro()}
                                            className="text-first cursor-pointer">
                                            What is memo?
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>
                            {
                                memoStatus &&   <FormGroup>
                                                    <Input type="textarea" name="text" onChange={(e)=>setAssetMemo(e.currentTarget.value)} />
                                                </FormGroup>
                            }
                            {
                                memoIntroStatus &&  <FormGroup className="font-size-sm p-3 my-4 bg-light rounded-sm">
                                                        <div>
                                                            <span className="text-black-50">
                                                                Some recipients (Bittrex, Kraken and others) may require transaction memo 
                                                                to be provided for correct forwarding of your lumens.
                                                            </span>
                                                        </div>
                                                        <div className="mt-3">
                                                            <span className="text-black-50">
                                                                In cases when memo is required by receiving end, failure to include the 
                                                                memo with your transaction may result in your funds being lost forever and 
                                                                LOBSTR won't be able to help.
                                                            </span>
                                                        </div>
                                                    </FormGroup>
                            }
                            <div className="d-flex justify-content-end">
                                <Button color="first" className="btn-sm" onClick={() => toggleModal()}>
                                    <span className="btn-wrapper--label">Close</span>
                                </Button>
                                <Button color="success" className="ml-3 btn-sm" onClick={()=>confirmAsset()}>
                                    <span className="btn-wrapper--label">Send</span>
                                </Button>
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            <FormGroup>
                                <label className="font-weight-bold">
                                    Recipient
                                </label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>@</InputGroupText>
                                    </InputGroupAddon>
                                    <Input 
                                        placeholder="Phone Number"
                                        type="text" 
                                        name="text"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <Row>
                                <Col md="8">
                                    <FormGroup>
                                        <label className="font-weight-bold">
                                            Amount
                                        </label>
                                        <div>
                                            <Input
                                                placeholder="Enter amount"
                                                type="email" 
                                                name="email"
                                                className=""
                                            />
                                            <FormText color="muted">*1 XLM are reserved in your wallet by Stellar network</FormText>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label className="font-weight-bold">
                                            Currency
                                        </label>
                                        <div>
                                            <UncontrolledDropdown tag="span" className="w-100">
                                                <DropdownToggle color="neutral-dark" caret className="text-left w-100 d-inline-flex justify-content-between align-items-center">
                                                    XML
                                                </DropdownToggle>
                                                <DropdownMenu className="w-100">
                                                    <div role="menuitem">
                                                        <a
                                                            className="dropdown-item"
                                                            href="#/"
                                                            onClick={(e) => e.preventDefault()}>
                                                            XML
                                                        </a>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <FormText className="text-right">Balance: 0</FormText>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <div className="d-flex justify-content-start">
                                    <div className="custom-control custom-control-alternative d-flex align-items-center custom-checkbox pr-3">
                                        <input
                                            className="custom-control-input"
                                            id=" customCheckLogin55"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor=" customCheckLogin55">
                                            <span>Add memo</span>
                                        </label>
                                    </div>
                                    <div>
                                        <a
                                            href="#/"
                                            onClick={(e) => e.preventDefault()}
                                            className="text-first">
                                            What is memo?
                                        </a>
                                    </div>
                                </div>
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <Button color="first" className="btn-sm">
                                    <span className="btn-wrapper--label">Close</span>
                                </Button>
                                <Button color="success" className="ml-3 btn-sm">
                                    <span className="btn-wrapper--label">Next</span>
                                </Button>
                            </div>
                        </TabPane>
                        <TabPane tabId="3">
                            <FormGroup>
                                <label className="font-weight-bold">
                                    Email address
                                </label>
                                <Input
                                    placeholder="Email address"
                                    type="email" 
                                    name="email"
                                    className=""
                                />
                            </FormGroup>
                            <Row>
                                <Col md="8">
                                    <FormGroup>
                                        <label className="font-weight-bold">
                                            Amount
                                        </label>
                                        <div>
                                            <Input
                                                placeholder="Enter amount"
                                                type="email" 
                                                name="email"
                                                className=""
                                            />
                                            <FormText color="muted">*1 XLM are reserved in your wallet by Stellar network</FormText>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label className="font-weight-bold">
                                            Currency
                                        </label>
                                        <div>
                                            <UncontrolledDropdown tag="span" className="w-100">
                                                <DropdownToggle color="neutral-dark" caret className="text-left w-100 d-inline-flex justify-content-between align-items-center">
                                                    XML
                                                </DropdownToggle>
                                                <DropdownMenu className="w-100">
                                                    <div role="menuitem">
                                                        <a
                                                            className="dropdown-item"
                                                            href="#/"
                                                            onClick={(e) => e.preventDefault()}>
                                                            XML
                                                        </a>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <FormText className="text-right">Balance: 0</FormText>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <div className="d-flex justify-content-start">
                                    <div className="custom-control custom-control-alternative d-flex align-items-center custom-checkbox pr-3">
                                        <input
                                            className="custom-control-input"
                                            id=" customCheckLogin55"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor=" customCheckLogin55">
                                            <span>Add memo</span>
                                        </label>
                                    </div>
                                    <div>
                                        <a
                                            href="#/"
                                            onClick={(e) => e.preventDefault()}
                                            className="text-first">
                                            What is memo?
                                        </a>
                                    </div>
                                </div>
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <Button color="first" className="btn-sm">
                                    <span className="btn-wrapper--label">Close</span>
                                </Button>
                                <Button color="success" className="ml-3 btn-sm">
                                    <span className="btn-wrapper--label">Next</span>
                                </Button>
                            </div>
                        </TabPane>
                    </TabContent>
                </Card>
            </Modal>
                            
            <Modal zIndex={2000} centered isOpen={modal1} toggle={toggle1}>
                <div className="text-center p-5">
                    <div className="avatar-icon-wrapper rounded-circle m-0">
                        <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success text-success m-0 d-130">
                            <FontAwesomeIcon
                            icon={['far', 'lightbulb']}
                            className="d-flex align-self-center display-3"
                            />
                        </div>
                    </div>
                    {
                        modal1 &&   <Fragment>
                                        <p className="mb-0 font-weight-bold font-size-sm mt-4">
                                            { stellarAddress.slice(0, 8) + '...' + stellarAddress.slice(-8) }
                                        </p>
                                        <p className="mb-0 font-size-sm text-muted">
                                            { assetAmount } { stelAccInfo[assetIndex].asset_type === 'native' ? 'XLM' : stelAccInfo[assetIndex].asset_code }
                                        </p>
                                    </Fragment>
                    }
                    <h4 className="font-weight-bold mt-2">
                        Send
                    </h4>
                    <div className="pt-4">
                        <Button
                            onClick={()=>toggle1()}
                            color="neutral-dark"
                            className="btn-pill mx-1">
                            <span className="btn-wrapper--label">Cancel</span>
                        </Button>
                        <Button
                            onClick={()=>sendAsset()}
                            color="success"
                            className="btn-pill mx-1">
                            <span className="btn-wrapper--label">Send</span>
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Send;
