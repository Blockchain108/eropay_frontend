import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'reactstrap';
import { ArrowDownRight } from 'react-feather';
import { dashboardActions, assetActions } from '../../_actions';

const SidebarWidget = () => {
    const [actTotalBalance, setActTotalBalance] = useState(0);

    const userInfo = useSelector(state => state.auth.userData);

    const getAccountTotalBalance = async () => {
        var actAssets = (await dashboardActions.getBalance(userInfo.public_key)).reverse();
        var lumensPrice = await assetActions.getLumensPrice();
        lumensPrice = lumensPrice.data[0].quote.USD.price;

        var sum = 0;
        for (let actIndex = 0; actIndex < actAssets.length; actIndex++) {
            if (actAssets[actIndex].asset_type == 'native') {
                sum += actAssets[actIndex].balance * lumensPrice;
            } else {
                sum += actAssets[actIndex].balance * actAssets[actIndex].price * lumensPrice;
            }
        }

        if (sum >= 10) {
            sum = Math.round(sum);
        } else {
            sum = Number.parseFloat(sum).toPrecision(2);
        }
        setActTotalBalance(sum);
    }

    useEffect(() => {
        getAccountTotalBalance();
    }, [])
    return (
        <>
            <div className="app-sidebar--widget">
                <div className="app-sidebar-spacer">
                    <div className="d-flex justify-content-between mt-2 mb-1">
                        <div className="d-flex">
                            <div className="text-left ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="font-weight-bold">Account Balance { actTotalBalance } USD</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarWidget;
