import {useEffect, useState} from "react";
import {ArticleInfo} from "../components/ArticleInfo.jsx";
import {getArticles} from "../services/API.js";

export const LatestArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticles()
            .then(data => {
                const sortedArticles = data.articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setArticles(sortedArticles);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching articles:", error));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Latest Articles</h1>
            {loading && <h3 className="text-l font-bold mb-4">Loading Articles...</h3>}
            {!loading && articles.map(article => (
                <ArticleInfo key={article.article_id} article={article}/>
            ))}
        </div>
    );
};