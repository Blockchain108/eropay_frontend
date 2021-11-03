import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Badge,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import { Settings, UserCheck, Briefcase, LogOut } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../_actions';

const HeaderUserbox = () => {
    const userInfo = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userActions.logout());
    }

    return ( 
        <UncontrolledDropdown className = "user-box position-relative mr-2" >
            <DropdownToggle color = "link" className = "p-0 text-left d-flex align-items-center" >
                <div className = "d-block p-0 avatar-icon-wrapper" >
                    <Badge color = "success" className = "badge-circle p-top-a">
                        Idle 
                    </Badge> 
                    <div className = "avatar-icon rounded" >
                        <img src = { userInfo.photo } alt = "" />
                    </div> 
                </div> 
                <div className = "d-none d-xl-block pl-2 text-white" >
                    <div className = "font-weight-bold" > { userInfo.firstname + ' ' + userInfo.lastname } </div> 
                </div> 
                <span className = "pl-1 pl-xl-3" >
                    <FontAwesomeIcon icon = {['fas', 'angle-down'] } className = "opacity-5" />
                </span> 
            </DropdownToggle> 
            <DropdownMenu right className = "dropdown-menu-lg overflow-hidden p-0" >
                <div className = "d-flex p-4" >
                    <div className = "avatar-icon rounded mr-3" >
                        <img src = { userInfo.photo } alt = "..." />
                    </div> 
                    <div>
                        <h6 className = "font-weight-bold mb-1 text-black" > 
                            { userInfo.firstname + ' ' + userInfo.lastname } 
                        </h6> 
                        <p className = "text-black-50 mb-0" > { userInfo.email } </p> 
                    </div> 
                </div> 
                <div className = "divider" />
                <Nav className = "nav-neutral-first nav-pills-rounded flex-column p-3" >
                    <NavItem >
                        <NavLinkStrap href = "/settings" >
                            <div className = "nav-link-icon mr-2" >
                                <Settings />
                            </div> 
                            <span className = "font-size-md" > Settings </span> 
                        </NavLinkStrap> 
                    </NavItem> 
                    <NavItem >
                        <NavLinkStrap href = "/wallets" >
                            <div className = "nav-link-icon mr-2" >
                                <UserCheck />
                            </div> 
                            <span className = "font-size-md" > Wallet </span> 
                        </NavLinkStrap> 
                    </NavItem> 
                    <NavItem>
                        <NavLinkStrap href = "/assets" >
                            <div className = "nav-link-icon mr-2" >
                                <Briefcase />
                            </div> 
                            <span className = "font-size-md" > Assets </span> 
                        </NavLinkStrap> 
                    </NavItem> 
                </Nav> 
                <div className = "divider" />
                <Nav className = "nav-neutral-danger nav-pills-rounded flex-column p-3" >
                    <NavItem onClick = {() => logout()}>
                        <NavLinkStrap href = "#/" onClick = {(e) => e.preventDefault()} >
                            <div className = "nav-link-icon" >
                                <LogOut />
                            </div> 
                            <span > Log out </span> 
                        </NavLinkStrap> 
                    </NavItem> 
                </Nav> 
            </DropdownMenu> 
        </UncontrolledDropdown> 
    );
};

export default HeaderUserbox;