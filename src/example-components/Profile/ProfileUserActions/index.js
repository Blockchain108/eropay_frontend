import React from 'react';

import { Row, Col, Card } from 'reactstrap';

import fastSvg from '../../../assets/images/moonpay_integration/fast.svg';
import secureSvg from '../../../assets/images/moonpay_integration/secure.svg';
import convenientSvg from '../../../assets/images/moonpay_integration/convenient.svg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="mb-5">
        <div className="p-4">
          <Row>
            <Col md="6" lg="4" xl="4">
              <Row className="no-gutters">
                <Col lg="2">
                  <img
                    alt="..."
                    className="img-fluid"
                    style={{ maxHeight: '150px' }}
                    src={fastSvg}
                  />
                </Col>
                <Col lg="10" className="d-flex align-items-center">
                  <div className="text-center text-lg-left">
                    <div className="font-size-md font-weight-bold mb-1">
                      Fast & Easy
                    </div>
                    <p className="opacity-7 font-size-sm mb-0">
                      Lumens reach your wallet in 10-30 minutes on average
                    </p>
                  </div>
                </Col> 
              </Row>         
            </Col>
            <Col md="6" lg="4" xl="4">
              <Row className="no-gutters">
                <Col lg="2">
                  <img
                    alt="..."
                    className="img-fluid"
                    style={{ maxHeight: '150px' }}
                    src={secureSvg}
                  />
                </Col>
                <Col lg="10" className="d-flex align-items-center">
                  <div className="text-center text-lg-left">
                    <div className="font-size-md font-weight-bold mb-1">
                      Secure
                    </div>
                    <p className="opacity-7 font-size-sm mb-0">
                      Moonpay.io complies with PCI SAQ when storing, processing and transmitting cardholder data
                    </p>
                  </div>
                </Col> 
              </Row>  
            </Col>
            <Col md="6" lg="4" xl="4">
              <Row className="no-gutters">
                <Col lg="2">
                  <img
                    alt="..."
                    className="img-fluid"
                    style={{ maxHeight: '150px' }}
                    src={convenientSvg}
                  />
                </Col>
                <Col lg="10" className="d-flex align-items-center">
                  <div className="text-center text-lg-left">
                    <div className="font-size-md font-weight-bold mb-1">
                      Convenient
                    </div>
                    <p className="opacity-7 font-size-sm mb-0">
                      Deposit XLM to your wallet using Visa or MasterCard credit card
                    </p>
                  </div>
                </Col> 
              </Row>  
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
}
