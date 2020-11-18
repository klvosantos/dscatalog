import axios, { Method } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET, getSessionData } from './auth';
import history from './history';


type RequestParams = {
    method?: Method;
    url: string;
    data?: object | string;
    params?: object;
    headers?: object;
}

type LoginData = {
  username: string;
  password: string;
}

const BASE_URL = 'http://localhost:8080';

axios.interceptors.response.use(function (response) {  
  return response;
}, function (error) {
  if (error.response.status === 401) {
    history.push('/auth/login');
  } 

  return Promise.reject(error);
});

export const makerequest = ({ method = 'GET', url, data, params, headers }: RequestParams) => { // jeito mais basico de fazer uma requisição http
  return axios ({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params,
    headers
  });
}

export const makePrivateRequest = ({ method = 'GET', url, data, params }: RequestParams) => { // Envia o token junto na requisição para cadastrar um produto etc..
  const sessionData = getSessionData();

  const headers = {
    'Authorization': `Bearer ${sessionData.access_token}` 
  }

  return makerequest({ method, url, data, params, headers })
}

 export const makeLogin = (LoginData: LoginData) => { // items que serao enviados na requisição (header)da api
  const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

  const headers = {
    Authorization:  `Basic ${window.btoa(token)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const payload = qs.stringify({...LoginData, grant_type: 'password'});

  return makerequest({ url: '/oauth/token', data: payload, method: 'POST', headers })
}