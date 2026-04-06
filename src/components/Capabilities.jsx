import SectionReveal from './SectionReveal';
import './Capabilities.css';

const CAPABILITIES = [
    {
        title: 'FDM/FFF Industrial',
        description: 'Impressão por deposição de filamento com materiais de engenharia: PEEK, PC, PA, compostos de fibra de carbono.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22V12M12 12L4 7M12 12L20 7M4 7V17L12 22M20 7V17L12 22M4 7L12 2L20 7" />
            </svg>
        ),
        color: 'blue',
        specs: ['Até 500°C', 'Câmara 70°C', '±0.1mm'],
    },
    {
        title: 'SLS / Multi-Jet',
        description: 'Sinterização seletiva a laser para peças funcionais sem suporte, com geometrias internas complexas.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4M3.5 3.5a13 13 0 0 0 0 17M20.5 3.5a13 13 0 0 1 0 17" />
            </svg>
        ),
        color: 'purple',
        specs: ['PA12 / PA11', 'Sem suportes', 'Peças funcionais'],
    },
    {
        title: 'Metal AM',
        description: 'Manufatura aditiva em metal com processos DMLS e Binder Jetting para componentes de alta performance.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        color: 'gold',
        specs: ['Aço / Titânio', 'DMLS', 'Alta resistência'],
    },
    {
        title: 'Desenvolvimento de Hardware',
        description: 'Projeto e fabricação de impressoras 3D customizadas do zero — eletrônica, mecânica e firmware próprios.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" />
                <line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" />
                <line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" />
                <line x1="20" y1="14" x2="23" y2="14" />
                <line x1="1" y1="9" x2="4" y2="9" />
                <line x1="1" y1="14" x2="4" y2="14" />
            </svg>
        ),
        color: 'blue',
        specs: ['CoreXY / Delta', 'Klipper', 'Custom firmware'],
    },
    {
        title: 'Engenharia Reversa',
        description: 'Digitalização 3D de peças existentes, recriação de geometrias e melhoria de componentes obsoletos.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 4v6h6" />
                <path d="M23 20v-6h-6" />
                <path d="M20.5 9A9 9 0 0 0 5.6 5.6L1 10M23 14l-4.6 4.4A9 9 0 0 1 3.5 15" />
            </svg>
        ),
        color: 'purple',
        specs: ['Scan 3D', 'Reverse eng.', 'Retrabalho'],
    },
    {
        title: 'Consultoria & DfAM',
        description: 'Design for Additive Manufacturing — otimização topológica, consolidação de peças e redução de peso.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
        color: 'gold',
        specs: ['Otim. top.', 'DfAM', 'Consultoria'],
    },
];

export default function Capabilities() {
    return (
        <section className="capabilities" id="capabilities">
            <div className="container">
                <SectionReveal>
                    <div className="section-header">
                        <span className="label-tag">⬡ Tecnologias</span>
                        <h2>Nossas <span className="gradient-text">Capacidades</span></h2>
                        <p>
                            Domínio completo do ecossistema de manufatura aditiva —
                            do software ao hardware, do protótipo à produção.
                        </p>
                    </div>
                </SectionReveal>

                <div className="capabilities-grid">
                    {CAPABILITIES.map((cap, i) => (
                        <SectionReveal key={cap.title} delay={i * 80} type="scale">
                            <div className={`capability-card capability-card--${cap.color}`} data-cursor>
                                <div className="capability-icon">{cap.icon}</div>
                                <h3>{cap.title}</h3>
                                <p>{cap.description}</p>
                                <div className="capability-specs">
                                    {cap.specs.map(s => (
                                        <span key={s} className={`tag-chip ${cap.color === 'purple' ? 'purple' : cap.color === 'gold' ? 'gold' : ''}`}>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
