import React, { useState } from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { setSidebarToggleMobile } from '../../_reducers/ThemeOptions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Database,
    Users,
    Award,
    ChevronRight,
    Briefcase,
    Settings,
    Filter,
} from 'react-feather';

import { SidebarWidget } from '../../layout-components';
import Send from '../../example-components/Send/Send';
import Receive from '../../example-components/Receive/Receive';

const SidebarMenu = (props) => {
    const { setSidebarToggleMobile } = props;
    const [sendModal, setSendModal] = useState(false);
    const [receiveModal, setReceiveModal] = useState(false);
    const toggleSidebarMobile = () => setSidebarToggleMobile(false);

    return (
        <>
            <PerfectScrollbar>
                <div className="sidebar-navigation">
                    <SidebarWidget />
                    <div className="sidebar-header">
                        <span>Navigation</span>
                    </div>
                    <ul>
                        <li>
                            <NavLink
                                onClick={toggleSidebarMobile}
                                activeClassName="active"
                                className="nav-link-simple"
                                to="/Homepage">
                                <span className="sidebar-icon">
                                    <Award />
                                </span>
                                Home
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    <ChevronRight />
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={toggleSidebarMobile}
                                activeClassName="active"
                                className="nav-link-simple"
                                to="/dashboard">
                                <span className="sidebar-icon">
                                    <Database />
                                </span>
                                Dashboard
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    <ChevronRight />
                                </span>
                            </NavLink>
                        </li>
                        <li onClick={()=>setSendModal(!sendModal)}>
                            <NavLink onClick={toggleSidebarMobile} className="nav-link-simple" to="#">
                                <span className="sidebar-icon">
                                    <Users />
                                </span>
                                Send
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    <ChevronRight />
                                </span>
                            </NavLink>
                        </li>
                        <li onClick={()=>setReceiveModal(!receiveModal)}>
                            <NavLink onClick={toggleSidebarMobile} className="nav-link-simple" to="#">
                                <span className="sidebar-icon">
                                    <Users />
                                </span>
                                Receive
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    <ChevronRight />
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={toggleSidebarMobile}
                                activeClassName="active"
                                className="nav-link-simple"
                                to="/wallets">
                                <span className="sidebar-icon">
                                    <Briefcase />
                                </span>
                                Wallets
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    <ChevronRight />
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={toggleSidebarMobile}
                                activeClassName="active"
                                className="nav-link-simple"
                                to="/assets">
                                <span className="sidebar-icon">
                                    <Briefcase />
                                </span>
                                Assets
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    <ChevronRight />
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={toggleSidebarMobile}
                                activeClassName="active"
                                className="nav-link-simple"
                                to="/trade">
                                <span className="sidebar-icon">
                                    <Briefcase />
                                </span>
                                Trade
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    <ChevronRight />
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={toggleSidebarMobile}
                                activeClassName="active"
                                className="nav-link-simple"
                                to="/history">
                                <span className="sidebar-icon">
                                    <Filter />
                                </span>
                                History
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    <ChevronRight />
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={toggleSidebarMobile}
                                activeClassName="active"
                                className="nav-link-simple"
                                to="/settings">
                                <span className="sidebar-icon">
                                    <Settings />
                                </span>
                                Settings
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    <ChevronRight />
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {
                    sendModal && 
                        <Send modal={sendModal} toggleModal={()=>setSendModal(!sendModal)}/>
                }

                {
                    receiveModal && 
                        <Receive modal={receiveModal} toggleModal={()=>setReceiveModal(!receiveModal)}/>
                }
            </PerfectScrollbar>
        </>
    );
};

const mapStateToProps = (state) => ({
    sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
    setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
