import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './postsList.scss';
import {fetchPosts} from "../../fetchPosts.js";
import { useQuery } from '@tanstack/react-query';

export function PostsList() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <div className="loading">Ładowanie postów...</div>;
    if (error) return <div className="error">Błąd: {error.message}</div>;


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