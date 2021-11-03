import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { dashboardActions } from '../../../_actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Row,
    Col,
    Card,
    Button,
    Label
} from 'reactstrap';
import Chart from 'react-apexcharts';

import lobstr from '../../../assets/images/assets/lumens.png';
import { tradeActions, assetActions } from '../../../_actions';

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

export default function LivePreviewExample() {
    const userInfo = useSelector(state => state.auth.userData);
    const [stelAccInfo, setStelAccInfo] = useState([]);
    const [balanceIndex, setBalanceIndex] = useState(0);
    const [chartSeries, setChartSeries] = useState([]);
    const [chartOptions, setChartOptions] = useState(defaultOption);
    const [period, setPeriod] = useState('1D');
    const [baseAsset, setBaseAsset] = useState({ asset_type: 'native', asset_anchorName: 'XLM' });
    const [avgPrice, setavgPrice] = useState(0)
    const [highPrice, setHighPrice] = useState(0);
    const [lowPrice, setLowPrice] = useState(0);

    const getAccountBalance = async () => {
        var actAssets = (await dashboardActions.getBalance(userInfo.public_key)).reverse();
        var lumensPrice = await assetActions.getLumensPrice();
        lumensPrice = lumensPrice.data[0].quote.USD.price;

        for (let actIndex = 0; actIndex < actAssets.length; actIndex++) {
            if (actAssets[actIndex].asset_type == 'native') {
                actAssets[actIndex]['priceUSD'] = lumensPrice;
            } else {
                actAssets[actIndex]['priceUSD'] = actAssets[actIndex].price * lumensPrice;
            }

            actAssets[actIndex]['balanceUSD'] = actAssets[actIndex]['priceUSD'] * actAssets[actIndex].balance;
            if (actAssets[actIndex]['balanceUSD'] >= 100) {
                actAssets[actIndex]['balanceUSD'] = Math.round(actAssets[actIndex]['balanceUSD']);
            } else {
                actAssets[actIndex]['balanceUSD'] = Number.parseFloat(actAssets[actIndex]['balanceUSD']).toPrecision(2);
            }
            
            if (actAssets[actIndex].balance >= 100) {
                actAssets[actIndex].balance = Math.round(actAssets[actIndex].balance);
            } else {
                actAssets[actIndex].balance = Number.parseFloat(actAssets[actIndex].balance).toPrecision(2);
            } 
        }
        setStelAccInfo(actAssets);
    }

    const getPriceData = async (baseAsset) => {
        var currencyData = {};
        if (baseAsset.asset_type === 'native') {
            currencyData.base_asset_type = 'native';
        } else {
            currencyData.base_asset_type = baseAsset.asset_anchorName.length <= 4 ? 'credit_alphanum4' : 'credit_alphanum12';
            currencyData.base_asset_code = baseAsset.asset_anchorName;
            currencyData.base_asset_issuer = baseAsset.asset_issuer;
        }

        if (baseAsset.asset_type === 'native') {
            currencyData.counter_asset_type = 'credit_alphanum4';
            currencyData.counter_asset_code = 'USD';
            currencyData.counter_asset_issuer = 'GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX'
        } else {
            currencyData.counter_asset_type = 'native';
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
        setHighPrice(Math.max(...priceArr[0].data));
        setLowPrice(Math.min(...priceArr[0].data));
        setavgPrice(priceArr[0].data[priceArr[0].data.length - 1]);
    }

    useEffect(() => {
        getAccountBalance();
    }, [])

    /* blnIndex = balance index */
    const selectDefaultBalance = (blnIndex) => {
        setBalanceIndex(blnIndex);
        setBaseAsset(stelAccInfo[blnIndex]);
    }

    useEffect(() => {
        getPriceData(baseAsset);
    }, [period, baseAsset])

    return (
        <>
            <Card className="mb-5 p-4 p-lg-5">
                <Row>
                    <Col className="col-md-4">
                        {
                            stelAccInfo[balanceIndex] ? 
                                <Fragment>
                                        <div>{stelAccInfo[balanceIndex].asset_name}</div>
                                        <div className="display-4">
                                            <span className="display-2 font-weight-bold mr-1">{ stelAccInfo[balanceIndex].balance }</span>
                                            {  stelAccInfo[balanceIndex].asset_type === 'native' ? 'XLM' : stelAccInfo[balanceIndex].asset_code }
                                        </div>
                                        <div className="alternative-balance-block" style={{height: '40px'}}>≈ $ { stelAccInfo[balanceIndex].balanceUSD }</div>
                                </Fragment>
                                    :
                                <Fragment>
                                    <div>Lumens</div>
                                    <div className="display-4">
                                        <span className="display-2 font-weight-bold mr-1">0</span>
                                        XLM
                                    </div>
                                </Fragment>
                        }

                    </Col>
                    <Col className="col-md-8 border-left">
                        <div className="font-weight-bold display-4">My Assets</div>
                        <div className="d-flex justify-content-start flex-wrap">
                            {
                                stelAccInfo.map((balance, index) => (
                                    <Fragment key={index}>
                                        {
                                            parseFloat(balance.balance) > 0 && 
                                                <div
                                                    href="#/"
                                                    onClick={() => selectDefaultBalance(index)}
                                                    className="m-3 btn-input-select"
                                                    style={{color: '#3b3e66', width: '135px', height: '115px'}}>
                                                    <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill">
                                                        {
                                                            balance.asset_type === 'native' ?
                                                                <img 
                                                                    alt="" 
                                                                    src={lobstr}
                                                                    className="w-100 h-100" />
                                                                    :
                                                                balance.asset_image ? 
                                                                    <img 
                                                                        alt="" 
                                                                        src={balance.asset_image}
                                                                        className="w-100 h-100" />
                                                                        :
                                                                    <div
                                                                        className="icon-filter"
                                                                        style={{backgroundColor: 'rgb(55, 222, 239)'}}>
                                                                        {balance.asset_image_text}
                                                                    </div>
                                                        }

                                                    </div>
                                                    <div className="font-weight-bold mt-2">{ balance.asset_type === 'native' ? 'XLM' : balance.asset_code }</div>
                                                    <div className="opacity-6">{ parseFloat(balance.balance).toFixed(2) }</div>
                                                </div>
                                        }
                                    </Fragment>
                                    
                                ))
                            }
                            <a
                                href="/assets"
                                className="m-3 btn-input-select"
                                style={{width: '135px', height: '115px'}}>
                                <div className="d-30 d-flex align-items-center justify-content-center rounded-pill bg-secondary text-primary">
                                    <FontAwesomeIcon icon={['fas', 'plus']} />
                                </div>
                                <div className="font-weight-bold text-primary opacity-6 mt-2">
                                    Add new
                                </div>
                            </a>
                        </div>
                    </Col>
                </Row>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        {
                            chartSeries.length > 0 && chartSeries[0].data.length > 0 ?
                                <>
                                    <div>
                                        {avgPrice} { baseAsset.asset_type === 'native' ? 'USD' : 'XLM' }
                                    </div>
                                    <div>
                                        <Label color="muted" size="sm" className="mr-2">H: {highPrice}</Label>
                                        <Label color="muted" size="sm">L: {lowPrice}</Label>
                                    </div>
                                </>
                                    :
                                <></>
                        }
                    </div>
                    <div>
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
                </div>
                {
                    chartSeries.length > 0 && chartSeries[0].data.length > 0 ? 
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="area"
                            height={500}
                        />
                            :
                        <div className="d-flex justify-content-center align-items-center" style={{height: '500px'}}>
                            No activity for selected time period.
                        </div>
                }
            </Card>
        </>
    );
}
