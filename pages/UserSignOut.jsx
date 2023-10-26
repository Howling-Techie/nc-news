import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../contexts/UserContext.jsx";

export const UserSignOut = () => {
    const {user, signOut} = useContext(UserContext);
    const navigator = useNavigate();

    useEffect(() => {
        signOut();
        if (!user) {
            navigator("/");
        }
    }, [navigator, signOut, user]);
    return (
        <h2 className="text-2xl font-bold mb-4">Signing Out...</h2>
    );
};