import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import clsx from 'clsx';
import {
    Card,
    CardHeader,
    CardTitle,
    CardSubtitle,
    Nav,
    NavItem,
    Button,
    Modal,
    TabContent,
    TabPane,
    Container,
    FormGroup
} from 'reactstrap';
import Chart from 'react-apexcharts';
import { NavLink as NavLinkStrap } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { tradeActions } from '../../../_actions';
import { assetActions } from '../../../_actions';
import { tradeConstants } from '../../../_constants';

import lobstr from '../../../assets/images/assets/lumens.png';
import switchIon from '../../../assets/images/trade/switch.svg';

var defaultOption = {
    chart: {
        height: 350,
        type: 'line',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },  
    stroke: {
        width: 1,
        curve: 'smooth',
        labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'dd MMM',
              hour: 'HH:mm'
            }
        }
    },
    xaxis: {
        type: 'datetime',
        categories: [],
    },
    yaxis: {
        type: 'numeric',
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        }
    }
};

export default function MainTrade() {
    const [assets, setAssets] = useState([]);
    const [assetModal, setAssetModal] = useState(false);
    const [activeTab, setActiveTab] = useState('1');
    const [counterBase, setCounterBase] = useState(0);
    const [chartSeries, setChartSeries] = useState([]);
    const [chartOptions, setChartOptions] = useState(defaultOption);
    const [period, setPeriod] = useState('1D');
    const [isNew, setIsNew] = useState(false);
    const [accountAsset, setAccountAsset] = useState([]);

    const dispatch = useDispatch();
    const publicKey = useSelector(state => state.auth.userData.public_key);
    const tradeAsset = useSelector(state => state.trade);
    const [firstAsset, setFirstAsset] = useState({});
    const [secondAsset, setSecondAsset] = useState({});

    const dispatchTradeAsset = (baseAsset, counterAsset, accountAssets = null) => {
        if (accountAssets === null) {
            accountAssets = accountAsset;   
        }
        for (let index = 0; index < accountAssets.length; index++) {
            if (baseAsset.asset_anchorName === accountAssets[index].asset_anchorName) {
                baseAsset = accountAssets[index];
            } else if (counterAsset.asset_anchorName === accountAssets[index].asset_anchorName){
                counterAsset = accountAssets[index];
            }
        }
        dispatch({type: tradeConstants.TRADE_ASSET, data: { baseAsset: baseAsset, counterAsset: counterAsset }});
    }

    const getAccountAsset = async () => {
        var result = await assetActions.getAccountAsset(publicKey);
        result = result.sort((x,y)=>{ return x.asset_type === 'native' ? -1 : y.asset_type === 'native' ? 1 : 0; });
        setAccountAsset(result);
        dispatchTradeAsset(tradeAsset.baseAsset, tradeAsset.counterAsset, result);
        if (result.length == 0) { setIsNew(true); }
    }

    const setAsset = (asset) => {
        if (counterBase === 0) {
            if (secondAsset.asset_anchorName === asset.asset_anchorName) {
                dispatchTradeAsset(secondAsset, firstAsset);
            } else {
                dispatchTradeAsset(asset, secondAsset);
            }
        } else if (counterBase === 1) {
            if (firstAsset.asset_anchorName === asset.asset_anchorName) {
                dispatchTradeAsset(secondAsset, firstAsset);
            } else {
                dispatchTradeAsset(firstAsset, asset);
            }
        }
        setAssetModal(!assetModal);
    }

    const tapToggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const modalToggle = (value) => {
        setCounterBase(value);
        setAssetModal(!assetModal);
    }

    const initialAsset = async (filter = null) => {
        var result = await assetActions.getAsset(filter);
        for (let index = 0; index < accountAsset.length; index++) {
            result = result.filter(item => item.asset_anchorName !== accountAsset[index].asset_anchorName);            
        }
        setAssets(result);
    }

    const getPriceData = async (baseAsset, counterAsset) => {
        var currencyData = {};
        if (baseAsset.asset_type === 'native') {
            currencyData.base_asset_type = 'native';
        } else {
            currencyData.base_asset_type = baseAsset.asset_anchorName.length <= 4 ? 'credit_alphanum4' : 'credit_alphanum12';
            currencyData.base_asset_code = baseAsset.asset_anchorName;
            currencyData.base_asset_issuer = baseAsset.asset_issuer;
        }

        if (counterAsset.asset_type === 'native') {
            currencyData.counter_asset_type = 'native';
        } else {
            currencyData.counter_asset_type = counterAsset.asset_anchorName.length <= 4 ? 'credit_alphanum4' : 'credit_alphanum12';
            currencyData.counter_asset_code = counterAsset.asset_anchorName;
            currencyData.counter_asset_issuer = counterAsset.asset_issuer;
        }

        var currentDate = new Date();
        switch (period) {
            case '1D':
                currencyData.resolution = 900000;
                currencyData.start_time = currentDate.setDate(currentDate.getDate() - 1);
                currencyData.end_time = (new Date()).valueOf();
                break;
            case '1W':
                currencyData.resolution = 3600000;
                currencyData.start_time = currentDate.setDate(currentDate.getDate() - 7);
                currencyData.end_time = (new Date()).valueOf();
                break;
            case '1M':
                currencyData.resolution = 86400000;
                currencyData.start_time = currentDate.setMonth(currentDate.getMonth() - 1);
                currencyData.end_time = (new Date()).valueOf();
                break;
            case '3M':
                currencyData.resolution = 86400000;
                currencyData.start_time = currentDate.setMonth(currentDate.getMonth() - 3);
                currencyData.end_time = (new Date()).valueOf();
                break;
            case '1Y':
                currencyData.resolution = 604800000;
                currencyData.start_time = currentDate.setFullYear(currentDate.getFullYear() - 1);
                currencyData.end_time = (new Date()).valueOf();
                break;
            case 'ALL':
                currencyData.resolution = 604800000;
                currencyData.start_time = 1388530800000;
                currencyData.end_time = (new Date()).valueOf();
                break;
        
            default:
                break;
        }

        var priceData = await tradeActions.getCurrencyChange(currencyData);

        var priceArr = [{name: 'Price', data: []}];
        var keyArr = [];
        for (let index = 0; index < priceData.length; index++) {
            priceArr[0].data.push(priceData[index].avg); 
            keyArr.push(new Date(parseInt(priceData[index].timestamp)).toISOString());     
        }
        
        let newData = Object.assign({}, chartOptions, {xaxis: {type: 'datetime', categories: keyArr}})
        setChartOptions(newData);
        setChartSeries(priceArr);
    }

    useEffect(() => {
        getAccountAsset();
    }, [])

    useEffect(() => {
        setFirstAsset(tradeAsset.baseAsset);
        setSecondAsset(tradeAsset.counterAsset);
    }, [tradeAsset])

    useEffect(() => {
        if (accountAsset.length > 0 || isNew) {
            initialAsset();
        }
    }, [accountAsset, isNew])

    useEffect(() => {
        if (Object.keys(firstAsset).length !== 0 && Object.keys(secondAsset).length !== 0) {
            getPriceData(firstAsset, secondAsset);
        }
    }, [period, firstAsset, secondAsset])

    return (
        <>
            <Card className="mb-5 p-4 p-lg-5">
                <CardHeader>
                    <CardTitle className="font-weight-bold">Trade</CardTitle>
                    <CardSubtitle className="font-size-sm">Exchange assets on Stellar DEX</CardSubtitle>
                    <FormGroup className="d-flex mt-5">
                        <div
                            className="d-flex align-items-center justify-content-between border p-2"
                            style={{width: '228px', cursor: 'pointer'}}
                            onClick={()=>modalToggle(0)}    
                        >
                            <div className="d-flex align-items-center">
                                <div style={{maxWidth: '32px', maxHeight: '32px', minHeight: '32px'}}>
                                    {
                                        firstAsset.asset_image ?
                                            <img alt="" src={firstAsset.asset_image} className="w-100 h-100" /> : 
                                            firstAsset.asset_type === 'native' ? 
                                                <img alt="" src={lobstr} className="w-100 h-100" /> : 
                                                <div
                                                    className="icon-filter"
                                                    style={{backgroundColor: 'rgb(55, 222, 239)'}}>
                                                    {firstAsset.asset_image_text}
                                                </div>
                                    }
                                </div>
                                <div className="pl-2">
                                    <div className="d-block">
                                        <div className="font-weight-bold">
                                            <b>{firstAsset.asset_anchorName}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                    icon={['fas', 'chevron-right']}
                                    className="font-size-xs opacity-3"
                                    />
                                </div>
                            </div>
                        </div>
                        <Button 
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                width: '30px', 
                                height: '56px', 
                                padding: '0', 
                                marginLeft: '5px', 
                                marginRight: '5px',
                                background: '0',
                                border: 'none'}}
                            onClick={()=>dispatchTradeAsset(secondAsset, firstAsset)}>
                            <img alt="" src={switchIon} style={{width:'20px', height:'24px'}} />
                        </Button>
                        <div
                            className="d-flex align-items-center justify-content-between border p-2"
                            style={{width: '228px', cursor: 'pointer'}}
                            onClick={()=>modalToggle(1)}    
                        >
                            <div className="d-flex align-items-center">
                                <div style={{maxWidth: '32px', maxHeight: '32px', minHeight: '32px'}}>
                                    {
                                        secondAsset.asset_image ?
                                            <img alt="" src={secondAsset.asset_image} className="w-100 h-100" /> : 
                                                secondAsset.asset_type === 'native' ? 
                                                    <img alt="" src={lobstr} className="w-100 h-100" /> : 
                                                    <div
                                                        className="icon-filter"
                                                        style={{backgroundColor: 'rgb(55, 222, 239)'}}>
                                                        {secondAsset.asset_image_text}
                                                    </div>
                                    }
                                </div>
                                <div className="pl-2">
                                    <div className="d-block">
                                        <div className="font-weight-bold">
                                            <b>{secondAsset.asset_anchorName}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                    icon={['fas', 'chevron-right']}
                                    className="font-size-xs opacity-3"
                                    />
                                </div>
                            </div>
                        </div>
                    </FormGroup>
                </CardHeader>
                <div className="d-flex justify-content-end">
                    <Button className="btn-pill m-2 font-size-xs" color={ period === '1D' ? 'light' : 'success' } size="sm" 
                        onClick={()=>setPeriod('1D')}>
                        1D
                    </Button>
                    <Button className="btn-pill m-2 font-size-xs" color={ period === '1W' ? 'light' : 'success' } size="sm" 
                        onClick={()=>setPeriod('1W')}>
                        1W
                    </Button>
                    <Button className="btn-pill m-2 font-size-xs" color={ period === '1M' ? 'light' : 'success' } size="sm" 
                        onClick={()=>setPeriod('1M')}>
                        1M
                    </Button>
                    <Button className="btn-pill m-2 font-size-xs" color={ period === '3M' ? 'light' : 'success' } size="sm" 
                        onClick={()=>setPeriod('3M')}>
                        3M
                    </Button>
                    <Button className="btn-pill m-2 font-size-xs" color={ period === '1Y' ? 'light' : 'success' } size="sm" 
                        onClick={()=>setPeriod('1Y')}>
                        1Y
                    </Button>
                    <Button className="btn-pill m-2 font-size-xs" color={ period === 'ALL' ? 'light' : 'success' } size="sm" 
                        onClick={()=>setPeriod('ALL')}>
                        ALL
                    </Button>
                </div>
                {
                    chartSeries.length > 0 ? 
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="area"
                            height={500}
                        /> :
                        <div className="d-flex justify-content-center align-items-center" style={{height: '500px'}}>
                            No activity for selected time period.
                        </div>
                }
            </Card>

            { 
                assetModal &&   <Modal
                                    size="md"
                                    centered
                                    isOpen={assetModal}
                                    zIndex={1300}
                                    toggle={()=>setAssetModal(!assetModal)}
                                    contentClassName="border-0 bg-white">
                                        <Card className="p-3">
                                            <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-0">
                                                <div className="nav-line-alt w-100">
                                                    <Nav className="nav-line d-flex justify-content-start">
                                                        <NavItem>
                                                            <NavLinkStrap
                                                                className={clsx('p-4 font-size-md', {
                                                                    active: activeTab === '1'
                                                                })}
                                                                onClick={() => {
                                                                    tapToggle('1');
                                                                }}>
                                                                <span className="font-weight-bold font-size-sm text-uppercase">
                                                                    My Assets
                                                                </span>
                                                                <div className="divider" />
                                                            </NavLinkStrap>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLinkStrap
                                                                className={clsx('p-4 font-size-md', {
                                                                    active: activeTab === '2'
                                                                })}
                                                                onClick={() => {
                                                                    tapToggle('2');
                                                                }}>
                                                                <span className="font-weight-bold font-size-sm text-uppercase">
                                                                    All Assets
                                                                </span>
                                                                <div className="divider" />
                                                            </NavLinkStrap>
                                                        </NavItem>
                                                    </Nav>
                                                </div>
                                            </CardHeader>
                                            <TabContent className="px-0 py-0 py-lg-4" activeTab={activeTab}>
                                                <TabPane tabId="1">
                                                    <Container>
                                                        {
                                                            accountAsset.map((asset, index) => (
                                                                <div
                                                                    className="d-flex align-items-center justify-content-between border p-2 w-100"
                                                                    style={{cursor: 'pointer'}}
                                                                    onClick={()=>setAsset(asset)}
                                                                    key={index}
                                                                >
                                                                    <div className="d-flex align-items-center">
                                                                        <div style={{maxWidth: '32px', maxHeight: '32px', minHeight: '32px'}}>
                                                                            {
                                                                                asset.asset_image ?
                                                                                    <img alt="" src={asset.asset_image} className="w-100 h-100" /> : 
                                                                                        asset.asset_type === 'native' ? 
                                                                                            <img alt="" src={lobstr} className="w-100 h-100" /> : 
                                                                                            <div
                                                                                                className="icon-filter"
                                                                                                style={{backgroundColor: 'rgb(55, 222, 239)'}}>
                                                                                                {asset.asset_image_text}
                                                                                            </div>
                                                                            }
                                                                        </div>
                                                                        <div className="pl-2">
                                                                            <div className="d-block">
                                                                                <div className="font-weight-bold">
                                                                                    <b>{asset.asset_name}</b> ({asset.asset_anchorName})
                                                                                </div>
                                                                                { asset.domain && <div className="opacity-7">
                                                                                    {asset.domain}
                                                                                </div> }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        {parseFloat(asset.balance)} {asset.asset_anchorName}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </Container>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <Container>
                                                        {
                                                            accountAsset.map((asset, index) => (
                                                                asset.asset_type !== 'native' &&
                                                                    <div
                                                                        className="d-flex align-items-center justify-content-between border p-2 w-100"
                                                                        style={{cursor: 'pointer'}}
                                                                        onClick={()=>setAsset(asset)}
                                                                        key={index}
                                                                    >
                                                                        <div className="d-flex align-items-center">
                                                                            <div style={{maxWidth: '32px', maxHeight: '32px', minHeight: '32px'}}>
                                                                                {
                                                                                    asset.asset_image ?
                                                                                        <img alt="" src={asset.asset_image} className="w-100 h-100" /> : 
                                                                                        <div
                                                                                            className="icon-filter"
                                                                                            style={{backgroundColor: 'rgb(55, 222, 239)'}}>
                                                                                            {asset.asset_image_text}
                                                                                        </div>
                                                                                }
                                                                            </div>
                                                                            <div className="pl-2">
                                                                                <div className="d-block">
                                                                                    <div className="font-weight-bold">
                                                                                        <b>{asset.asset_name}</b> ({asset.asset_anchorName})
                                                                                    </div>
                                                                                    { 
                                                                                        asset.domain && 
                                                                                            <div className="opacity-7">
                                                                                                <a
                                                                                                    href={"https://" + asset.domain}
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                    style={{color: '#00abff'}}>
                                                                                                    <span className="sidebar-item-label">{asset.domain}</span>
                                                                                                </a>
                                                                                            </div> 
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            {parseFloat(asset.balance)} {asset.asset_anchorName}
                                                                        </div>
                                                                    </div>
                                                            ))
                                                        }
                                                        {
                                                            assets.slice(1).map((asset, index) => (
                                                                <div
                                                                    className="d-flex align-items-center justify-content-between border-bottom p-2 w-100"
                                                                    style={{cursor: 'pointer'}}
                                                                    onClick={()=>setAsset(asset)}
                                                                    key={index}
                                                                >
                                                                    <div className="d-flex align-items-center">
                                                                        <div style={{maxWidth: '32px', maxHeight: '32px', minHeight: '32px'}}>
                                                                            {
                                                                                asset.asset_image ?
                                                                                    <img alt="" src={asset.asset_image} className="w-100 h-100" /> : 
                                                                                    <div
                                                                                        className="icon-filter"
                                                                                        style={{backgroundColor: 'rgb(55, 222, 239)'}}>
                                                                                        {asset.asset_image_text}
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                        <div className="pl-2">
                                                                            <div className="d-block">
                                                                                <div className="font-weight-bold">
                                                                                    <b>{asset.asset_name}</b> ({asset.asset_anchorName})
                                                                                </div>
                                                                                <div className="opacity-7">
                                                                                    <a
                                                                                        href={"https://" + asset.domain}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        style={{color: '#00abff'}}>
                                                                                        <span className="sidebar-item-label">{asset.domain}</span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </Container>
                                                </TabPane>
                                            </TabContent>
                                        </Card>
                                    </Modal>
            }


        </>
    );
}
