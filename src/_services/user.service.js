import config from '../_config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    sessionCheck,
    getInfo,
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

async function login(email, password) {
    return await axios.post(`${config.apiUrl}/users/login`, { email, password });
}

async function logout(tokenKey) {
    return await axios.post(`${config.apiUrl}/users/logout`, {tokenKey: tokenKey});
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

async function register(user) {
    return await axios.post(`${config.apiUrl}/users/create`, user);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

async function sessionCheck(tokenKey) {
    return await axios.post(`${config.apiUrl}/session/check`, {tokenKey: tokenKey});
}

async function getInfo(tokenKey) {
    return await axios.post(`${config.apiUrl}/users/user_info`, { data : tokenKey });
}

async function saveProfile(data) {
    return await axios.post(`${config.apiUrl}/users/updateProfile`, data);
}

async function updatePassword(data) {
    return await axios.post(`${config.apiUrl}/users/updatePassword`, data);
}

async function fileUpload(data) {
    const headerConfig = { 
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return await axios.post(`${config.apiUrl}/users/fileUpload`, data, headerConfig);
}

async function confirmEmail(confirmId) {
    return await axios.post(`${config.apiUrl}/users/confirm`, { data: confirmId });
}

async function resendEmailCode(tokenKey) {
    return await axios.post(`${config.apiUrl}/users/emailverify`, { data: tokenKey });
}

async function resendPhoneCode(tokenKey) {
    return await axios.post(`${config.apiUrl}/users/phoneverify`, { data: tokenKey });
}

async function confirmVerifyCode(data) {
    return await axios.post(`${config.apiUrl}/users/confirmVerifyCode`, data);
}

async function saveFederationAddress(query) {
    return await axios.post(`${config.apiUrl}/wallets/setFederationAddress`, query);
}

async function forgotPassword(data) {
    return await axios.post(`${config.apiUrl}/users/forgotPassword`, data);
}

async function resetPassword(data, token) {
    return await axios.post(`${config.apiUrl}/users/resetPassword`, data, { headers: { 'x-access-token' : token } });
}

async function confirmGACode(data) {
    return await axios.post(`${config.apiUrl}/users/confirm`, data);
}
