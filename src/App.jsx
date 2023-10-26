import {NavBar} from "../components/NavBar.jsx";
import {Route, Routes} from "react-router-dom";
import {AllArticles} from "../pages/AllArticles.jsx";
import {TopicArticles} from "../pages/TopicArticles.jsx";
import {Home} from "../pages/Home.jsx";
import {ViewArticle} from "../pages/ViewArticle.jsx";

function App() {

    return (
        <>
            <NavBar/>
            <div className="container mx-auto px-4 py-8 max-w-screen-xl">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/all" element={<AllArticles/>}/>
                    <Route path="/topics/:topic_name" element={<TopicArticles/>}/>
                    <Route path="/articles/:article_id" element={<ViewArticle/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
