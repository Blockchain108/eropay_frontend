import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assetActions } from '../../../_actions';
import { userConstants } from '../../../_constants';
import config from '../../../_config';
import { history } from '../../../_helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { tradeConstants, assetConstants } from '../../../_constants';

import {
    Card,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    ListGroup,
    ListGroupItem,
    Button,
} from 'reactstrap';

import lumensImg from '../../../assets/images/assets/lumens.png';

export default function MyAsset() {
    const [assets, setAssets] = useState([]);
    const [filter, setFilter] = useState(null);
    const [accountAsset, setAccountAsset] = useState([]);
    const [allAsset, setAllAsset] = useState([]);
    const [isNew, setIsNew] = useState(false);

    //Get stellar account public key
    const dispatch = useDispatch();
    const publicKey = useSelector(state => state.auth.userData.public_key);
    const userId = useSelector(state => state.auth.userData.id);
    const tradeAsset = useSelector(state => state.trade);

    const getAccountAsset = async () => {
        var result = await assetActions.getAccountAsset(publicKey);
        result = result.sort((x,y)=>{ return x.asset_type === 'native' ? -1 : y.asset_type === 'native' ? 1 : 0; });
        setAccountAsset(result);
        if (result.length == 0) { setIsNew(true); }
    }

    const initialAsset = async (filter = null) => {
        var result = await assetActions.getAsset(filter);
        setAssets(result);
    }

    const compareAsset = async () => {
        dispatch({ type: userConstants.PAGE_LOADING, data: true });
        var tempAsset = JSON.parse(JSON.stringify(assets));
        var tempAccountAsset = JSON.parse(JSON.stringify(accountAsset));

        if (filter == null) {
            var tempArr = tempAccountAsset;
            for(var astIndex = 0; astIndex < tempAsset.length; astIndex ++){
                if (tempAccountAsset.length > 0) {
                    for(var actIndex = 0; actIndex < tempAccountAsset.length; actIndex ++) {
                        if(tempAsset[astIndex].asset_anchorName == tempAccountAsset[actIndex].asset_anchorName && tempAsset[astIndex].asset_issuer == tempAccountAsset[actIndex].asset_issuer) {
                            break;
                        }
                        if(actIndex == tempAccountAsset.length - 1) {
                            tempArr.push(tempAsset[astIndex]);
                        }
                    }
                } else {
                    tempArr.push(tempAsset[astIndex]);
                }
            }
        } else {
            var tempArr = [];
            for(var astIndex = 0; astIndex < tempAsset.length; astIndex ++){
                for(var actIndex = 0; actIndex < tempAccountAsset.length; actIndex ++) {
                    if(tempAsset[astIndex].asset_anchorName == tempAccountAsset[actIndex].asset_anchorName && tempAsset[astIndex].asset_issuer == tempAccountAsset[actIndex].asset_issuer) {
                        tempArr.push(tempAccountAsset[actIndex]);
                        tempAsset.splice(astIndex, 1);
                        astIndex -= 1;
                    }
                }
            }
            for (let astIndex = 0; astIndex < tempAsset.length; astIndex++) {
                tempArr.push(tempAsset[astIndex]);  
            }
        }

        setAllAsset(tempArr);
        dispatch({ type: userConstants.PAGE_LOADING, data: false });
    }
    
    const filterAsset = (filter) => {
        // if (event.key === 'Enter') {
        //     if (filter.length < 5) { 
        //         initialAsset(null);
        //     } else {
        //         console.log("this is filter asset");
        //         initialAsset(filter);
        //     }
        // }

        initialAsset(filter);
    }

    const tradeAssetHandler = (index) => {
        var baseAsset = {}, counterAsset = {};
        if (allAsset[index].asset_anchorName === 'XLM') {
            baseAsset = tradeAsset.counterAsset;
            counterAsset = tradeAsset.baseAsset;
        } else {
            baseAsset = allAsset[index];
            counterAsset = tradeAsset.baseAsset;
        }

        dispatch({type: tradeConstants.TRADE_ASSET, data: { baseAsset: baseAsset, counterAsset: counterAsset }});
        history.push('/trade');
    }
    
    const addAsset = async (index) => {
        if (accountAsset.length == 0) { toast.warning("Your account is not actived yet"); return; }

        var data = { 
            id: userId, 
            asset: allAsset[index].asset_anchorName, 
            issuer: allAsset[index].asset_issuer, 
            limitBalance: config.createdBalance
        }

        var result = await assetActions.addAsset(data);
        if (result.status) {
            getAccountAsset();
        } else {
            var message = result.message ? result.message : "Something wrong problem with Server!";
            toast.warning(message);
        }
    }

    const removeAsset = async (index) => {
        var data = { 
            id: userId, 
            asset: assets[index].asset_anchorName, 
            issuer: assets[index].asset_issuer, 
            limitBalance: config.removedBalance
        }
        var result = await assetActions.addAsset(data);
        if (result.status) {
            getAccountAsset();
        } else {
            var message = result.message ? result.message : "Something wrong problem with Server!";
            toast.warn(message);
        }
    }
    
    const viewAssetInfo = (index) => {
        dispatch({ type: assetConstants.ASSET_DATA, data: allAsset[index] });
        history.push('/assetinfo');
    }

    useEffect(() => {
        getAccountAsset();
        initialAsset();
    }, []);

    useEffect(() => {
        console.log("this is compareasset");
        if ((accountAsset.length != 0 && assets.length != 0) || (isNew && assets.length != 0)) {
            compareAsset();
        }
    }, [accountAsset, assets, isNew])

    return (
        <>
            <Card className="mb-5">
                <div className="p-4">
                    <FormGroup>
                        <InputGroup className="input-group-seamless mb-4">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon icon={['fas', 'search']} className="mx-auto" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                                type="search" 
                                placeholder="Applies a full-test search filter by an entry address, name, or domain. More 5 characters" 
                                onChange={(e)=>filterAsset(e.currentTarget.value)}/>
                        </InputGroup>
                    </FormGroup>
                    <ListGroup className="mb-5">
                        { 
                            allAsset.map((asset, index) => (
                                <ListGroupItem className="d-flex justify-content-between align-items-center py-3" key={index}>
                                    <div className="d-flex align-items-center mr-4" style={{cursor: 'pointer'}}
                                        onClick={() => viewAssetInfo(index)}>
                                        <div style={{maxWidth: '32px', maxHeight: '32px', minHeight: '32px'}}>
                                            {
                                                asset.asset_type == 'native' ?
                                                    <img alt="" src={lumensImg} className="w-100 h-100"
                                                    style={{width: '32px'}} />
                                                    :                                                     
                                                    asset.asset_image ? 
                                                        <img alt="" src={asset.asset_image} className="h-100"
                                                            style={{width: '32px'}} /> 
                                                            :
                                                        <div className="icon-filter" style={{backgroundColor: 'rgb(55, 222, 239)'}}>
                                                            {asset.asset_image_text}
                                                        </div>
                                            }
                                        </div>
                                        <div className="pl-2">
                                            <div className="d-block">
                                                <div className="font-weight-bold">
                                                    <b> {asset.asset_name + ' '}</b>({asset.asset_anchorName})
                                                </div>
                                                { asset.domain && <div className="opacity-7">
                                                    {asset.domain}
                                                </div> }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {
                                            asset.is_authorized ? 
                                                <Button
                                                    color="light"
                                                    size="sm"
                                                    style={{color: '#00abff'}}
                                                    className="shadow-none font-weight-bold"
                                                    onClick={() => tradeAssetHandler(index)}>
                                                    Trade
                                                </Button> :
                                                <Button
                                                    color="success"
                                                    size="sm"
                                                    className="shadow-none font-weight-bold"
                                                    onClick={() => addAsset(index)}>
                                                    Add
                                                </Button>        
                                        } 
                                    </div>
                                </ListGroupItem>
                            )) 
                        }
                    </ListGroup>
                </div>
            </Card>
        </>
    );
}
