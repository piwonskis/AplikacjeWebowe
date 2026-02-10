import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/navbar/navbar.jsx';
import { MainHtml } from './components/mainHtml/mainHtml.jsx';
import { PostsList } from './components/postsList/postsList.jsx';
import { PostDetail } from './components/postDetail/postDetail.jsx';
import Index from './components/index/index.jsx';
import './App.scss';

function App() {
    const [count, setCount] = useState(0);

    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<MainHtml />} />
                        <Route path="/categories" element={<Index />} />
                        <Route path="/posts" element={<PostsList />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;