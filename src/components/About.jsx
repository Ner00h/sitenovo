import SectionReveal from './SectionReveal';
import './About.css';

const MANIFESTO = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
        title: 'Tecnologia de Ponta',
        text: 'Utilizamos e desenvolvemos impressoras 3D de alta precisão para garantir qualidade e precisão em cada projeto de manufatura aditiva.',
        color: 'blue',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Qualidade',
        text: 'Processos decontrole de qualidade garantem que cada peça atenda às especificações técnicas mais exigentes.',
        color: 'purple',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
            </svg>
        ),
        title: 'Inovação Contínua',
        text: ' Sempre atentos ao avanço da tecnologia para oferecer o melhor resultado para cada projeto.',
        color: 'gold',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        title: 'Visão Global',
        text: 'Comprometidos com o avanço da manufatura aditiva no Brasil e no mundo, democratizando acesso a tecnologias avançadas.',
        color: 'blue',
    },
];

export default function About() {
    return (
        <section className="about" id="about">
            <div className="container">
                <SectionReveal>
                    <div className="section-header">
                        <span className="label-tag">⬡ Sobre </span>
                        <h2>Manufatura Aditiva<br /><span className="gradient-text">Redefinida</span></h2>
                        <p>
                            Somos referência em manufatura aditiva profissional,
                            combinando engenharia de precisão com inovação e Tecnologia.
                            Desenvolvemos desde projetos técnicos a modelos conceituais, prototipagem e Projetos Artisticos.
                            Com amplo conhecimento das ferramentas ultilizadas a fim de objeter resultado mesmo partindo do zero.
                        </p>
                    </div>
                </SectionReveal>

                <div className="about-grid">
                    {MANIFESTO.map(({ icon, title, text, color }, i) => (
                        <SectionReveal key={title} delay={i * 100}>
                            <div className={`about-card about-card--${color}`}>
                                <div className="about-card-icon">{icon}</div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                                <div className="about-card-shimmer" />
                            </div>
                        </SectionReveal>
                    ))}
                </div>

                {/* Quote line */}
                <SectionReveal delay={200}>
                    <div className="about-quote">
                        <div className="about-quote-line" />
                        <p className="about-quote-text">
                            "Do filamento à peça final — cada detalhe importa."
                        </p>
                        <div className="about-quote-line" />
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}
