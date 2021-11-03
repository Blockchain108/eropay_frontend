import { userConstants } from '../_constants';
import { userService } from '../_services';
import { history } from '../_helpers';
import { toast } from 'react-toastify';
import config from '../_config';
import jwt from 'jsonwebtoken';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    sessionCheck,
    saveProfile,
    updatePassword,
    fileUpload,
    confirmEmail,
    resendEmailCode,
    resendPhoneCode,
    confirmVerifyCode,
    saveFederationAddress,
    forgotPassword,
    resetPassword,
    confirmGACode
};

async function login(email, password, from) {
    const userToken = await userService.login(email, password);
    if (userToken.data.status) {

        // store user jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(config.tokenKey, userToken.data.usertoken);
        history.push('/emailphoneverify');
    } else {
        var message = userToken.data.message ? userToken.data.message : "Something wrong problem with Server!";
        toast(message);
    }
}

// async function login(email, password, from) {
//     return dispatch =>

//     const userToken = await userService.login(email, password);
//     if (userToken.data.status) {

//         // store user jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem(config.tokenKey, userToken.data.usertoken);
//         const userInfo = await userService.getInfo(config.tokenKey);
//         if (userInfo.data.status) {
            
//             jwt.verify(userInfo.data.userinfo.keystore, config.JWT_SECRET_KEY, function(err, keystore) {
//                 userInfo.data.userinfo.keystore = keystore;
//             });

//             //Update store user state
//             const userData = {
//                 isAuth: true,
//                 isLoading: false,
//                 userData: userInfo.data.userinfo
//             }
//             dispatch({ type: userConstants.AUTH_DATA, data: userData });

//             toast.success('Login successfully!');
//             if (!userInfo.data.userinfo.isActive) {
//                 toast.warning("To activate your new wallet, you must deposit at least 1 lumen (xlm)");
//             }
//             history.push('/dashboard');

//         } else {
//             var message = userInfo.data.message ? userInfo.data.message : "Something wrong problem with Server!";
//             toast(message);
//         }
//     } else {
//         var message = userToken.data.message ? userToken.data.message : "Something wrong problem with Server!";
//         toast(message);
//     }
// }

function logout() {
    return async dispatch => {

        const tokenKey = localStorage.getItem(config.tokenKey);
        if (tokenKey && tokenKey != null) {
            await userService.logout(tokenKey);
        }

        const userData = {
            isAuth: false,
            isLoading: false,
            userData: {}
        }
        dispatch({ type: userConstants.AUTH_DATA, data: userData });
        localStorage.clear();
        history.push('/Homepage');
    }
}

async function register(user) {
    var result = await userService.register(user);
    if (result.data.status) {
        return result.data;
    } else {
        toast.warning(result.data.message);
    }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

async function sessionCheck() {
    const tokenKey = localStorage.getItem(config.tokenKey);

    if (tokenKey && tokenKey != null) {
        //Check session expire time
        let session = await userService.sessionCheck(tokenKey);
        if (session.data.status) {
            //Get user info
            let user = await userService.getInfo(tokenKey);
            if (user.status) {
                
                jwt.verify(user.data.userinfo.keystore, config.JWT_SECRET_KEY, function(err, keystore) {
                    user.data.userinfo.keystore = keystore;
                });

                return {
                    auth: {
                        isAuth: true,
                        isLoading: false,
                        userData: user.data.userinfo
                    }
                }
            } else {
                return { auth: { isAuth: false } }
            }
        } else {
            return { auth: { isAuth: false } }
        }
    } else {
        return { auth: { isAuth: false } }
    }
}

async function saveProfile(data) {
    return await userService.saveProfile(data);
}

async function updatePassword(data) {
    return await userService.updatePassword(data);
}

async function fileUpload(data) {
    return await userService.fileUpload(data);
}

async function confirmEmail(confirmId) {
    var result = await userService.confirmEmail(confirmId);
    return result.data;
}

async function resendEmailCode(tokenKey) {
    var result = await userService.resendEmailCode(tokenKey);
    if (result.data.status) {
        toast.success("Send verify code successfully");
    } else {
        toast.warning("Something Server Problem");
    }
}

async function resendPhoneCode(tokenKey) {
    var result = await userService.resendPhoneCode(tokenKey);
    return result.data;
}

function confirmVerifyCode(data) {
    return async dispatch => {
        var result = await userService.confirmVerifyCode(data);
        if (result.data.status) {
            const userInfo = await userService.getInfo(data.tokenKey);
            if (userInfo.data.status) {
                
                jwt.verify(userInfo.data.userinfo.keystore, config.JWT_SECRET_KEY, function(err, keystore) {
                    userInfo.data.userinfo.keystore = keystore;
                });

                //Update store user state
                const userData = {
                    isAuth: true,
                    isLoading: false,
                    userData: userInfo.data.userinfo
                }
                dispatch({ type: userConstants.AUTH_DATA, data: userData });
    
                toast.success('Login successfully!');
                if (!userInfo.data.userinfo.isActive) {
                    toast.warning("To activate your new wallet, you must deposit at least 1 lumen (xlm)");
                }
                history.push('/dashboard');

            } else {
                var message = userInfo.data.message ? userInfo.data.message : "Something wrong problem with Server!";
                toast(message);
            }
        } else {
            toast.warning("Something Server Problem");
        }
    }
}

async function saveFederationAddress(query) {
    var result = await userService.saveFederationAddress(query);
    return result.data;
}

async function forgotPassword(data) {
    var result = await userService.forgotPassword(data);
    return result.data;
}

async function resetPassword(data, token) {
    var result = await userService.resetPassword(data, token);
    return result.data;
}

//GACode === Google Authenticator Code
async function confirmGACode(data) {
    var result = await userService.confirmGACode(data);
    return result.data;
}