import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const LINKS = [
    { href: '#about', label: 'Sobre' },
    { href: '#industrial', label: 'Projetos Industriais' },
    { href: '#printers', label: 'Impressoras' },
    { href: '#capabilities', label: 'Capacidades' },
    { href: '#contact', label: 'Contato' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
            <div className="navbar-inner container">
                {/* Logo Container from Reference Repo */}
                <div className="logo-container">
                    <a href="#" onClick={() => setMenuOpen(false)}>
                        <img src="/logo2.svg" alt="Nerooh Logo" className="logo" />
                    </a>
                    <span className="typing-text"></span>
                </div>

                {/* Desktop Nav */}
                <ul className="navbar-links">
                    {LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <a href={href} className="nav-link" onClick={() => setMenuOpen(false)}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a href="#contact" className="navbar-cta btn-primary" onClick={() => setMenuOpen(false)}>
                    Fale Conosco
                </a>

                {/* Hamburger */}
                <button
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(p => !p)}
                    aria-label="Menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                {LINKS.map(({ href, label }) => (
                    <a key={href} href={href} className="mobile-link" onClick={() => setMenuOpen(false)}>
                        {label}
                    </a>
                ))}
                <a href="#contact" className="btn-primary mobile-cta" onClick={() => setMenuOpen(false)}>
                    Fale Conosco
                </a>
            </div>
        </nav>
    );
}
