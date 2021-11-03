import React, { useState } from 'react';

import {
  Row,
  Table,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Modal,
} from 'reactstrap';

import iconInfo from '../../../assets/images/AccessHistory/ic-info-24-px.svg';
import chromeLogo from '../../../assets/images/AccessHistory/chrome.svg';
import firefoxLogo from '../../../assets/images/AccessHistory/firefox.svg';

export default function LivePreviewExample() {

  const [modal, setModal] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);

  const toggle = (index) => {
      setModal(!modal);
      setHistoryIndex(index);
  };

  const histories = [
    {
      browser: 'Google Chrome',
      browserLogo: chromeLogo,
      system: 'Windows 10',
      location: 'Khabarovsk, Russia',
      ipAddress: '188.43.136.32',
      date: 'April 10, 2021 at 2:04 PM',
      status: 'Success',
      loginMethod: 'Email',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
    }, {
      browser: 'Mozilla Firefox',
      browserLogo: firefoxLogo,
      system: 'Windows 10',
      location: 'Khabarovsk, Russia',
      ipAddress: '188.43.136.32',
      date: 'April 10, 2021 at 2:04 PM',
      status: 'Success',
      loginMethod: 'Email',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0'
    }
  ]

  return (
    <>
      <Card className="card-box mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-0 text-black">
              Access history
            </h6>
            <p className="mt-2">You are currently accessing LOBSTR from IP address 188.43.136.32</p>
          </div>
        </CardHeader>
        <div className="divider" />
        <div className="pt-4 px-4">
          <Table responsive className="table-alternate-spaced mb-0">
            <thead className="thead-light text-capitalize font-size-sm font-weight-bold">
              <tr>
                <th className="text-left">Browser (device)</th>
                <th className="text-left">IP Address</th>
                <th className="text-left">Date</th>
                <th className="text-left">Status</th>
                <th className="text-left"></th>
              </tr>
            </thead>
            <tbody>
              {
                histories.map((history, index) => (
                  <>
                    <tr>
                      <td className="text-left">
                        <div className="d-flex align-items-center">
                          <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-neutral-success text-success">
                            <img alt="" src={history.browserLogo} />
                          </div>
                          <div>
                            <div className="font-size-sm font-weight-bold">
                              {history.browser}
                            </div>
                            <div className="font-size-sm opacity-7">
                              ({history.system})
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-left">
                        <div>
                          <div className="font-size-sm font-weight-bold">
                            {history.location}
                          </div>
                          <div className="font-size-sm opacity-7">({history.ipAddress})</div>
                        </div>
                      </td>
                      <td className="text-left">
                        <div className="font-size-sm font-weight-bold">
                          {history.date}
                        </div>
                      </td>
                      <td className="text-left">
                        <div className="font-size-sm font-weight-bold">
                          {history.status}
                        </div>
                      </td>
                      <td className="text-left">
                        <Button
                          onClick={() => toggle(index)}
                          className="mx-1 shadow-none d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                            <img alt="" src={iconInfo} />
                        </Button>
                      </td>
                    </tr>
                    <tr className="divider"></tr>
                  </>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div className="divider mt-3" />
      </Card>

      <Modal
        size="md"
        centered
        isOpen={modal}
        zIndex={1300}
        toggle={()=>toggle(0)}
        contentClassName="border-0 bg-white">
        <Card className="p-4">
          <CardBody>
            <CardTitle className="font-weight-bold font-size-lg mb-4">
              Access details
              <div className="font-weight-normal font-size-xs opacity-7 mt-2">
                {histories[historyIndex].location} <br/>
                {histories[historyIndex].date}
              </div>
            </CardTitle>
            <Row>
              <Col md="6">
                <div className="font-weight-bold font-size-sm">
                    <b>Login method</b>
                </div>
                <div className="opacity-7">
                    <div className="opacity-8 mt-1 mb-4 font-size-xs">
                        {histories[historyIndex].loginMethod}
                    </div>
                </div>
              </Col>
              <Col md="6">
                <div className="font-weight-bold font-size-sm">
                    <b>Login status</b>
                </div>
                <div className="opacity-7">
                    <div className="text-second opacity-8 mt-1 mb-4 font-size-xs">
                        {histories[historyIndex].status}
                    </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="font-weight-bold font-size-sm">
                    <b>IP address</b>
                </div>
                <div className="opacity-7">
                    <div className="text-second opacity-8 mt-1 mb-4 font-size-xs">
                        {histories[historyIndex].ipAddress}
                    </div>
                </div>
              </Col>
              <Col md="6">
                <div className="font-weight-bold font-size-sm">
                    <b>Location</b>
                </div>
                <div className="opacity-7">
                    <div className="text-second opacity-8 mt-1 mb-4 font-size-xs">
                        {histories[historyIndex].location}
                    </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="font-weight-bold font-size-sm">
                    <b>Browser (device)</b>
                </div>
                <div className="opacity-7">
                    <div className="text-second opacity-8 mt-1 mb-4 font-size-xs">
                        {histories[historyIndex].browser}({histories[historyIndex].system})
                    </div>
                </div>
              </Col>
              <Col md="6">
                <div className="font-weight-bold font-size-sm">
                    <b>Date</b>
                </div>
                <div className="opacity-7">
                    <div className="text-second opacity-8 mt-1 mb-4 font-size-xs">
                        {histories[historyIndex].date}
                    </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="font-weight-bold font-size-sm">
                    <b>User agent</b>
                </div>
                <div className="opacity-7">
                    <div className="text-second opacity-8 mt-1 mb-4 font-size-xs">
                        {histories[historyIndex].userAgent}
                    </div>
                </div>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center">
                <div className="opacity-7">
                  <div className="text-second font-size-xs">
                    It wasn't you? <a href="/#" className="font-weight-normal" style={{color: '#00abff'}}>Contact Us.</a>
                  </div>
                </div>
              </div>
              <div>
                <Button color="success">
                  Close
                </Button>
              </div>
            </Row>
          </CardBody>
        </Card>
      </Modal>
    </>
  );
}
