import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Badge,
  ListGroup,
  ListGroupItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';

import stock2 from '../../../assets/images/stock-photos/stock-5.jpg';
import stock3 from '../../../assets/images/stock-photos/stock-2.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Latest news
            </h6>
            <p className="text-black-50 mb-0">
              Stay up to date with latest press releases.
            </p>
          </div>
          <UncontrolledDropdown>
            <DropdownToggle color="primary" className="d-40 p-0 font-size-xl">
              <FontAwesomeIcon
                icon={['fas', 'ellipsis-h']}
                className="font-size-lg"
              />
            </DropdownToggle>
            <DropdownMenu
              right
              className="dropdown-menu-xl overflow-hidden p-0">
              <div className="grid-menu grid-menu-2col">
                <Row className="no-gutters">
                  <Col sm="6">
                    <Button
                      outline
                      color="secondary"
                      className="border-0 w-100 btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'bell']}
                        className="h2 d-block mx-auto mb-2 mt-1 text-first"
                      />
                      <div className="font-weight-bold text-black">Reports</div>
                      <div className="font-size-md mb-1 text-black-50">
                        Monthly Stats
                      </div>
                    </Button>
                  </Col>
                  <Col sm="6">
                    <Button
                      outline
                      color="secondary"
                      className="border-0 w-100 btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'file-excel']}
                        className="h2 d-block mx-auto mb-2 mt-1 text-first"
                      />
                      <div className="font-weight-bold text-black">
                        Statistics
                      </div>
                      <div className="font-size-md mb-1 text-black-50">
                        Customers stats
                      </div>
                    </Button>
                  </Col>
                  <Col sm="6">
                    <Button
                      outline
                      color="secondary"
                      className="border-0 w-100 btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'eye']}
                        className="h2 d-block mx-auto mb-2 mt-1 text-first"
                      />
                      <div className="font-weight-bold text-black">
                        Projects
                      </div>
                      <div className="font-size-md mb-1 text-black-50">
                        Manage servers
                      </div>
                    </Button>
                  </Col>
                  <Col sm="6">
                    <Button
                      outline
                      color="secondary"
                      className="border-0 w-100 btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
                        className="h2 d-block mx-auto mb-2 mt-1 text-first"
                      />
                      <div className="font-weight-bold text-black">Tasks</div>
                      <div className="font-size-md mb-1 text-black-50">
                        Pending items
                      </div>
                    </Button>
                  </Col>
                </Row>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <div className="divider" />
        <div className="divider" />
        <div className="scroll-area shadow-overflow">
          <PerfectScrollbar>
            <ListGroup flush>
              <ListGroupItem className="py-4">
                <div className="d-flex flex-column flex-sm-row align-items-start">
                  <div>
                    <Card className="card-transparent mb-3 mb-sm-0">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper rounded">
                        <div className="img-wrapper-overlay">
                          <div className="overlay-btn-wrapper">
                            <Button
                              size="sm"
                              outline
                              color="secondary"
                              className="btn-pill border-0 shadow-none p-0 btn-icon d-40 mx-auto d-flex align-items-center">
                              <FontAwesomeIcon
                                icon={['fas', 'plus-circle']}
                                className="font-size-lg"
                              />
                            </Button>
                          </div>
                        </div>
                        <img
                          alt="..."
                          className="card-img-top rounded"
                          src={stock3}
                          style={{ width: 160 }}
                        />
                      </a>
                    </Card>
                  </div>
                  <div className="pl-0 pl-sm-4">
                    <div className="mb-1">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="font-size-lg">
                        Biggest Crypto Price Movements of 2020
                      </a>
                    </div>
                    <div>
                      <Badge color="neutral-info" className="text-info">
                        Articles
                      </Badge>
                      <Badge
                        color="neutral-danger"
                        className="text-danger ml-2">
                        Posts
                      </Badge>
                    </div>
                    <p className="mb-0 mt-2 text-black-50">
                      The start of 2020 is a great time to look at the path
                      travelled by cryptocurrencies up and down the price ...
                    </p>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem className="py-4">
                <div className="d-flex flex-column flex-sm-row align-items-start">
                  <div>
                    <Card className="card-transparent mb-3 mb-sm-0">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper rounded">
                        <div className="img-wrapper-overlay">
                          <div className="overlay-btn-wrapper">
                            <Button
                              size="sm"
                              outline
                              color="secondary"
                              className="btn-pill border-0 shadow-none p-0 btn-icon d-40 mx-auto d-flex align-items-center">
                              <FontAwesomeIcon
                                icon={['fas', 'plus-circle']}
                                className="font-size-lg"
                              />
                            </Button>
                          </div>
                        </div>
                        <img
                          alt="..."
                          className="card-img-top rounded"
                          src={stock2}
                          style={{ width: 160 }}
                        />
                      </a>
                    </Card>
                  </div>
                  <div className="pl-0 pl-sm-4">
                    <div className="mb-1">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="font-size-lg">
                        XRP Price Prediction — Chances for $0.01 Breakout
                        Increase
                      </a>
                    </div>
                    <div>
                      <Badge color="neutral-success" className="text-success">
                        Blog
                      </Badge>
                    </div>
                    <p className="mt-2 text-black-50">
                      Although XRP has tried to resist the ongoing
                      cryptocurrency market decline for a long time ...
                    </p>
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </PerfectScrollbar>
        </div>
        <div className="card-footer p-3 text-center">
          <Button size="sm" className="py-2 px-4" color="primary">
            <span className="btn-wrapper--label text-uppercase font-weight-bold">
              Learn more
            </span>
          </Button>
        </div>
      </Card>
    </>
  );
}
