import React from 'react';
import { useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import ScrollToTop from './utils/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import './assets/base.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    fab,
    faFacebook,
    faTwitter,
    faVuejs,
    faReact,
    faHtml5,
    faGoogle,
    faInstagram,
    faPinterest,
    faYoutube,
    faDiscord,
    faSlack,
    faDribbble,
    faGithub
} from '@fortawesome/free-brands-svg-icons';
import {
    far,
    faSquare,
    faLifeRing,
    faCheckCircle,
    faTimesCircle,
    faDotCircle,
    faThumbsUp,
    faComments,
    faFolderOpen,
    faTrashAlt,
    faFileImage,
    faFileArchive,
    faCommentDots,
    faFolder,
    faKeyboard,
    faCalendarAlt,
    faEnvelope,
    faAddressCard,
    faMap,
    faObjectGroup,
    faImages,
    faUser,
    faLightbulb,
    faGem,
    faClock,
    faUserCircle,
    faQuestionCircle,
    faBuilding,
    faBell,
    faFileExcel,
    faFileAudio,
    faFileVideo,
    faFileWord,
    faFilePdf,
    faFileCode,
    faFileAlt,
    faEye,
    faChartBar
} from '@fortawesome/free-regular-svg-icons';
import {
    fas,
    faExclamation,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faCheck,
    faSmile,
    faHeart,
    faBatteryEmpty,
    faBatteryFull,
    faChevronRight,
    faSitemap,
    faPrint,
    faMapMarkedAlt,
    faTachometerAlt,
    faAlignCenter,
    faExternalLinkAlt,
    faShareSquare,
    faInfoCircle,
    faSync,
    faQuoteRight,
    faStarHalfAlt,
    faShapes,
    faCarBattery,
    faTable,
    faCubes,
    faPager,
    faCameraRetro,
    faBomb,
    faNetworkWired,
    faBusAlt,
    faBirthdayCake,
    faEyeDropper,
    faUnlockAlt,
    faDownload,
    faAward,
    faPlayCircle,
    faReply,
    faUpload,
    faBars,
    faEllipsisV,
    faSave,
    faSlidersH,
    faCaretRight,
    faChevronUp,
    faPlus,
    faLemon,
    faChevronLeft,
    faTimes,
    faChevronDown,
    faFilm,
    faSearch,
    faEllipsisH,
    faCog,
    faArrowsAltH,
    faPlusCircle,
    faAngleRight,
    faAngleUp,
    faAngleLeft,
    faAngleDown,
    faArrowUp,
    faArrowDown,
    faArrowRight,
    faArrowLeft,
    faStar,
    faSignOutAlt,
    faLink
} from '@fortawesome/free-solid-svg-icons';
import { history } from '_helpers';
library.add(
    far,
    faSquare,
    faLifeRing,
    faCheckCircle,
    faTimesCircle,
    faDotCircle,
    faThumbsUp,
    faComments,
    faFolderOpen,
    faTrashAlt,
    faFileImage,
    faFileArchive,
    faCommentDots,
    faFolder,
    faKeyboard,
    faCalendarAlt,
    faEnvelope,
    faAddressCard,
    faMap,
    faObjectGroup,
    faImages,
    faUser,
    faLightbulb,
    faGem,
    faClock,
    faUserCircle,
    faQuestionCircle,
    faBuilding,
    faBell,
    faFileExcel,
    faFileAudio,
    faFileVideo,
    faFileWord,
    faFilePdf,
    faFileCode,
    faFileAlt,
    faEye,
    faChartBar
);
library.add(
    fab,
    faFacebook,
    faTwitter,
    faVuejs,
    faReact,
    faHtml5,
    faGoogle,
    faInstagram,
    faPinterest,
    faYoutube,
    faDiscord,
    faSlack,
    faDribbble,
    faGithub
);
library.add(
    fas,
    faExclamation,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faCheck,
    faSmile,
    faHeart,
    faBatteryEmpty,
    faBatteryFull,
    faChevronRight,
    faSitemap,
    faPrint,
    faMapMarkedAlt,
    faTachometerAlt,
    faAlignCenter,
    faExternalLinkAlt,
    faShareSquare,
    faInfoCircle,
    faSync,
    faQuoteRight,
    faStarHalfAlt,
    faShapes,
    faCarBattery,
    faTable,
    faCubes,
    faPager,
    faCameraRetro,
    faBomb,
    faNetworkWired,
    faBusAlt,
    faBirthdayCake,
    faEyeDropper,
    faUnlockAlt,
    faDownload,
    faAward,
    faPlayCircle,
    faReply,
    faUpload,
    faBars,
    faEllipsisV,
    faSave,
    faSlidersH,
    faCaretRight,
    faChevronUp,
    faPlus,
    faLemon,
    faChevronLeft,
    faTimes,
    faChevronDown,
    faFilm,
    faSearch,
    faEllipsisH,
    faCog,
    faArrowsAltH,
    faPlusCircle,
    faAngleRight,
    faAngleUp,
    faAngleLeft,
    faAngleDown,
    faArrowUp,
    faArrowDown,
    faArrowRight,
    faArrowLeft,
    faStar,
    faSignOutAlt,
    faLink
);

const Loader = () => {
    const isLoading = useSelector(state => state.auth.isLoading);

    return (
        <>
            {
                isLoading &&    <div className="d-flex justify-content-center align-items-center loader">
                                    <div>
                                        <ScaleLoader color={'#3c44b1'} loading={isLoading} />
                                    </div>
                                </div>
            }
        </>
    )
}

const AppWrapper = () => {
    return (
        <Router history={history}>
            <ScrollToTop>
                <Routes />
            </ScrollToTop>
            <ToastContainer />
            <Loader />
        </Router>
    )
}

export default AppWrapper;
