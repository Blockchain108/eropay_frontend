import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import config from '../../../_config';

import clsx from 'clsx'
import {
    Card,
    Row,
    Col,
    FormGroup,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    Nav,
    NavItem,
    TabContent,
    TabPane,
    Table
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import { tradeActions } from '../../../_actions';
import { assetActions } from '../../../_actions';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default function MarketTrade() {
    const [activeTab, setActiveTab] = useState('1');
    const [orderBook, setOrderBook] = useState({});
    const [buyBaseAmount, setBuyBaseAmount] = useState(0);
    const [buyPriceCounterPerBase, setBuyPriceCounterPerBase] = useState(0);
    const [buyCounterAmount, setBuyCounterAmount] = useState(0);
    const [sellBaseAmount, setSellBaseAmount] = useState(0);
    const [sellPriceCounterPerBase, setSellPriceCounterPerBase] = useState(0);
    const [sellCounterAmount, setSellCounterAmount] = useState(0);
    const [priceBaseByCounter, setPriceBaseByCounter] = useState(0);
    const [change24h, setChange24h] = useState(0);
    const [volume24h, setVolume24h] = useState(0);
    const [spreadBidAsk, setSpreadBidAsk] = useState(0);
    const [accountAsset, setAccountAsset] = useState([]);
    const [buyAvailableAmount, setBuyAvailableAmount] = useState(0);
    const [sellAvailableAmount, setSellAvailableAmount] = useState(0);

    const publicKey = useSelector(state => state.auth.userData.public_key);
    const userInfo = useSelector(state => state.auth.userData);
    const tradeAsset = useSelector(state => state.trade);
    const [baseAsset, setBaseAsset] = useState(tradeAsset.baseAsset);
    const [counterAsset, setCounterAsset] = useState(tradeAsset.counterAsset);

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const getAccountAsset = async () => {
        var result = await assetActions.getAccountAsset(publicKey);
        result = result.sort((x, y) => { return x.asset_type === 'native' ? -1 : y.asset_type === 'native' ? 1 : 0; });
        setAccountAsset(result);

        console.log(result);
        var is_baseAsset = false, is_counterAsset = false;
        for (let index = 0; index < result.length; index++) {
            if (tradeAsset.baseAsset.asset_anchorName == result[index].asset_anchorName) {
                setSellAvailableAmount((result[index].balance - result[index].selling_liabilities).toFixed(6));
                is_baseAsset = true;
            } else if (tradeAsset.counterAsset.asset_anchorName == result[index].asset_anchorName) {
                setBuyAvailableAmount((result[index].balance - result[index].selling_liabilities).toFixed(6));
                is_counterAsset = true;
            }
        }
        if (!is_baseAsset) { setSellAvailableAmount(0); }
        if (!is_counterAsset) { setBuyAvailableAmount(0); }
    }

    const buysellAsset = async (type) => {
        var is_BStored = false;
        var is_CStored = false;
        var indexBStored = 0;
        var indexCStored = 0;

        for (let index = 0; index < accountAsset.length; index++) {
            if (accountAsset[index].asset_anchorName === baseAsset.asset_anchorName) {
                is_BStored = true;
                indexBStored = index;
            }
            if (accountAsset[index].asset_anchorName === counterAsset.asset_anchorName) {
                is_CStored = true;
                indexCStored = index;
            }
        }

        if (is_BStored && is_CStored) {
            if (type === 'buy') {
                if (buyCounterAmount > parseFloat(accountAsset[indexCStored].balance)) {
                    toast.warning("You have small than account balance!"); return;
                }
            } else if (type === 'sell') {
                if (sellBaseAmount > parseFloat(accountAsset[indexBStored].balance)) {
                    toast.warning("You have small than account balance!"); return;
                }
            }

            var data = {
                secret_key: jwt.sign(userInfo.keystore, config.JWT_SECRET_KEY),
                sourceAssetCode: baseAsset.asset_anchorName,
                sourceAssetIssuer: baseAsset.asset_anchorName === 'XLM' ? 'XLM' : baseAsset.asset_issuer,
                targetAssetCode: counterAsset.asset_anchorName,
                targetAssetIssuer: counterAsset.asset_anchorName === 'XLM' ? 'XLM' : counterAsset.asset_issuer,
                amount: type === 'buy' ? buyBaseAmount : sellBaseAmount,
                price: type === 'buy' ? buyPriceCounterPerBase : sellPriceCounterPerBase,
                type: type,
                offerId: '0'
            }

            var result = await tradeActions.getBuySellAsset(data);
            if (result.data.status) {
                toast.success("successfully!");
            } else {
                toast.warning(result.data.msg);
            }
        } else {
            toast.warning("You must have two asset in your account!");
        }
    }

    const getOrderBook = async () => {
        const sellingAsset = tradeAsset.baseAsset;
        const buyingAsset = tradeAsset.counterAsset;

        var data = {
            selling_asset_type: sellingAsset.asset_anchorName === 'XLM' ? 'native' : sellingAsset.asset_anchorName.length <= 4 ? 'credit_alphanum4' : 'credit_alphanum12',
            selling_asset_code: sellingAsset.asset_anchorName === 'XLM' ? 'XLM' : sellingAsset.asset_anchorName,
            selling_asset_issuer: sellingAsset.asset_anchorName === 'XLM' ? 'XLM' : sellingAsset.asset_issuer,
            buying_asset_type: buyingAsset.asset_anchorName === 'XLM' ? 'native' : buyingAsset.asset_anchorName.length <= 4 ? 'credit_alphanum4' : 'credit_alphanum12',
            buying_asset_code: buyingAsset.asset_anchorName === 'XLM' ? 'XLM' : buyingAsset.asset_anchorName,
            buying_asset_issuer: buyingAsset.asset_anchorName === 'XLM' ? 'XLM' : buyingAsset.asset_issuer,
            limit: 10
        }
        var result = await tradeActions.getOrderBook(data);
        if (result.status) {
            setOrderBook(result.data);
        }
    }

    const getDecimal = (num, decimalCnt) => {
        if (Math.abs(num) >= 10) {
            return Math.round(num);
        } else {
            return Number.parseFloat(num).toPrecision(decimalCnt);
        }
    }

    const getMarketStatus = async () => {
        var tradeUrl = 'https://horizon.stellar.org/trade_aggregations?';
        var volumeQuery = { "query": "{ markets(numHoursAgo: 24 " };
        if (tradeAsset.baseAsset.asset_type == 'native') {
            tradeUrl += 'base_asset_type=' + tradeAsset.baseAsset.asset_type;
            volumeQuery.query += `baseAssetCode: ` + `\"` + `XLM` + `\" `;
        } else {
            tradeUrl += 'base_asset_type=' + (tradeAsset.baseAsset.asset_anchorName.length <= 4 ? 'credit_alphanum4' : 'credit_alphanum12');
            tradeUrl += '&base_asset_code=' + tradeAsset.baseAsset.asset_anchorName;
            tradeUrl += '&base_asset_issuer=' + tradeAsset.baseAsset.asset_issuer;

            volumeQuery.query += "baseAssetCode: \"" + tradeAsset.baseAsset.asset_anchorName + "\" ";
            volumeQuery.query += "baseAssetIssuer: \"" + tradeAsset.baseAsset.asset_issuer + "\" ";
        }

        if (tradeAsset.counterAsset.asset_type == 'native') {
            tradeUrl += '&counter_asset_type=' + tradeAsset.counterAsset.asset_type;
            volumeQuery.query += "counterAssetCode: \"XLM\" ";
        } else {
            tradeUrl += '&counter_asset_type=' + (tradeAsset.counterAsset.asset_anchorName.length <= 4 ? 'credit_alphanum4' : 'credit_alphanum12');
            tradeUrl += '&counter_asset_code=' + tradeAsset.counterAsset.asset_anchorName;
            tradeUrl += '&counter_asset_issuer=' + tradeAsset.counterAsset.asset_issuer;

            volumeQuery.query += "counterAssetCode: \"" + tradeAsset.counterAsset.asset_anchorName + "\" ";
            volumeQuery.query += "counterAssetIssuer: \"" + tradeAsset.counterAsset.asset_issuer + "\" ";
        }

        var currentDate = new Date();
        var start_time = currentDate.setDate(currentDate.getDate() - 1)
        var end_time = (new Date()).valueOf();

        tradeUrl += '&start_time=' + start_time;
        tradeUrl += '&end_time=' + end_time;
        tradeUrl += '&resolution=900000&offset=0&limit=200';

        var tradeAggregations = (await axios.get(tradeUrl)).data._embedded.records;
        if (tradeAggregations.length > 1) {
            var lastPrice = tradeAggregations[tradeAggregations.length - 1].avg;
            var yesterdayPrice = tradeAggregations[0].avg;
            var change24h = getDecimal((yesterdayPrice - lastPrice) / yesterdayPrice * 100, 2);

            setPriceBaseByCounter(lastPrice);
            setChange24h(change24h);
        } else {
            setPriceBaseByCounter(0);
            setChange24h(0)
        }

        volumeQuery.query += ") { counterVolume } }";
        var volume24h = await axios.post('https://ticker.stellar.org/graphql', volumeQuery);

        volume24h = volume24h.data.data.markets;
        if (volume24h.length > 0) {
            volume24h = getDecimal(volume24h[0].counterVolume, 5);
            setVolume24h(volume24h);
        } else {
            setVolume24h(0);
        }
    }

    const setBuySellAmount = (baseAsset, counterAsset) => {
        var is_baseAsset = false, is_counterAsset = false;
        for (let index = 0; index < accountAsset.length; index++) {
            if (baseAsset.asset_anchorName == accountAsset[index].asset_anchorName) {
                setSellAvailableAmount((accountAsset[index].balance - accountAsset[index].selling_liabilities).toFixed(6));
                is_baseAsset = true;
            } else if (counterAsset.asset_anchorName == accountAsset[index].asset_anchorName) {
                setBuyAvailableAmount((accountAsset[index].balance - accountAsset[index].selling_liabilities).toFixed(6));
                is_counterAsset = true;
            }
        }
        if (!is_baseAsset) { setSellAvailableAmount(0); }
        if (!is_counterAsset) { setBuyAvailableAmount(0); }
    }

    useEffect(() => {
        getAccountAsset();
    }, [])

    useEffect(() => {
        setBaseAsset(tradeAsset.baseAsset);
        setCounterAsset(tradeAsset.counterAsset);
        setBuyBaseAmount(0);
        setBuyPriceCounterPerBase(0);
        setBuyCounterAmount(0);
        setSellBaseAmount(0);
        setSellPriceCounterPerBase(0);
        setSellCounterAmount(0);
        setBuySellAmount(tradeAsset.baseAsset, tradeAsset.counterAsset);

        const interval = setInterval(() => {
            getOrderBook();
            getMarketStatus();
        }, 3000);
        return () => clearInterval(interval);
    }, [tradeAsset])

    return (
        <>
            <Card className="mb-5 p-4 p-lg-5">
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <div className="font-weight-bold display-4">Market stats</div>
                        </FormGroup>
                        {
                            baseAsset.asset_type != 'native' &&
                            <FormGroup>
                                <div>
                                    <span className="text-muted d-inline-block" style={{ width: '100px' }}>
                                        Web:
                                    </span>
                                    <span style={{ color: 'rgb(0, 171, 255)' }}>
                                        {baseAsset.domain ? baseAsset.domain : ''}
                                    </span>
                                </div>
                                <div style={{ color: 'rgb(0, 171, 255)' }}>
                                    <span className="text-muted d-inline-block" style={{ width: '100px' }}>Issuer:</span>
                                    <span className="font-size-sm">
                                        {baseAsset.asset_issuer.slice(0, 20) + '.........' + baseAsset.asset_issuer.slice(-4)}
                                    </span>
                                </div>
                            </FormGroup>
                        }
                        {
                            priceBaseByCounter != 0 &&
                            <FormGroup>
                                <div>
                                    <span className="text-muted d-inline-block" style={{ width: '100px' }}>
                                        {baseAsset.asset_type == 'native' ? 'XLM' : baseAsset.asset_anchorName} price:
                                    </span>
                                    <span>
                                        {priceBaseByCounter}
                                        {counterAsset.asset_type == 'native' ? 'XLM' : counterAsset.asset_anchorName}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-muted d-inline-block" style={{ width: '100px' }}>24h change:</span>
                                    {
                                        change24h != 0 &&
                                        <span className={change24h > 0 ? 'text-success' : 'text-warning'}>
                                            {Math.abs(change24h)} %
                                        </span>
                                    }
                                </div>
                            </FormGroup>
                        }
                        {
                            volume24h != 0 &&
                            <FormGroup>
                                <div>
                                    <span className="text-muted d-inline-block" style={{ width: '120px' }}>24h volume:</span>
                                    <span>
                                        {volume24h}
                                        {counterAsset.asset_type == 'native' ? 'XLM' : counterAsset.asset_anchorName}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-muted d-inline-block" style={{ width: '120px' }}>Bid-ask spread:</span>
                                    <span>0.5625 %</span>
                                </div>
                            </FormGroup>
                        }

                        <FormGroup className="mt-5">
                            <div className="font-weight-bold display-4">New order</div>
                        </FormGroup>
                        <FormGroup>
                            <div className="nav-line-alt">
                                <Nav className="nav-line d-flex justify-content-start">
                                    <NavItem>
                                        <NavLinkStrap
                                            className={clsx('px-4 py-3', { active: activeTab === '1' })}
                                            onClick={() => {
                                                toggle('1');
                                            }}>
                                            <span className="">
                                                Buy
                                            </span>
                                            <div className="divider" />
                                        </NavLinkStrap>
                                    </NavItem>
                                    <NavItem>
                                        <NavLinkStrap
                                            className={clsx('px-4 py-3', { active: activeTab === '2' })}
                                            onClick={() => {
                                                toggle('2');
                                            }}>
                                            <span className="">
                                                Sell
                                            </span>
                                            <div className="divider" />
                                        </NavLinkStrap>
                                    </NavItem>
                                </Nav>
                            </div>
                            <TabContent className="p-4" activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <FormGroup>
                                        <Label className="font-weight-bold" for="">
                                            Amount
                                        </Label>
                                        <InputGroup className="input-group-seamless">
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="">
                                                    {baseAsset.asset_anchorName}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="pr-5" type="text" value={buyBaseAmount} placeholder="Enter amount"
                                                onChange={(e) => {
                                                    setBuyBaseAmount(e.currentTarget.value);
                                                    setBuyCounterAmount(e.currentTarget.value * buyPriceCounterPerBase);
                                                }} />
                                        </InputGroup>
                                        <p className="font-size-xs mt-1 cursor-pointer">
                                            {baseAsset.asset_anchorName} to buy
                                        </p>
                                    </FormGroup>
                                    <FormGroup>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex align-items-bottom">
                                                <Label className="font-weight-bold" for="">
                                                    Price
                                                </Label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="p-2" style={{ color: 'rgb(0, 171, 255)' }}>
                                                    Ask
                                                </div>
                                                <div className="p-2" style={{ color: 'rgb(0, 171, 255)' }}>
                                                    Bid
                                                </div>
                                                <div className="p-2" style={{ color: 'rgb(0, 171, 255)' }}>
                                                    Last
                                                </div>
                                            </div>
                                        </div>
                                        <InputGroup className="input-group-seamless">
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="">
                                                    {counterAsset.asset_anchorName}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="pr-5" type="text" placeholder="0.6460083" value={buyPriceCounterPerBase}
                                                onChange={(e) => {
                                                    setBuyPriceCounterPerBase(e.currentTarget.value);
                                                    setBuyCounterAmount(buyBaseAmount * e.currentTarget.value);
                                                }} />
                                        </InputGroup>
                                        <p className="font-size-xs mt-1 cursor-pointer" >
                                            price of 1 {baseAsset.asset_anchorName}
                                        </p>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="font-weight-bold" for="">
                                            Total
                                        </Label>
                                        <InputGroup className="input-group-seamless">
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="">
                                                    {counterAsset.asset_anchorName}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="pr-5" type="text" placeholder="Total amount" value={buyCounterAmount}
                                                onChange={(e) => {
                                                    setBuyCounterAmount(e.currentTarget.value);
                                                    setBuyBaseAmount(e.currentTarget.value / buyPriceCounterPerBase);
                                                }} />
                                        </InputGroup>
                                        <div className="d-flex justify-content-between">
                                            <div className="">
                                                <p className="font-size-xs mt-1 cursor-pointer" >
                                                    {counterAsset.asset_anchorName} to sell
                                                </p>
                                            </div>
                                            <div className="font-size-xs mt-1 cursor-pointer">
                                                Max available, {counterAsset.asset_anchorName}: <Label style={{ color: 'rgb(0, 171, 255)' }}>{buyAvailableAmount}</Label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color="success" onClick={() => buysellAsset('buy')}>Buy {baseAsset.asset_anchorName}</Button>
                                    </FormGroup>
                                </TabPane>
                                <TabPane tabId="2">
                                    <FormGroup>
                                        <Label className="font-weight-bold" for="">
                                            Amount
                                        </Label>
                                        <InputGroup className="input-group-seamless">
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="">
                                                    {baseAsset.asset_anchorName}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="pr-5" type="text" placeholder="Enter amount" value={sellBaseAmount}
                                                onChange={(e) => {
                                                    setSellBaseAmount(e.currentTarget.value);
                                                    setSellCounterAmount(e.currentTarget.value * sellPriceCounterPerBase);
                                                }} />
                                        </InputGroup>
                                        <div className="d-flex justify-content-between">
                                            <div className="">
                                                <p className="font-size-xs mt-1 cursor-pointer" >
                                                    {baseAsset.asset_anchorName} to sell
                                                </p>
                                            </div>
                                            <div className="font-size-xs mt-1 cursor-pointer">
                                                Max available, {baseAsset.asset_anchorName}: <Label style={{ color: 'rgb(0, 171, 255)' }}>{sellAvailableAmount}</Label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex align-items-bottom">
                                                <Label className="font-weight-bold" for="">
                                                    Price
                                                </Label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="p-2" style={{ color: 'rgb(0, 171, 255)' }}>
                                                    Ask
                                                </div>
                                                <div className="p-2" style={{ color: 'rgb(0, 171, 255)' }}>
                                                    Bid
                                                </div>
                                                <div className="p-2" style={{ color: 'rgb(0, 171, 255)' }}>
                                                    Last
                                                </div>
                                            </div>
                                        </div>
                                        <InputGroup className="input-group-seamless">
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="">
                                                    {baseAsset.asset_anchorName}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="pr-5" type="text" placeholder="0.6460083" value={sellPriceCounterPerBase}
                                                onChange={(e) => {
                                                    setSellPriceCounterPerBase(e.currentTarget.value);
                                                    setSellCounterAmount(sellBaseAmount * e.currentTarget.value);
                                                }} />
                                        </InputGroup>
                                        <p className="font-size-xs mt-1 cursor-pointer" >
                                            price of 1 {baseAsset.asset_anchorName}
                                        </p>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="font-weight-bold" for="">
                                            Total
                                        </Label>
                                        <InputGroup className="input-group-seamless">
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="">
                                                    {counterAsset.asset_anchorName}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="pr-5" type="text" placeholder="Total amount" value={sellCounterAmount}
                                                onChange={(e) => {
                                                    setSellCounterAmount(e.currentTarget.value);
                                                    setSellBaseAmount(e.currentTarget.value / sellPriceCounterPerBase);
                                                }} />
                                        </InputGroup>
                                        <p className="font-size-xs mt-1 cursor-pointer">
                                            {counterAsset.asset_anchorName} to buy
                                        </p>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color="success" onClick={() => buysellAsset('sell')}>Sell {baseAsset.asset_anchorName}</Button>
                                    </FormGroup>
                                </TabPane>
                            </TabContent>
                        </FormGroup>
                    </Col>
                    <Col md="6" className="font-size-xs">
                        <div className="table-responsive-md">
                            <div className="font-weight-bold display-4">Selling</div>
                            <Table hover className="text-nowrap mb-0">
                                <thead>
                                    <tr>
                                        <th className="bg-white text-left">Price({counterAsset.asset_anchorName})</th>
                                        <th className="bg-white text-center">Amount({baseAsset.asset_anchorName})</th>
                                        <th className="bg-white text-center">Total({counterAsset.asset_anchorName})</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderBook.asks && orderBook.asks.map((order, index) => (
                                            <tr key={index}>
                                                <td className="font-weight-bold">{order.price}</td>
                                                <td className="text-center text-black-50">{order.price / order.amount}</td>
                                                <td className="text-center text-black-50">{order.amount}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className="mt-5 mb-5"></div>
                        <div className="table-responsive-md">
                        <div className="font-weight-bold display-4">Buying</div>
                            <Table hover className="text-nowrap mb-0">
                                <thead>
                                    <tr>
                                        <th className="bg-white text-left">Price({counterAsset.asset_anchorName})</th>
                                        <th className="bg-white text-center">Amount({baseAsset.asset_anchorName})</th>
                                        <th className="bg-white text-center">Total({counterAsset.asset_anchorName})</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderBook.bids && orderBook.bids.map((order, index) => (
                                            <tr key={index}>
                                                <td className="font-weight-bold">{order.price}</td>
                                                <td className="text-center text-black-50">{order.price / order.amount}</td>
                                                <td className="text-center text-black-50">{order.amount}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    );
}