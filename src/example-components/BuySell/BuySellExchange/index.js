import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardHeader,
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
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

export default function LivePreviewExample() {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div className="text-center my-4">
        <h6 className="font-weight-bold display-3 font-size-lg mb-1 text-black">
          Crypto Exchange
        </h6>
        <p className="font-size-lg text-black-50 mb-0">
          Use the form below to exchange favourite crypto currencies
        </p>
      </div>
      <Card className="mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-0">
          <div className="nav-line-alt w-100">
            <Nav className="nav-line d-flex justify-content-center">
              <NavItem>
                <NavLinkStrap
                  className={clsx('px-5 py-4', { active: activeTab === '1' })}
                  onClick={() => {
                    toggle('1');
                  }}>
                  <span className="font-weight-bold text-uppercase">
                    Buy Crypto
                  </span>
                  <div className="divider" />
                </NavLinkStrap>
              </NavItem>
              <NavItem>
                <NavLinkStrap
                  className={clsx('px-5 py-4', { active: activeTab === '2' })}
                  onClick={() => {
                    toggle('2');
                  }}>
                  <span className="font-weight-bold text-uppercase">
                    Sell Crypto
                  </span>
                  <div className="divider" />
                </NavLinkStrap>
              </NavItem>
            </Nav>
          </div>
        </CardHeader>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="font-weight-bold font-size-xl text-primary">
                Currency
              </div>
              <div>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="text-dark opacity-6"
                  title="More info">
                  More info
                </a>
              </div>
            </div>
            <div className="divider mb-4" />
            <div className="d-flex justify-content-center">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="active mr-3 mb-3 btn-input-select">
                <div className="selected-icon">
                  <FontAwesomeIcon icon={['fas', 'check']} />
                </div>
                <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill bg-warning">
                  <FontAwesomeIcon icon={['fab', 'bitcoin']} />
                </div>
                <div className="font-weight-bold mt-2">Bitcoin</div>
                <div className="opacity-6">$7856.44</div>
              </a>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="mr-3 mb-3 btn-input-select">
                <div className="selected-icon">
                  <FontAwesomeIcon icon={['fas', 'check']} />
                </div>
                <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill bg-first">
                  <FontAwesomeIcon icon={['fab', 'ethereum']} />
                </div>
                <div className="font-weight-bold mt-2">Ethereum</div>
                <div className="opacity-6">$273.28</div>
              </a>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-2 mt-4">
              <div className="font-weight-bold font-size-xl text-primary">
                Payment Method
              </div>
              <div>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="text-dark opacity-6"
                  title="Buy limits">
                  Buy limits
                </a>
              </div>
            </div>
            <div className="divider mb-4" />
            <div className="d-flex justify-content-center">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="mr-3 mb-3 btn-input-select">
                <div className="selected-icon">
                  <FontAwesomeIcon icon={['fas', 'check']} />
                </div>
                <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill bg-second">
                  <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                </div>
                <div className="font-weight-bold mt-2">USD Wallet</div>
                <div className="opacity-6">$1589.29</div>
              </a>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="active mr-3 mb-3 btn-input-select">
                <div className="selected-icon">
                  <FontAwesomeIcon icon={['fas', 'check']} />
                </div>
                <div className="d-30 text-dark d-flex align-items-center justify-content-center rounded-pill bg-light">
                  <FontAwesomeIcon icon={['fas', 'university']} />
                </div>
                <div className="font-weight-bold mt-2">Bank IBAN</div>
                <div className="opacity-6">***1111</div>
              </a>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="mx-3 mb-3 btn-input-select">
                <div className="d-30 d-flex align-items-center justify-content-center rounded-pill bg-secondary text-primary">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </div>
                <div className="font-weight-bold text-primary opacity-6 mt-2">
                  Add new
                </div>
              </a>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-2 mt-4">
              <div className="font-weight-bold font-size-xl text-primary">
                Amount
              </div>
            </div>
            <div className="divider mb-4" />
            <div className="d-block d-md-flex align-items-center justify-content-center">
              <InputGroup size="lg" className="input-group-seamless">
                <Input
                  placeholder="Amount..."
                  defaultValue="567.34"
                  className="font-weight-bold h-auto py-4 font-size-lg border-2"
                  type="text"
                />
                <InputGroupAddon className="w-auto mr-4" addonType="append">
                  <InputGroupText>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        size="sm"
                        color="neutral-dark"
                        className="d-flex align-items-center">
                        <span className="btn-wrapper--label">USD</span>
                        <span className="btn-wrapper--icon d-flex">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-down']}
                            className="opacity-8 font-size-xs ml-1"
                          />
                        </span>
                      </DropdownToggle>
                      <DropdownMenu right className="p-3">
                        <Nav pills className="nav-neutral-dark flex-column">
                          <NavItem>
                            <NavLinkStrap
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              active>
                              <span>USD</span>
                            </NavLinkStrap>
                          </NavItem>
                          <NavItem>
                            <NavLinkStrap
                              href="#/"
                              onClick={(e) => e.preventDefault()}>
                              <span>Euro</span>
                            </NavLinkStrap>
                          </NavItem>
                          <NavItem>
                            <NavLinkStrap
                              href="#/"
                              onClick={(e) => e.preventDefault()}>
                              <span>Yen</span>
                            </NavLinkStrap>
                          </NavItem>
                        </Nav>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <div className="my-3 mx-auto my-md-0 d-60 d-flex align-items-center justify-content-center px-4">
                <FontAwesomeIcon
                  icon={['fas', 'exchange-alt']}
                  className="opacity-8 font-size-xl"
                />
              </div>
              <InputGroup size="lg" className="input-group-seamless">
                <Input
                  placeholder="Amount..."
                  defaultValue="0.549"
                  className="font-weight-bold h-auto py-4 font-size-lg border-2"
                  type="text"
                />
                <InputGroupAddon className="w-auto mr-4" addonType="append">
                  <InputGroupText>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        size="sm"
                        color="neutral-dark"
                        className="d-flex align-items-center">
                        <span className="btn-wrapper--label">BTC</span>
                        <span className="btn-wrapper--icon d-flex">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-down']}
                            className="opacity-8 font-size-xs ml-1"
                          />
                        </span>
                      </DropdownToggle>
                      <DropdownMenu right className="p-3">
                        <Nav pills className="nav-neutral-dark flex-column">
                          <NavItem>
                            <NavLinkStrap
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              active>
                              <span>ETH</span>
                            </NavLinkStrap>
                          </NavItem>
                          <NavItem>
                            <NavLinkStrap
                              href="#/"
                              onClick={(e) => e.preventDefault()}>
                              <span>LTC</span>
                            </NavLinkStrap>
                          </NavItem>
                          <NavItem>
                            <NavLinkStrap
                              href="#/"
                              onClick={(e) => e.preventDefault()}>
                              <span>XRP</span>
                            </NavLinkStrap>
                          </NavItem>
                        </Nav>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <Button
              color="primary"
              className="py-4 mt-5 px-5 font-weight-bold font-size-lg"
              block>
              Buy Bitcoin - $785.34
            </Button>
          </TabPane>
          <TabPane tabId="2">
            <div className="text-center p-3 p-lg-5">
              <div className="avatar-icon-wrapper rounded-circle m-0">
                <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-warning text-warning m-0 d-130">
                  <FontAwesomeIcon
                    icon={['fas', 'exclamation-triangle']}
                    className="d-flex align-self-center display-3"
                  />
                </div>
              </div>
              <h4 className="font-weight-bold text-warning line-height-sm px-4 mt-5">
                You will need to link a bank account in order to start selling
                crypto!
              </h4>
              <p className="mb-0 font-size-lg">
                Follow the profile verification steps to continue.
              </p>
              <div className="pt-5">
                <Button color="primary">
                  <span className="btn-wrapper--label">Link Bank Account</span>
                </Button>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </Card>
    </>
  );
}
