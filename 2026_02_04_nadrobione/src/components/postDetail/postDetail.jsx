import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './postDetail.scss';

export function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                if (!postResponse.ok) throw new Error('Nie znaleziono posta');
                const postData = await postResponse.json();
                setPost(postData);

                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
                const userData = await userResponse.json();
                setUser(userData);

                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
                const commentsData = await commentsResponse.json();
                setComments(commentsData);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="loading">Ładowanie posta...</div>;
    if (error) return <div className="error">Błąd: {error}</div>;
    if (!post) return <div className="not-found">Post nie znaleziony</div>;

    return (
        <div className="post-detail-container">
            <article className="post-detail">
                <header className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <div className="post-meta">
                        {user && (
                            <div className="author-info">
                                <span className="author-label">Autor:</span>
                                <span className="author-name">{user.name}</span>
                                <span className="author-email">({user.email})</span>
                            </div>
                        )}
                        <div className="post-id">ID posta: {post.id}</div>
                    </div>
                </header>

                <div className="post-content">
                    <p>{post.body}</p>
                </div>

                <section className="comments-section">
                    <h2 className="comments-title">Komentarze ({comments.length})</h2>
                    <div className="comments-list">
                        {comments.map((comment) => (
                            <div key={comment.id} className="comment-card">
                                <div className="comment-header">
                                    <h3 className="comment-name">{comment.name}</h3>
                                    <span className="comment-email">{comment.email}</span>
                                </div>
                                <p className="comment-body">{comment.body}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </article>
        </div>
    );
}