import React from 'react';
import { PageTitle } from '../../layout-components';

import AssetStatus from '../../example-components/AssetInfo/AssetStatus';
import AssetAccountBalance from '../../example-components/AssetInfo/AssetAccountBalance';
import AssetStats from '../../example-components/AssetInfo/AssetStats';

export default function AssetInfo() {
    return (
        <>
            <PageTitle
                titleHeading="Asset Info"
                titleDescription="Manage your cryptocurrency accounts with ease.">
            </PageTitle>

            <AssetStatus />
            <AssetStats />
        </>
    );
}
