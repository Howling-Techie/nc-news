import {useEffect, useState} from "react";
import {ArticleInfo} from "../components/ArticleInfo.jsx";
import {getArticles} from "../services/API.js";
import {useSearchParams} from "react-router-dom";

export const AllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [sortParams, setSortParams] = useSearchParams({});
    const [sorting, setSorting] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSorting((currentSorting) => {
                const newSort = {...currentSorting};
                newSort.sort_by = sortParams.get("sort_by") ?? "created_at";
                newSort.order = sortParams.get("order") ?? "desc";
                return newSort;
            }
        );
    }, [sortParams]);

    useEffect(() => {
        if (!sorting.sort_by) {
            return;
        }
        getArticles(10, sorting.sort_by, sorting.order, sorting.offset)
            .then(data => {
                const sortedArticles = data.articles;
                setArticles(sortedArticles);
            })
            .then(() => {
                setLoading(false);
            })
            .catch(error => console.error("Error fetching articles:", error));
        document.getElementById("sorting").value = sorting.sort_by + "-" + sorting.order;

    }, [sorting]);

    const handleSortChange = (e) => {
        console.log(`DROP DOWN CHANGED TO ${e.target.value}`);
        const [field, order] = e.target.value.split("-");
        setSortParams({sort_by: field, order: order});
    };

    return (
        <div>
            <section className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-2">All articles</h1>
                <select
                    id="sorting"
                    onChange={handleSortChange}
                    className="p-2 border rounded"
                >
                    <option value="created_at-desc">Sort by Date (Newest First)</option>
                    <option value="created_at-asc">Sort by Date (Oldest First)</option>
                    <option value="votes-desc">Sort by Votes (Highest First)</option>
                    <option value="votes-asc">Sort by Votes (Lowest First)</option>
                    <option value="comment_count-desc">Sort by Comments (Highest First)</option>
                    <option value="comment_count-asc">Sort by Comments (Lowest First)</option>
                </select>
            </section>
            {loading && <h3 className="text-l font-bold mb-4">Loading Articles...</h3>}
            {!loading && articles.map(article => (
                <ArticleInfo key={article.article_id} article={article}/>
            ))}
        </div>
    );
};