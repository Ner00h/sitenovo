import { useState, useRef } from 'react';
import SectionReveal from './SectionReveal';
import './PrinterProjects.css';

const PRINTERS = [
    {
        id: 'ipr1', // Unique ID
        name: 'NROCoreXY',
        subtitle: 'CoreXY de Alta Velocidade',
        year: '2024',
        tags: ['CoreXY', 'Klipper', '300mm/s', '300ºC'],
        specs: [
            { label: 'Volume', value: '400×400×500mm' },
            { label: 'Velocidade', value: '300mm/s' },
            { label: 'Hotend', value: '300°C Max' },
            { label: 'Layer', value: '0.05mm min' },
        ],
        description: 'Impressora CoreXY desenvolvida do zero com câmara aquecida, motion system de alumínio fundido e firmware Klipper personalizado.',
        // Embed URL for NROCoreXY video
        video: 'https://www.youtube.com/embed/39Y0jPHpYd4?autoplay=1&mute=1&controls=0&loop=1&playlist=39Y0jPHpYd4',
        color: 'blue',
        status: 'Produção',
    },
    {
        id: 'pr2',
        name: 'NeroDelta V2',
        subtitle: 'Delta de Precisão Industrial',
        year: '2023',
        tags: ['Delta', 'Marlin', 'Metal', '500ºC'],
        specs: [
            { label: 'Volume', value: 'Ø250×500mm' },
            { label: 'Velocidade', value: '400mm/s' },
            { label: 'Hotend', value: '500°C Max' },
            { label: 'Frame', value: 'Alumínio' },
        ],
        description: 'Configuração delta para impressão de alta temperatura com materiais de engenharia como PEEK, PEI e compostos de carbono.',
        video: null, // Adicione o path do vídeo: '/videos/nerodelta.mp4'
        color: 'purple',
        status: 'Em testes',
    },
    {
        id: 'pr3',
        name: 'NeroFlex Bio',
        subtitle: 'Multi-Material & Flexível',
        year: '2025',
        tags: ['Multi-extrusor', 'TPU', 'Biocompat.', 'Klipper'],
        specs: [
            { label: 'Extrusores', value: '4x independentes' },
            { label: 'Materiais', value: 'PLA a PEEK' },
            { label: 'Cama', value: '120°C' },
            { label: 'Câmara', value: '70°C ativo' },
        ],
        description: 'Sistema multi-extrusor desenvolvido para materiais flexíveis e biocompatíveis, com sistema de câmara controlada ativamente.',
        video: null, // Adicione o path do vídeo: '/videos/neroflex.mp4'
        color: 'gold',
        status: 'Desenvolvimento',
    },
];

function PrinterCard({ printer }) {
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef(null);

    // Support both local video paths and YouTube embed links
    const isYouTube = printer.video && (printer.video.includes('youtube.com') || printer.video.includes('youtu.be'));

    const handleMouseEnter = () => {
        setHovered(true);
        if (videoRef.current && !isYouTube) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        setHovered(false);
        if (videoRef.current && !isYouTube) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className={`printer-card printer-card--${printer.color} ${hovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-cursor
        >
            {/* Background layer: Video / Visual placeholder */}
            <div className="printer-preview">
                {printer.video && (hovered || !isYouTube) ? (
                    isYouTube ? (
                        <iframe
                            className="printer-video"
                            src={printer.video}
                            title={printer.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ pointerEvents: 'none', width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <video
                            ref={videoRef}
                            src={printer.video}
                            muted
                            loop
                            playsInline
                            className="printer-video"
                        />
                    )
                ) : (
                    <div className="printer-placeholder">
                        <PrinterVisual color={printer.color} />
                    </div>
                )}
                
                {/* Background fade overlay */}
                <div className="printer-card-overlay" />
            </div>

            {/* Content layer */}
            <div className="printer-info">
                {/* Top content bar */}
                <div className="printer-info-top">
                    <div className="printer-tags">
                        {printer.tags.map(t => (
                            <span key={t} className={`tag-chip tag-chip--sm ${printer.color === 'purple' ? 'purple' : printer.color === 'gold' ? 'gold' : ''}`}>
                                {t}
                            </span>
                        ))}
                    </div>
                    {/* Status badge - now in the corner of information strip or top */}
                    <div className={`printer-status printer-status--${printer.color}`}>
                        <span className="printer-status-dot" />
                        {printer.status}
                    </div>
                </div>

                <div className="printer-info-main">
                    <h3 className="printer-name">{printer.name}</h3>
                    <p className="printer-subtitle">{printer.subtitle}</p>
                    <p className="printer-desc">{printer.description}</p>
                </div>

                <div className="printer-info-bottom">
                    {/* Specs table */}
                    <div className="printer-specs">
                        {printer.specs.map(({ label, value }) => (
                            <div key={label} className="printer-spec">
                                <span className="printer-spec-label">{label}</span>
                                <span className="printer-spec-value">{value}</span>
                            </div>
                        ))}
                    </div>
                    {/* Year moved small to the bottom corner */}
                    <div className="printer-year">{printer.year}</div>
                </div>
            </div>/* Animated 3D printer visual as placeholder */
export function PrinterVisual({ color }) {
    const c = color === 'blue' ? '#00c8ff' : color === 'purple' ? '#a78bfa' : '#f59e0b';
    const id = color; // unique prefix for SVG ids

    // We'll simulate 6 completed layers + 1 being printed
    const completedLayers = [0, 1, 2, 3, 4, 5];
    const layerH = 5;
    const layerBaseY = 128; // top of bed
    const layerX = 50;
    const layerW = 100;

    return (
        <div className="printer-visual">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="printer-svg">
                <defs>
                    {/* Clip for the "being printed" layer — animates from 0 width to full */}
                    <clipPath id={`${id}-layer-clip`}>
                        <rect x={layerX} y="0" height="200" width="0">
                            <animate
                                attributeName="width"
                                values={`0;${layerW};${layerW};0`}
                                keyTimes="0;0.38;0.62;1"
                                dur="3.2s"
                                repeatCount="indefinite"
                                calcMode="spline"
                                keySplines="0.4 0 0.6 1;0 0 1 1;0.4 0 0.6 1"
                            />
                        </rect>
                    </clipPath>
                </defs>

                {/* Outer frame */}
                <rect x="20" y="20" width="160" height="160" rx="8"
                    stroke={c} strokeWidth="1.5" strokeOpacity="0.25" />

                {/* Enclosure walls */}
                <rect x="40" y="30" width="120" height="100" rx="2"
                    fill={c} fillOpacity="0.03"
                    stroke={c} strokeWidth="1" strokeOpacity="0.3" />

                {/* Print bed */}
                <rect x="40" y="130" width="120" height="8" rx="2"
                    fill={c} fillOpacity="0.18"
                    stroke={c} strokeWidth="1" strokeOpacity="0.5" />

                {/* ── Completed layers (static, grow via stagger) ── */}
                {completedLayers.map(i => (
                    <rect
                        key={i}
                        x={layerX}
                        y={layerBaseY - (i + 1) * layerH}
                        width={layerW}
                        height={layerH - 0.5}
                        rx="1"
                        fill={c}
                        fillOpacity={0.12 + i * 0.04}
                        stroke={c}
                        strokeWidth="0.4"
                        strokeOpacity="0.5"
                    />
                ))}

                {/* ── Layer being printed (reveals left→right under nozzle) ── */}
                <rect
                    x={layerX}
                    y={layerBaseY - (completedLayers.length + 1) * layerH}
                    width={layerW}
                    height={layerH - 0.5}
                    rx="1"
                    fill={c}
                    fillOpacity="0.55"
                    stroke={c}
                    strokeWidth="0.6"
                    strokeOpacity="0.9"
                    clipPath={`url(#${id}-layer-clip)`}
                />

                {/* ── Gantry bar (moves up each cycle) ── */}
                <g>
                    {/* Vertical gantry position oscillates upward matching layers */}
                    <line
                        x1="40" x2="160"
                        y1="0" y2="0"
                        stroke={c} strokeWidth="1.8" strokeOpacity="0.6"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values={`0 ${layerBaseY - completedLayers.length * layerH - layerH};0 ${layerBaseY - completedLayers.length * layerH - layerH}`}
                            dur="3.2s"
                            repeatCount="indefinite"
                        />
                    </line>

                    {/* ── Extruder carriage moving along gantry ── */}
                    <g>
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values={`${layerX - 12} 0;${layerX + layerW - 12} 0;${layerX + layerW - 12} 0;${layerX - 12} 0`}
                            keyTimes="0;0.38;0.62;1"
                            dur="3.2s"
                            repeatCount="indefinite"
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1;0 0 1 1;0.2 0 0.4 1"
                        />

                        {/* Carriage body */}
                        <rect
                            x="0"
                            y={layerBaseY - completedLayers.length * layerH - layerH - 18}
                            width="24" height="14" rx="3"
                            fill={c} fillOpacity="0.18"
                            stroke={c} strokeWidth="1.2"
                        />

                        {/* Nozzle tip */}
                        <path
                            d={`M6 ${layerBaseY - completedLayers.length * layerH - layerH - 4} L6 ${layerBaseY - completedLayers.length * layerH} L12 ${layerBaseY - completedLayers.length * layerH + 4} L18 ${layerBaseY - completedLayers.length * layerH} L18 ${layerBaseY - completedLayers.length * layerH - layerH - 4}`}
                            fill={c} fillOpacity="0.65"
                        />

                        {/* Filament drip — short dashed line from nozzle down */}
                        <line
                            x1="12"
                            y1={layerBaseY - completedLayers.length * layerH + 4}
                            x2="12"
                            y2={layerBaseY - completedLayers.length * layerH + 10}
                            stroke={c} strokeWidth="1.5" strokeOpacity="0.9"
                            strokeDasharray="2,2"
                        >
                            <animate attributeName="stroke-dashoffset" from="4" to="0" dur="0.25s" repeatCount="indefinite" />
                        </line>
                    </g>
                </g>

                {/* Corner accents */}
                <g stroke={c} strokeWidth="2" strokeOpacity="0.55">
                    <path d="M20 36 L20 20 L36 20" />
                    <path d="M164 20 L180 20 L180 36" />
                    <path d="M20 164 L20 180 L36 180" />
                    <path d="M180 164 L180 180 L164 180" />
                </g>

                {/* Control panel */}
                <g>
                    <rect x="75" y="146" width="30" height="16" rx="2"
                        fill={c} fillOpacity="0.12" stroke={c} strokeWidth="1.2" />
                    <line x1="78" y1="150" x2="102" y2="150" stroke={c} strokeWidth="1" strokeOpacity="0.55" />
                    <line x1="78" y1="154" x2="96" y2="154" stroke={c} strokeWidth="1" strokeOpacity="0.55" />
                    <line x1="78" y1="158" x2="99" y2="158" stroke={c} strokeWidth="1" strokeOpacity="0.55" />
                    <circle cx="112" cy="154" r="2.5" fill={c} fillOpacity="0.4" stroke={c} strokeWidth="0.8" />
                    <circle cx="119" cy="154" r="2.5" fill={c} fillOpacity="0.4" stroke={c} strokeWidth="0.8" />
                    <circle cx="128" cy="154" r="4.5" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="1.2" />
                    <circle cx="128" cy="154" r="1.5" fill={c} fillOpacity="0.8" />
                </g>
            </svg>
        </div>
    );
}

export default function PrinterProjects() {
    return (
        <section className="printers" id="printers">
            <div className="container">
                <SectionReveal>
                    <div className="section-header">
                        <span className="label-tag">⬡ Hardware Próprio</span>
                        <h2>Impressoras <span className="gradient-text">Customizadas</span></h2>
                        <p>
                            Cada impressora é um projeto de engenharia completo — desenvolvida
                            internamente do zero, com performance além do mercado.
                        </p>
                    </div>
                </SectionReveal>

                <div className="printers-list">
                    {PRINTERS.map((printer, i) => (
                        <SectionReveal key={printer.id} delay={i * 120}>
                            <PrinterCard printer={printer} />
                        </SectionReveal>
                    ))}
                </div>

                <SectionReveal delay={200}>
                    <div className="video-notice">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        Passe o mouse sobre os cards para reproduzir os vídeos de demonstração.
                        Adicione seus vídeos em <code>public/videos/</code> e atualize os paths em <code>PrinterProjects.jsx</code>.
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}
