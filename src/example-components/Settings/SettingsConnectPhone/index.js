import React, { useState } from 'react';

import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Form,
    FormText,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Modal,

} from 'reactstrap';

export default function EditFederation({modal, toggle}) {

    return (
        <>
            <Modal
                size="md"
                centered
                isOpen={modal}
                zIndex={1300}
                toggle={()=>toggle()}
                contentClassName="border-0 bg-white">
                <Card className="card-box">
                    <CardBody>
                        <CardTitle className="font-weight-bold font-size-lg">
                            Connect phone number
                        </CardTitle>
                        <CardSubtitle className="font-size-sm mb-4">
                            For your security, LOBSTR wants to make sure that this number belongs to you.
                        </CardSubtitle>
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>@</InputGroupText>
                                    </InputGroupAddon>
                                    <Input 
                                        placeholder="Phone Number"
                                        type="text" 
                                        name="text"
                                    />
                                </InputGroup>
                                <FormText color="muted">
                                    You will receive a text message with a 6-digit verification code. Standard SMS rates may apply.
                                </FormText>
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-end">
                                <Button color="light" className="mt-1 mr-2">
                                    Cancel
                                </Button>
                                <Button color="success" className="mt-1">
                                    Send Code
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Modal>
        </>
    );
}
