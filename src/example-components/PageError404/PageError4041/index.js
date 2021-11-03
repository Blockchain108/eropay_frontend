import React, { useState, useEffect } from 'react';

import {
    Row,
    Col,
    Card,
    Container,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import particles3 from '../../../assets/images/hero-bg/particles-3.svg';
import { userActions } from '../../../_actions';
import { toast } from 'react-toastify';
import { history } from '../../../_helpers';

export default function LivePreviewExample() {
    const [confirmStatus, setConfirmStatus] = useState();

    const confirmEmail = async () => {
        toast.success("Please wait while confirming your account");
        var confirmId = history.location.pathname.slice(14);
        var result = await userActions.confirmEmail(confirmId);
        if (result.status) {
            toast.success("Your account created successfully!");
            setConfirmStatus(true);
        } else {
            toast.warning(result.message);
            setConfirmStatus(false);
        }
    }

    useEffect(() => {
        confirmEmail();
    }, [])

    return (
        <>
            <div className="app-wrapper min-vh-100 bg-white">
                <div className="hero-wrapper w-100 bg-composed-wrapper bg-second min-vh-100">
                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                        <div
                            className="bg-composed-wrapper--image opacity-6"
                            style={{ backgroundImage: 'url(' + particles3 + ')' }}
                            />
                        <div className="bg-composed-wrapper--bg bg-light-pure opacity-2" />
                        <div className="bg-composed-wrapper--content p-3 p-md-5">
                            <Container>
                                <Card className="rounded-sm modal-content p-3 bg-white-10">
                                    <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                                        <Row className="no-gutters d-flex justify-content-center">
                                            <Col lg="6" className="d-flex align-items-center justify-content-center flex-column">
                                                <div className="divider-v divider-v-lg d-none d-lg-block" />
                                                <div className="text-center mt-4">
                                                    <h1 className="display-4 mb-1 font-weight-bold">
                                                        Confirm Your Account
                                                    </h1>
                                                </div>
                                                <div className="p-5 w-100">
                                                    <div className="text-center">
                                                        {
                                                            confirmStatus === true ? 
                                                                <Button
                                                                    className="btn-block text-uppercase font-weight-bold font-size-sm mt-4"
                                                                    color="primary"
                                                                    onClick={() => {history.push('/login')}}>
                                                                    Sign Again
                                                                </Button>
                                                                :
                                                                confirmStatus === false ? 
                                                                    <Button
                                                                        className="btn-block text-uppercase font-weight-bold font-size-sm mt-4"
                                                                        color="primary"
                                                                        onClick={() => { history.push('/PageRegisterCover') }}>
                                                                        Register
                                                                    </Button>
                                                                    : ''
                                                        }
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Card>
                            </Container>
                        </div>
                    </div>
                    <div className="hero-footer w-100 pb-4">
                        <Container>
                            <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
                                <div className="text-center d-block mb-3 mb-md-0 text-white">
                                    Copyright &copy; 2020 - Eropay.com
                                </div>
                                <Nav className="nav-transparent justify-content-center">
                                    <NavItem>
                                        <NavLinkStrap 
                                            className="text-white-50"
                                            href="#/"
                                            onClick={(e) => e.preventDefault()}>
                                            Privacy Policy
                                        </NavLinkStrap>
                                    </NavItem>
                                    <NavItem>
                                        <NavLinkStrap
                                            className="text-white-50"
                                            href="#/"
                                            onClick={(e) => e.preventDefault()}>
                                            Terms of Service
                                        </NavLinkStrap>
                                    </NavItem>
                                </Nav>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
}