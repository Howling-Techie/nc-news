import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getTopics} from "../services/API.js";
import {UserContext} from "../contexts/UserContext.jsx";

export const NavBar = () => {
    const [topics, setTopics] = useState([]);
    const [isTopicsOpen, setIsTopicsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {user} = useContext(UserContext);

    useEffect(() => {
        getTopics()
            .then(data => setTopics(data.topics))
            .catch(error => console.error("Error fetching topics:", error));
    }, []);

    return (
        <nav className="bg-gray-100 p-4 flex justify-between items-center">
            <div className="flex justify-start">
                <Link to="/" className="text-2xl font-bold">Northcoders News</Link>
            </div>
            <div className="flex space-x-4 justify-start flex-grow ml-12">
                <Link to="/" className="text-black hover:bg-gray-200 p-2 rounded">
                    Home
                </Link>
                <Link to="/all" className="text-black hover:bg-gray-200 p-2 rounded">
                    Articles
                </Link>
                <div className="rounded hover:cursor-pointer"
                     onMouseEnter={() => setIsTopicsOpen(true)}
                     onMouseLeave={() => setIsTopicsOpen(false)}>
                    <div className="text-black hover:bg-gray-200 p-2 rounded">
                        Topics
                    </div>
                    {isTopicsOpen && (
                        <div className="absolute bg-white border border-gray-300 py-2 rounded shadow-lg z-10">
                            {topics.map(topic => (
                                <Link
                                    to={`/topics/${topic.slug}`}
                                    key={topic.slug}
                                    className="block px-4 py-2 hover:bg-gray-200"
                                >
                                    {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <Link to="/submit" className="text-black hover:bg-gray-200 p-2 rounded">
                    Submit
                </Link>
            </div>
            <div className="flex flex-grow justify-end">
                {user &&
                 <div className="rounded hover:cursor-pointer"
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}>
                     <div className="text-black hover:bg-gray-200 p-2 rounded">
                         {user.name}
                     </div>
                     {isProfileOpen && (
                         <div className="absolute bg-white border border-gray-300 py-2 rounded shadow-lg z-10">
                             <Link
                                 to={`/profile`}
                                 key="profile"
                                 className="block px-4 py-2 hover:bg-gray-200"
                             >
                                 Profile
                             </Link>
                             <Link
                                 to={`/signout`}
                                 key="signout"
                                 className="block px-4 py-2 hover:bg-gray-200"
                                 onClick={() => setIsProfileOpen(false)}
                             >
                                 Sign Out
                             </Link>
                         </div>
                     )}
                 </div>}
                {!user && <Link to="/signin" className="text-black hover:bg-gray-200 p-2 rounded">Sign In</Link>}
            </div>
        </nav>
    );
};
