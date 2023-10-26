import {useEffect, useState} from "react";
import {getCommentsByArticleId} from "../services/API.js";
import {Comment} from "./Comment.jsx";
import {NewComment} from "./NewComment.jsx";

export const Comments = ({article_id, showPopup}) => {
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

    const addComment = (newComment) => {
        setComments(currentComments => [newComment, ...currentComments]);
    };

    return (
        <section id="comments" className="flex flex-col p-4 border rounded-xl mb-4">
            <h1 className="text-xl font-bold pb-4">{comments.length} Comment{comments.length === 1 ? "" : "s"}</h1>
            <NewComment article_id={article_id} addComment={addComment} showPopup={showPopup}/>
            {loading && <h2 className="text-m">Loading comments...</h2>}
            {!loading &&
             comments.map((comment) =>
                 <Comment comment={comment} key={comment.comment_id}/>)
            }
        </section>
    );
};