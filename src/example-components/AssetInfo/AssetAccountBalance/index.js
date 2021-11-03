import React from 'react';

import { 
    Card,
    CardHeader,
    Row,
    Col
} from 'reactstrap';

export default function AssetAccountBalance() {
    return (
        <>
            <Card className="mt-3 p-4">
                <CardHeader>
                    <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                        Your balance
                    </h6>
                </CardHeader>
                <Row>
                    <Col md="4" className="d-flex justify-content-center flex-column">
                        <div>Available balance</div>
                        <div>0.3990022 XLM</div>
                    </Col>
                    <Col md="4" className="d-flex justify-content-center flex-column">
                        <div>Available balance (CAD)</div>
                        <div>$0.194091</div>
                    </Col>
                    <Col md="4" className="d-flex justify-content-center flex-column">
                        <div>Reserved balance</div>
                        <div>4 XLM</div>
                        <div>
                            <a href="/#">View Details</a>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    )
}