import axios, { Method } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET } from './auth';

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

const BASE_URL = 'http://localhost:3000';

export const makerequest = ({ method = 'GET', url, data, params, headers }: RequestParams) => {
  return axios ({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params,
    headers
  });
}

 export const makeLogin = (LoginData: LoginData) => { // items que serao enviados na requisição (header)da api
  const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

  const headers = {
    Authorization:  `Basic ${window.btoa(token)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const payload = qs.stringify({...LoginData, grant_type: 'passord'});

  return makerequest({ url: '/oauth/token', data: payload, method: 'POST', headers }) 


}