import React from 'react';
import { PageTitle } from '../../layout-components';
import MyAssets from '../../example-components/Wallets/MyAssets';
import TopAssets from '../../example-components/Wallets/TopAssets';

export default function Wallets() {
  return (
    <>
      <PageTitle
        titleHeading="Assets"
        titleDescription="">
      </PageTitle>

      <TopAssets />
      <MyAssets />
    </>
  );
}
