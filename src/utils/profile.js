import { getToken } from "./tokenStorage";

export default async function getProfile() {
    const url = import.meta.env.VITE_API+'/api/profile';
    const bearerToken = getToken();
    if (!bearerToken) throw 'Unauthenticated'
    const requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + bearerToken,
            'Accept': 'application/json'
        }
    }
    const response = await fetch(url, requestOptions)
    const json = await response.json()
    if (json.code == 200) {
        return json.data.user
    } else {
        throw json.data.message || 'Error'
    }
}