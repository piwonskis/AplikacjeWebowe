import './index.scss';

export default function Index() {
    const categories = [
        { name: 'React', postCount: 0 },
        { name: 'JavaScript', postCount: 0 },
        { name: 'CSS', postCount: 0 },
        { name: 'HTML', postCount: 0 },
        { name: 'Node.js', postCount: 0 },
    ];

    return (
        <div className="categories-container">
            <header className="categories-header">
                <h1>Kategorie</h1>
                <p>Przeglądaj wpisy według kategorii</p>
            </header>

            <div className="categories-grid">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <div className="category-icon"></div>
                        <h3 className="category-name">{category.name}</h3>
                        <p className="category-count">{category.postCount} wpisów</p>
                        <a href={`/category/${category.name.toLowerCase()}`} className="category-link">
                            Zobacz wpisy →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}