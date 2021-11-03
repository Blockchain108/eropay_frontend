import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  Badge,
  UncontrolledTooltip,
  Button,
  Modal
} from 'reactstrap';

import avatar7 from '../../../assets/images/avatars/avatar7.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

const OverviewPageTitleActions = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  return (
    <>
      <Button onClick={toggleModal} color="primary">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </span>
        <span className="btn-wrapper--label">View Profile</span>
      </Button>

      <Modal
        centered
        isOpen={modal}
        zIndex={1300}
        toggle={toggleModal}
        contentClassName="border-0 bg-white">
        <div className="p-4 text-center">
          <div className="avatar-icon-wrapper rounded-circle mx-auto">
            <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0 border-3 border-first">
              <div className="rounded-circle border-3 border-white overflow-hidden">
                <img alt="..." className="img-fluid" src={avatar5} />
              </div>
            </div>
          </div>
          <h4 className="font-size-lg font-weight-bold my-2">Marion Devine</h4>
          <div className="text-center my-4">
            <Badge pill color="neutral-first" className="text-first mx-1">
              Web developer
            </Badge>
            <Badge pill color="neutral-warning" className="text-warning mx-1">
              Javascript
            </Badge>
            <Badge pill color="neutral-danger" className="text-danger mx-1">
              Angular
            </Badge>
          </div>

          <p className="text-muted mb-4">
            I should be incapable of drawing a single stroke at the present
            moment; and yet I feel that I never was a greater artist than now.
          </p>

          <div className="divider my-4" />

          <h4 className="font-size-lg font-weight-bold mt-2 mb-4">
            Trading Performance
          </h4>

          <Row>
            <Col lg="6">
              <span className="opacity-6 pb-2">Current month</span>
              <div className="d-flex align-items-center justify-content-center">
                <span className="font-weight-bold font-size-lg">
                  <small className="opacity-6 pr-1">$</small>
                  46,362
                </span>
                <Badge color="neutral-danger" className="ml-2 text-danger">
                  -8%
                </Badge>
              </div>
            </Col>
            <Col lg="6">
              <span className="opacity-6 pb-2">Last year</span>
              <div className="d-flex align-items-center justify-content-center">
                <span className="font-weight-bold font-size-lg">
                  <small className="opacity-6 pr-1">$</small>
                  34,546
                </span>
                <Badge color="neutral-success" className="text-success ml-2">
                  +13%
                </Badge>
              </div>
            </Col>
          </Row>
          <div className="divider my-4" />
          <h4 className="font-size-lg font-weight-bold mt-2 mb-4">
            Team members
          </h4>
          <div className="avatar-wrapper-overlap d-flex justify-content-center mb-3">
            <div className="avatar-icon-wrapper" id="DelaneyTooltip1">
              <div className="avatar-icon">
                <img alt="..." src={avatar1} />
              </div>
            </div>
            <UncontrolledTooltip
              target="DelaneyTooltip1"
              popperClassName="tooltip-danger">
              Chelsey Delaney
            </UncontrolledTooltip>

            <div className="avatar-icon-wrapper" id="SantosTooltip1">
              <div className="avatar-icon">
                <img alt="..." src={avatar7} />
              </div>
            </div>
            <UncontrolledTooltip
              target="SantosTooltip1"
              popperClassName="tooltip-first">
              Laibah Santos
            </UncontrolledTooltip>

            <div className="avatar-icon-wrapper" id="WeberTooltip1">
              <div className="avatar-icon">
                <img alt="..." src={avatar1} />
              </div>
            </div>
            <UncontrolledTooltip
              target="WeberTooltip1"
              popperClassName="tooltip-second">
              Ksawery Weber
            </UncontrolledTooltip>

            <div className="avatar-icon-wrapper" id="MaganaTooltip1">
              <div className="avatar-icon">
                <img alt="..." src={avatar2} />
              </div>
            </div>
            <UncontrolledTooltip
              target="MaganaTooltip1"
              popperClassName="tooltip-info">
              Killian Magana
            </UncontrolledTooltip>

            <div className="avatar-icon-wrapper" id="BanksTooltip1">
              <div className="avatar-icon">
                <img alt="..." src={avatar6} />
              </div>
            </div>
            <UncontrolledTooltip
              target="BanksTooltip1"
              popperClassName="tooltip-success">
              Kean Banks
            </UncontrolledTooltip>
          </div>
          <div className="divider my-4" />
          <Button outline color="first" className="mt-2">
            View complete profile
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default OverviewPageTitleActions;
