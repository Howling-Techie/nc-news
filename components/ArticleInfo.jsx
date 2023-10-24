import {Link} from "react-router-dom";

export const ArticleInfo = ({article}) => {
    const {author, title, article_id, topic, created_at, votes, article_img_url, comment_count} = article;

    const formatDate = (dateString) => {
        const options = {year: "numeric", month: "long", day: "numeric"};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <section className="flex mb-4">
            <figure className="w-1/4 pr-4">
                <img src={article_img_url} alt={title} className="w-full h-auto rounded-md"/>
            </figure>
            <summary className="w-3/4 flex flex-col justify-center">
                <Link to={`/articles/${article_id}`} className="text-2xl font-bold hover:underline">{title}</Link>
                <details className="text-sm hidden md:block py-1">
                    <Link to={`/topics/${topic}`} className="text-gray-700 hover:underline">
                        {topic}
                    </Link>
                </details>
                <details className="text-gray-700 text-sm mb-2">
                    {formatDate(created_at)} - {author}
                </details>
                <details className="text-sm font-bold  hidden md:block">
                    <span role="img" aria-label="votes"> 👍 {votes} votes</span> |
                    <span role="img" aria-label="comments"> 💬 {comment_count} comments</span>
                </details>
            </summary>
        </section>
    );
};