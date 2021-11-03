import React, { useState } from 'react';

import { Row, Col, Container, Modal } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import phoneLogo from '../../../assets/images/phone.png';
import Appstore from '../../../assets/images/Appstore.png';
import Playstore from '../../../assets/images/Playstore.png';

export default function LivePreviewExample() {
    const [modal1, setModal1] = useState(false);

    return (
        <>
            <div className="z-over" style={{backgroundColor: `#018e6a`}}>
                <Container className="py-3">
                    <Row>
                        <Col xl="6" className="d-flex flex-column justify-content-center">
                            <div className="pr-xl-5 font-Montserrat text-uppercase text-white">
                                <p className="" style={{fontSize: '40px', lineHeight: '75px'}}>
                                    Download our app
                                </p>
                            </div>
                            <div className="d-flex font-Montserrat mt-4">
                                <div className="mr-3" onClick={() => setModal1(!modal1)} >
                                    <img alt="" src={Appstore} />
                                </div>
                                <div onClick={() => setModal1(!modal1)}>
                                    <img alt="" src={Playstore} />
                                </div>
                            </div>
                        </Col>
                        <Col xl="6" className="d-none d-xl-flex align-items-center">
                            <img alt="..." className="w-75" src={phoneLogo} />
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal zIndex={2000} centered isOpen={modal1} toggle={() => setModal1(!modal1)}>
                <div className="text-center p-5">
                    <div className="avatar-icon-wrapper rounded-circle m-0">
                        <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success text-success m-0 d-130">
                            <FontAwesomeIcon
                                icon={['far', 'lightbulb']}
                                className="d-flex align-self-center display-3"
                            />
                        </div>
                    </div>
                    <h4 className="font-weight-bold mt-5">
                        Coming Soon...
                    </h4>
                </div>
            </Modal>
        </>
    );
}
