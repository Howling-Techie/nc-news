import {NavBar} from "../components/NavBar.jsx";
import {Route, Routes} from "react-router-dom";
import {LatestArticles} from "../pages/LatestArticles.jsx";
import {TopicArticles} from "../pages/TopicArticles.jsx";
import {Home} from "../pages/Home.jsx";
import {ViewArticle} from "../pages/ViewArticle.jsx";
import {UserSignIn} from "../pages/UserSignIn.jsx";

function App() {

    return (
        <>
            <NavBar/>
            <div className="container mx-auto px-4 py-8 max-w-screen-xl">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/latest" element={<LatestArticles/>}/>
                    <Route path="/topics/:topic_name" element={<TopicArticles/>}/>
                    <Route path="/articles/:article_id" element={<ViewArticle/>}/>
                    <Route path="/signin" element={<UserSignIn/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
