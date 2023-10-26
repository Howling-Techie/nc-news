import ReactCardFlip from "react-card-flip";
import {useContext, useEffect, useState} from "react";
import {SignIn} from "../components/SignIn.jsx";
import {Register} from "../components/Register.jsx";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../contexts/UserContext.jsx";
import {Popup} from "../components/Popup.jsx";

export const UserSignIn = () => {
    const {user} = useContext(UserContext);

    const [flipped, setFlipped] = useState(false);
    const navigator = useNavigate();

    const [isPopupShown, setIsPopupShown] = useState(false);
    const [popupInfo, setPopupInfo] = useState({
        title: "A Default Title",
        message: "A sentence to show in the popup window",
        type: "success"
    });

    useEffect(() => {
        if (user) {
            navigator("/");
        }
    }, [navigator, user]);

    const showPopup = (title, message, type) => {
        setPopupInfo({title, message, type});
        setIsPopupShown(true);
    };

    const closePopup = () => {
        setPopupInfo({});
        setIsPopupShown(false);
    };

    const flipCard = (e) => {
        e.preventDefault();
        setFlipped(!flipped);
    };

    return (
        <>
            <ReactCardFlip isFlipped={flipped} flipDirection="horizontal" containerClassName="h-[650px]">
                <SignIn toggleForm={flipCard} showPopup={showPopup}/>
                <Register toggleForm={flipCard} showPopup={showPopup}/>
            </ReactCardFlip>
            {isPopupShown && (
                <Popup
                    title={popupInfo.title}
                    message={popupInfo.message}
                    onClose={closePopup}
                    type={popupInfo.type}
                />
            )}
        </>
    );
};