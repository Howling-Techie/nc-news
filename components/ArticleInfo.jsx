import {Link} from "react-router-dom";

export const ArticleInfo = ({article}) => {
    const {title, article_id, votes, article_img_url, comment_count, topic, created_at, author} = article;

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
                <div className="text-sm hidden md:block py-1">
                    <Link to={`/topics/${topic}`} className="text-gray-700 hover:underline">
                        {topic}
                    </Link>
                </div>
                <div className="text-gray-700 text-sm mb-2">
                    {formatDate(created_at)} - {author}
                </div>
                <div className="text-sm font-bold hidden md:block">
                    <span role="img" aria-label="votes"> 👍 {votes} votes</span> |
                    <span role="img" aria-label="comments"> 💬 {comment_count} comments</span>
                </div>
            </summary>
        </section>
    );
};