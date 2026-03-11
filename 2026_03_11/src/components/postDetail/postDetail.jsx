import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './postDetail.scss';

export function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        name: "",
        email: "",
        body: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);

                const response = await fetch(`http://localhost:5000/posts/${id}`);
                if (!response.ok) throw new Error("Nie znaleziono posta");

                const data = await response.json();

                setPost(data);
                setComments(data.comments);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const addComment = async () => {
        if (!newComment.name || !newComment.email || !newComment.body) return;

        const response = await fetch(`http://localhost:5000/posts/${id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newComment.name,
                email: newComment.email,
                body: newComment.body
            })
        });

        const updatedComments = await response.json();

        setComments(updatedComments);

        setNewComment({
            name: "",
            email: "",
            body: ""
        });
    };

    if (loading) return <div className="loading">Ładowanie posta...</div>;
    if (error) return <div className="error">Błąd: {error}</div>;
    if (!post) return <div className="not-found">Post nie znaleziony</div>;

    return (
        <div className="post-detail-container">
            <article className="post-detail">

                <header className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <div className="post-meta">
                        <div className="post-id">ID posta: {post.id}</div>
                    </div>
                </header>

                <div className="post-content">
                    <p>{post.body}</p>
                </div>

                <section className="comments-section">
                    <h2 className="comments-title">
                        Komentarze ({comments.length})
                    </h2>

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

                    <div className="add-comment">
                        <h3>Dodaj komentarz</h3>

                        <input
                            type="text"
                            placeholder="Twoje imię"
                            value={newComment.name}
                            onChange={(e) =>
                                setNewComment({ ...newComment, name: e.target.value })
                            }
                        />

                        <input
                            type="email"
                            placeholder="Twój email"
                            value={newComment.email}
                            onChange={(e) =>
                                setNewComment({ ...newComment, email: e.target.value })
                            }
                        />

                        <textarea
                            placeholder="Napisz komentarz..."
                            value={newComment.body}
                            onChange={(e) =>
                                setNewComment({ ...newComment, body: e.target.value })
                            }
                        />

                        <button onClick={addComment}>
                            Dodaj komentarz
                        </button>
                    </div>

                </section>

            </article>
        </div>
    );
}