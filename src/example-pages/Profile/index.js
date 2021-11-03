import React from 'react';

import { Container } from 'reactstrap';
import { PageTitle } from '../../layout-components';

import AccessHistory from '../../example-components/Profile/AccessHistory';
export default function Profile() {
  return (
    <>
      <PageTitle
        titleHeading="Access history"
        titleDescription="Manage all aspects of your access history data using this page.">
      </PageTitle>
      <Container>
        <AccessHistory />
      </Container>
    </>
  );
}
