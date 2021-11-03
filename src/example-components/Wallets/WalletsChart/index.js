import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  Card,
  Badge,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import CountUp from 'react-countup';
import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chart6Options = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      strokeDashArray: '5',
      borderColor: 'rgba(125, 138, 156, 0.3)'
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    fill: {
      color: '#4191ff',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    colors: ['#4191ff'],
    legend: {
      show: false
    },
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };
  const chart6Data = [
    {
      name: 'Net Profit',
      data: [3.3, 3.1, 4.0, 5.8, 2.1, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 2.8, 2.8, 4.3, 2.7, 1.4]
    }
  ];

  return (
    <>
      <Card className="mb-5 p-4 p-lg-5">
        <div className="d-block d-lg-flex text-center text-lg-left align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
            <div className="display-4 line-height-1 font-weight-bold mr-3">
              Ethereum Balance
            </div>
            <UncontrolledDropdown>
              <DropdownToggle
                size="sm"
                color="neutral-dark"
                className="d-flex align-items-center">
                <span className="btn-wrapper--label">USD</span>
                <span className="btn-wrapper--icon d-flex">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className="opacity-8 font-size-xs ml-1"
                  />
                </span>
              </DropdownToggle>
              <DropdownMenu right className="p-3">
                <Nav pills className="nav-neutral-dark flex-column">
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      active>
                      <span>USD</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <span>Euro</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <span>Yen</span>
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <Button
            className="mt-4 mt-lg-0 text-uppercase font-weight-bold px-4"
            size="sm"
            color="primary">
            Exchange
          </Button>
        </div>
        <div className="rounded p-4 bg-secondary text-center border-light mb-5 border-1">
          <Row>
            <Col md="4">
              <div className="text-dark pb-1">Today's Earnings</div>
              <div className="font-size-lg d-flex align-items-center justify-content-center text-second">
                <span className="mr-2 badge badge-circle badge-dark">
                  Badge dark
                </span>
                <small className="opacity-6 pr-1">$</small>
                <span>
                  <CountUp
                    start={0}
                    end={8.49}
                    duration={4}
                    separator=""
                    decimals={3}
                    decimal=","
                    prefix=""
                    suffix=""
                  />
                </span>
              </div>
            </Col>
            <Col md="4">
              <div className="text-dark pb-1">Current Week</div>
              <div className="font-size-lg d-flex align-items-center justify-content-center text-second">
                <Badge color="first" className="mr-2 badge-circle">
                  Badge first
                </Badge>
                <small className="opacity-6 pr-1">$</small>
                <span>
                  <CountUp
                    start={0}
                    end={34.543}
                    duration={6}
                    deplay={2}
                    separator=""
                    decimals={3}
                    decimal=","
                  />
                </span>
              </div>
            </Col>
            <Col md="4">
              <div className="text-dark pb-1">Previous Week</div>
              <div className="font-size-lg d-flex align-items-center justify-content-center text-second">
                <span className="mr-2 badge badge-circle badge-warning">
                  Badge warning
                </span>
                <small className="opacity-6 pr-1">$</small>
                <span>
                  <CountUp
                    start={0}
                    end={76.645}
                    duration={6}
                    deplay={2}
                    separator=""
                    decimals={3}
                    decimal=","
                  />
                </span>
              </div>
            </Col>
          </Row>
        </div>

        <Row>
          <Col xl="4">
            <Card className="card-box mb-4 p-3">
              <div className="display-3 text-black font-weight-bold">19</div>
              <div className="divider mt-2 mb-3 border-2 w-25 bg-first rounded border-first" />
              <div className="font-weight-bold opacity-7 text-uppercase">
                Failed transfers
              </div>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="card-box mb-4 p-3">
              <div className="display-3 text-black font-weight-bold">35</div>
              <div className="divider mt-2 mb-3 border-2 w-25 bg-success rounded border-success" />
              <div className="font-weight-bold opacity-7 text-uppercase">
                Successful deposits
              </div>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="card-box mb-4 p-3">
              <div className="display-3 text-black font-weight-bold">546</div>
              <div className="divider mt-2 mb-3 border-2 w-25 bg-warning rounded border-warning" />
              <div className="font-weight-bold opacity-7 text-uppercase">
                Transactions
              </div>
            </Card>
          </Col>
        </Row>

        <Chart
          options={chart6Options}
          series={chart6Data}
          type="area"
          height={311}
        />
      </Card>
    </>
  );
}
