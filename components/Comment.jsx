import {getUserById} from "../services/API.js";
import {useEffect, useState} from "react";
import {formatDate} from "../Utils/Utils.jsx";

export const Comment = ({comment}) => {
    const {body, comment_id, created_at, author, votes, user_vote = 0} = comment;

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserById(author)
            .then(data => {
                setUser(data.user);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching user:", error));
    }, [author]);

    return (
        <article className="flex p-4 border rounded-xl mb-4">
            <figure className="flex-shrink-0 mr-4">
                {!loading && <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-12 h-12"
                />}
            </figure>
            <section className="flex-1">
                {loading && <strong className="font-bold">Loading User Info for @${author}</strong>}
                {!loading && (
                    <>
                        <strong className="font-bold">{user.name}</strong>
                        <span className="text-gray-500 font-normal italic mb-0">{`   @${user.username}`}</span>
                    </>
                )}
                <time className="text-xs text-gray-500 block" dateTime={created_at}>
                    {formatDate(created_at, true)}
                </time>
                <p className="my-2 text-md font-normal">{body}</p>
                <div className="inline-flex items-center" aria-label="comment votes">
                    <button
                        aria-label="vote comment down"
                        className="border-gray-500 border hover:bg-gray-500 text-red-500 hover:text-gray-50 font-bold py-1 px-2 rounded-l"
                    >
                        -1
                    </button>
                    <div className="border-gray-500 border-t border-b py-1 px-6">
                        {votes}
                    </div>
                    <button
                        aria-label="vote comment up"
                        className="border-gray-500 border hover:bg-gray-500 font-bold py-1 px-2 rounded-r text-green-500 hover:text-gray-50"
                    >
                        +1
                    </button>
                </div>
            </section>
        </article>
    );
};