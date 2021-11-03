import React from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Table
} from 'reactstrap';

export default function OverviewReserve() {

    return (
        <>
            <Card>
                <CardHeader className="p-4">
                    <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                        Reserved Balance
                    </h6>
                </CardHeader>
                <div className="divider"></div>
                <div className="divider"></div>
                <CardBody className="p-4">
                    <Row>
                        <Col md="6" className="pr-4">
                            <div className="mb-3">
                                The Stellar network requires accounts to maintain a &nbsp;
                                <a href="https://www.stellar.org/developers/guides/concepts/fees.html#minimum-account-balance" 
                                    target="_blank" style={{ textDecoration: 'underline' }}>
                                    minimum balance.
                                </a> 
                                &nbsp;A 1 XLM minimum balance is 
                                required with an additional requirement 0.5 XLM for each entry in the account such as a trustline 
                                or offer. You can read more about this on the 
                                <a href="https://www.stellar.org/developers/guides/concepts/fees.html#minimum-account-balance" 
                                    target="_blank" style={{ textDecoration: 'underline' }}>
                                    Stellar developer docs.
                                </a> 
                            </div>
                            <div className="mb-3">
                                Each entry (asset accepted, offer, signer) increases your minimum balance by 0.5 XLM. Additionally, 
                                StellarTerm enforces a 0.5 XLM of extra minimum balance in an attempt to make sure your account can 
                                still make transactions without going below the network minimum balance requirements.
                            </div>
                            <div className="mb-3">
                                <b>To decrease your minimum balance</b>, you can remove an existing offer or unaccept an asset. 
                                If you would like to close your Stellar account and withdraw assets somewhere else you can use 
                                Account &nbsp;
                                <a href="https://www.stellar.org/developers/guides/concepts/fees.html#minimum-account-balance" 
                                    target="_blank" style={{ textDecoration: 'underline' }}>
                                    Merge tool.
                                </a>  
                            </div>
                        </Col>
                        <Col md="6" className="pl-4">
                            <div className="table-responsive-md">
                                <div className="d-flex justify-content-between align-items-center border p-3">
                                    <div>Base reserve</div>
                                    <div>1 XLM</div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center border p-3">
                                    <div>Extra</div>
                                    <div>1 XLM</div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center border p-3">
                                    <div>XLM in active offers</div>
                                    <div>0 XLM</div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center border p-3">
                                    <div>Trustlines</div>
                                    <div>1.5 XLM</div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center border p-3">
                                    <div>Offers</div>
                                    <div>0 XLM</div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center border p-3">
                                    <div>Signers</div>
                                    <div>0 XLM</div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center border p-3 font-weight-bold">
                                    <div>Total reserved</div>
                                    <div>3 XLM</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}