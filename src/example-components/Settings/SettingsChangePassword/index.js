import React from 'react';

import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,

} from 'reactstrap';

export default function EditFederation({modal, toggle}) {
    // const [oldPassword, setOldPassword] = useState(null);
    // const [newPassword, setNewPassword] = useState(null);
    // const [confirmPassword, setConfirmPassword] = useState(null);

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
                        <CardTitle className="font-weight-bold font-size-lg mb-4">
                            Change account password
                        </CardTitle>
                        <Form>
                            <FormGroup>
                                <Label>Current password</Label>
                                <Input
                                    type="text"
                                    name="oldPassword"
                                    id="oldPassword"
                                    placeholder="Enter your current password"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>New password</Label>
                                <Input
                                    type="text"
                                    name="newPassword"
                                    id="newPassword"
                                    placeholder="Enter your new password"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Conirm new password</Label>
                                <Input
                                    type="text"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Re-Enter your current password"
                                />
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-end">
                                <Button color="light" className="mt-1 mr-2">
                                    Cancel
                                </Button>
                                <Button color="success" className="mt-1">
                                    Change Password
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Modal>
        </>
    );
}
