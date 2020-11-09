import jwtDecode from 'jwt-decode' // biblioteca que permite transformar a string do token(que fica no localStorage) em um objeto, assim possibilitando comparações, ex: verificar se o token esta expirado baseado na comparação entre a data do token com o Date.now()
;export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123';


type LoginResponse = {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string,
    userFirstname: string,
    userId: number
}

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
    const sessionData = localStorage.getItem('authData') ?? '{}';
    const parsedSessionData = JSON.parse(sessionData);

    return parsedSessionData as LoginResponse;
}

export const getAccessTokenDecoded = () => {
    const sessionData = getSessionData();

    const tokenDecoded = jwtDecode(sessionData.access_token);   
    return tokenDecoded as AccessToken;
}

export const isTokenValid = () => {
    const { exp } = getAccessTokenDecoded();

    return Date.now() <= exp * 1000 // 1000 pois o Date.now()(milisegundos) retorna um numero que é multiplicado por 1000, o exp(segundos) precisa estar na mesma unidade, ou seja converter o exp para milisegundos. 
}

export const isAuthenticated = () => {
    const sessionData = getSessionData();

    return sessionData.access_token && isTokenValid();
    // verifica se:
    // tem  "authData" no localStorage
    // e se "access_token" não esta expirado
}

export const isAllowedByRole = (routeRoules: Role[] = []) => { // recebe uma lista de Role[] onde o padrão é um array vazio caso o usuario não passe nada, isso contrario acusaria erro de possivel valores undefined.
    if (routeRoules.length === 0) {
        return true;
    }
    
    return false;
}    