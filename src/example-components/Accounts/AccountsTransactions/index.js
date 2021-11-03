import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Table,
  Col,
  Card,
  CardHeader,
  Input,
  Badge,
  Nav,
  NavItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import Trend from 'react-trend';
import Select from 'react-select';

import {
  Settings,
  Filter,
  Trash,
  Save,
  ArrowDownCircle,
  ArrowUpCircle,
  Circle
} from 'react-feather';

export default function LivePreviewExample() {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const searchTypeOptions = [
    { value: 'any', label: 'All types' },
    { value: 'deposit', label: 'Deposit' },
    { value: 'buy', label: 'Buy Crypto' },
    { value: 'sell', label: 'Sell Crypto' },
    { value: 'withdraw', label: 'Withdraw' },
    { value: 'transfer', label: 'Transfer Funds' }
  ];

  const statusOptions = [
    { value: 'any', label: 'All statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'processing', label: 'Processing' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <>
      <Card className="mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-0 text-black">
              Recent Transactions
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <UncontrolledDropdown>
              <DropdownToggle
                outline
                color="primary"
                className="d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill">
                <Filter className="w-50" />
              </DropdownToggle>
              <DropdownMenu right className="dropdown-menu-xxl p-0">
                <div className="p-3">
                  <Row>
                    <Col md="6">
                      <small className="font-weight-bold pb-2 text-uppercase text-primary d-block">
                        Type
                      </small>
                      <Select
                        placeholder="Select..."
                        options={searchTypeOptions}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: '0.29rem',
                          borderWidth: 1,
                          colors: {
                            ...theme.colors,
                            primary25: 'rgba(60,68,177,0.15)',
                            primary50: 'rgba(60,68,177,0.15)',
                            primary: '#3c44b1'
                          }
                        })}
                      />
                    </Col>
                    <Col md="6">
                      <small className="font-weight-bold pb-2 text-uppercase text-primary d-block">
                        Status
                      </small>
                      <Select
                        placeholder="Select..."
                        options={statusOptions}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: '0.29rem',
                          borderWidth: 1,
                          colors: {
                            ...theme.colors,
                            primary25: 'rgba(60,68,177,0.15)',
                            primary50: 'rgba(60,68,177,0.15)',
                            primary: '#3c44b1'
                          }
                        })}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="divider" />
                <div className="p-3 text-center bg-secondary">
                  <Button color="primary" size="sm">
                    Filter results
                  </Button>
                </div>
                <div className="divider" />
                <div className="p-3">
                  <Row>
                    <Col md="6">
                      <Nav className="nav-neutral-danger flex-column p-0">
                        <NavItem>
                          <NavLinkStrap
                            className="d-flex rounded-sm justify-content-center"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            <div className="nav-link-icon">
                              <Trash />
                            </div>
                            <span>Cancel</span>
                          </NavLinkStrap>
                        </NavItem>
                      </Nav>
                    </Col>
                    <Col md="6">
                      <Nav className="nav-neutral-success flex-column p-0">
                        <NavItem>
                          <NavLinkStrap
                            className="d-flex rounded-sm justify-content-center"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            <div className="nav-link-icon">
                              <Save />
                            </div>
                            <span>Save filter</span>
                          </NavLinkStrap>
                        </NavItem>
                      </Nav>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
              <DropdownToggle
                outline
                color="primary"
                className="d-flex align-items-center justify-content-center d-40 p-0 rounded-pill">
                <Settings className="w-50" />
              </DropdownToggle>
              <DropdownMenu
                right
                className="dropdown-menu-lg overflow-hidden p-0">
                <div className="font-weight-bold px-4 pt-3">Results</div>
                <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>10</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>20</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>30</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
                <div className="divider" />
                <div className="font-weight-bold px-4 pt-4">Order</div>
                <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <ArrowUpCircle />
                      </div>
                      <span className="font-size-md">Ascending</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <ArrowDownCircle />
                      </div>
                      <span className="font-size-md">Descending</span>
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </CardHeader>
        <div className="divider" />
        <div className="px-4 py-3">
          <div
            className={clsx(
              'search-wrapper search-wrapper--alternate search-wrapper--grow',
              { 'is-active': searchOpen }
            )}>
            <span className="icon-wrapper text-black">
              <FontAwesomeIcon icon={['fas', 'search']} />
            </span>
            <Input
              type="search"
              onFocus={openSearch}
              onBlur={closeSearch}
              placeholder="Search terms..."
            />
          </div>
        </div>
        <div className="divider" />
        <Table striped responsive borderless className="text-nowrap mb-0">
          <thead className="bg-white font-size-sm text-uppercase">
            <tr>
              <th className="bg-white text-left px-4">Currency</th>
              <th className="bg-white text-center">Date</th>
              <th className="bg-white text-center">Type</th>
              <th className="bg-white text-center">Status</th>
              <th className="bg-white text-center" style={{ width: '15%' }}>
                Trends
              </th>
              <th className="bg-white text-right px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4">
                <div className="d-flex align-items-center">
                  <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-second">
                    <FontAwesomeIcon icon={['fab', 'bitcoin']} />
                  </div>
                  <div>
                    <div className="font-weight-bold">Sell BTC</div>
                    <div className="opacity-7">Bitcoin</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <span>22 Feb 2020</span>
              </td>
              <td className="text-center">
                <span className="font-weight-bold">Sell</span>
              </td>
              <td className="text-center">
                <Badge
                  className="px-4 py-1 h-auto text-success border-1 border-success"
                  color="neutral-success">
                  Completed
                </Badge>
              </td>
              <td>
                <Trend
                  data={[0, 10, 5, 22, 3.6, 11]}
                  autoDraw
                  autoDrawDuration={3000}
                  autoDrawEasing="ease-in"
                  radius={15}
                  smooth
                  stroke="var(--success)"
                  strokeLinecap="round"
                  strokeWidth={5}
                />
              </td>
              <td className="text-right px-4">
                <div className="text-success font-size-lg pr-2">
                  + 3.4854 BTC
                </div>
                <div className="text-black-50 pr-2">- 26,349 USD</div>
              </td>
            </tr>
            <tr>
              <td className="px-4">
                <div className="d-flex align-items-center">
                  <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-second">
                    <FontAwesomeIcon icon={['fab', 'ethereum']} />
                  </div>
                  <div>
                    <div className="font-weight-bold">Buy ETH</div>
                    <div className="opacity-7">Ethereum</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <span>23 Feb 2020</span>
              </td>
              <td className="text-center">
                <span className="font-weight-bold">Buy</span>
              </td>
              <td className="text-center">
                <Badge
                  className="px-4 py-1 h-auto text-warning border-1 border-warning"
                  color="neutral-warning">
                  Pending
                </Badge>
              </td>
              <td>
                <Trend
                  data={[3, 7, 5, 12, 4.9, 9]}
                  autoDraw
                  autoDrawDuration={3000}
                  autoDrawEasing="ease-in"
                  radius={15}
                  smooth
                  stroke="var(--danger)"
                  strokeLinecap="round"
                  strokeWidth={5}
                />
              </td>
              <td className="text-right px-4">
                <div className="text-danger font-size-lg pr-2">- 23 ETH</div>
                <div className="text-black-50 pr-2">- 3,946 USD</div>
              </td>
            </tr>
            <tr>
              <td className="px-4">
                <div className="d-flex align-items-center">
                  <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-second">
                    <FontAwesomeIcon icon={['fab', 'ethereum']} />
                  </div>
                  <div>
                    <div className="font-weight-bold">Sell ETH</div>
                    <div className="opacity-7">Ethereum</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <span>24 Feb 2020</span>
              </td>
              <td className="text-center">
                <span className="font-weight-bold">Sell</span>
              </td>
              <td className="text-center">
                <Badge
                  className="px-4 py-1 h-auto text-warning border-1 border-warning"
                  color="neutral-warning">
                  Pending
                </Badge>
              </td>
              <td>
                <Trend
                  data={[6, 4, 9, 4, 7.5, 11]}
                  autoDraw
                  autoDrawDuration={3000}
                  autoDrawEasing="ease-in"
                  radius={15}
                  smooth
                  stroke="var(--success)"
                  strokeLinecap="round"
                  strokeWidth={5}
                />
              </td>
              <td className="text-right px-4">
                <div className="text-success font-size-lg pr-2">
                  + 0.4870 BTC
                </div>
                <div className="text-black-50 pr-2">+ 1,497 USD</div>
              </td>
            </tr>
            <tr>
              <td className="px-4">
                <div className="d-flex align-items-center">
                  <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-second">
                    <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                  </div>
                  <div>
                    <div className="font-weight-bold">Withdraw USD</div>
                    <div className="opacity-7">To Bank Account</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <span>24 Feb 2020</span>
              </td>
              <td className="text-center">
                <span className="font-weight-bold">Withdraw</span>
              </td>
              <td className="text-center">
                <Badge
                  className="px-4 py-1 h-auto text-danger border-1 border-danger"
                  color="neutral-danger">
                  Rejected
                </Badge>
              </td>
              <td>
                <Trend
                  data={[2, 8, 5, 3, 7, 9]}
                  autoDraw
                  autoDrawDuration={3000}
                  autoDrawEasing="ease-in"
                  radius={15}
                  smooth
                  stroke="var(--warning)"
                  strokeLinecap="round"
                  strokeWidth={5}
                />
              </td>
              <td className="text-right px-4">
                <div className="text-danger font-size-lg pr-2">
                  - 23,549 USD
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="divider" />
        <div className="card-footer p-4 d-flex justify-content-center">
          <Pagination className="pagination-primary">
            <PaginationItem disabled>
              <PaginationLink
                first
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={['fas', 'angle-double-left']} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink
                previous
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={['fas', 'chevron-left']} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                next
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={['fas', 'angle-double-right']} />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </Card>
    </>
  );
}
