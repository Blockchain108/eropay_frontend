import React from 'react';

import {
    Modal,
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Button
} from 'reactstrap';

import {
    ArrowDownRight,
    ArrowUpRight
} from 'react-feather';

import lobstr from '../../../assets/images/assets/lumens.png';

export default function TransactionModal({modal, toggle, data}) {
    return (
        <Modal
        size="md"
        centered
        isOpen={modal}
        zIndex={1300}
        toggle={()=>toggle(0)}
        contentClassName="border-0 bg-white">
            { 
                data && <Card>
                            <CardBody className="p-3">
                                <CardTitle className="d-flex flex-column align-items-center mt-5">
                                    <div style={{maxWidth: '48px', maxHeight: '48px', minHeight: '32px'}}>
                                        <img alt="" src={lobstr} className="w-100 h-100"></img>
                                    </div>
                                    <div className="text-muted font-size-xs mb-2">Lumens</div>
                                    <div>
                                        {
                                            data.type === 'create_account' ? 
                                                data.starting_balance + ' XLM' : 
                                                data.amount + ' XLM'
                                        }
                                    </div>
                                    <div className="font-size-sm text-danger">{ data.status ? 'Sent' : 'Received' }</div>
                                </CardTitle>
                                <div className="divider my-4" />
                                <Row className="mb-4">
                                    <Col md="8">
                                        <div className="d-flex align-items-center">
                                            <div color="danger" className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-neutral-success text-success">
                                                { data.status ? <ArrowUpRight /> : <ArrowDownRight /> } 
                                            </div>
                                            <div>
                                                <div className="font-size-sm opacity-7">
                                                    { data.status ? 'Sent' : 'Received' }
                                                </div>
                                                <div className="font-size-sm" style={{color: '#00abff'}}>
                                                    {
                                                        data.type === 'create_account' ? 
                                                            data.account.slice(0, 8) + '...' + data.account.slice(-8) :
                                                            data.from.slice(0, 8) + '...' + data.from.slice(-8)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="font-size-sm font-weight-bold">
                                            Date
                                        </div>
                                        <div className="font-size-sm opacity-7">
                                            { data.created_at }
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <div className="font-weight-bold font-size-sm">
                                            <b>Public Key</b>
                                        </div>
                                        <div className="opacity-7">
                                            <div className="text-second opacity-8 mt-1 font-size-xs">
                                                { data.from }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <div className="font-weight-bold font-size-sm">
                                            <b>Transaction Hash</b>
                                        </div>
                                        <div className="opacity-7">
                                            <div className="text-second opacity-8 mt-1 font-size-xs">
                                                { data.transaction_hash } 
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <div className="font-weight-bold font-size-sm">
                                            <b>Memo</b>
                                        </div>
                                        <div className="opacity-7">
                                            <div className="text-second opacity-8 mt-1 font-size-xs">
                                                { data.memo ? data.memo : 'No memo' }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-end align-items-center p-3">
                                    <Button size="sm" color="first" className="mr-2" onClick={()=>toggle(0)}>
                                        Close
                                    </Button>
                                </Row>
                            </CardBody>
                        </Card>
            }
        </Modal>
    )
}