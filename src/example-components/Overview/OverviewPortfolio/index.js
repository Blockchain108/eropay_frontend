import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip,
  Button
} from 'reactstrap';

import CountUp from 'react-countup';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { ArrowDownRight, ArrowUpRight } from 'react-feather';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="w-100 mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              My Portfolio
            </h6>
            <p className="text-black-50 mb-0">Status of your crypto assets.</p>
          </div>
          <div className="d-flex align-items-center">
            <Button
              color="link"
              className="mx-1 px-1 py-2 font-weight-bold text-primary"
              id="LastWeekTooltip">
              <span>1W</span>
            </Button>
            <Button
              color="link"
              className="mx-1 px-1 py-2 font-weight-bold text-dark opacity-5"
              id="LastMonthTooltip">
              <span>1M</span>
            </Button>
            <Button
              color="link"
              className="ml-1 px-1 py-2 font-weight-bold text-dark opacity-5"
              id="LastYearTooltip">
              <span>1Y</span>
            </Button>
            <UncontrolledTooltip target="LastWeekTooltip">
              View stats for last week
            </UncontrolledTooltip>
            <UncontrolledTooltip target="LastMonthTooltip">
              View stats for last month
            </UncontrolledTooltip>
            <UncontrolledTooltip target="LastYearTooltip">
              View stats for last year
            </UncontrolledTooltip>
          </div>
        </CardHeader>
        <div className="divider" />
        <div className="divider" />
        <h3 className="display-3 mt-5 mb-0 text-center font-weight-bold">
          <small className="opacity-6">$</small>
          <span className="pl-1">
            <CountUp
              start={0}
              end={458.695}
              duration={6}
              separator=""
              delay={1}
              decimals={3}
              decimal=","
              prefix=""
              suffix=""
            />
            <small>
              <sup>.65</sup>
            </small>
          </span>
        </h3>
        <small className="text-center font-weight-bold text-muted text-uppercase">
          Total balance
        </small>
        <div className="divider mt-5" />
        <div className="divider" />
        <div className="scroll-area-sm shadow-overflow">
          <PerfectScrollbar>
            <ListGroup flush>
              <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center mr-4">
                  <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-warning">
                    <FontAwesomeIcon
                      icon={['fab', 'bitcoin']}
                      className="font-size-lg"
                    />
                  </div>
                  <div>
                    <div className="font-weight-bold">BTC</div>
                    <span className="text-warning d-block">Bitcoin</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="text-right mr-3">
                    <div className="font-weight-bold font-size-lg">
                      2.4895 BTC
                    </div>
                    <div className="font-weight-bold text-black opacity-4">
                      $16,497
                    </div>
                  </div>
                  <div className="font-size-lg text-success">
                    <ArrowUpRight />
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center mr-4">
                  <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-first">
                    <FontAwesomeIcon
                      icon={['fab', 'ethereum']}
                      className="font-size-lg"
                    />
                  </div>
                  <div>
                    <div className="font-weight-bold">ETH</div>
                    <span className="text-first d-block">Ethereum</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="text-right mr-3">
                    <div className="font-weight-bold font-size-lg">
                      54.12387 ETH
                    </div>
                    <div className="font-weight-bold text-black opacity-4">
                      $6,398
                    </div>
                  </div>
                  <div className="font-size-lg text-success">
                    <ArrowUpRight />
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center mr-4">
                  <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-success">
                    <FontAwesomeIcon
                      icon={['fas', 'dollar-sign']}
                      className="font-size-lg"
                    />
                  </div>
                  <div>
                    <div className="font-weight-bold">USD</div>
                    <span className="text-success d-block">Dollar</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="text-right mr-3">
                    <div className="font-weight-bold font-size-lg">
                      76,358 USD
                    </div>
                  </div>
                  <div className="font-size-lg text-danger">
                    <ArrowDownRight />
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </PerfectScrollbar>
        </div>
        <div className="card-footer p-3 text-center">
          <Button size="sm" className="py-2 px-4" color="primary">
            <span className="btn-wrapper--label text-uppercase font-weight-bold">
              View all accounts
            </span>
          </Button>
        </div>
      </Card>
    </>
  );
}
