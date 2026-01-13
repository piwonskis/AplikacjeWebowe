import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/navbar/navbar.jsx';
import { MainHtml } from './components/mainHtml/mainHtml.jsx';
import Index from './components/index/index.jsx';
import './App.scss';

// Komponent dla strony wpisu (możesz go później rozbudować)
function PostPage() {
    return (
        <div className="post-page">
            <h1>Lorem Ipsum</h1>
            <p>Lorem ipsum</p>
        </div>
    );
}

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
                        <Route path="/post/:id" element={<PostPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;