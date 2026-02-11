import './mainHtml.scss';

export function MainHtml() {
    return (
        <div className="main-container">
            <header className="main-header">
                <h1 className="main-title">Witaj na moim blogu!</h1>
                <p className="main-subtitle">Miejsce na Twoje wpisy i przemyślenia</p>
            </header>

            <section className="main-content">
                <div className="post-card">
                    <h2>Lorem ispum</h2>
                    <p className="post-date">Data: 2024-01-15</p>
                    <p className="post-excerpt">
                        Lorem ispum
                    </p>
                    <a href="/post/1" className="read-more-btn">Czytaj więcej</a>
                </div>
            </section>
        </div>
    );
}