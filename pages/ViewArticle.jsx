import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getArticleById} from "../services/API.js";
import {Article} from "../components/Article.jsx";
import {Comments} from "../components/Comments.jsx";
import {Popup} from "../components/Popup.jsx";

export const ViewArticle = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isPopupShown, setIsPopupShown] = useState(false);
    const [popupInfo, setPopupInfo] = useState({
        title: "A Default Title",
        message: "A sentence to show in the popup window",
        type: "success"
    });

    useEffect(() => {
        getArticleById(article_id)
            .then(data => {
                setArticle(data.article);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching article:", error));
    }, [article_id]);

    const showPopup = (title, message, type) => {
        setPopupInfo({title, message, type});
        setIsPopupShown(true);
    };

    const closePopup = () => {
        setPopupInfo({});
        setIsPopupShown(false);
    };

    return (
        <div>
            {loading && <h1 className="text-l font-bold mb-4">Loading Article...</h1>}
            {!loading && <>
                <Article article={article}/>
                <Comments article_id={article.article_id} showPopup={showPopup}/>
            </>
            }
            {isPopupShown && (
                <Popup
                    title={popupInfo.title}
                    message={popupInfo.message}
                    onClose={closePopup}
                    type={popupInfo.type}
                />
            )}
        </div>
    );
};