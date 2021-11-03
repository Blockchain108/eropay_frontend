import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  Card,
  UncontrolledTooltip,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import {
  ArrowDownRight,
  ArrowUpRight,
  Trash,
  Edit,
  Search,
  Star,
  DollarSign
} from 'react-feather';

export default function LivePreviewExample() {
  return (
    <>
      <h3 className="font-size-xl font-weight-bold mb-4">Active accounts</h3>
      <Row>
        <Col md="6">
          <Card className="card-box card-box-hover-rise p-4 card-box-border-bottom bg-primary text-white border-primary mb-5">
            <div className="card-tr-actions">
              <UncontrolledDropdown>
                <DropdownToggle
                  color="link"
                  className="d-30 border-0 p-0 text-left d-flex text-white justify-content-center align-items-center">
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-h']}
                    className="font-size-lg"
                  />
                </DropdownToggle>
                <DropdownMenu
                  right
                  className="dropdown-menu-lg overflow-hidden p-0">
                  <Nav className="nav-neutral-first nav-pills-rounded flex-column p-3">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Search />
                        </div>
                        <span className="font-size-md">View details</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Edit />
                        </div>
                        <span className="font-size-md">Edit</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Star />
                        </div>
                        <span className="font-size-md">Make primary</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                  <div className="divider" />
                  <Nav className="nav-neutral-danger nav-pills-rounded flex-column p-3">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon">
                          <Trash />
                        </div>
                        <span>Delete</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="d-flex align-items-center mr-4">
              <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-warning">
                <FontAwesomeIcon
                  icon={['fab', 'bitcoin']}
                  className="font-size-xl"
                />
              </div>
              <div className="font-weight-bold font-size-lg">My Bitcoins</div>
            </div>
            <div className="d-flex my-4">
              <div className="d-30 text-success mr-2">
                <ArrowUpRight className="d-30" />
              </div>
              <div className="text-left">
                <div className="font-size-xxl line-height-1">1.354 BTC</div>
                <div className="text-white opacity-5 font-size-lg">$7,384</div>
              </div>
            </div>
            <div>
              <Button
                className="mr-3 shadow-none"
                outline
                color="secondary"
                size="sm">
                Send
              </Button>
              <Button
                className="mr-3 shadow-none"
                outline
                color="secondary"
                size="sm">
                Receive
              </Button>
              <Button
                className="shadow-none"
                color="secondary"
                id="tooltipWithdraw1"
                size="sm">
                <DollarSign className="max-w-70" />
              </Button>
              <UncontrolledTooltip target="tooltipWithdraw1">
                Withdraw funds
              </UncontrolledTooltip>
            </div>
          </Card>
        </Col>
        <Col md="6">
          <Card className="card-box card-box-hover-rise p-4 card-box-border-bottom border-warning mb-5">
            <div className="card-tr-actions">
              <UncontrolledDropdown>
                <DropdownToggle
                  color="neutral-primary"
                  className="d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                </DropdownToggle>
                <DropdownMenu
                  right
                  className="dropdown-menu-lg overflow-hidden p-0">
                  <Nav className="nav-neutral-first nav-pills-rounded flex-column p-3">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Search />
                        </div>
                        <span className="font-size-md">View details</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Edit />
                        </div>
                        <span className="font-size-md">Edit</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Star />
                        </div>
                        <span className="font-size-md">Make primary</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                  <div className="divider" />
                  <Nav className="nav-neutral-danger nav-pills-rounded flex-column p-3">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon">
                          <Trash />
                        </div>
                        <span>Delete</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="d-flex align-items-center mr-4">
              <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-warning">
                <FontAwesomeIcon
                  icon={['fab', 'bitcoin']}
                  className="font-size-xl"
                />
              </div>
              <div className="font-weight-bold font-size-lg">
                Bitcoin Wallet 2
              </div>
            </div>
            <div className="d-flex my-4">
              <div className="d-30 text-success mr-2">
                <ArrowUpRight className="d-30" />
              </div>
              <div className="text-left">
                <div className="font-size-xxl line-height-1">0.2642 BTC</div>
                <div className="text-success opacity-5 font-size-lg">
                  $1,395
                </div>
              </div>
            </div>
            <div>
              <Button className="mr-3" outline color="primary" size="sm">
                Send
              </Button>
              <Button className="mr-3" outline color="primary" size="sm">
                Receive
              </Button>
              <Button color="primary" size="sm" id="tooltipWithdraw2">
                <DollarSign className="max-w-70" />
              </Button>
              <UncontrolledTooltip target="tooltipWithdraw2">
                Withdraw funds
              </UncontrolledTooltip>
            </div>
          </Card>
        </Col>
        <Col md="6">
          <Card className="card-box card-box-hover-rise p-4 card-box-border-bottom border-first mb-5">
            <div className="card-tr-actions">
              <UncontrolledDropdown>
                <DropdownToggle
                  color="neutral-primary"
                  className="d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                </DropdownToggle>
                <DropdownMenu
                  right
                  className="dropdown-menu-lg overflow-hidden p-0">
                  <Nav className="nav-neutral-first nav-pills-rounded flex-column p-3">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Search />
                        </div>
                        <span className="font-size-md">View details</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Edit />
                        </div>
                        <span className="font-size-md">Edit</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Star />
                        </div>
                        <span className="font-size-md">Make primary</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                  <div className="divider" />
                  <Nav className="nav-neutral-danger nav-pills-rounded flex-column p-3">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon">
                          <Trash />
                        </div>
                        <span>Delete</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="d-flex align-items-center mr-4">
              <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-first">
                <FontAwesomeIcon
                  icon={['fab', 'ethereum']}
                  className="font-size-xl"
                />
              </div>
              <div className="font-weight-bold font-size-lg">Ethereum v2</div>
            </div>
            <div className="d-flex my-4">
              <div className="d-30 text-danger mr-2">
                <ArrowDownRight className="d-30" />
              </div>
              <div className="text-left">
                <div className="font-size-xxl line-height-1">0.8598 BTC</div>
                <div className="text-danger opacity-5 font-size-lg">$2,586</div>
              </div>
            </div>
            <div>
              <Button className="mr-3" outline color="primary" size="sm">
                Send
              </Button>
              <Button className="mr-3" outline color="primary" size="sm">
                Receive
              </Button>
              <Button color="primary" size="sm" id="tooltipWithdraw3">
                <DollarSign className="max-w-70" />
              </Button>
              <UncontrolledTooltip target="tooltipWithdraw3">
                Withdraw funds
              </UncontrolledTooltip>
            </div>
          </Card>
        </Col>
        <Col md="6">
          <Card className="card-box card-box-hover-rise p-4 card-box-border-bottom border-warning mb-5">
            <div className="card-tr-actions">
              <UncontrolledDropdown>
                <DropdownToggle
                  color="neutral-primary"
                  className="d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                </DropdownToggle>
                <DropdownMenu
                  right
                  className="dropdown-menu-lg overflow-hidden p-0">
                  <Nav className="nav-neutral-first nav-pills-rounded flex-column p-3">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Search />
                        </div>
                        <span className="font-size-md">View details</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Edit />
                        </div>
                        <span className="font-size-md">Edit</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon mr-2">
                          <Star />
                        </div>
                        <span className="font-size-md">Make primary</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                  <div className="divider" />
                  <Nav className="nav-neutral-danger nav-pills-rounded flex-column p-3">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="nav-link-icon">
                          <Trash />
                        </div>
                        <span>Delete</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="d-flex align-items-center mr-4">
              <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-warning">
                <FontAwesomeIcon
                  icon={['fab', 'bitcoin']}
                  className="font-size-xl"
                />
              </div>
              <div className="font-weight-bold font-size-lg">
                Satoshi's Stash
              </div>
            </div>
            <div className="d-flex my-4">
              <div className="d-30 text-success mr-2">
                <ArrowUpRight className="d-30" />
              </div>
              <div className="text-left">
                <div className="font-size-xxl line-height-1">65.4589 BTC</div>
                <div className="text-success opacity-5 font-size-lg">
                  $457,921
                </div>
              </div>
            </div>
            <div>
              <Button className="mr-3" outline color="primary" size="sm">
                Send
              </Button>
              <Button className="mr-3" outline color="primary" size="sm">
                Receive
              </Button>
              <Button color="primary" size="sm" id="tooltipWithdraw4">
                <DollarSign className="max-w-70" />
              </Button>
              <UncontrolledTooltip target="tooltipWithdraw4">
                Withdraw funds
              </UncontrolledTooltip>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
