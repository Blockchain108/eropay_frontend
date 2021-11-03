import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader, ScaleLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { history } from '_helpers';

// Layout Blueprints
import {
    LeftSidebar,
    MinimalLayout,
    PresentationLayout
} from './layout-blueprints';

// Example Pages
import Dashboard from './example-pages/Overview';
import BuyLumens from './example-pages/Accounts';
import Assets from './example-pages/Wallets';
import Wallets from './example-pages/Wallets2';
import Trade from './example-pages/Trade';
import BuySell from './example-pages/BuySell';
import Transactions from './example-pages/Transactions';
import Profile from './example-pages/Profile';
import Settings from './example-pages/Settings';
import PageLoginCover from './example-pages/PageLoginCover';
import PageRegisterCover from './example-pages/PageRegisterCover';
import PageRecoverCover from './example-pages/PageRecoverCover';
import PageError404 from './example-pages/PageError404';
import EmailPhoneVerify from './example-pages/EmailPhoneVerify';
import ResetPassword from './example-pages/ResetPassword';
import AssetInfo from './example-pages/AssetInfo';

const Homepage = lazy(() => import('./example-pages/Homepage'));


const Loader = () => {
    const isLoading = useSelector(state => state.auth.isLoading);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <ScaleLoader color={'#3c44b1'} loading={isLoading} />
            </div>
        </>
    )
}

const Routes = () => {
    const location = useLocation();
    const isAuthorized = useSelector((state) => state.auth.isAuth);

    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 0.99
        },
        in: {
            opacity: 1,
            scale: 1
        },
        out: {
            opacity: 0,
            scale: 1.01 
        }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.4
    };

    const SuspenseLoading = () => {
        return (
            <>
                <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                    <div className="d-flex align-items-center flex-column px-4">
                        <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
                    </div>
                    <div className="text-muted font-size-xl text-center pt-3">
                        Please wait while we load the live preview examples
                        <span className="font-size-lg d-block text-dark">
                        This live preview instance can be slower than a real production
                        build!
                        </span>
                    </div>
                </div>
            </>
        );
    };

    const requireAuth = () => {
        if (!isAuthorized && 
            history.location.pathname !== "/Homepage" &&
            history.location.pathname !== "/login" &&
            history.location.pathname !== "/PageRegisterCover" &&
            history.location.pathname !== "/PageRecoverCover" &&
            history.location.pathname !== "/PageError404" &&
            history.location.pathname !== "/emailphoneverify" &&
            history.location.pathname !== "/resetpassword" &&
            history.location.pathname.indexOf('emailconfirm') < 0) {
            localStorage.clear();
            history.push("/login");
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        if (isAuthorized && (
            history.location.pathname === "/login" ||
            history.location.pathname === "/PageRegisterCover" ||
            history.location.pathname === "/PageRecoverCover" ||
            history.location.pathname === "/emailphoneverify" ||
            history.location.pathname === "/resetpassword" ||
            history.location.pathname === "/emailconfirm")) {
            history.push("/dashboard");
        }
    }, [])

    return (
        <AnimatePresence>
            <Suspense fallback={<SuspenseLoading />}>
                <Switch>
                    <Redirect exact from="/" to="/Homepage" />
                    <Route path={['/Homepage']}>
                        <PresentationLayout>
                        <Switch location={location} key={location.pathname}>
                            <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}>
                            <Route path="/Homepage" component={Homepage} />
                            </motion.div>
                        </Switch>
                        </PresentationLayout>
                    </Route>

                    <Route
                        path={[
                        '/login',
                        '/PageRegisterCover',
                        '/PageRecoverCover',
                        '/emailphoneverify',
                        '/resetpassword',
                        '/emailconfirm'
                        ]}>
                        <MinimalLayout>
                            <Switch location={location} key={location.pathname}>
                                <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}>
                                    <Route path="/login" component={PageLoginCover} />
                                    <Route path="/PageRegisterCover" component={PageRegisterCover} />
                                    <Route path="/PageRecoverCover" component={PageRecoverCover} />
                                    <Route path="/emailconfirm" component={PageError404} />
                                    <Route path="/emailphoneverify" component={EmailPhoneVerify} />
                                    <Route path="/resetpassword" component={ResetPassword} />
                                </motion.div>
                            </Switch>
                        </MinimalLayout>
                    </Route>

                    <Route
                        path={[
                            '/dashboard',
                            '/buylumens',
                            '/wallets',
                            '/assets',
                            '/trade',
                            '/buysell',
                            '/history',
                            '/accesshistory',
                            '/settings',
                            '/assetinfo'
                        ]}>
                        {
                            requireAuth() && 
                                    <LeftSidebar>
                                        <Switch location={location} key={location.pathname}>
                                            <motion.div
                                                initial="initial"
                                                animate="in"
                                                exit="out"
                                                variants={pageVariants}
                                                transition={pageTransition}>
                                                    <Route path="/dashboard" component={Dashboard} />
                                                    <Route path="/buylumens" component={BuyLumens} />
                                                    <Route path="/wallets" component={Wallets} />
                                                    <Route path="/assets" component={Assets} />
                                                    <Route path="/trade" component={Trade} />
                                                    <Route path="/buysell" component={BuySell} />
                                                    <Route path="/history" component={Transactions} />
                                                    <Route path="/accesshistory" component={Profile} />
                                                    <Route path="/settings" component={Settings} />
                                                    <Route path="/assetinfo" component={AssetInfo} />
                                            </motion.div>
                                        </Switch>
                                    </LeftSidebar>
                        }         
                    </Route>
                </Switch>
            </Suspense>
        </AnimatePresence>
    );
};

export default Routes;