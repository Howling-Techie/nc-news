import ReactCardFlip from "react-card-flip";
import {useState} from "react";
import {SignIn} from "../components/SignIn.jsx";
import {Register} from "../components/Register.jsx";

export const UserSignIn = () => {

    const [flipped, setFlipped] = useState(false);

    const flipCard = (e) => {
        e.preventDefault();
        setFlipped(!flipped);
    };
    return (
        <ReactCardFlip isFlipped={flipped} flipDirection="horizontal" containerClassName="h-[650px]">
            <SignIn toggleForm={flipCard}/>
            <Register toggleForm={flipCard}/>
        </ReactCardFlip>
    );
};