import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./mainHtml.scss";

export function MainHtml() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFirstPost = async () => {
            try {
                const response = await fetch("http://localhost:5000/posts");
                if (!response.ok) {
                    throw new Error("Błąd pobierania postów");
                }

                const data = await response.json();
                setPost(data[0]); // pierwszy post
                setLoading(false);

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFirstPost();
    }, []);

    if (loading) return <div>Ładowanie...</div>;
    if (error) return <div>Błąd: {error}</div>;

    return (
        <div className="main-container">
            <header className="main-header">
                <h1 className="main-title">Witaj na moim blogu!</h1>
                <p className="main-subtitle">Miejsce na Twoje wpisy i przemyślenia</p>
            </header>

            <section className="main-content">
                {post && (
                    <div className="post-card">
                        <h2>{post.title}</h2>
                        <p className="post-date">ID: {post.id}</p>
                        <p className="post-excerpt">
                            {post.body.substring(0, 100)}...
                        </p>

                        <Link to={`/post/${post.id}`} className="read-more-btn">
                            Czytaj więcej
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}