import {getUserById} from "../services/API.js";
import {useEffect, useState} from "react";
import {formatDate} from "../Utils/Utils.jsx";

export const Comment = ({comment}) => {
    const {body, comment_id, created_at, author, votes} = comment;

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
        <div className="flex p-4 border rounded-xl mb-4">
            <div className="flex-shrink-0 mr-4">
                <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-12 h-12"
                />
            </div>
            <div className="flex-1">
                {loading && <span className="font-bold">Loading User Info...</span>}
                {!loading && <><span className="font-bold">{user.name}</span>
                    <span className="text-gray-500 font-normal italic mb-0">{`   @${user.username}`}</span>
                </>}
                <div className="text-xs text-gray-500">{formatDate(created_at, true)}</div>
                <div className="my-2 text-md font-normal">{body}</div>
                <div className="items-center inline-flex">
                    <button aria-label="vote comment down"
                            className="border-gray-600 border hover:bg-gray-600 hover:border-gray-600 text-red-500 hover:text-gray-50 font-bold py-1 px-2 rounded-l">
                        <span>-1</span>
                    </button>
                    <div
                        className="border-gray-600 border-t border-b text-gray-800 font-semibold py-1 px-6">{votes}</div>
                    <button aria-label="vote comment up"
                            className="border-gray-600 border hover:bg-gray-600 hover:border-gray-600 font-bold py-1 px-2 rounded-r text-green-500 hover:text-gray-50">
                        <span>+1</span>
                    </button>
                </div>
            </div>
        </div>
    );
};