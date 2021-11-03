import React from 'react';
import { PageTitle } from '../../layout-components';
import TransactionsOrders from '../../example-components/Transactions/TransactionsOrders';

export default function Transactions() {
    return (
        <>
            <PageTitle
                titleHeading="Transactions"
                titleDescription="Your account history is available in this page.">
            </PageTitle>
            <TransactionsOrders />
        </>
    );
}
