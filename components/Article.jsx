import {Link} from "react-router-dom";
import {formatDate} from "../Utils/Utils.jsx";

export const Article = (article) => {
    const {author, title, topic, created_at, votes, article_img_url, comment_count, body} = article.article;

    return (
        <article className="flex flex-col">
            <section className="flex flex-col md:flex-row md:pb-4">
                <figure className="w-full md:w-1/2">
                    <img src={article_img_url} alt={title} className="w-full h-auto rounded-md"/>
                </figure>
                <section className="md:pl-4 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <summary className="text-sm hidden md:block py-1">
                        <Link to={`/topics/${topic}`} className="text-gray-700 hover:underline">
                            {topic}
                        </Link>
                    </summary>
                    <time className="text-gray-700 text-sm mb-2">
                        {formatDate(created_at)} - {author}
                    </time>
                </section>
            </section>
            <section className="pb-4">
                {body}
            </section>
            <section className="text-sm font-semibold">
                <span role="img" aria-label="votes"> 👍 {votes} votes</span> |
                <span role="img" aria-label="comments"> 💬 {comment_count} comments</span>
            </section>
        </article>
    );
};