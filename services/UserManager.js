const BASE_URL = "https://nc-news-8ccb.onrender.com/api/user";

const headers = {
    "Content-Type": "application/json",
};

// Helper function for handling response
const handleResponse = (response) => {
    return response.json();
};

// GET requests
const getCurrentUser = (token) => {
    return fetch(`${BASE_URL}/`, {method: "POST", headers, body: JSON.stringify({token})})
        .then(handleResponse);
};

const signUserIn = (username, password) => {
    return fetch(`${BASE_URL}/signin`, {method: "POST", headers, body: JSON.stringify({username, password})})
        .then(handleResponse);
};

const registerUser = (username, displayName, password) => {
    return fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers,
        body: JSON.stringify({username, name: displayName, password}),
    })
        .then(handleResponse);
};
const refreshToken = (token) => {
    return fetch(`${BASE_URL}/refresh`, {method: "POST", headers, body: JSON.stringify({token})})
        .then(handleResponse);
};

export {
    getCurrentUser,
    signUserIn,
    registerUser,
    refreshToken
};