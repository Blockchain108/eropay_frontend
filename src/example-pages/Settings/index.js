import React from 'react';
import { PageTitle } from '../../layout-components';
import SettingsComponent from '../../example-components/Settings/Settings';

export default function Settings() {

    return (
        <>
            <PageTitle
                titleHeading="Settings"
                titleDescription="Manage your profile settings from this example page.">
            </PageTitle>
            <SettingsComponent />
        </>
    );
}
