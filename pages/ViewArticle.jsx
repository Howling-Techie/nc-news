import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getArticleById} from "../services/API.js";
import {Article} from "../components/Article.jsx";

export const ViewArticle = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticleById(article_id)
            .then(data => {
                setArticle(data.article);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching article:", error));
    }, [article_id]);

    return (
        <div>
            {loading && <h1 className="text-l font-bold mb-4">Loading Article...</h1>}
            {!loading &&
             <Article article={article}/>
            }
        </div>
    );
};