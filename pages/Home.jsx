import {useEffect, useState} from "react";
import {getArticles, getArticlesByTopic, getTopics} from "../services/API.js";
import {ArticleRow} from "../components/ArticleRow.jsx";

export const Home = () => {
    const [articles, setArticles] = useState({});
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const getTopicList = async () => {
            const topicData = await getTopics();
            setTopics(topicData.topics);

            const articleData = await getArticles(4);
            const sortedArticles = {};
            sortedArticles.latest = articleData.articles;
            for (const topic of topicData.topics) {
                const topicArticles = await getArticlesByTopic(topic.slug, 4);
                sortedArticles[topic.slug] = topicArticles.articles;
            }
            setArticles(sortedArticles);
            setLoading(false);
        };
        getTopicList();
    }, []);

    return (
        <>
            {loading && <h2 className="text-l font-bold mb-4">Loading Articles...</h2>}
            {!loading && <ArticleRow title={"Latest"} articles={articles.latest} path={`/latest`}
                                     description={"The latest and greatest articles on the site!"}/>}
            {!loading && topics.map((topic) => (
                <ArticleRow key={topic.slug} title={topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                            description={topic.description}
                            articles={articles[topic.slug]}
                            path={`/topics/${topic.slug}`}/>))}
        </>
    );
};