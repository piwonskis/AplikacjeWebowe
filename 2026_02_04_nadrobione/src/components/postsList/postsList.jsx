import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './postsList.scss';

export function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="loading">Ładowanie postów...</div>;
    if (error) return <div className="error">Błąd: {error}</div>;

    return (
        <div className="posts-container">
            <header className="posts-header">
                <h1>Wszystkie posty</h1>
                <p>Przeglądaj wszystkie wpisy na blogu</p>
            </header>

            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-body">{post.body.substring(0, 100)}...</p>
                        <div className="post-meta">
                            <span className="post-id">ID: {post.id}</span>
                            <span className="post-user">Autor ID: {post.userId}</span>
                        </div>
                        <Link to={`/post/${post.id}`} className="read-more-btn">
                            Czytaj więcej →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}