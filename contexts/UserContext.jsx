import {createContext, useEffect, useState} from "react";
import {refreshAccessToken, registerUser, signUserIn} from "../services/UserManager.js";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedUser && storedAccessToken && storedRefreshToken) {
            setUser(storedUser);
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
        }
    }, []);

    useEffect(() => {
        const refreshTokens = async () => {
            const tokens = await refreshAccessToken(accessToken, refreshToken);
            setAccessToken(tokens.accessToken);
            setRefreshToken(tokens.refreshToken);
        };
        if (user && accessToken && refreshToken) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            refreshTokens();
        }
    }, [user, accessToken, refreshToken]);

    const register = async (username, displayName, password) => {
        const data = await registerUser(username, displayName, password);
        if (data.user) {
            setUser(data.user);
            setAccessToken(data.tokens.accessToken);
            setRefreshToken(data.tokens.refreshToken);
            return {success: true};
        } else {
            return {success: false, message: data.msg};
        }
    };
    const signIn = async (username, password) => {
        const data = await signUserIn(username, password);
        if (data.user) {
            setUser(data.user);
            setAccessToken(data.tokens.accessToken);
            setRefreshToken(data.tokens.refreshToken);
            return {success: true};
        } else {
            return {success: false, message: data.msg};
        }
    };

    const signOut = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <UserContext.Provider
            value={{
                user,
                accessToken,
                refreshToken,
                setUser,
                setAccessToken,
                setRefreshToken,
                register,
                signIn,
                signOut
            }}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};