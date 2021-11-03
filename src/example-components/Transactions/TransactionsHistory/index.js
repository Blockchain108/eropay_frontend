import React from 'react';

import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';

import { ArrowDownRight, ArrowUpRight, ArrowLeft } from 'react-feather';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <h6 className="font-weight-bold font-size-lg mb-0 text-black">
            All transactions
          </h6>
        </CardHeader>
        <div className="divider" />
        <div className="divider" />
        <div className="p-4">
          <div className="font-weight-bold opacity-7 mb-3">
            15 February 2020
          </div>
          <ListGroup className="mb-5">
            <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
              <div className="d-flex align-items-center mr-4">
                <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill font-size-lg mr-3 bg-success">
                  <ArrowDownRight />
                </div>
                <div>
                  <div className="font-weight-bold">Received Bitcoin</div>
                  <span className="text-black opacity-5 d-block">
                    To <b>My Bitcoin Wallet</b>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="text-right mr-3">
                  <div className="font-weight-bold font-size-lg">
                    0.234894 BTC
                  </div>
                  <div className="font-weight-bold text-black opacity-4">
                    $438
                  </div>
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
          <div className="font-weight-bold opacity-7 mb-3">
            16 February 2020
          </div>
          <ListGroup>
            <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
              <div className="d-flex align-items-center mr-4">
                <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill font-size-lg mr-3 bg-first">
                  <ArrowUpRight />
                </div>
                <div>
                  <div className="font-weight-bold">Sent Ethereum</div>
                  <span className="text-black opacity-5 d-block">
                    From <b>Ether Wallet</b>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="text-right mr-3">
                  <div className="font-weight-bold font-size-lg">
                    1.3984 ETH
                  </div>
                  <div className="font-weight-bold text-black opacity-4">
                    $1,495 USD
                  </div>
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
              <div className="d-flex align-items-center mr-4">
                <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill font-size-lg mr-3 bg-danger">
                  <ArrowLeft />
                </div>
                <div>
                  <div className="font-weight-bold">
                    Withdraw to bank account
                  </div>
                  <span className="text-black opacity-5 d-block">
                    From <b>Total Balance</b>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="text-right mr-3">
                  <div className="font-weight-bold text-danger font-size-lg">
                    -23,549 USD
                  </div>
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Card>
    </>
  );
}
