import React from 'react';

import { Container } from 'reactstrap';
import { PageTitle } from '../../layout-components';

import MyContact from '../../example-components/BuySell/MyContact';
export default function BuySell() {
  return (
    <>
      <PageTitle
        titleHeading="Contacts"
        titleDescription="Manage all aspects of your contacts data using this page.Use these examples to create crypto exchanges pages.">
      </PageTitle>
      <Container>
        <MyContact />
      </Container>
    </>
  );
}
