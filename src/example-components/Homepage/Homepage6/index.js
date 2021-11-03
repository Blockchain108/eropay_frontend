import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Row,
    Col,
    Container,
    Nav,
    NavItem
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

export default function LivePreviewExample() {
    return (
        <>
            <div className="pb-5 pt-0 pt-md-5" style={{backgroundColor: 'rgb(1, 142, 106)'}}>
                <Container className="pt-0 pt-xl-5">
                    <Row>
                        <Col xl="7" className="d-flex align-items-center">
                            <div className="w-100">
                                <Row className="d-none d-md-flex mt-3">
                                    <Col md="4">
                                        <div className="pl-0 pl-lg-3">
                                            <h6 className="text-white font-weight-bold mb-3">
                                                Support
                                            </h6>
                                            <Nav className="nav-transparent flex-column">
                                                <NavItem>
                                                    <NavLinkStrap
                                                        href="https://eropay.com"
                                                        target="_blank"
                                                        className="px-0 py-1 text-white-50">
                                                        Eropay
                                                    </NavLinkStrap>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLinkStrap
                                                        href="#/"
                                                        onClick={(e) => e.preventDefault()}
                                                        className="px-0 py-1 text-white-50">
                                                        Contact us
                                                    </NavLinkStrap>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xl="5" className="d-flex align-items-center">
                            <div>
                                <Nav className="nav-transparent justify-content-center">
                                    <NavItem>
                                        <NavLinkStrap
                                            className="text-facebook hover-scale-sm"
                                            href="https://Facebook.com/groups/erotoken"
                                            target="_blank">
                                            <FontAwesomeIcon
                                                icon={['fab', 'facebook']}
                                                className="font-size-lg"
                                            />
                                        </NavLinkStrap>
                                    </NavItem>
                                    <NavItem>
                                        <NavLinkStrap
                                            className="text-twitter hover-scale-sm"
                                            href="https://Twitter.com/Ero_Token"
                                            target="_blank">
                                            <FontAwesomeIcon
                                                icon={['fab', 'twitter']}
                                                className="font-size-lg"
                                        />
                                        </NavLinkStrap>
                                    </NavItem>
                                </Nav>
                                <div className="divider d-sm-none d-md-block rounded-circle bg-dark opacity-2 mx-auto my-2 w-25" />
                                    <div className="text-center d-block text-white-50">
                                    Copyright &copy; 2020 - Eropay.com
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
