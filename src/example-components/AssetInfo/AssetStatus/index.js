import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';

import { 
    Card,
    Row,
    Col,
    Button,
    Label
} from 'reactstrap';

import { tradeActions } from '../../../_actions';
import lumens from '../../../assets/images/assets/lumens.png';

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

export default function AssetStatus() {
    const [chartSeries, setChartSeries] = useState([]);
    const [chartOptions, setChartOptions] = useState(defaultOption);
    const [period, setPeriod] = useState('1D');
    const [avgPrice, setavgPrice] = useState(0)
    const [highPrice, setHighPrice] = useState(0);
    const [lowPrice, setLowPrice] = useState(0);
    
    const assetInfo = useSelector(state => state.asset.data);

    const getPriceData = async () => {
        var currencyData = {};
        if (assetInfo.asset_type === 'native') {
            currencyData.base_asset_type = 'native';
        } else {
            currencyData.base_asset_type = assetInfo.asset_anchorName.length <= 4 ? 'credit_alphanum4' : 'credit_alphanum12';
            currencyData.base_asset_code = assetInfo.asset_anchorName;
            currencyData.base_asset_issuer = assetInfo.asset_issuer;
        }

        if (assetInfo.asset_type === 'native') {
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
        getPriceData();
    }, [period, assetInfo])
    
    return (
        <>
            <Card className="p-4">
                <Row className="mb-5 mt-3">
                    <Col>
                        <div className="d-flex align-items-center mr-4" style={{cursor: 'pointer'}}>
                            <div style={{maxWidth: '40px', maxHeight: '40px', minHeight: '40px'}}>
                                {
                                    assetInfo.asset_type == 'native' ?
                                        <img alt="" src={lumens} className="w-100 h-100"
                                        style={{width: '40px'}} />
                                        :                                                     
                                        assetInfo.asset_image ? 
                                            <img alt="" src={assetInfo.asset_image} className="h-100"
                                                style={{width: '40px'}} /> 
                                                :
                                            <div className="icon-filter" style={{backgroundColor: 'rgb(55, 222, 239)'}}>
                                                {assetInfo.asset_image_text}
                                            </div>
                                }
                            </div>
                            <div className="pl-2">
                                <div className="d-block">
                                    <div className="font-weight-bold">
                                        <b> {assetInfo.asset_name + ' '}</b>({assetInfo.asset_anchorName})
                                    </div>
                                    { 
                                        assetInfo.asset_type == 'native' ? 
                                            <div>
                                                <a href="https://stellar.org/" alt="" target="_blank" 
                                                    className="font-size-xs" style={{ color: '#00abff' }}>
                                                    https://stellar.org
                                                </a>
                                            </div>
                                            :                                            
                                            assetInfo.domain && 
                                                <div>
                                                    <a href={ assetInfo.domain } alt="" target="_blank" 
                                                        className="font-size-xs" style={{ color: '#00abff' }}>
                                                        { assetInfo.domain }
                                                    </a>
                                                </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="pl-3">
                        {
                            chartSeries.length > 0 && chartSeries[0].data.length > 0 ?
                                <>
                                    <div className="font-weight-bold font-size-lg">
                                        {avgPrice} { assetInfo.asset_type === 'native' ? 'USD' : 'XLM' }
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
    )
}
