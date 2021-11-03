import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { userActions } from '../../../_actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    UncontrolledTooltip,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import hero8 from '../../../assets/images/hero-bg/hero-8.jpg';

export default function LivePreviewExample() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    // const loggingIn = useSelector(state => state.authentication.loggingIn);
    const location = useLocation();

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            userActions.login(email, password, from);
        }
    }

    return (
        <>
            <div className="app-wrapper min-vh-100 bg-white">
                <div className="app-main min-vh-100">
                    <div className="app-content p-0">
                        <div className="app-inner-content-layout--main">
                            <div className="flex-grow-1 w-100 d-flex align-items-center">
                                <div className="bg-composed-wrapper--content">
                                    <Row className="min-vh-100 no-gutters">
                                        <Col lg="7" xl="6" className="d-flex align-items-center">
                                            <Col md="10" lg="8" xl="7" className="mx-auto">
                                                <div className="py-4">
                                                    <div className="text-center mb-5">
                                                        <h1 className="display-4 mb-1 font-weight-bold">
                                                            Login
                                                        </h1>
                                                    </div>
                                                    <div>
                                                        <Form name="form" onSubmit={handleSubmit}>
                                                            <div className="form-group mb-3">
                                                                <Input 
                                                                    placeholder="Email" 
                                                                    type="email" 
                                                                    name="email" 
                                                                    value={email} 
                                                                    onChange={handleChange} 
                                                                    className={'form-control' + (submitted && !email ? ' is-invalid' : '')} 
                                                                    />
                                                            </div>
                                                            <FormGroup>
                                                                <Input 
                                                                    placeholder="Password" 
                                                                    type="password" 
                                                                    name="password" 
                                                                    value={password} 
                                                                    onChange={handleChange} 
                                                                    className={'form-control' + (submitted && !password ? ' is-invalid' : '')} 
                                                                    />
                                                            </FormGroup>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="custom-control custom-control-alternative d-flex align-items-center custom-checkbox">
                                                                    <input
                                                                        className="custom-control-input"
                                                                        id=" customCheckLogin55"
                                                                        type="checkbox"
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor=" customCheckLogin55">
                                                                        <span>Remember me</span>
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <a
                                                                        href="/PageRecoverCover"
                                                                        className="text-first">
                                                                        Recover password
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="text-center py-4">
                                                                <Button
                                                                    color="second"
                                                                    className="font-weight-bold w-50 my-2">
                                                                    Sign in
                                                                </Button>
                                                            </div>
                                                            <div className="text-center text-black-50 mt-3">
                                                                Don't have an account?{' '}
                                                                <a
                                                                    href="/PageRegisterCover"
                                                                    className="text-first">
                                                                    Sign up
                                                                </a>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Col>
                                        <Col lg="5" xl="6" className="d-flex">
                                            <div className="hero-wrapper w-100 bg-composed-wrapper min-vh-lg-100">
                                                <div className="flex-grow-1 w-100 d-flex align-items-center">
                                                    <div
                                                        className="bg-composed-wrapper--image"
                                                        style={{ backgroundImage: 'url(' + hero8 + ')', filter: 'none', opacity: '1' }}
                                                    />
                                                    <div className="bg-composed-wrapper--bg bg-second" />
                                                    <div className="bg-composed-wrapper--bg bg-deep-blue" />
                                                    <div className="bg-composed-wrapper--content text-center p-5">
                                                        <div className="text-white px-0 px-lg-2 px-xl-4">
                                                            <h1 className="display-3 mb-4 font-weight-bold">
                                                                Sign in to Eropay Wallet
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hero-footer pb-4">
                                                    <Nav pills className="nav-neutral-secondary">
                                                        <NavItem>
                                                            <NavLinkStrap
                                                                href="#/"
                                                                onClick={(e) => e.preventDefault()}
                                                                className="font-size-lg text-white-50"
                                                                id="FacebookTooltipExample7">
                                                                <FontAwesomeIcon icon={['fab', 'facebook']} />
                                                            </NavLinkStrap>
                                                            <UncontrolledTooltip
                                                                target="FacebookTooltipExample7"
                                                                container="body">
                                                                Facebook
                                                            </UncontrolledTooltip>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLinkStrap
                                                                href="#/"
                                                                onClick={(e) => e.preventDefault()}
                                                                className="font-size-lg text-white-50"
                                                                id="btnTwitterTooltip">
                                                                <FontAwesomeIcon icon={['fab', 'twitter']} />
                                                            </NavLinkStrap>
                                                            <UncontrolledTooltip target="btnTwitterTooltip">
                                                                Twitter
                                                            </UncontrolledTooltip>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLinkStrap
                                                                href="#/"
                                                                onClick={(e) => e.preventDefault()}
                                                                className="font-size-lg text-white-50"
                                                                id="btnGoogleTooltip">
                                                                <FontAwesomeIcon icon={['fab', 'google']} />
                                                            </NavLinkStrap>
                                                            <UncontrolledTooltip target="btnGoogleTooltip">
                                                                Google
                                                            </UncontrolledTooltip>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLinkStrap
                                                                href="#/"
                                                                onClick={(e) => e.preventDefault()}
                                                                className="font-size-lg text-white-50"
                                                                id="btnInstagramTooltip">
                                                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                                                            </NavLinkStrap>
                                                            <UncontrolledTooltip target="btnInstagramTooltip">
                                                                Instagram
                                                            </UncontrolledTooltip>
                                                        </NavItem>
                                                    </Nav>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
