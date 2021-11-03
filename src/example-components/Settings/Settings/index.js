import React, { useState } from 'react';
import clsx from 'clsx';
import {
    Card,
    Nav,
    NavItem,
    TabContent,
    TabPane
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import SettingsWallet from '../SettingsWallet';
import SettingsProfile from '../SettingsProfile';

export default function Setting() {
    const [activeTab, setActiveTab] = useState('1');

    const setActive = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    
    return (
        <Card className="p-4">
            <div className="nav-line-alt">
                <Nav className="nav-line d-flex justify-content-start">
                    <NavItem>
                        <NavLinkStrap
                            className={clsx('px-4 py-3', { active: activeTab === '1' })}
                            onClick={() => {
                                setActive('1');
                            }}>
                            <span className="">
                                Wallet
                            </span>
                            <div className="divider" />
                        </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                        <NavLinkStrap
                            className={clsx('px-4 py-3', { active: activeTab === '2' })}
                            onClick={() => {
                                setActive('2');
                            }}>
                            <span className="">
                                Profile
                            </span>
                            <div className="divider" />
                        </NavLinkStrap>
                    </NavItem>
                </Nav>
            </div>
            <TabContent className="p-3" activeTab={activeTab}>
                <TabPane tabId="1">
                    <SettingsWallet />
                </TabPane>
                <TabPane tabId="2">
                    <SettingsProfile />
                </TabPane>
            </TabContent>
        </Card>
    )
}