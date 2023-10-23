import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export const NavBar = () => {
    const [topics, setTopics] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Fetch topics from API
        fetch("https://nc-news-8ccb.onrender.com/api/topics")
            .then(response => response.json())
            .then(data => setTopics(data.topics))
            .catch(error => console.error("Error fetching topics:", error));
    }, []);

    return (
        <nav className="bg-gray-100 p-4 flex justify-between items-center">
            <div className="flex-grow">
                <Link to="/" className="text-2xl font-bold">Northcoders News</Link>
            </div>
            <div className="flex space-x-4 justify-center flex-grow">
                <Link to="/latest" className="text-black hover:bg-gray-200 p-2 rounded">
                    Latest
                </Link>
                <div className="py-2 rounded"
                     onMouseEnter={() => setIsOpen(true)}
                     onMouseLeave={() => setIsOpen(false)}>
                    <Link to="/topics" className="text-black hover:bg-gray-200 p-2 rounded">
                        Topics
                    </Link>
                    {isOpen && (
                        <div className="absolute bg-white border border-gray-300 py-2 rounded shadow-lg">
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
                <Link to="/profile" className="text-black hover:bg-gray-200 p-2 rounded">Profile</Link>
            </div>
        </nav>
    );
};
