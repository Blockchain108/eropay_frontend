import React from 'react';
import { PageTitle } from '../../layout-components';
import MultiWallet from '../../example-components/Wallets/Wallets';

export default function Wallets() {
  return (
    <>
      <PageTitle
        titleHeading="Wallets"
        titleDescription="">
      </PageTitle>

      <MultiWallet />

    </>
  );
}
