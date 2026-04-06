import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="cosmic-divider" />
            <div className="footer-inner container">
                {/* Brand */}
                <div className="footer-brand">
                    <svg width="100" height="28" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
                            </linearGradient>
                        </defs>
                        <polygon points="14,2 26,9 26,23 14,30 2,23 2,9" stroke="url(#footerGrad)" strokeWidth="1.5" fill="none" />
                        <text x="9" y="22" fontFamily="Outfit, sans-serif" fontSize="14" fontWeight="700" fill="url(#footerGrad)">N</text>
                        <text x="34" y="22" fontFamily="Outfit, sans-serif" fontSize="18" fontWeight="700" fill="rgba(255,255,255,0.4)" letterSpacing="-0.5">EROOH</text>
                    </svg>
                    <p>Manufatura Aditiva Profissional</p>
                </div>

                {/* Nav */}
                <div className="footer-nav">
                    <p className="footer-nav-title">Navegação</p>
                    <ul>
                        {['Sobre', 'Projetos Industriais', 'Impressoras', 'Capacidades', 'Contato'].map(l => (
                            <li key={l}><a href={`#${l.toLowerCase().replace(' ', '')}`}>{l}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Tech */}
                <div className="footer-nav">
                    <p className="footer-nav-title">Tecnologias</p>
                    <ul>
                        {['FDM / FFF', 'SLS / MJF', 'Metal AM', 'CoreXY', 'Klipper', 'DfAM'].map(t => (
                            <li key={t}><span className="footer-tech">{t}</span></li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="footer-bottom container">
                <p>&copy; {year} Nerooh. Todos os direitos reservados.</p>
                <p className="footer-made">
                    Feito com{' '}
                    <span className="gradient-text" style={{ fontWeight: 700 }}>precisão</span>
                    {' '}e{' '}
                    <span className="gradient-text" style={{ fontWeight: 700 }}>paixão</span>
                </p>
            </div>
        </footer>
    );
}
