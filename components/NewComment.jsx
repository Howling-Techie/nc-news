import {useContext, useState} from "react";
import {UserContext} from "../contexts/UserContext.jsx";
import {postCommentByArticleId} from "../services/API.js";

export const NewComment = ({article_id, addComment, showPopup}) => {
    const {user, accessToken} = useContext(UserContext);
    const [comment, setComment] = useState("");
    const [postingComment, setPostingComment] = useState(false);
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handlePostComment = async () => {
        if (comment.trim().length === 0) {
            showPopup("Error", "Please enter a comment to add", "error");
            return;
        }
        setPostingComment(true);
        const response = await postCommentByArticleId(article_id, accessToken, comment);
        if (response.comment) {
            addComment(response.comment);
        } else {
            showPopup("Error", response.message, "error");
        }
        setPostingComment(false);
    };

    return (
        <div className="bg-white p-4 mb-4 border rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Post a Comment</h2>
            {user && <p>
                Posting as <strong className="font-bold">{user.name}</strong>
                <span className="text-gray-500 font-normal italic mb-0">{` (@${user.username})`}</span>
            </p>}
            {!user && <p>
                Please sign in to post a comment
            </p>}
            <textarea
                className={`w-full h-24 p-2 border rounded mb-4 ${(postingComment || !user) && "bg-gray-100 cursor-not-allowed"}`}
                value={comment}
                onChange={handleCommentChange}
                maxLength={500}
                placeholder="Write your comment here..."
                disabled={!user}
            />
            <div className="flex justify-end">
                <button
                    className={`w-52 bg-blue-500 text-white px-4 py-2 rounded
                    ${!(postingComment || !user) && "hover:bg-blue-600"}
                    ${(postingComment || !user) && "bg-gray-400 cursor-not-allowed"}`}
                    onClick={handlePostComment}
                    disabled={(postingComment || !user)}
                >
                    {!user ? "Please Sign In" : postingComment ? "Posting..." : "Post Comment"}
                </button>
            </div>
        </div>
    );
};
