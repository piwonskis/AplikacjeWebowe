import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPost, fetchUser, fetchComments } from '../../fetchPosts.js';
import './postDetail.scss';

export function PostDetail() {
    const { id } = useParams();

    const {
        data: post,
        isLoading: postLoading,
        error: postError,
    } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id),
    });

    const { data: user } = useQuery({
        queryKey: ['user', post?.userId],
        queryFn: () => fetchUser(post.userId),
        enabled: !!post,
    });

    const {
        data: comments = [],
        isLoading: commentsLoading,
    } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => fetchComments(id),
    });

    if (postLoading) return <div className="loading">Ładowanie posta...</div>;
    if (postError) return <div className="error">Błąd: {postError.message}</div>;
    if (!post) return <div className="not-found">Post nie znaleziony</div>;

    return (
        <div className="post-detail-container">
            <article className="post-detail">
                <header className="post-header">
                    <h1 className="post-title">{post.title}</h1>

                    <div className="post-meta">
                        {user && (
                            <div className="author-info">
                                <span>Autor: {user.name} ({user.email})</span>
                            </div>
                        )}
                        <div>ID posta: {post.id}</div>
                    </div>
                </header>

                <div className="post-content">
                    <p>{post.body}</p>
                </div>

                <section className="comments-section">
                    <h2>Komentarze ({comments.length})</h2>

                    {commentsLoading && <p>Ładowanie komentarzy...</p>}

                    {comments.map(comment => (
                        <div key={comment.id} className="comment-card">
                            <h3>{comment.name}</h3>
                            <span>{comment.email}</span>
                            <p>{comment.body}</p>
                        </div>
                    ))}
                </section>
            </article>
        </div>
    );
}
