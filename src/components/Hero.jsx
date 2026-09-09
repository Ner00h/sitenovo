import { useEffect, useState } from 'react';
import SectionReveal from './SectionReveal';
import { PrinterVisual } from './PrinterProjects';
import './Hero.css';

const WORDS = ['Profissional', 'Industrial', 'Inovadora', 'Precisa', 'Avançada'];

function AnimatedStat({ value, suffix, label }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        const duration = 2000;
        const target = parseInt(value, 10);

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
            setCount(Math.floor(easeOut * target));

            if (percentage < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };
        requestAnimationFrame(animate);
    }, [value]);

    return (
        <div className="hero-stat">
            <span className="hero-stat-value gradient-text">{count}{suffix}</span>
            <span className="hero-stat-label">{label}</span>
        </div>
    );
}

const PRINT_MODELS = [
    { id: 'ipr1', color: 'blue', name: 'Engrenagem Planetária', machine: 'FDM CoreXY' },
    { id: 'pr2', color: 'purple', name: 'Bocal Aerodinâmico', machine: 'FDM High-Temp' },
    { id: 'pr3', color: 'gold', name: 'Grip Auxético Bio', machine: 'Resina UV SLA' },
];

export default function Hero() {
    const [wordIdx, setWordIdx] = useState(0);
    const [fading, setFading] = useState(false);
    const [modelIdx, setModelIdx] = useState(0);

    // Auto-cycle through the 3 models every 6 seconds (exact print cycle duration)
    useEffect(() => {
        const interval = setInterval(() => {
            setModelIdx(i => (i + 1) % PRINT_MODELS.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // Rotating words
    useEffect(() => {
        const interval = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setWordIdx(i => (i + 1) % WORDS.length);
                setFading(false);
            }, 400);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    const activeModel = PRINT_MODELS[modelIdx];

    return (
        <section className="hero" id="hero">
            {/* Floating printer & Stats */}
            <div className="hero-printer-wrap">
                <div className="hero-printer">
                    <PrinterVisual
                        key={activeModel.id}
                        color={activeModel.color}
                        printer={activeModel}
                    />
                </div>

                {/* Model switcher pills */}
                <div className="hero-model-switcher">
                    {PRINT_MODELS.map((model, idx) => (
                        <button
                            key={model.id}
                            type="button"
                            className={`hero-model-pill ${modelIdx === idx ? 'active' : ''} pill--${model.color}`}
                            onClick={() => setModelIdx(idx)}
                            title={`Alternar para ${model.name}`}
                        >
                            <span className="pill-dot" />
                            <span className="pill-name">{model.name}</span>
                        </button>
                    ))}
                </div>

                {/* Stats bar */}
                <SectionReveal delay={550}>
                    <div className="hero-stats">
                        {[
                            { value: '500', suffix: '+', label: 'Projetos Entregues' },
                            { value: '7', suffix: '+', label: 'Anos de Experiência' },
                            { value: '3', suffix: '', label: 'Projetos Autorais de Impressoras 3D' },
                            { value: '100', suffix: '%', label: 'Precisão Industrial' },
                        ].map((stat) => (
                            <AnimatedStat key={stat.label} {...stat} />
                        ))}
                    </div>
                </SectionReveal>
            </div>

            {/* Hero content */}
            <div className="container">
                <div className="hero-content">
                    <SectionReveal delay={100}>
                        <span className="label-tag hero-tag">⬡ Impressão 3D Profissional - Manufatura Aditiva</span>
                    </SectionReveal>

                    <SectionReveal delay={200}>
                        <h1 className="hero-title">
                            Manufatura Aditiva<br />
                            <span className={`hero-rotating-word gradient-text ${fading ? 'word-fade' : ''}`}>
                                {WORDS[wordIdx]}
                            </span>
                        </h1>
                    </SectionReveal>

                    <SectionReveal delay={350}>
                        <p className="hero-description">
                            Da ideia para vida real. desenvolvemos soluções em impressão 3D
                            para qual for a necessidade, Buscamos entender a fundo cada projeto e aplicar a solução personalizada que você ou sua empresa precisa.
                        </p>
                    </SectionReveal>

                    <SectionReveal delay={450}>
                        <div className="hero-actions">
                            <a href="#industrial" className="btn-primary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                                    <line x1="12" y1="2" x2="12" y2="22" />
                                    <line x1="2" y1="8.5" x2="22" y2="8.5" />
                                </svg>
                                Ver Projetos
                            </a>
                            <a href="#printers" className="btn-outline">
                                Impressoras Customizadas
                            </a>
                        </div>
                    </SectionReveal>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-hint">
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span>Scroll</span>
            </div>

            {/* Grid overlay */}
            <div className="hero-grid" aria-hidden="true" />
        </section>
    );
}
