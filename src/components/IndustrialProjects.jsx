import { useState, useEffect } from 'react';
import SectionReveal from './SectionReveal';
import './IndustrialProjects.css';

const PROJECTS = [
    {
        id: 'ip1',
        title: 'Moldes para Injeção',
        category: 'Indústria',
        tags: ['FDM', 'Resina', 'Rapid Tooling'],
        description: 'Moldes rápidos para injeção plástica de baixo volume, reduzindo drasticamente custos e prazos de fabricação.',
        metrics: ['Lead time: 48h', 'Custo -70%', 'Durabilidade'],
        color: 'blue',
        icon: '🏭',
        image: '/projects/molde_injecao.png',
    },
    {
        id: 'ip2',
        title: 'Peças de Segurança',
        category: 'Manutenção',
        tags: ['FDM', 'ABS', 'Resistente'],
        description: 'Capas de proteção e peças de reposição de itens descontinuados, mantendo máquinas em operação segura.',
        metrics: ['Resistência Mecânica', 'Encaixe Perfeito', 'Pronta Entrega'],
        color: 'purple',
        icon: '🛡️',
        image: '/projects/peca_seguranca.png',
    },
    {
        id: 'ip3',
        title: 'Gabaritos de Montagem',
        category: 'Produção',
        tags: ['FDM', 'PETG', 'Precisão'],
        description: 'Dispositivos auxiliares para linhas de produção, garantindo agilidade e precisão na montagem de componentes.',
        metrics: ['Precisão', 'Ergonomia', 'Setup Rápido'],
        color: 'gold',
        icon: '⚙️',
        image: '/projects/gabarito.png',
    },
    {
        id: 'ip4',
        title: 'Maquetes Arquitetônicas',
        category: 'Artístico',
        tags: ['SLA', 'Resina', 'Detalhes'],
        description: 'Modelos físicos detalhados para apresentação de projetos arquitetônicos e empreendimentos com acabamento premium.',
        metrics: ['Alto Detalhamento', 'Escala Precisa', 'Visual Único'],
        color: 'blue',
        icon: '🏢',
        image: '/projects/maquete.png',
    },
    {
        id: 'ip5',
        title: 'Chaveiros e Logotipos',
        category: 'Brindes',
        tags: ['FDM', 'PLA', 'Colorido'],
        description: 'Produção de brindes corporativos personalizados e chaveiros tridimensionais destacando a sua marca.',
        metrics: ['Personalização 3D', 'Baixo Custo', 'Cores Vivas'],
        color: 'purple',
        icon: '🏷️',
        image: '/projects/chaveiro.png',
    },
    {
        id: 'ip6',
        title: 'Protótipos Orgânicos',
        category: 'Modelagem',
        tags: ['SLA', 'Resina', 'Acabamento'],
        description: 'Peças com geometrias complexas e acabamento impecável, ideais para action figures, esculturas e designs conceptuais.',
        metrics: ['Acabamento Suave', 'Alta Resolução', 'Formato Livre'],
        color: 'gold',
        icon: '🎨',
        images: ['/projects/prototipo_organico.png', '/projects/prototipo_organico_2.png'],
    },
];

function ProjectCard({ proj, isHovered, onHover, onLeave }) {
    const imgList = proj.images || (proj.image ? [proj.image] : []);
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    useEffect(() => {
        if (imgList.length <= 1) return;
        const interval = setInterval(() => {
            setActiveImgIndex(prev => (prev + 1) % imgList.length);
        }, 3800);
        return () => clearInterval(interval);
    }, [imgList.length]);

    return (
        <div
            className={`project-card project-card--${proj.color} ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            data-cursor
        >
            {/* Background images with cross-fade */}
            {imgList.map((img, idx) => (
                <div
                    key={img}
                    className={`project-card-bg ${idx === activeImgIndex ? 'is-active' : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}

            {/* Top chip strip & indicators if multiple images */}
            <div className="project-card-top">
                <div className="project-card-top-left">
                    <span className="project-icon">{proj.icon}</span>
                    <span className={`tag-chip ${proj.color === 'purple' ? 'purple' : proj.color === 'gold' ? 'gold' : ''}`}>
                        {proj.category}
                    </span>
                </div>

                {imgList.length > 1 && (
                    <div className="project-card-dots">
                        {imgList.map((_, idx) => (
                            <span
                                key={idx}
                                className={`project-card-dot ${idx === activeImgIndex ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImgIndex(idx);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom footer strip — always visible */}
            <div className="project-card-footer">
                <h3 className="project-title">{proj.title}</h3>

                {/* Tags: small pills */}
                <div className="project-tags">
                    {proj.tags.map(t => (
                        <span key={t} className={`tag-chip tag-chip--sm ${proj.color === 'purple' ? 'purple' : proj.color === 'gold' ? 'gold' : ''}`}>
                            {t}
                        </span>
                    ))}
                </div>

                {/* Hover reveal: description + metrics */}
                <div className="project-hover-reveal">
                    <p className="project-desc">{proj.description}</p>
                    <div className="project-metrics">
                        {proj.metrics.map(m => (
                            <div key={m} className="project-metric">
                                <span className="project-metric-dot" />
                                {m}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Glow border */}
            <div className="project-card-glow" />
        </div>
    );
}

export default function IndustrialProjects() {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section className="industrial" id="industrial">
            <div className="container">
                <SectionReveal>
                    <div className="section-header">
                        <span className="label-tag">⬡ Nosso Portfólio</span>
                        <h2>Projetos <span className="gradient-text">Técnicos e Criativos</span></h2>
                        <p>
                            Do chão de fábrica à expressão artística — entregamos soluções reais que vão de gabaritos e moldes eficientes a maquetes detalhadas e brindes personalizados.
                        </p>
                    </div>
                </SectionReveal>

                <div className="industrial-grid">
                    {PROJECTS.map((proj, i) => (
                        <SectionReveal key={proj.id} delay={i * 80}>
                            <ProjectCard
                                proj={proj}
                                isHovered={hoveredId === proj.id}
                                onHover={() => setHoveredId(proj.id)}
                                onLeave={() => setHoveredId(null)}
                            />
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
