import {useEffect, useState} from "react";
import {ArticleInfo} from "../components/ArticleInfo.jsx";

export const LatestArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch latest articles from API
        fetch("https://nc-news-8ccb.onrender.com/api/articles")
            .then(response => response.json())
            .then(data => {
                // Sort articles from newest to oldest
                const sortedArticles = data.articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setArticles(sortedArticles);
            })
            .catch(error => console.error("Error fetching articles:", error));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Latest Articles</h1>
            {articles.map(article => (
                <ArticleInfo key={article.article_id} article={article}/>
            ))}
        </div>
    );
};