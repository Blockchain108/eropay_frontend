import React from 'react';

import {
    Modal,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    FormGroup,
    Button
} from 'reactstrap';

export default function OrderDetailModal(props) {
    const { modal, toggleModal, orderData } = props;
    
    return (
        <Modal
        size="md"
        centered
        isOpen={modal}
        zIndex={1300}
        toggle={()=>toggleModal()}
        contentClassName="border-0 bg-white">
            <Card className="p-3">
                <CardHeader>
                    <CardTitle className="font-weight-bold">Trade details</CardTitle>
                </CardHeader>
                <CardBody className="p-3">
                    <FormGroup className="mb-4">
                        <CardSubtitle className="font-weight-bold">Trade time</CardSubtitle>
                        <CardText className="font-size-xs">{ (new Date(orderData.ledger_close_time)).toGMTString().slice(5, 22) }</CardText>
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <CardSubtitle className="font-weight-bold">Selling amount</CardSubtitle>
                        <CardText className="font-size-xs">{ orderData.counter_amount }</CardText>
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <CardSubtitle className="font-weight-bold">Selling asset code</CardSubtitle>
                        <CardText className="font-size-xs">
                            { orderData.counter_asset_type === 'native' ? 'XLM' : orderData.counter_asset_code }
                        </CardText>
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <CardSubtitle className="font-weight-bold">Selling asset issuer</CardSubtitle>
                        <CardText className="font-size-xs">
                            {  orderData.counter_asset_type === 'native' ? 'Native' : orderData.counter_asset_issuer }
                        </CardText>
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <CardSubtitle className="font-weight-bold">Buying amount</CardSubtitle>
                        <CardText className="font-size-xs">{ orderData.base_amount }</CardText>
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <CardSubtitle className="font-weight-bold">Buying asset code</CardSubtitle>
                        <CardText className="font-size-xs">
                            { orderData.base_asset_type === 'native' ? 'XLM' : orderData.base_asset_code }
                        </CardText>
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <CardSubtitle className="font-weight-bold">Buying asset issuer</CardSubtitle>
                        <CardText className="font-size-xs">
                            { orderData.base_asset_type === 'native' ? 'Native' : orderData.base_asset_issuer }
                        </CardText>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-end">
                        <Button color="success" onClick={()=>toggleModal()}>Close</Button>
                    </FormGroup>
                </CardBody>
            </Card>
        </Modal>
    )
}