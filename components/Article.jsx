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
                    <summary className="text-sm block py-1 text-gray-700">
                        <time className="text-sm mb-2">
                            {formatDate(created_at)} - {author}
                        </time>
                        <br/>
                        <Link to={`/topics/${topic}`} className=" hover:underline">
                            {topic}
                        </Link>
                        <br/>
                        <a href="#comments" aria-label="comments"
                           className="hover:underline"> 💬 {comment_count} comments</a>
                    </summary>
                </section>
            </section>
            <section className="pb-4">
                {body}
            </section>
            <section className="text-sm pb-4">
                <span aria-label="votes"> 👍 {votes} votes</span>
            </section>
        </article>
    );
};