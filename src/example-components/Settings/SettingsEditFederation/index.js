import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Form,
    FormGroup,
    Input,
    Modal,
} from 'reactstrap';
import { userActions } from '../../../_actions';
import { userConstants } from '../../../_constants';

export default function EditFederation({modal, toggle}) {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth.userData);
    const [federationValue, setFederationValue] = useState(userInfo.federationAddress);

    const saveFederationAddress = async () => {
        var query = {
            originAddress: userInfo.federationAddress,
            federationAddress: federationValue
        }

        var result = await userActions.saveFederationAddress(query);
        if (result.status) {
            var data =  JSON.parse(JSON.stringify(userInfo));
            data.federationAddress = federationValue;

            const userData = {
                isAuth: true,
                isLoading: false,
                userData: data
            }
            dispatch({ type: userConstants.AUTH_DATA, data: userData });
            toast.success("Updated Successfully!");
            toggle();
        } else {
            var message = result.message ? result.message : 'Something Server Problem';
            toast.warning(message);
        }
    }

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
                            Set federation address
                        </CardTitle>
                        <CardSubtitle className="font-size-sm mb-4">
                            Choose a short alias for your Stellar address
                        </CardSubtitle>
                        <Form>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="address"
                                    id="federationAddress"
                                    value={federationValue}
                                    onChange={(e)=>setFederationValue(e.currentTarget.value)}
                                />
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-end">
                                <Button color="light" className="mt-1 mr-2">
                                    Cancel
                                </Button>
                                <Button color="success" className="mt-1" onClick={()=>saveFederationAddress()}>
                                    Save
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Modal>
        </>
    );
}
