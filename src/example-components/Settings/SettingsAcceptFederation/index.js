import React from 'react';

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

export default function AcceptFederation({modal, toggle, value, placeholder}) {

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
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder={placeholder}
                            value={value}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-end">
                        <Button color="light" className="mt-1 mr-2">
                            Cancel
                        </Button>
                        <Button color="success" className="mt-1">
                            Close
                        </Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
      </Modal>
    </>
  );
}
