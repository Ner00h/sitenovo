import { useState, useRef, useEffect } from 'react';
import SectionReveal from './SectionReveal';
import './About.css';

const STEPS = [
    {
        id: 'quem-somos',
        badge: 'Nossa Essência',
        number: '⬡',
        title: 'Quem Somos',
        subtitle: 'Impressão 3D profissional e sob medida',
        color: 'blue',
        summary:
            'A Nerooh é especializada em manufatura aditiva (impressão 3D de alta precisão). Nós transformamos projetos e ideias em objetos físicos reais para empresas, indústrias, designers e criadores.',
        points: [
            'Desenvolvemos e calibramos nossas próprias máquinas para garantir o máximo de precisão.',
            'Atendemos desde uma única peça de teste até lotes industriais completos.',
            'Compromisso com acabamento de alto nível, fidelidade de medidas e entrega ágil.',
        ],
        quote: '“Do filamento à peça final — cada detalhe importa.”',
    },
    {
        id: 'passo-1',
        badge: 'Passo 1',
        number: '01',
        title: 'Criação do Modelo 3D',
        subtitle: 'Da sua ideia ao desenho no computador',
        color: 'blue',
        summary:
            'Tudo começa com a sua necessidade. Se você já tem um arquivo 3D pronto, um rascunho em papel ou até uma peça antiga quebrada que precisa ser recriada, nós preparamos o modelo digital com medidas exatas.',
        points: [
            'Modelagem sob medida ou reconstrução de peças existentes.',
            'Planejamento de espessuras, encaixes e resistência para o uso real.',
            'Você visualiza e aprova o projeto digital antes de qualquer impressão.',
        ],
    },
    {
        id: 'passo-2',
        badge: 'Passo 2',
        number: '02',
        title: 'Prototipagem & Testes',
        subtitle: 'A peça ganha forma física na bancada',
        color: 'purple',
        summary:
            'Antes de fabricar em definitivo, criamos um protótipo físico rápido para você segurar nas mãos, testar o encaixe e validar a função. É exatamente o que você vê acontecendo no vídeo ao fundo: a máquina construindo a peça camada por camada.',
        points: [
            'Testes rápidos de encaixe mecânico e ergonomia.',
            'Ajustes finos imediatos caso você queira mudar algum detalhe.',
            'Economia de tempo e eliminação de riscos antes da versão final.',
        ],
    },
    {
        id: 'passo-3',
        badge: 'Passo 3',
        number: '03',
        title: 'Produção Final & Entrega',
        subtitle: 'Peças definitivas prontas para uso',
        color: 'gold',
        summary:
            'Com o protótipo aprovado, fabricamos as peças finais com materiais resistentes (como plásticos técnicos, compostos com fibra de carbono ou resinas de alta definição). Sem custos altos de moldes de fábrica.',
        points: [
            'Peças leves, resistentes a impacto e temperaturas elevadas.',
            'Fabricação sob demanda: peça apenas a quantidade que você precisa.',
            'Acabamento profissional pronto para uso no seu produto ou máquina.',
        ],
    },
];

export default function About() {
    const [activeId, setActiveId] = useState(null);
    const [pinnedId, setPinnedId] = useState(null);
    const panelRef = useRef(null);

    const currentStep = STEPS.find((s) => s.id === (pinnedId || activeId));

    // Handle clicks outside the right panel to unpin
    useEffect(() => {
        function handleClickOutside(e) {
            if (pinnedId && panelRef.current && !panelRef.current.contains(e.target)) {
                setPinnedId(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [pinnedId]);

    const handleSelect = (id) => {
        setPinnedId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="about" id="about">
            {/* Header ABOVE the video */}
            <div className="container about-top-header">
                <SectionReveal>
                    <div className="section-header">
                        <span className="label-tag">⬡ Sobre a Nerooh</span>
                        <h2>
                            Manufatura Aditiva:{' '}
                            <span className="gradient-text">Do Conceito ao Objeto Real</span>
                        </h2>
                        <p className="about-intro-text">
                            Transformamos ideias digitais em peças físicas reais através de impressão 3D profissional.
                            Veja ao lado o processo acontecendo em nossa bancada e explore o passo a passo de como trabalhamos.
                        </p>
                    </div>
                </SectionReveal>
            </div>

            {/* Video Stage with Right-Aligned Step Menu */}
            <div className="about-video-stage">
                {/* Background Video Layer - 100% visible across the stage */}
                <div className="about-video-backdrop" aria-hidden="true">
                    <iframe
                        className="about-video-iframe"
                        src="https://www.youtube-nocookie.com/embed/a3vzF-w4W_k?autoplay=1&mute=1&loop=1&playlist=a3vzF-w4W_k&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1"
                        title="Nerooh - Processo de Desenvolvimento"
                        tabIndex="-1"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                    <div className="about-video-ambient-overlay" />
                </div>

                {/* Content Overlay with Right-Aligned Stack */}
                <div className="container about-stage-container" ref={panelRef}>
                    {/* Floating Pop-up Card (Appears on the left/center of the right menu when hovered or clicked) */}
                    {currentStep && (
                        <div
                            className={`about-step-popover about-step-popover--${currentStep.color}`}
                            onMouseEnter={() => setActiveId(currentStep.id)}
                            onMouseLeave={() => !pinnedId && setActiveId(null)}
                        >
                            <div className="popover-header">
                                <span className="popover-badge">{currentStep.badge}</span>
                                <button
                                    type="button"
                                    className="popover-close-btn"
                                    onClick={() => {
                                        setPinnedId(null);
                                        setActiveId(null);
                                    }}
                                    aria-label="Fechar explicação"
                                >
                                    ×
                                </button>
                            </div>

                            <h3>{currentStep.title}</h3>
                            <p className="popover-subtitle">{currentStep.subtitle}</p>
                            <p className="popover-summary">{currentStep.summary}</p>

                            <ul className="popover-points-list">
                                {currentStep.points.map((pt, idx) => (
                                    <li key={idx}>
                                        <span className="popover-check">✓</span>
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>

                            {currentStep.quote && (
                                <div className="popover-quote-box">
                                    <span className="popover-quote-bar" />
                                    <p className="popover-quote-phrase">{currentStep.quote}</p>
                                </div>
                            )}

                            <div className="popover-footer-tip">
                                <span>{pinnedId ? 'Fixado · Clique fora para fechar' : 'Dica: Clique no botão para manter aberto'}</span>
                            </div>
                        </div>
                    )}

                    {/* Right-Aligned Vertical Stack */}
                    <div className="about-right-panel">
                        <div className="about-right-panel-header">
                            <span className="right-panel-tag">COMO FUNCIONA</span>
                            <span className="right-panel-hint">Passe o mouse ou clique</span>
                        </div>

                        <div className="about-steps-vertical-stack">
                            {STEPS.map((step) => {
                                const isSelected = currentStep?.id === step.id;
                                return (
                                    <button
                                        key={step.id}
                                        type="button"
                                        className={`about-step-item about-step-item--${step.color} ${isSelected ? 'is-active' : ''}`}
                                        onMouseEnter={() => !pinnedId && setActiveId(step.id)}
                                        onMouseLeave={() => !pinnedId && setActiveId(null)}
                                        onClick={() => handleSelect(step.id)}
                                    >
                                        <div className="step-item-number">{step.number}</div>
                                        <div className="step-item-info">
                                            <span className="step-item-badge">{step.badge}</span>
                                            <h4 className="step-item-title">{step.title}</h4>
                                            <span className="step-item-sub">{step.subtitle}</span>
                                        </div>
                                        <div className="step-item-arrow">
                                            {isSelected ? '◀' : '›'}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
