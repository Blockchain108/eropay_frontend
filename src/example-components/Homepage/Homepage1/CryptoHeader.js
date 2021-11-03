import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, Container, Nav, NavItem, Button } from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import projectLogo from '../../../assets/images/wallet_eropay.png';
import { NavLink } from 'react-router-dom';
import { userActions } from '../../../_actions';

export default function LivePreviewExample() {
    const [collapse, setCollapse] = useState(false);
    const isAuthorized = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const toggle = () => setCollapse(!collapse);

    const logout = () => {
        dispatch(userActions.logout());
    }

    return (
        <>
            <Container>
                <div className="bg-white-10 p-2 header-nav-wrapper header-nav-wrapper-xl rounded px-4 navbar-dark mt-5">
                    <div className="app-nav-logo">
                        <NavLink
                            to="/Homepage"
                            title="Eropay Wallet"
                            className="app-nav-logo app-nav-logo--light">
                            <div 
                                className="app-nav-logo--icon border-0" 
                                style={{ background: 'none', boxShadow: 'none', width: '185px' }}>
                                <img
                                    alt="Eropay Wallet"
                                    src={projectLogo}
                                    style={{ animation: 'none', width: '185px' }}
                                    />
                            </div>
                        </NavLink>
                    </div>
                    <div className="header-nav-menu d-none d-lg-block">
                        {/* <ul className="d-flex nav nav-neutral-first justify-content-start">
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className="font-weight-bold rounded-sm text-white px-3">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/buysell"
                                    className="font-weight-bold rounded-sm text-white px-3">
                                    Buy/Sell
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/settings"
                                    className="font-weight-bold rounded-sm text-white px-3">
                                    Settings
                                </NavLink>
                            </li>
                        </ul> */}
                    </div>
                    <div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
                        {
                            isAuthorized ? 
                                <span className="d-none d-lg-block">
                                    <Button
                                        className="btn-pill text-nowrap font-size-xs font-weight-bold text-white mr-2 home-btn"
                                        onClick={()=>logout()}>
                                        Logout
                                    </Button>
                                </span> :
                                <>
                                    <span className="d-none d-lg-block">
                                        <Button
                                            tag={NavLink}
                                            to="/login"
                                            className="btn-pill text-nowrap font-size-xs font-weight-bold text-white mr-2 home-btn"
                                            style={{ backgroundColor: '#08cb77' }}>
                                            Login
                                        </Button>
                                    </span>
                                    <span className="d-none d-lg-block">
                                        <Button
                                            tag={NavLink}
                                            to="/PageRegisterCover"
                                            className="btn-pill text-nowrap font-size-xs font-weight-bold text-white home-btn"
                                            style={{ backgroundColor: '#08cb77' }}>
                                            Register
                                        </Button>
                                    </span>
                                </>
                        }
                        <span className="d-block d-lg-none">
                            <button
                                onClick={toggle}
                                className={clsx('navbar-toggler hamburger hamburger--elastic', {
                                'is-active': collapse
                                })}>
                                    <span className="hamburger-box">
                                    <span className="hamburger-inner" />
                                </span>
                            </button>
                        </span>
                    </div>
                    <div className="d-flex d-lg-none">
                        <Collapse
                            isOpen={collapse}
                            className="nav-collapsed-wrapper shadow-sm-dark navbar-collapse">
                            <div className="nav-inner-wrapper">
                                <Button
                                    onClick={toggle}
                                    color="danger"
                                    className="btn-icon d-40 shadow-sm hover-scale-lg btn-animated-icon-sm nav-toggle-inner-btn p-0">
                                    <span className="btn-wrapper--icon">
                                        <FontAwesomeIcon icon={['fas', 'times']} />
                                    </span>
                                </Button>

                                <div className="p-3">
                                    <div className="px-4 text-uppercase py-2 text-second font-weight-bold font-size-sm">
                                        Navigation Menu
                                    </div>
                                    <Nav
                                        pills
                                        className="nav-neutral-primary nav-pills-rounded flex-column">
                                        <NavItem>
                                            <NavLinkStrap
                                                tag={NavLink}
                                                to="/Overview"
                                                className="px-4 d-flex align-items-center">
                                                <span>Overview</span>
                                                <FontAwesomeIcon
                                                icon={['fas', 'angle-right']}
                                                className="opacity-6 ml-auto"
                                                />
                                            </NavLinkStrap>
                                        </NavItem>
                                        <NavItem>
                                            <NavLinkStrap
                                                tag={NavLink}
                                                to="/BuySell"
                                                className="px-4 d-flex align-items-center">
                                                <span>Buy/Sell</span>
                                                <FontAwesomeIcon
                                                icon={['fas', 'angle-right']}
                                                className="opacity-6 ml-auto"
                                                />
                                            </NavLinkStrap>
                                        </NavItem>
                                        <NavItem>
                                            <NavLinkStrap
                                                tag={NavLink}
                                                to="/settings"
                                                className="px-4 d-flex align-items-center">
                                                <span>Settings</span>
                                                <FontAwesomeIcon
                                                icon={['fas', 'angle-right']}
                                                className="opacity-6 ml-auto"
                                                />
                                            </NavLinkStrap>
                                        </NavItem>
                                    </Nav>
                                </div>
                                <div className="divider" />

                                <div className="divider" />
                                <div className="card-footer bg-secondary text-center p-3">
                                    {
                                        isAuthorized?
                                            <Button
                                                onClick={()=>logout()}
                                                className="btn-pill text-nowrap font-size-sm text-white mr-2 home-btn">
                                                Logout
                                            </Button> : 
                                            <>
                                                <Button
                                                    tag={NavLink}
                                                    to="/login"
                                                    className="btn-pill text-nowrap font-size-sm text-white mr-2 home-btn">
                                                    Login
                                                </Button>
                                                <Button
                                                    tag={NavLink}
                                                    to="/PageRegisterCover"
                                                    className="btn-pill text-nowrap font-size-sm text-white home-btn">
                                                    Register
                                                </Button>
                                            </>
                                    }

                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </Container>
            <div
                className={clsx('collapse-page-trigger', { 'is-active': collapse })}
                onClick={toggle}
            />
        </>
    );
}
