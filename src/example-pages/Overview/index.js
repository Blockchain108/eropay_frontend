import React from 'react';

import { PageTitle } from '../../layout-components';

import OverviewChart from '../../example-components/Overview/OverviewChart';
import OverviewTransaction from '../../example-components/Overview/OverviewTransaction';
import OverviewReserve from '../../example-components/Overview/OverviewReserve';
export default function Overview() {

    return (
        <>
            <PageTitle
                titleHeading="Dashboard"
                titleDescription="This page shows an overview for your account summary.">
            </PageTitle>

            <OverviewChart />
            <OverviewTransaction />
            <OverviewReserve />
        </>
    );
}
