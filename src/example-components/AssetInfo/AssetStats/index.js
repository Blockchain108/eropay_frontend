import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
    Card,
    CardHeader,
    Row,
    Col
} from 'reactstrap';

import { assetActions } from '../../../_actions';

export default function AssetStats() {
    const [assetBalance, setAssetBalance] = useState({});
    const [assetMarketCap, setAssetMarketCap] = useState('');
    const [assetVolume, setAssetVolume] = useState('');
    const [assetSupply, setAssetSupply] = useState('');
    const [assetSupplyStatus, setAssetSupplyStatus] = useState('');
    const [assetPrice, setAssetPrice] = useState('');
    const [assetHolder, setAssetHolder] = useState('');

    const userInfo = useSelector(state => state.auth.userData);
    const assetInfo = useSelector(state => state.asset.data);

    const getDecimal = (num, decimalCnt) => {
        if (Math.abs(num) >= 10) {
            return Math.round(num);
        } else {
            return Number.parseFloat(num).toPrecision(decimalCnt);
        }
    }

    const getAssetInfo = async () => {
        var accountAssets = await assetActions.getAccountAsset(userInfo.public_key); 
        var lumensPrice = await assetActions.getLumensPrice();
        if (lumensPrice.status) {
            lumensPrice = lumensPrice.data[0].quote.USD.price;

            for (let index = 0; index < accountAssets.length; index++) {
                if (accountAssets[index].asset_anchorName == assetInfo.asset_anchorName) {
                    if (accountAssets[index].asset_type == 'native' || accountAssets[index].asset_issuer == assetInfo.asset_issuer) {
                        setAssetBalance(accountAssets[index]);
                    }
                }
            }
    
            if (assetInfo.asset_type == 'native') {
                setAssetMarketCap('');
                setAssetVolume('');
                setAssetSupply('');
                setAssetPrice(lumensPrice);
                setAssetHolder('');
            } else {
                var price = assetInfo.price * lumensPrice;
    
                var volume24h = await axios.post('https://ticker.stellar.org/graphql', {
                    "query": "{ markets(numHoursAgo: 24 baseAssetCode: \"XLM\" counterAssetCode: \"" + assetInfo.asset_anchorName + "\" counterAssetIssuer: \"" + assetInfo.asset_issuer + "\") { counterVolume } }"
                });
                if (volume24h.data.data.markets.length > 0) {
                    volume24h = volume24h.data.data.markets[0].counterVolume * price;
                    if (volume24h >= 10000) {
                        volume24h = Math.round(volume24h);
                    } else {
                        volume24h = Number.parseFloat(volume24h).toPrecision(5);
                    }
                } else {
                    volume24h = '- - -';
                }
    
                var supplyQuery = {
                    asset_anchorName: assetInfo.asset_anchorName,
                    asset_issuer: assetInfo.asset_issuer
                }
                var supplyData = await assetActions.getAssetSupply(supplyQuery);
                var supply = supplyData.supply / Math.pow(10, 7);

                var marketCap = supply * price;
                if (marketCap > Math.pow(10, 9)) {
                    marketCap = getDecimal(marketCap / Math.pow(10, 9), 2) + 'B'
                } if (marketCap > Math.pow(10, 6)) {
                    marketCap = getDecimal(marketCap / Math.pow(10, 6), 2) + 'M'
                } else {
                    marketCap = getDecimal(marketCap, 2);
                }
                setAssetMarketCap(marketCap);
                
                setAssetVolume(volume24h);

                if (supply > Math.pow(10, 9)) {
                    supply = getDecimal(supply / Math.pow(10, 9), 2) + 'B'
                } if (supply > Math.pow(10, 6)) {
                    supply = getDecimal(supply / Math.pow(10, 6), 2) + 'M'
                } else {
                    supply = getDecimal(supply, 2);
                }
                setAssetSupply(supply);
                setAssetPrice(price);
                setAssetHolder(supplyData.trustlines.total);
            }
        } else {
            toast.warning("Something Server Problem!");
        }
    }

    useEffect(() => {
        getAssetInfo();
    }, [])

    return (
        <>
            <Card className="mt-3 p-4" >
                {
                    Object.keys(assetBalance).length != 0 && 
                        <div className="mb-4">
                            <CardHeader className="px-1">
                                <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                                    Your balance
                                </h6>
                            </CardHeader>
                            <Row>
                                <Col md="4" className="d-flex justify-content-center flex-column font-size-xs">
                                    <div>Available balance</div>
                                    <div className="font-size-md text-black">
                                        { assetBalance.balance } &nbsp;
                                        { assetBalance.asset_anchorName }
                                    </div>
                                </Col>
                                {/* <Col md="4" className="d-flex justify-content-center flex-column font-size-xs">
                                    <div>Available balance (CAD)</div>
                                    <div className="font-size-md text-black">$0.194091</div>
                                </Col> */}
                            </Row>
                        </div>
                }

                <div className="mb-4">
                    <CardHeader className="px-1">
                        <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                            Market stats
                        </h6>
                    </CardHeader>
                    <Row>
                        {
                            assetMarketCap &&
                                <Col md="4" className="d-flex justify-content-center flex-column font-size-xs">
                                    <div>Market cap</div>
                                    <div className="font-size-md text-black">${ assetMarketCap }</div>
                                </Col>
                        }
                        {
                            assetVolume && 
                                <Col md="4" className="d-flex justify-content-center flex-column font-size-xs">
                                    <div>Volume 24H</div>
                                    <div className="font-size-md text-black">${ assetVolume }</div>
                                </Col>
                        }
                        {
                            assetSupply && 
                                <Col md="4" className="d-flex justify-content-center flex-column font-size-xs">
                                    <div>Supply</div>
                                    <div className="font-size-md text-black">${ assetSupply }</div>
                                </Col>
                        }
                        {
                            assetPrice && 
                                <Col md="4" className="d-flex justify-content-center flex-column font-size-xs mt-3">
                                    <div>USD Price</div>
                                    <div className="font-size-md text-black">${ assetPrice }</div>
                                </Col>
                        }
                    </Row>
                </div>

                <div>
                    <CardHeader className="px-1">
                        <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                            Asset Info
                        </h6>
                    </CardHeader>
                    <Row>
                        <Col md="12" className="d-flex justify-content-center flex-column font-size-xs">
                            <div>Asset Issuer</div>
                            <div className="font-size-md text-black">
                                { assetInfo.asset_type == 'native' ? 'Native' : assetInfo.asset_issuer }
                            </div>
                        </Col>
                        <Col md="4" className="d-flex justify-content-center flex-column font-size-xs mt-3">
                            <div>Asset Domain</div>
                            <div className="font-size-md text-black">
                                { assetInfo.asset_type == 'native' ? 'https://stellar.org/' : assetInfo.domain }
                            </div>
                        </Col>
                        {
                            assetHolder && 
                                <Col md="4" className="d-flex justify-content-center flex-column font-size-xs mt-3">
                                    <div>No. of Holders</div>
                                    <div className="font-size-md text-black">{ assetHolder }</div>
                                </Col>
                        }
                    </Row>
                </div>
            </Card>
        </>
    )
}