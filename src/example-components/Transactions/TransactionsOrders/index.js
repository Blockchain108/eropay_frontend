import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as NavLinkStrap } from 'reactstrap';
import clsx from 'clsx';
import { dashboardActions } from '../../../_actions';
import TransactionModal from '../../Overview/OverviewTransaction/transactionModal';


import {
    Table,
    Card,
    Nav,
    NavItem,
    Pagination,
    PaginationItem,
    PaginationLink,
    TabContent,
    TabPane,
} from 'reactstrap';

import {
    ArrowDownRight,
    ArrowUpRight
} from 'react-feather';

export default function LivePreviewExample() {
    const [toggleTransactionModal, setToggleTransactionModal] = useState(false);
    const [transactionIndex, setTransactionIndex] = useState(0);
    const [transactionList, setTransactionList] = useState([]);
    const publicKey = useSelector(state => state.auth.userData.public_key);

    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const transModal = (index) => {
        setTransactionIndex(index);
        setToggleTransactionModal(!toggleTransactionModal);
    }

    const getTransaction = async () => {
        setTransactionList(await dashboardActions.getTransaction(publicKey));
    }

    useEffect(() => {
        getTransaction();
    }, [])

    return (
        <>
            <Card className="p-4 mb-5">
                <div className="nav-line-alt">
                    <Nav className="nav-line">
                        <NavItem>
                            <NavLinkStrap
                                className={clsx('px-3 py-2', { active: activeTab === '1' })}
                                onClick={() => {
                                    toggle('1');
                                }}>
                                <span>All</span>
                                <div className="divider" />
                            </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                            <NavLinkStrap
                                className={clsx('px-3 py-2', { active: activeTab === '2' })}
                                onClick={() => {
                                    toggle('2');
                                }}>
                                <span>Sent</span>
                                <div className="divider" />
                            </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                            <NavLinkStrap
                                className={clsx('px-3 py-2', { active: activeTab === '3' })}
                                onClick={() => {
                                    toggle('3');
                                }}>
                                <span>Received</span>
                                <div className="divider" />
                            </NavLinkStrap>
                        </NavItem>
                    </Nav>
                </div>
                <div className="divider" />
                <div className="divider" />
                <TabContent className="p-4" activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Table responsive borderless className="text-nowrap mb-0">
                            <tbody>
                                {
                                    transactionList.map((transaction, index) => (
                                        <tr key={index} className="cursor-pointer" onClick={() => transModal(index)} >
                                            <td className="px-4">
                                                <div className="d-flex align-items-center">
                                                    <div color="danger" className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-neutral-success text-success">
                                                        { transaction.status ? <ArrowUpRight /> : <ArrowDownRight /> } 
                                                    </div>
                                                    <div>
                                                        <div className="font-size-sm font-weight-bold">
                                                            {
                                                                transaction.type === 'create_account' ? 
                                                                    transaction.account.slice(0, 8) + '...' + transaction.account.slice(-8) :
                                                                    transaction.from.slice(0, 8) + '...' + transaction.from.slice(-8)
                                                            }
                                                        </div>
                                                        <div className="font-size-sm opacity-7">
                                                            { transaction.status ? 'Sent' : 'Received' }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-right px-4">
                                                <div className="font-size-sm font-weight-bold">
                                                    {
                                                        transaction.type === 'create_account' ? 
                                                            transaction.starting_balance + ' XLM' : 
                                                            transaction.amount + ' '
                                                    }
                                                    { transaction.asset_type === 'native' ? 'XLM' : transaction.asset_code }
                                                </div>
                                                <div className="font-size-sm opacity-7">
                                                    { transaction.created_at }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <div className="divider" />
                        <div className="card-footer p-4 d-flex justify-content-center">
                            <Pagination className="pagination-primary">
                            <PaginationItem disabled>
                                <PaginationLink
                                first
                                href="#/"
                                onClick={(e) => e.preventDefault()}>
                                <FontAwesomeIcon icon={['fas', 'angle-double-left']} />
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled>
                                <PaginationLink
                                previous
                                href="#/"
                                onClick={(e) => e.preventDefault()}>
                                <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem active>
                                <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                next
                                href="#/"
                                onClick={(e) => e.preventDefault()}>
                                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                last
                                href="#/"
                                onClick={(e) => e.preventDefault()}>
                                <FontAwesomeIcon icon={['fas', 'angle-double-right']} />
                                </PaginationLink>
                            </PaginationItem>
                            </Pagination>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <Table responsive borderless className="text-nowrap mb-0">
                            <tbody>
                                {
                                    transactionList.map((transaction, index) => (
                                        transaction.status && <tr key={index} className="cursor-pointer" onClick={() => transModal(index)} >
                                            <td className="px-4">
                                                <div className="d-flex align-items-center">
                                                    <div color="danger" className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-neutral-success text-success">
                                                        { transaction.status ? <ArrowUpRight /> : <ArrowDownRight /> } 
                                                    </div>
                                                    <div>
                                                        <div className="font-size-sm font-weight-bold">
                                                            {
                                                                transaction.type === 'create_account' ? 
                                                                    transaction.account.slice(0, 8) + '...' + transaction.account.slice(-8) :
                                                                    transaction.from.slice(0, 8) + '...' + transaction.from.slice(-8)
                                                            }
                                                        </div>
                                                        <div className="font-size-sm opacity-7">
                                                            { transaction.status ? 'Sent' : 'Received' }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-right px-4">
                                                <div className="font-size-sm font-weight-bold">
                                                    {
                                                        transaction.type === 'create_account' ? 
                                                            transaction.starting_balance + ' XLM' : 
                                                            transaction.amount + ' '
                                                    }
                                                    { transaction.asset_type === 'native' ? 'XLM' : transaction.asset_code }
                                                </div>
                                                <div className="font-size-sm opacity-7">
                                                    { transaction.created_at }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <div className="divider" />
                        <div className="card-footer p-4 d-flex justify-content-center">
                            <Pagination className="pagination-primary">
                                <PaginationItem disabled>
                                    <PaginationLink
                                    first
                                    href="#/"
                                    onClick={(e) => e.preventDefault()}>
                                    <FontAwesomeIcon icon={['fas', 'angle-double-left']} />
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem disabled>
                                    <PaginationLink
                                    previous
                                    href="#/"
                                    onClick={(e) => e.preventDefault()}>
                                    <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem active>
                                    <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                    1
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                    2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                    next
                                    href="#/"
                                    onClick={(e) => e.preventDefault()}>
                                    <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                    last
                                    href="#/"
                                    onClick={(e) => e.preventDefault()}>
                                    <FontAwesomeIcon icon={['fas', 'angle-double-right']} />
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </div>
                    </TabPane>
                    <TabPane tabId="3">
                        <Table responsive borderless className="text-nowrap mb-0">
                            <tbody>
                                {
                                    transactionList.map((transaction, index) => (
                                        !transaction.status && <tr key={index} className="cursor-pointer" onClick={() => transModal(index)} >
                                            <td className="px-4">
                                                <div className="d-flex align-items-center">
                                                    <div color="danger" className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-neutral-success text-success">
                                                        { transaction.status ? <ArrowUpRight /> : <ArrowDownRight /> } 
                                                    </div>
                                                    <div>
                                                        <div className="font-size-sm font-weight-bold">
                                                            {
                                                                transaction.type === 'create_account' ? 
                                                                    transaction.account.slice(0, 8) + '...' + transaction.account.slice(-8) :
                                                                    transaction.from.slice(0, 8) + '...' + transaction.from.slice(-8)
                                                            }
                                                        </div>
                                                        <div className="font-size-sm opacity-7">
                                                            { transaction.status ? 'Sent' : 'Received' }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-right px-4">
                                                <div className="font-size-sm font-weight-bold">
                                                    {
                                                        transaction.type === 'create_account' ? 
                                                            transaction.account.slice(0, 8) + '...' + transaction.account.slice(-8) :
                                                            transaction.from.slice(0, 8) + '...' + transaction.from.slice(-8)
                                                    }
                                                </div>
                                                <div className="font-size-sm opacity-7">
                                                    { transaction.created_at }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <div className="divider" />
                        <div className="card-footer p-4 d-flex justify-content-center">
                                <Pagination className="pagination-primary">
                                    <PaginationItem disabled>
                                        <PaginationLink
                                        first
                                        href="#/"
                                        onClick={(e) => e.preventDefault()}>
                                        <FontAwesomeIcon icon={['fas', 'angle-double-left']} />
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem disabled>
                                        <PaginationLink
                                        previous
                                        href="#/"
                                        onClick={(e) => e.preventDefault()}>
                                        <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                        1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                        2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                        next
                                        href="#/"
                                        onClick={(e) => e.preventDefault()}>
                                        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                        last
                                        href="#/"
                                        onClick={(e) => e.preventDefault()}>
                                        <FontAwesomeIcon icon={['fas', 'angle-double-right']} />
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            </div>
                    </TabPane>
                </TabContent>
            </Card>

            <TransactionModal 
                modal={toggleTransactionModal} 
                toggle={()=>setToggleTransactionModal(!toggleTransactionModal)}  
                data={transactionList[transactionIndex]}  />
        </>
    );
}
