import React from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledTooltip } from 'reactstrap';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
    setSidebarToggle,
    setSidebarToggleMobile
} from '../../_reducers/ThemeOptions';

import projectLogo from '../../assets/images/wallet_eropay.png';

const SidebarHeader = (props) => {
    const toggleSidebarMobile = () => {
        setSidebarToggleMobile(!sidebarToggleMobile);
    };

    const toggleSidebar = () => {
        setSidebarToggle(!sidebarToggle);
    };

    const {
        sidebarToggleMobile,
        setSidebarToggleMobile,

        sidebarToggle,
        setSidebarToggle
    } = props;

    return (
        <>
            <div className="app-sidebar--header" style={{ backgroundColor: '#54A283' }}>
                <div className="app-sidebar-logo">
                    <NavLink
                        to="/"
                        title="Eropay Wallet"
                        className="app-sidebar-logo">
                        <div 
                            className="app-sidebar-logo--icon" 
                            style={{ background: 'none', boxShadow: 'none', backgroundColor: 'none', width: '120px' }} >
                            <img
                                alt="Eropay Wallet"
                                src={projectLogo}
                                style={{ animation: 'none', width: '120px' }}
                            />
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    sidebarToggle: state.ThemeOptions.sidebarToggle,
    sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
    setSidebarToggle: (enable) => dispatch(setSidebarToggle(enable)),
    setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader);
