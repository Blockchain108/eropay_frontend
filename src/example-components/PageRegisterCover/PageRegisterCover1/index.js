import React, { useState } from 'react';
import { userActions } from '../../../_actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Modal,
    Card,
    Row,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    UncontrolledTooltip,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import hero4 from '../../../assets/images/hero-bg/hero-2.jpg';
import googleAuthenticatorLogo from '../../../assets/images/google-authenticator-logo.png';
import Appstore from '../../../assets/images/Appstore.png';
import Playstore from '../../../assets/images/Playstore.png';
import { history } from '../../../_helpers';
import { toast } from 'react-toastify';

export default function LivePreviewExample() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    });
    const [modal, setModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [qrImage, setQrImage] = useState('');
    const [token, setToken] = useState('');
    const [verifyCode, setVerifyCode] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function toggleModal() {
        setModal(!modal);
        setVerifyCode('');
    }

    async function activeUser() {
        var data = {
            token: token,
            verifyCode: verifyCode
        }
        var result = await userActions.confirmGACode(data);
        if (result.status) {
            toast.success("Your account created successfully!");
            history.push('./login');
        } else {
            toast.warning(result.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.email && user.password && user.phone) {
            var result = await userActions.register(user);
            setQrImage(result.qr_image);
            setToken(result.token);
            setModal(!modal);
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
                                                <Form name="form" onSubmit={handleSubmit}>
                                                    <div className="py-4">
                                                        <div className="text-center">
                                                            <h3 className="display-4 mb-5 font-weight-bold">
                                                                Create account
                                                            </h3>
                                                        </div>
                                                        <FormGroup>
                                                            <label className="font-weight-bold">
                                                                Email address
                                                            </label>
                                                            <Input
                                                                placeholder="Enter your email address"
                                                                type="email" 
                                                                name="email"
                                                                value={user.email} 
                                                                onChange={handleChange} 
                                                                className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <div className="d-flex justify-content-between mg-b-5">
                                                                <label className="font-weight-bold">
                                                                    Password
                                                                </label>
                                                            </div>
                                                            <Input
                                                                placeholder="Enter your password"
                                                                type="password"
                                                                name="password"
                                                                value={user.password} 
                                                                onChange={handleChange} 
                                                                className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="font-weight-bold">
                                                                First name
                                                            </label>
                                                            <Input
                                                                placeholder="Enter your firstname"
                                                                type="text"
                                                                name="firstName"
                                                                value={user.firstName} 
                                                                onChange={handleChange} 
                                                                className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="font-weight-bold">
                                                                Last name
                                                            </label>
                                                            <Input
                                                                placeholder="Enter your lastname"
                                                                type="text"
                                                                name="lastName"
                                                                value={user.lastName} 
                                                                onChange={handleChange} 
                                                                className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="font-weight-bold">
                                                                Phone Number
                                                            </label>
                                                            <Input
                                                                placeholder="Enter your phone number"
                                                                type="text"
                                                                name="phone"
                                                                value={user.phone} 
                                                                onChange={handleChange} 
                                                                className={'form-control' + (submitted && !user.phone ? ' is-invalid' : '')}
                                                            />
                                                        </FormGroup>
                                                        <div className="form-group mb-5">
                                                            By clicking the <strong>Create account</strong>{' '}
                                                            button below you agree to our terms of service and
                                                            privacy statement.
                                                        </div>

                                                        <Button color="primary" size="lg" block={true} className="mb-5">
                                                            Create Account
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Col>
                                        <Col lg="5" xl="6" className="d-flex">
                                            <div className="hero-wrapper w-100 bg-composed-wrapper bg-dark min-vh-lg-100">
                                                <div className="flex-grow-1 w-100 d-flex flex-column justify-content-around">
                                                    <div
                                                        className="bg-composed-wrapper--image"
                                                        style={{ backgroundImage: 'url(' + hero4 + ')', opacity: '1', filter: 'none' }}
                                                    />
                                                    <div className="bg-composed-wrapper--bg bg-second" />
                                                    <div className="bg-composed-wrapper--bg bg-deep-sky" />
                                                    <div className="bg-composed-wrapper--content text-center p-5">
                                                        <div className="text-white px-0 px-lg-2 px-xl-4">
                                                            <h2 className="mb-4 font-weight-bold">
                                                                Please fill in the information <br /> to the left to setup a free EroPay wallet
                                                            </h2>
                                                        </div>
                                                    </div>
                                                    <div className="bg-composed-wrapper--content text-center p-5">
                                                        <div className="text-white px-0 px-lg-2 px-xl-4">
                                                            <h4 className="font-weight-bold">
                                                                We utilize Google Authenticator for security purposes<br />
                                                            </h4>
                                                            <h6>
                                                                Please download if you do not already have Google Authenticator on your device.
                                                            </h6>
                                                        </div>
                                                        <div className="d-flex justify-content-center font-Montserrat mt-4">
                                                            <div className="mr-3">
                                                                <NavLinkStrap
                                                                    href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                                                                    target="_blank"
                                                                    id="appstore">
                                                                    <img alt="" src={Appstore} />
                                                                </NavLinkStrap>
                                                            </div>
                                                            <div>
                                                                <NavLinkStrap
                                                                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US"
                                                                    target="_blank"
                                                                    id="playstore">
                                                                    <img alt="" src={Playstore} />
                                                                </NavLinkStrap>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hero-footer pb-4">
                                                    <Nav pills className="nav-neutral-secondary">
                                                        <NavItem>
                                                            <NavLinkStrap
                                                                href="https://Facebook.com/groups/erotoken"
                                                                target="_blank"
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
                                                                href="https://Twitter.com/Ero_Token"
                                                                target="_blank"
                                                                className="font-size-lg text-white-50"
                                                                id="btnTwitterTooltip">
                                                                <FontAwesomeIcon icon={['fab', 'twitter']} />
                                                            </NavLinkStrap>
                                                            <UncontrolledTooltip target="btnTwitterTooltip">
                                                                Twitter
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

            <Modal
                size="md"
                centered
                isOpen={modal}
                zIndex={1300}
                toggle={()=>toggleModal()}
                contentClassName="border-0 bg-white">
                <Card className="p-4">
                    <FormGroup className="d-flex flex-column justify-content-center align-items-center mb-3">
                        <img alt="" src={qrImage} style={{ width: '250px' }} />
                        <FormText color="dark" className="font-size-sm text-center">
                            Please open Google Authenticator on your phone, <br /> tap the +Add button and scan the code below.
                        </FormText>
                    </FormGroup>
                    <FormGroup className="d-flex flex-column justify-content-center align-items-center">
                        <Input
                            placeholder="Enter your verify code"
                            type="text" 
                            value={verifyCode} 
                            onChange={(e) => setVerifyCode(e.currentTarget.value)}
                        />
                    </FormGroup>
                    <Button color="primary" size="lg" onClick={() => activeUser()}>
                        Confirm
                    </Button>
                </Card>
            </Modal>
        </>
    );
}
