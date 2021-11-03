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
            <Col sm="12" md="6" lg="4" xl="4" className="p-3 d-flex">
              <div className="nav-link-icon opacity-7" style={{maxWidth: '30px', minWidth: '30px', marginLeft: '10px', marginRight: '10px'}}>
                <img
                  alt="..."
                  className="img-fluid"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  src={fastSvg}
                />
              </div>
              <div>
                <div className="font-size-md font-weight-bold mb-1">
                  Fast & Easy
                </div>
                <p className="opacity-7 font-size-sm mb-0">
                  Lumens reach your wallet in 10-30 minutes on average
                </p>
              </div>
            </Col>

            <Col sm="12" md="6" lg="4" xl="4" className="p-3 d-flex">
              <div className="nav-link-icon opacity-7" style={{maxWidth: '30px', minWidth: '30px', marginLeft: '10px', marginRight: '10px'}}>
                <img
                  alt="..."
                  className="img-fluid"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  src={secureSvg}
                />
              </div>
              <div>
                <div className="font-size-md font-weight-bold mb-1">
                  Secure
                </div>
                <p className="opacity-7 font-size-sm mb-0">
                  Moonpay.io complies with PCI SAQ when storing, processing and transmitting cardholder data
                </p>
              </div>
            </Col>

            <Col sm="12" md="6" lg="4" xl="4" className="p-3 d-flex">
              <div className="nav-link-icon opacity-7" style={{maxWidth: '30px', minWidth: '30px', marginLeft: '10px', marginRight: '10px'}}>
                <img
                  alt="..."
                  className="img-fluid"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  src={convenientSvg}
                />
              </div>
              <div>
                <div className="font-size-md font-weight-bold mb-1">
                  Convenient
                </div>
                <p className="opacity-7 font-size-sm mb-0">
                    Deposit XLM to your wallet using Visa or MasterCard credit card 
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
}
