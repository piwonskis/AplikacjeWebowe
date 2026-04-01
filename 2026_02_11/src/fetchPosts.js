
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};


export const fetchPost = async (id) => {
    const res = await fetch(`${BASE_URL}/posts/${id}`);
    if (!res.ok) throw new Error('Nie znaleziono posta');
    return res.json();
};

export const fetchUser = async (userId) => {
    const res = await fetch(`${BASE_URL}/users/${userId}`);
    if (!res.ok) throw new Error('Nie znaleziono użytkownika');
    return res.json();
};

export const fetchComments = async (postId) => {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    if (!res.ok) throw new Error('Błąd ładowania komentarzy');
    return res.json();
};
