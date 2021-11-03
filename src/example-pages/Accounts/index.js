import React from 'react';

import { PageTitle } from '../../layout-components';

import AccountsTransactions1 from '../../example-components/Accounts/AccountsTransactions1';
import ProfileUserActions from '../../example-components/Accounts/ProfileUserActions';
import BuyCrypto from '../../example-components/Accounts/BuyCrypto';
export default function Accounts() {
    return (
        <>
            <PageTitle
                titleHeading="Buy Lummens"
                titleDescription="Manage your cryptocurrency accounts with ease.">
            </PageTitle>

            <AccountsTransactions1 />
            <ProfileUserActions />
            <BuyCrypto />
        </>
    );
}
