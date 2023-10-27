import {Link} from "react-router-dom";
import {formatDate} from "../Utils/Utils.jsx";
import {useContext, useEffect, useState} from "react";
import {patchArticleVote} from "../services/API.js";
import {UserContext} from "../contexts/UserContext.jsx";

export const Article = ({article, showPopup}) => {
    const {
        article_id,
        author,
        title,
        topic,
        created_at,
        votes,
        article_img_url,
        comment_count,
        body,
        user_vote
    } = article;
    const {user, accessToken} = useContext(UserContext);
    const [currentVote, setCurrentVote] = useState(0);
    const [totalVotes, setTotalVotes] = useState(votes);
    const handleVote = async (newVote) => {
        const oldVote = totalVotes;
        const oldUserVote = currentVote;
        setCurrentVote(newVote);
        setTotalVotes(currentTotal => currentTotal - currentVote + newVote);
        const response = await patchArticleVote(article_id, newVote, accessToken);
        console.log(response);
        if (response.article) {
            setTotalVotes(() => response.article.votes);
        } else {
            setCurrentVote(() => oldUserVote);
            setTotalVotes(() => oldVote);
            showPopup("Error", "Sorry, failed to submit your vote at this time, please try again later", "error");
        }
    };

    useEffect(() => {
        setCurrentVote(user_vote);
    }, [user_vote]);

    return (
        <article className="flex flex-col md:p-4 mb-4 border rounded-xl">
            <section className="flex flex-col md:flex-row md:mb-4 md:border rounded-md">
                <figure className="w-full md:w-1/3 ">
                    <img src={article_img_url} alt={title} className="h-full rounded-md object-cover"/>
                </figure>
                <section className="px-4 flex flex-col justify-center ">
                    <Link to={`/topics/${topic}`} className="ml-1 pt-1 hover:underline">
                        {topic}
                    </Link>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <summary className="text-sm block py-1 text-gray-700">
                        By {author}
                        <br/>
                        <time className="text-sm mb-2">
                            {formatDate(created_at)}
                        </time>
                        <br/>
                        <p className="py-2"><a href="#comments" aria-label="comments"> 💬 <span
                            className="underline">{comment_count} comments</span></a>
                        </p>
                        {user && <section className="inline-flex items-center" aria-label="article votes">
                            <button
                                aria-label="vote article down"
                                className={`border-gray-500 border font-bold py-1 px-2 rounded-l ${currentVote === -1 ? "bg-red-600 text-white hover:bg-red-900" : "text-red-500 hover:bg-gray-500 hover:text-gray-50"}`}
                                onClick={() => handleVote(currentVote === -1 ? 0 : -1)}
                            >
                                -1
                            </button>
                            <div className="border-gray-500 border-t border-b py-1 px-6">
                                {totalVotes}
                            </div>
                            <button
                                aria-label="vote article up"
                                className={`border-gray-500 border font-bold py-1 px-2 rounded-r ${currentVote === 1 ? "bg-green-600 text-white hover:bg-green-900" : "text-green-500 hover:bg-gray-500 hover:text-gray-50"}`}
                                onClick={() => handleVote(currentVote === 1 ? 0 : 1)}
                            >
                                +1
                            </button>
                        </section>
                        }
                        {!user && <section className="text-sm pb-4">
                            <span aria-label="votes"> 👍 {totalVotes} vote{totalVotes !== 1 && "s"}</span>
                            <p className="italic">Please sign in to vote on articles</p>
                        </section>}
                    </summary>
                </section>
            </section>
            <section className="px-2 pt-2 md:pt-0 pb-4">
                {body}
            </section>
        </article>
    );
};