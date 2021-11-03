import React from 'react';
import { PageTitle } from '../../layout-components';
import MainTrade from '../../example-components/Trade/MainTrade';
import MarketTrade from '../../example-components/Trade/MarketTrade';
import OrderTrade from '../../example-components/Trade/OrderTrade';

export default function Trade() {
    return (
        <>
            <PageTitle
                titleHeading="Trade"
                titleDescription="This is your trade overview last updated today.">
            </PageTitle>

            <MainTrade />
            <MarketTrade />
            <OrderTrade />
        </>
    );
}
