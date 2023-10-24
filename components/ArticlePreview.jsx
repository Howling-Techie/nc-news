import {Link} from "react-router-dom";

export const ArticlePreview = ({article}) => {
    const {title, article_id, created_at, votes, article_img_url, comment_count} = article;

    return (
        <article className="relative group flex-shrink-0 flex-grow-0 mr-4 snap-start">
            <Link to={`/articles/${article_id}`}>
                <img
                    src={article_img_url}
                    alt={title}
                    className="h-56 w-84 rounded-lg object-cover transition-transform transform"
                />
                <div
                    className="absolute inset-x-0 top-0 rounded-lg bg-black bg-opacity-50 text-white p-2">
                    <p className="mb-1">{title}</p>
                </div>
                <div
                    className="absolute rounded-lg inset-x-0 top-40 bg-black bg-opacity-50 text-white p-2 transform transition-transform group-hover:translate-y-0 translate-y-full">
                    <section className="mb-1">
          <span role="img" aria-label="Votes">
            👍
          </span>{" "}
                        {votes}{" "}
                        <span role="img" aria-label="Comments">
            💬
          </span>{" "}
                        {comment_count}
                    </section>
                    <time>{new Date(created_at).toLocaleDateString()}</time>
                </div>
            </Link>
        </article>
    );
};