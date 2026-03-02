import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__brand-icon">SP</div>
        <div className="header__brand-text">
          Student<span>Predict</span>
        </div>
      </div>
      <nav className="header__nav">
        <span className="header__nav-link" onClick={() => window.open('https://github.com/Loperaa-Juan/regression-ml-comparisson', '_blank')}>About</span>
        <span className="header__nav-badge">v1.0</span>
      </nav>
    </header>
  );
}
