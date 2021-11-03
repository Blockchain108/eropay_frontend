import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Form,
    FormGroup,
    FormText,
    Input,
    Modal
} from 'reactstrap';
import { settingActions } from '../../../_actions';

export default function RevealSecret({modal, toggle, secretKey}) {
    const [agreeSecurity, setAgreeSecurity] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const userInfo = useSelector(state => state.auth.userData);

    const checkSecurity = () => {
        setAgreeSecurity(!agreeSecurity);
        setConfirmPassword(!confirmPassword);
    }

    const checkPassword = async () => {
        var userData = {
            email: userInfo.email,
            password: password
        }
        var result = await settingActions.confirmPassword(userData);
        if (result.data.status) {
            setConfirmPassword(!confirmPassword);
        } else {
            alert("password is not correct!");            
        }
    }

    useEffect(() => {
        setAgreeSecurity(true);
        setConfirmPassword(false);
    }, [modal])

    return (
        <>
            <Modal
                size="md"
                centered
                isOpen={modal}
                zIndex={1300}
                toggle={()=>toggle()}
                contentClassName="border-0 bg-white">
                {
                    agreeSecurity ? 
                        <Card className="card-box">
                            <CardBody>
                                <CardTitle className="font-weight-bold font-size-lg mb-4">
                                    Reveal secret key
                                </CardTitle>
                                <Form>
                                    <FormGroup>
                                        <FormText color="dark">
                                            You have requested the secret key of your Stellar account. Please keep your secret key safe and only share 
                                            it with trusted services. Secret key gives full access to your funds.
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormText color="dark">
                                            Don’t reveal your secret key without the need.
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup className="d-flex justify-content-end">
                                        <Button 
                                            onClick={()=>checkSecurity()}
                                            color="success"
                                            className="mt-1">
                                            Continue
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    : confirmPassword ? 
                        <Card className="card-box">
                            <CardBody>
                                <CardTitle className="font-weight-bold font-size-lg mb-4">
                                    Reveal secret key
                                </CardTitle>
                                <CardSubtitle className="mb-4">
                                    To reveal secret key, please enter your password.
                                </CardSubtitle>
                                <Form>
                                    <FormGroup>
                                        <Input
                                            type="password"
                                            value = {password}
                                            placeholder="Password"
                                            onChange={(e)=>setPassword(e.currentTarget.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup className="d-flex justify-content-end">
                                        <Button 
                                            onClick={()=>checkPassword()}
                                            color="success"
                                            className="mt-1">
                                            Continue
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    : 
                        <Card className="card-box">
                            <CardBody>
                                <CardTitle className="font-weight-bold font-size-lg mb-4">
                                    Reveal secret key
                                </CardTitle>
                                <CardSubtitle className="mb-4">
                                    To reveal secret key, please enter your password.
                                </CardSubtitle>
                                <Form>
                                    <FormGroup>
                                        <FormText color="dark">
                                            You will be responsible for storing the copy of your secret key securely 
                                            after exporting the key outside of LOBSTR.
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormText color="dark">
                                            The secret key gives full access to your funds. 
                                            Use caution, keep your secret key safe and only share your keys with trusted services.
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <div color="font-weight-normal font-size-xs">
                                            {secretKey}
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="d-flex justify-content-end">
                                        <Button 
                                            onClick={()=>toggle()}
                                            color="success"
                                            className="mt-1">
                                            Close
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                }
            </Modal>
        </>
    );
}
