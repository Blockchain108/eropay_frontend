import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

const TransactionsPageTitleActions = () => {
  return (
    <>
      <Button color="primary">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['fas', 'download']} />
        </span>
        <span className="btn-wrapper--label">Download</span>
      </Button>
    </>
  );
};

export default TransactionsPageTitleActions;
