import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import config from '../../../_config';
import clsx from 'clsx'

import {
    Card,
    Nav,
    NavItem,
    TabContent,
    TabPane,
    Table,
    Button
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap'
import { tradeActions } from '../../../_actions';
import OrderDetailModal from '../OrderDetailModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';

export default function OrderTrade() {
    const [activeTab, setActiveTab] = useState('1');
    const [myOrder, setMyOrder] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [orderIndex, setOrderIndex] = useState(null);
    const [orderModal, setorderModal] = useState(false);
    const userInfo = useSelector(state => state.auth.userData);

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const getMyOrder = async () => {
        var data = {
            publicKey: userInfo.public_key
        }
        var result = await tradeActions.getMyOrder(data);
        if (result.status) {
            setMyOrder(result.data._embedded.records);
        }
    }

    const getOrderHistory = async () => {
        var data = {
            publicKey: userInfo.public_key
        }
        setOrderHistory(await tradeActions.getOrderHistory(data));
    }

    const viewOrderDetail = async (index) => {
        setOrderIndex(index);
        setorderModal(!orderModal);
    }

    const removeOrderTrade = async (index) => {
        var data = {
            secret_key: jwt.sign(userInfo.keystore, config.JWT_SECRET_KEY),
            sourceAssetCode: myOrder[index].buying.asset_type == 'native' ? 'XLM' : myOrder[index].buying.asset_code,
            sourceAssetIssuer: myOrder[index].buying.asset_type == 'native' ? 'XLM' : myOrder[index].buying.asset_issuer,
            targetAssetCode: myOrder[index].selling.asset_type == 'native' ? 'XLM' : myOrder[index].selling.asset_code,
            targetAssetIssuer: myOrder[index].selling.asset_type == 'native' ? 'XLM' : myOrder[index].selling.asset_issuer,
            amount: myOrder[index].amount,
            price: myOrder[index].price,
            type: 'buy',
            offerId: myOrder[index].id
        }

        var result = await tradeActions.getBuySellAsset(data);
        if (result.data.status) {
            toast.success("successfully!");
            window.location.reload(false);
        } else {
            toast.warning(result.data.msg);
        }
    }

    useEffect(() => {
        getMyOrder();
        getOrderHistory();
    }, [])

    return (
        <>
            <Card className="mb-5 p-4 p-lg-5">
                <div className="nav-line-alt">
                    <Nav className="nav-line">
                        <NavItem>
                            <NavLinkStrap
                                className={clsx('px-4 py-3', { active: activeTab === '1' })}
                                onClick={() => {
                                    toggle('1');
                                }}>
                                Active(0)
                                <div className="divider" />
                            </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                            <NavLinkStrap
                                className={clsx('px-4 py-3', { active: activeTab === '2' })}
                                onClick={() => {
                                    toggle('2');
                                }}>
                                History
                                <div className="divider" />
                            </NavLinkStrap>
                        </NavItem>
                    </Nav>
                </div>

                <TabContent className="p-4" activeTab={activeTab}>
                    <TabPane tabId="1">
                        <div className="table-responsive-md">
                            <Table hover className="text-nowrap mb-0">
                                <thead>
                                    <tr>
                                        <th className="bg-white text-center">Amount</th>
                                        <th className="bg-white text-center">Price</th>
                                        <th className="bg-white text-center">Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myOrder.map((order, index) => (
                                            <tr key={index}>
                                                <td className="text-center text-black-50">
                                                    <div>
                                                        +{order.amount * order.price}
                                                    </div>
                                                    <div className="font-size-xs">
                                                        {
                                                            order.buying.asset_type === 'native' ? 'XLM' : order.buying.asset_code
                                                        }
                                                    </div>
                                                </td>
                                                <td className="text-center text-black-50">
                                                    {order.price_r.n / order.price_r.d}
                                                </td>
                                                <td className="text-center text-black-50">
                                                    <div>
                                                        -{order.amount}
                                                    </div>
                                                    <div className="font-size-xs">
                                                        {
                                                            order.selling.asset_type === 'native' ? 'XLM' : order.selling.asset_code
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        onClick={() => removeOrderTrade(index)}
                                                        color="neutral-danger"
                                                        className="mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                                                        <FontAwesomeIcon
                                                            icon={['fas', 'times']}
                                                            className="font-size-sm"
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <div className="table-responsive-md">
                            <Table hover className="text-nowrap mb-0">
                                <thead>
                                    <tr>
                                        <th className="bg-white text-left">Side</th>
                                        <th className="bg-white text-center">Amount</th>
                                        <th className="bg-white text-center">Price</th>
                                        <th className="bg-white text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderHistory.map((order, index) => (
                                            <tr key={index} onClick={() => viewOrderDetail(index)}>
                                                <td className="font-weight-bold">
                                                    {order.base_account === userInfo.public_key ? 'Buy' : 'Sell'}
                                                </td>
                                                <td className="text-center text-black-50">
                                                    <div>
                                                        {order.base_account === userInfo.public_key ? '+' : '-'}
                                                        {order.base_account === userInfo.public_key ? order.counter_amount : order.base_amount}
                                                    </div>
                                                    <div className="font-size-xs">
                                                        {
                                                            order.base_account === userInfo.public_key ?
                                                                order.counter_asset_type === 'native' ?
                                                                    'XLM' : order.counter_asset_code
                                                                :
                                                                order.base_asset_type === 'native' ?
                                                                    'XLM' : order.base_asset_code
                                                        }
                                                    </div>
                                                </td>
                                                <td className="text-center text-black-50">
                                                    {order.price.d / order.price.n}
                                                </td>
                                                <td className="text-center text-black-50">
                                                    <div>
                                                        {order.counter_account === userInfo.public_key ? '+' : '-'}
                                                        {order.counter_account === userInfo.public_key ? order.counter_amount : order.base_amount}
                                                    </div>
                                                    <div className="font-size-xs">
                                                        {
                                                            order.counter_account === userInfo.public_key ?
                                                                order.counter_asset_type === 'native' ?
                                                                    'XLM' : order.counter_asset_code
                                                                :
                                                                order.base_asset_type === 'native' ?
                                                                    'XLM' : order.base_asset_code
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </TabPane>
                </TabContent>
            </Card>

            {
                orderModal && <OrderDetailModal
                    modal={orderModal}
                    toggleModal={() => setorderModal(!orderModal)}
                    orderData={orderHistory[orderIndex]} />
            }
        </>
    );
}
