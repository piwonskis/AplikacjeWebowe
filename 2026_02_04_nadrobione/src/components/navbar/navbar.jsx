import { Link } from 'react-router-dom';
import './navbar.scss';

export function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">MójBlog</Link>
            </div>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Strona główna</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/posts" className="navbar-link">Wszystkie posty</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/categories" className="navbar-link">Kategorie</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/post/1" className="navbar-link">Przykładowy post</Link>
                </li>
            </ul>
        </nav>
    );
}