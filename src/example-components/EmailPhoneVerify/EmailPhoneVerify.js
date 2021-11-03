import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Row,
    Col,
    Card,
    Container,
    Nav,
    NavItem,
    FormGroup,
    Input,
    Button
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import contentImg from '../../assets/images/contentImg.jpg';
import { userActions } from '../../_actions';
import { history } from '../../_helpers';
import config from '../../_config';

export default function EmailPhoneVerify() {
    const [phoneVerify, setPhoneVerify] = useState('');
    const [tokenKey, setTokenKey] = useState(null);
    
    const userInfo = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const confirmVerifyCode = () => {
        var data = {
            tokenKey: tokenKey,
            verifyCode: phoneVerify
        }

        dispatch(userActions.confirmVerifyCode(data));
    }

    const resendPhoneCode = (e) => {
        e.preventDefault();
        userActions.resendPhoneCode(tokenKey);
    }

    useEffect(() => {
        const token = localStorage.getItem(config.tokenKey);

        if (token == '') {
            history.push('/login');
        } else {
            if (userInfo.isAuth) {
                history.push('/dashboard');
            } else {
                setTokenKey(token);
            }
        }
    }, [])

    return (
        <>
            <div className="app-wrapper min-vh-100 bg-white">
                <div className="hero-wrapper w-100 bg-composed-wrapper bg-second min-vh-100" style={{ backgroundImage: 'url(' + contentImg + ')' }}>
                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                        <div className="bg-composed-wrapper--image"/>
                        <div className="bg-composed-wrapper--bg bg-light-pure" />
                        <div className="bg-composed-wrapper--content p-3 p-md-5">
                            <Container>
                                <Card className="rounded-sm modal-content p-3 bg-white-10">
                                    <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                                        <Row className="no-gutters d-flex justify-content-center">  
                                            <Col lg="6" className="d-flex align-items-center justify-content-center flex-column">
                                                <div className="divider-v divider-v-lg d-none d-lg-block" />
                                                <div className="text-center mt-4">
                                                    <h3 className="font-weight-bold">
                                                        Open Google Authenticator
                                                    </h3>
                                                    <h6>
                                                        Please enter your 6 digit code
                                                    </h6>
                                                </div>
                                                <div className="px-5 pt-3 w-100">
                                                    <FormGroup>
                                                        <Input
                                                            bsSize="lg"
                                                            placeholder="xxxxxx"
                                                            type="text"
                                                            value={phoneVerify}
                                                            onChange={(e)=>setPhoneVerify(e.currentTarget.value)}
                                                        />
                                                    </FormGroup>
                                                </div>
                                                <div className="px-5 py-3 w-100 text-center">
                                                    <Button
                                                        className="btn-block text-uppercase font-weight-bold font-size-sm mt-4 text-white"
                                                        style={{ backgroundColor: '#018e6a', borderColor: '#018e6a' }}
                                                        onClick={()=>confirmVerifyCode()}>
                                                        Confirm
                                                    </Button>
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