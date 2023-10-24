import {ArticlePreview} from "./ArticlePreview.jsx";

export const ArticleRow = ({title, path, articles, description}) => {
    return (
        <div className="w-full pt-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <h2 className="text-lg mb-2">{description}</h2>
            <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide snap-x">
                {articles.map((article) => (
                    <ArticlePreview key={article.article_id} article={article}/>
                ))}
            </div>
            <div className="text-right mt-2">
                <a href={path} className="text-blue-600 hover:underline">
                    View All
                </a>
            </div>
        </div>
    );
};