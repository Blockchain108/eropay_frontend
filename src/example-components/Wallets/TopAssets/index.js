import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';     
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    Card,
    CardHeader,
    CardTitle,
    Container,
    Modal,
    FormGroup,
    Button
} from 'reactstrap';
import lumens from '../../../assets/images/assets/lumens.png';
import config from '../../../_config';
import { assetActions } from '../../../_actions';
import { toast } from 'react-toastify';
import { tradeConstants } from '../../../_constants';
import { history } from '../../../_helpers';


function SliderArrowNext(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={['fas', 'chevron-right']} />
        </div>
    );
}

function SliderArrowPrev(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
        <FontAwesomeIcon icon={['fas', 'chevron-left']} />
        </div>
    );
}


//ERO, XLM, USDC, USD, USDT
let assets = [
    {
        asset_image: 'https://www.eropay.com/coin.png',
        asset_name: 'ERO',
        asset_anchorName: 'ERO',
        domain: 'eropay.com',
        content: 'ERO is the hub of the EroPay Ecosystem and serves as a bridge from fiat to crypto markets',
        asset_issuer: 'GCQJ4F6CONZNWOYQH3Y63KURUHHTGT2HR3X2XRV7MBFWCGXBVTXFHERO',
    }, {
        asset_image: lumens,
        asset_name: 'Lumens',
        asset_anchorName: 'XLM',
        asset_type: 'native',
        content: 'Lumens are the native digital currency of the Stellar Network built to act as a medium of exchange between other assets.',
    }, {
        asset_image: 'https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png',
        asset_name: 'USD Coin',
        asset_anchorName: 'USDC',
        domain: 'centre.io',
        content: 'USDC is issued by regulated financial institutions, and backed by fully reserved assets, and redeemable on a 1:1 basis for US dollars. USDC is governed by Centre, a membership-based consortium that sets technical, policy and financial standards for stablecoins.',
        asset_issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
    }, {
        asset_image: 'https://stablecoin.anchorusd.com/img/usdx.png',
        asset_name: 'US Dollar',
        asset_anchorName: 'USD',
        domain: 'stablecoin.anchorusd.com',
        content: 'AnchorUSD offers stable Stellar asset anchored 1-for-1 to the US dollar. AnchorUSD holds all deposits in audited, US-domiciled bank accounts and for every 1 token of AnchorUSD issued, there is $1 US Dollar on deposit in the escrow account. Funds cannot be used for any reason other than supporting redemptions.',
        asset_issuer: 'GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX',
    }, {
        asset_image: 'https://static.lobstr.co/media/0aef1221-5d2f-464f-8c44-ca1ded7182b8.png',
        asset_name: 'Tether USD',
        asset_anchorName: 'USDT',
        domain: 'apay.io',
        content: '1 USDT token entitles you to receive 1 USDT token on Ethereum (minus outgoing transaction fee) to an address of your choice using our anchor.',
        asset_issuer: 'GCQTGZQQ5G4PTM2GL7CDIFKUBIPEC52BROAQIAPW53XBRJVN6ZJVTG6V',
    },
];

export default function TopAssets() {
    const [modal, setModal] = useState(false);
    const [assetIndex, setAssetIndex] = useState(0);
    const userId = useSelector(state => state.auth.userData.id);
    const [topAssets, setTopAssets] = useState(assets);

    const dispatch = useDispatch();
    const publicKey = useSelector(state => state.auth.userData.public_key);
    const tradeAsset = useSelector(state => state.trade);

    const toggle = (index) => {
        setAssetIndex(index);
        setModal(!modal);
    };

    const widgetsCarousels2A = {
        dots: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SliderArrowNext />,
        prevArrow: <SliderArrowPrev />,
        responsive: [
            {
                breakpoint: 1450,
                settings: { slidesToShow: 2, slidesToScroll: 1 }
            },
            {
                breakpoint: 1300,
                settings: { slidesToShow: 1, slidesToScroll: 1 }
            }
        ]
    };

    const getAccountAsset = async () => {
        var accountAssets = await assetActions.getAccountAsset(publicKey);

        var tempAssets = JSON.parse(JSON.stringify(topAssets));
        for (let actIndex = 0; actIndex < accountAssets.length; actIndex++) {
            for (let topAstIndex = 0; topAstIndex < tempAssets.length; topAstIndex++) {
                if (tempAssets[topAstIndex].asset_type == 'native' && accountAssets[actIndex].asset_type == 'native') {
                    tempAssets[topAstIndex]['is_account'] = true;
                } else if (tempAssets[topAstIndex].asset_anchorName == accountAssets[actIndex].asset_anchorName &&
                    tempAssets[topAstIndex].asset_issuer == accountAssets[actIndex].asset_issuer ) {
                        tempAssets[topAstIndex]['is_account'] = true;
                }    
            }
        }
        setTopAssets(tempAssets);
    }

    const addAsset = async () => {
        var data = { 
            id: userId, 
            asset: topAssets[assetIndex].asset_anchorName, 
            issuer: topAssets[assetIndex].asset_issuer, 
            limitBalance: config.createdBalance
        }
    
        var result = await assetActions.addAsset(data);
        if (result.status) {
            toast.success("Successfully");
            window.location.reload();
        } else {
            var message = result.message ? result.message : "Something wrong problem with Server!";
            toast.warning(message);
        }
    }

    const tradeAssetHandler = async () => {
        var baseAsset = {}, counterAsset = {};
        if (topAssets[assetIndex].asset_anchorName === 'XLM') {
            baseAsset = tradeAsset.counterAsset;
            counterAsset = tradeAsset.baseAsset;
        } else {
            baseAsset = topAssets[assetIndex];
            counterAsset = tradeAsset.baseAsset;
        }

        dispatch({type: tradeConstants.TRADE_ASSET, data: { baseAsset: baseAsset, counterAsset: counterAsset }});
        history.push('/trade');
    }

    useEffect(() => {
        getAccountAsset();
    }, [])

    return (
        <>
            <Card className="mb-5">
                <Container className="py-3">
                    <CardHeader>
                        <CardTitle className="font-weight-bold font-size-lg mb-0 text-black">Top Assets</CardTitle>
                    </CardHeader>
                    <Slider className="overflow-hidden" {...widgetsCarousels2A} >
                        {
                            topAssets.map((asset, index) => (
                                <div key={index} >
                                    <div
                                        onClick={() => toggle(index)}
                                        className="mx-2 my-3 card shadow-xxl card-border-top br-tl br-tr card-box-hover-rise border-primary text-center p-3 d-block">
                                        <div 
                                            className="mb-4 mx-auto d-inline-block" 
                                            style={{ maxWidth: '35px', maxHeight: '35px' }}>
                                            <img alt="" src={asset.asset_image} className="w-100 h-100" />
                                        </div>
                                        <h5 className="font-weight-bold font-size-lg text-second mb-4">
                                            {asset.asset_name}
                                        </h5>
                                        <div className="rounded-pill py-1 px-4 text-uppercase font-size-xs bg-neutral-dark text-second d-inline-flex font-weight-bold">
                                            Info
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </Container>
            </Card>

            {
                modal &&    <Modal
                                size="md"
                                centered
                                isOpen={modal}
                                zIndex={1300}
                                toggle={()=>toggle(0)}
                                contentClassName="border-0 bg-white">
                                <Card>
                                    <div className="p-4">
                                        <FormGroup>
                                            <div className="d-flex align-items-center mr-4">
                                                <div style={{maxWidth: '42px', maxHeight: '42px', minHeight: '42px'}}>
                                                    <img alt="" src={topAssets[assetIndex].asset_image} className="w-100 h-100" />
                                                </div>
                                                <div className="pl-2">
                                                    <div className="d-block">
                                                        <div className="font-weight-bold">
                                                            <b>{topAssets[assetIndex].asset_name}</b> ({topAssets[assetIndex].asset_anchorName})
                                                        </div>
                                                        <div className="opacity-7">
                                                            <a
                                                                href={"https://" + topAssets[assetIndex].domain}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{color: '#00abff'}}>
                                                                <span className="sidebar-item-label">{topAssets[assetIndex].domain}</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-second opacity-8 mt-3 mb-4 font-size-sm">
                                                {topAssets[assetIndex].content}
                                            </div>
                                        </FormGroup>
                                        {
                                            topAssets[assetIndex].asset_type != 'native' && 
                                                <FormGroup>
                                                    <div className="font-weight-bold">
                                                        <b>Issuer</b>
                                                    </div>
                                                    <div className="opacity-7">
                                                        <div className="text-second opacity-8 mt-3 mb-4 font-size-sm">
                                                            {topAssets[assetIndex].asset_issuer}
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                        }
                                        <FormGroup className="d-flex justify-content-end">
                                            {
                                                topAssets[assetIndex].is_account === true ? 
                                                    <Button size="sm" color="success" onClick={()=>tradeAssetHandler()}>Trade</Button>
                                                    :
                                                    <Button size="sm" color="success" onClick={()=>addAsset()}>Add</Button>
                                            }
                                        </FormGroup>
                                    </div>
                                </Card>
                            </Modal>
            }
        </>
    );
}
