import React from 'react';

import { Row, Col, Badge } from 'reactstrap';

import { TrendingDown, TrendingUp } from 'react-feather';

const HeaderMenu = () => {
    return (
        <>
            <div className="app-header-widget pb-1">
                <Row className="no-gutters">
                    <Col xs="6">
                        <div className="d-flex align-items-center pr-4">
                            <div className="font-size-lg text-danger mr-2">
                                <TrendingDown />
                            </div>
                            <div className="px-2">
                                <span className="opacity-6 text-uppercase font-size-sm">
                                    <small>Current losses</small>
                                </span>
                                <div className="d-flex align-items-center justify-content-center pt-1">
                                    <span className="font-weight-bold font-size-lg line-height-1">
                                        <small className="opacity-6 pr-1">$</small>
                                        46,362
                                    </span>
                                    <Badge color="neutral-danger" className="ml-2 text-danger">
                                        -8%
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="6">
                        <div className="d-flex align-items-center">
                            <div className="font-size-lg text-success mr-2">
                                <TrendingUp />
                            </div>
                            <div className="px-2">
                                <span className="opacity-6 text-uppercase font-size-sm">
                                    <small>Lifetime profits</small>
                                </span>
                                <div className="d-flex align-items-center justify-content-center pt-1">
                                    <span className="font-weight-bold font-size-lg line-height-1">
                                        <small className="opacity-6 pr-1">$</small>
                                        34,546
                                    </span>
                                    <Badge color="neutral-success" className="text-success ml-2">
                                        +13%
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default HeaderMenu;
