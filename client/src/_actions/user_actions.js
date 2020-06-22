import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
// import { USER_SERVER } from '../components/Config.js';

export function registerUser(userToRegister){
    const request = axios.post('/api/users/register',userToRegister)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(userToLogin){
    const request = axios.post('/api/users/login',userToLogin)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get('/api/users/auth')
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get('/api/users/logout')
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

// `${USER_SERVER}/register`
// `${USER_SERVER}/login`
// `${USER_SERVER}/auth`
// `${USER_SERVER}/logout`