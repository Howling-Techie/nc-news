import {useEffect, useState} from "react";
import {ArticleInfo} from "../components/ArticleInfo.jsx";
import {useParams} from "react-router-dom";
import {getArticles, getTopics} from "../services/API.js";

export const TopicArticles = () => {
    const {topic_name} = useParams();
    const [topic, setTopic] = useState({});
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticles()
            .then(data => {
                const sortedArticles = data.articles.filter(article => article.topic === topic_name).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setArticles(sortedArticles);
            })
            .then(() => {
                return getTopics();
            })
            .then((topicData) => {
                setTopic(topicData.topics.find((topic) => topic.slug === topic_name));
                setLoading(false);
            })
            .catch(error => console.error("Error fetching articles:", error));
    }, [topic_name]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Latest {"\"" + topic_name + "\""} articles</h1>
            <h2 className="text-l mb-4">{topic.description}</h2>
            {loading && <h2 className="text-l font-bold mb-4">Loading Articles...</h2>}
            {!loading && articles.map(article => (
                <ArticleInfo key={article.article_id} article={article}/>
            ))}
        </div>
    );
};