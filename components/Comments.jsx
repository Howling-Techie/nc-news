import {useEffect, useState} from "react";
import {getCommentsByArticleId} from "../services/API.js";
import {Comment} from "./Comment.jsx";

export const Comments = ({article_id}) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCommentsByArticleId(article_id)
            .then(data => {
                setComments(data.comments);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching article:", error));
    }, [article_id]);

    return (
        <section id="comments">
            <section className="flex flex-col p-4 border rounded-xl mb-4">
                <h1 className="text-l font-bold pb-4">{comments.length} Comment{comments.length === 1 ? "" : "s"}</h1>
                {loading && <h2 className="text-m">Loading comments...</h2>}
                {!loading &&
                 comments.map((comment) =>
                     <Comment comment={comment} key={comment.comment_id}/>)
                }
            </section>
        </section>
    );
};