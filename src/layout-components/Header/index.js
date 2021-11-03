import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Row, Col, Button } from 'reactstrap';
import { Layers } from 'react-feather';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { setSidebarToggleMobile } from '../../_reducers/ThemeOptions';
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import { headerActions } from '../../_actions';

import HeaderUserbox from '../../layout-components/HeaderUserbox';
import HeaderSearch from '../../layout-components/HeaderSearch';

const Header = (props) => {
    const {
        headerShadow,
        headerBgTransparent,
        sidebarToggleMobile,
        setSidebarToggleMobile
    } = props;
    const userInfo = useSelector(state => state.auth.userData);
    const [currentWallet, setCurrentWallet] = useState({})

    const toggleSidebarMobile = () => {
        setSidebarToggleMobile(!sidebarToggleMobile);
    };

    const getCurrentWallet = async () => {
        setCurrentWallet(await headerActions.getCurrentWallet(userInfo.id));
    }

    useEffect(() => {
        getCurrentWallet();
    }, [])

    useEffect(() => {
        getCurrentWallet();
    }, [userInfo])

    return (
        <>
            <div
                className={clsx('app-header', {
                'app-header--shadow': headerShadow,
                'app-header--opacity-bg': headerBgTransparent
                })}>
                <div className="app-header--pane">
                    <button
                        className={clsx(
                        'navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn',
                        { 'is-active': sidebarToggleMobile }
                        )}
                        onClick={toggleSidebarMobile}>
                        <span className="hamburger-box">
                        <span className="hamburger-inner" />
                        </span>
                    </button>
                    <div className="app-header-widget">
                        <Row className="no-gutters">
                            <Col xs="6">
                                <div className="d-flex align-items-center pr-4">
                                    <div className="px-2">
                                        <span className=" font-size-lg">
                                            {currentWallet.walletname ? currentWallet.walletname : ''}
                                        </span>
                                        <div className="d-flex align-items-center justify-content-center pt-1">
                                            <span className="font-weight-bold font-size-xs line-height-1">
                                                {currentWallet.public_key ? currentWallet.public_key.slice(0, 15) + '...' : ''}
                                            </span>
                                            <CopyToClipboard
                                                text={currentWallet.public_key ? currentWallet.public_key : ''}
                                                onCopy={()=>toast.success("Successfully! Copied")}
                                                title="Copy PublicKey">
                                                <Button 
                                                    color="white" 
                                                    className="d-30 p-0 ml-2 rounded-circle">
                                                    <Layers className="h1 d-block mr-3 white" color="white" />
                                                </Button>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {/* <HeaderWidget /> */}
                </div>
                <div className="app-header--pane">
                    <HeaderUserbox />
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    headerShadow: state.ThemeOptions.headerShadow,
    headerBgTransparent: state.ThemeOptions.headerBgTransparent,
    sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
    setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
