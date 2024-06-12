import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export const refresh = async () => {

    const userSessionString = localStorage.getItem('userSession');
    if (!userSessionString) {
        throw new Error('User session not found in localStorage');
    }

    const userSession = JSON.parse(userSessionString);
    const token = userSession.token;
    const email = userSession.email;

    try {
        const response = await axios.post(`${api}/auth/refresh`, {
            token: token,
            email: email
        });

        const newToken = response.data.newToken;

        userSession.token = newToken;


        localStorage.setItem('userSession', JSON.stringify(userSession));


        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            throw new Error('Token expired');
        } else {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }
}

