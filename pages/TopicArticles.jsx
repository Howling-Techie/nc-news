import {useEffect, useState} from "react";
import {ArticleInfo} from "../components/ArticleInfo.jsx";
import {useParams} from "react-router-dom";
import {getArticles} from "../services/API.js";

export const TopicArticles = () => {
    const {topic_name} = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch latest articles from API
        getArticles()
            .then(data => {
                // Sort articles from newest to oldest, filtered by topic
                const sortedArticles = data.articles.filter(article => article.topic === topic_name).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setArticles(sortedArticles);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching articles:", error));
    }, [topic_name]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Latest Articles tagged {"\"" + topic_name + "\""}</h1>
            {loading && <h3 className="text-l font-bold mb-4">Loading Articles...</h3>}
            {!loading && articles.map(article => (
                <ArticleInfo key={article.article_id} article={article}/>
            ))}
        </div>
    );
};