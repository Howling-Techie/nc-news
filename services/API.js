const BASE_URL = "https://nc-news-8ccb.onrender.com/api";

const headers = {
    "Content-Type": "application/json",
};

// Helper function for handling response
const handleResponse = (response) => {
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
};

// GET requests
const getTopics = () => {
    return fetch(`${BASE_URL}/topics`, {headers})
        .then(handleResponse);
};

const getUsers = () => {
    return fetch(`${BASE_URL}/users`, {headers})
        .then(handleResponse);
};

const getUserById = (userId) => {
    return fetch(`${BASE_URL}/users/${userId}`, {headers})
        .then(handleResponse);
};

const getArticles = () => {
    return fetch(`${BASE_URL}/articles`, {headers})
        .then(handleResponse);
};

const getArticleById = (articleId) => {
    return fetch(`${BASE_URL}/articles/${articleId}`, {headers})
        .then(handleResponse);
};

const getArticlesByTopic = (topic) => {
    return fetch(`${BASE_URL}/articles?topic=${topic}`, {headers})
        .then(handleResponse);
};

const getCommentsByArticleId = (articleId) => {
    return fetch(`${BASE_URL}/articles/${articleId}/comments`, {headers})
        .then(handleResponse);
};

// POST requests
const postTopic = (topicData) => {
    return fetch(`${BASE_URL}/topics`, {
        method: "POST",
        headers,
        body: JSON.stringify(topicData),
    })
        .then(handleResponse);
};

const postArticle = (articleData) => {
    return fetch(`${BASE_URL}/articles`, {
        method: "POST",
        headers,
        body: JSON.stringify(articleData),
    })
        .then(handleResponse);
};

const postCommentByArticleId = (articleId, commentData) => {
    return fetch(`${BASE_URL}/articles/${articleId}/comments`, {
        method: "POST",
        headers,
        body: JSON.stringify(commentData),
    })
        .then(handleResponse);
};

export {
    getTopics,
    getUsers,
    getUserById,
    getArticles,
    getArticleById,
    getArticlesByTopic,
    getCommentsByArticleId,
    postTopic,
    postArticle,
    postCommentByArticleId,
};