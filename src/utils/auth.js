import { storeToken, getToken, removeToken } from './tokenStorage'

async function login(email, password, remember) {
    logout();
    const url = import.meta.env.VITE_API+'/api/login';
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: data
    };

    const response = await fetch(url, requestOptions)
    const json = await response.json()

    if (json.code == 200) {
        storeToken(json.data.token, remember)
    } else {
        throw json.data.message || json.data.email || 'Error'
    }

}

async function register(name, email, password, passwordConfirm , remember) {
    logout();
    const url = import.meta.env.VITE_API+'/api/register';
    const data = new URLSearchParams();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('password_confirmation', passwordConfirm)

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: data
    };

    const response = await fetch(url, requestOptions)
    const json = await response.json()

    if (json.code == 200) {
        storeToken(json.data.token, remember)
    } else {
        throw json.data.message || json.data.email || json.data.password || 'Error'
    }

}

function logout() {
    removeToken()
}

function isLoggedIn() {
    return Boolean(getToken())
}


export { login, register, logout, isLoggedIn }