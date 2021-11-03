import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledTooltip, Button } from 'reactstrap';

const WalletsPageTitleActions = () => {
  return (
    <>
      <Button
        size="sm"
        color="success"
        className="p-0 d-60"
        id="SendFundsTooltip">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon
            icon={['far', 'paper-plane']}
            className="font-size-lg"
          />
        </span>
      </Button>
      <Button
        size="sm"
        color="danger"
        className="p-0 mx-3 d-60"
        id="WithdrawTooltip">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon
            icon={['fas', 'dollar-sign']}
            className="font-size-lg"
          />
        </span>
      </Button>
      <Button
        size="sm"
        color="warning"
        className="p-0 d-60"
        id="DepositTooltip">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['fas', 'plus']} className="font-size-lg" />
        </span>
      </Button>
      <UncontrolledTooltip target="SendFundsTooltip">
        Send funds
      </UncontrolledTooltip>
      <UncontrolledTooltip target="WithdrawTooltip">
        Withdraw to bank account
      </UncontrolledTooltip>
      <UncontrolledTooltip target="DepositTooltip">
        Deposit funds
      </UncontrolledTooltip>
    </>
  );
};

export default WalletsPageTitleActions;
