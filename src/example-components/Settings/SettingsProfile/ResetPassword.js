import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
    Modal,
    Card,
    Row,
    Col,
    FormGroup,
    Input,
    Button
} from 'reactstrap';
import { userActions } from '../../../_actions';

export default function RestPassword(props) {
    const { modal, setModal } = props;
    const [originPassword, setOriginPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const userInfo = useSelector(state => state.auth.userData);

    const updatePassword = async () => {
        if (originPassword == null || newPassword == null || confirmPassword == null) {
            toast.warning("Please enter all info"); return;
        }

        if (newPassword !== confirmPassword) {
            toast.warning("New password don't match!"); return;
        }

        var data = {
            id: userInfo.id,
            originPassword: originPassword,
            newPassword: newPassword
        }


        var result = await userActions.updatePassword(data);
        if (result.data.status) {
            toast.success("Updated pasword successfully!");
            setModal();
        } else {
            toast.warning(result.data.message ? result.data.message : "Something problem with server!");
        }
    }

    return (
        <>
            <Modal zIndex={2000} centered isOpen={modal} toggle={setModal}>
                <Card className="p-4">
                    <Row>
                        <Col md="12">
                            <FormGroup className="py-2">
                                <h4>Change account password</h4>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <label className="font-weight-bold">
                                    Current password
                                </label>
                                <Input type="password" value={originPassword} placeholder="Enter your current password" 
                                    onChange={(e)=>setOriginPassword(e.currentTarget.value)} />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <label className="font-weight-bold">
                                    New password
                                </label>
                                <Input type="password" value={newPassword} placeholder="Enter your new password"
                                    onChange={(e)=>setNewPassword(e.currentTarget.value)} />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <label className="font-weight-bold">
                                    Confirm new password
                                </label>
                                <Input type="password" value={confirmPassword} placeholder="Re-enter new password"
                                    onChange={(e)=>setConfirmPassword(e.currentTarget.value)} />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup className="d-flex justify-content-end">
                                <Button className="mr-2" onClick={()=>setModal()}>Cancel</Button>
                                <Button color="success" onClick={()=>updatePassword()}>Change Password</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Card>
            </Modal>
        </>
    )
}