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
                    <div className="printer-video-placeholder">
                        <div className={`video-play-btn video-play-btn--${printer.color}`}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" fillOpacity="0.25" />
                            </svg>
                        </div>
                        <span className="video-placeholder-label">
                            {printer.video ? 'Passe o mouse para assistir' : 'Vídeo Demonstrativo'}
                        </span>
                        <span className="video-placeholder-sub">
                            {printer.video ? printer.name : 'Em breve • Adicione o vídeo'}
                        </span>
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
            </div>
        </div>
    );
}

function FdmPrinterVisual({ color, printer }) {
    const c = color === 'blue' ? '#00c8ff' : color === 'purple' ? '#a78bfa' : '#f59e0b';
    const cLight = color === 'blue' ? '#bae6fd' : color === 'purple' ? '#e9d5ff' : '#fde68a';
    const id = `${printer?.id || color || 'p'}-${color}`;

    const pid = printer?.id || (color === 'purple' ? 'pr2' : color === 'gold' ? 'pr3' : 'ipr1');
    const isCoreXY = pid === 'ipr1';
    const isDelta = pid === 'pr2';
    const isBio = pid === 'pr3';

    // Extruder sweep range for each model
    const minX = isDelta ? 116 : isBio ? 120 : 126;
    const maxX = isDelta ? 244 : isBio ? 240 : 234;

    // Layer widths
    const w1 = isDelta ? 124 : isBio ? 114 : 108;
    const w2 = isDelta ? 132 : isBio ? 104 : 96;
    const w3 = isDelta ? 140 : isBio ? 96 : 82;

    const x1 = 180 - w1 / 2;
    const x2 = 180 - w2 / 2;
    const x3 = 180 - w3 / 2;

    // Layer striation lines on the base piece
    const baseLayerLines = [174, 178, 182, 186, 190, 194, 198, 202, 206, 210, 214, 218, 222, 226, 230, 234, 238, 242];

    const telemetry = isDelta
        ? { mode: 'DELTA V2', part: 'AERO_NOZZLE.STL', progress: '78%', layer: 'L: 218/280', noz: '420°C', bed: '140°C', spd: '400mm/s' }
        : isBio
        ? { mode: 'NEROFLEX BIO', part: 'COMPLIANT_GRIP.STL', progress: '64%', layer: 'L: 112/175', noz: '225°C', bed: '65°C', spd: '120mm/s' }
        : { mode: 'NRO-COREXY', part: 'GEAR_HUB_V4.STL', progress: '71%', layer: 'L: 164/230', noz: '255°C', bed: '80°C', spd: '300mm/s' };

    return (
        <div className="printer-visual">
            <svg viewBox="0 0 360 390" fill="none" xmlns="http://www.w3.org/2000/svg" className="printer-svg">
                <defs>
                    {/* Glow filters */}
                    <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={`${id}-glow-strong`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Machine Chassis Gradients */}
                    <linearGradient id={`${id}-frame-metal`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e2230" />
                        <stop offset="35%" stopColor="#141724" />
                        <stop offset="100%" stopColor="#0d0f17" />
                    </linearGradient>

                    <linearGradient id={`${id}-column-metal`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1c202d" />
                        <stop offset="25%" stopColor="#282d3e" />
                        <stop offset="60%" stopColor="#181b26" />
                        <stop offset="100%" stopColor="#0f1118" />
                    </linearGradient>

                    <linearGradient id={`${id}-steel-rod`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#475569" />
                        <stop offset="40%" stopColor="#94a3b8" />
                        <stop offset="70%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#334155" />
                    </linearGradient>

                    <linearGradient id={`${id}-screw`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#334155" />
                        <stop offset="50%" stopColor="#64748b" />
                        <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>

                    <linearGradient id={`${id}-bed-metal`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#252a3a" />
                        <stop offset="100%" stopColor="#0e111a" />
                    </linearGradient>

                    {/* Overhead Chamber Lighting Gradient */}
                    <linearGradient id={`${id}-chamber-light`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                        <stop offset="40%" stopColor={c} stopOpacity="0.12" />
                        <stop offset="100%" stopColor={c} stopOpacity="0" />
                    </linearGradient>

                    {/* Front Door Glass Glare */}
                    <linearGradient id={`${id}-glass-glare`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.03" />
                        <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>

                    {/* Printed Plastic Material Gradient */}
                    <linearGradient id={`${id}-plastic`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={c} stopOpacity="0.08" />
                        <stop offset="25%" stopColor={c} stopOpacity="0.26" />
                        <stop offset="75%" stopColor={c} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={c} stopOpacity="0.06" />
                    </linearGradient>

                    <linearGradient id={`${id}-heat-light`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                        <stop offset="50%" stopColor={c} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={c} stopOpacity="0" />
                    </linearGradient>

                    {/* ── CLIP PATHS FOR SEQUENTIAL MULTI-LAYER REVEAL (SYNCHRONIZED WITH NOZZLE) ── */}
                    {/* Layer 1 reveal: sweeps Left to Right with nozzle from t = 0 to 0.24 */}
                    <clipPath id={`${id}-layer1-clip`}>
                        <rect x={x1} y="161" height="11" width="0">
                            <animate
                                attributeName="width"
                                values={`0; ${w1}; ${w1}; ${w1}; ${w1}; ${w1}; ${w1}; ${w1}; ${w1}; ${w1}; ${w1}; 0`}
                                keyTimes="0; 0.24; 0.27; 0.32; 0.34; 0.58; 0.61; 0.66; 0.68; 0.92; 0.95; 1"
                                dur="6s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </rect>
                    </clipPath>

                    {/* Layer 2 reveal: sweeps Right to Left with nozzle from t = 0.34 to 0.58 */}
                    <clipPath id={`${id}-layer2-clip`}>
                        <rect y="154" height="11" x={x2 + w2} width="0">
                            <animate
                                attributeName="x"
                                values={`${x2 + w2}; ${x2 + w2}; ${x2 + w2}; ${x2 + w2}; ${x2 + w2}; ${x2}; ${x2}; ${x2}; ${x2}; ${x2}; ${x2}; ${x2 + w2}`}
                                keyTimes="0; 0.24; 0.27; 0.32; 0.34; 0.58; 0.61; 0.66; 0.68; 0.92; 0.95; 1"
                                dur="6s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                            <animate
                                attributeName="width"
                                values={`0; 0; 0; 0; 0; ${w2}; ${w2}; ${w2}; ${w2}; ${w2}; ${w2}; 0`}
                                keyTimes="0; 0.24; 0.27; 0.32; 0.34; 0.58; 0.61; 0.66; 0.68; 0.92; 0.95; 1"
                                dur="6s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </rect>
                    </clipPath>

                    {/* Layer 3 reveal: sweeps Left to Right with nozzle from t = 0.68 to 0.92 */}
                    <clipPath id={`${id}-layer3-clip`}>
                        <rect x={x3} y="147" height="11" width="0">
                            <animate
                                attributeName="width"
                                values={`0; 0; 0; 0; 0; 0; 0; 0; 0; ${w3}; ${w3}; 0`}
                                keyTimes="0; 0.24; 0.27; 0.32; 0.34; 0.58; 0.61; 0.66; 0.68; 0.92; 0.95; 1"
                                dur="6s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </rect>
                    </clipPath>
                </defs>

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 1. SOLID INDUSTRIAL 3D PRINTER CHASSIS & ENCLOSURE                */}
                {/* ═════════════════════════════════════════════════════════════════ */}

                {/* Machine Enclosure Outer Body */}
                <rect x="12" y="10" width="336" height="364" rx="8"
                    fill="#0a0c13" stroke="#252b3d" strokeWidth="1.5" />

                {/* Internal Chamber Cavity */}
                <rect x="34" y="52" width="292" height="264" rx="4" fill="#07080e" />

                {/* Overhead Chamber Illumination Light Cone */}
                <polygon points="48,56 312,56 324,300 36,300"
                    fill={`url(#${id}-chamber-light)`} />

                {/* Overhead LED Light Bar fixture */}
                <rect x="46" y="52" width="268" height="5" rx="2" fill="#ffffff" filter={`url(#${id}-glow)`} />
                <rect x="46" y="52" width="268" height="2" fill="#ffffff" />

                {/* ── LEFT & RIGHT VERTICAL ALUMINUM EXTRUSIONS ── */}
                {/* Left extrusion column */}
                <rect x="12" y="10" width="22" height="364" rx="2" fill={`url(#${id}-column-metal)`} />
                <line x1="23" y1="12" x2="23" y2="370" stroke="#0d0f15" strokeWidth="3" />
                <line x1="33.5" y1="12" x2="33.5" y2="370" stroke="#373d52" strokeWidth="0.8" />
                <circle cx="23" cy="28" r="2.5" fill="#2d3345" stroke="#121520" strokeWidth="0.6" />
                <circle cx="23" cy="358" r="2.5" fill="#2d3345" stroke="#121520" strokeWidth="0.6" />

                {/* Right extrusion column */}
                <rect x="326" y="10" width="22" height="364" rx="2" fill={`url(#${id}-column-metal)`} />
                <line x1="337" y1="12" x2="337" y2="370" stroke="#0d0f15" strokeWidth="3" />
                <line x1="326.5" y1="12" x2="326.5" y2="370" stroke="#373d52" strokeWidth="0.8" />
                <circle cx="337" cy="28" r="2.5" fill="#2d3345" stroke="#121520" strokeWidth="0.6" />
                <circle cx="337" cy="358" r="2.5" fill="#2d3345" stroke="#121520" strokeWidth="0.6" />

                {/* ── TOP HOOD / UPPER FRAME ── */}
                <rect x="12" y="10" width="336" height="42" rx="6" fill={`url(#${id}-frame-metal)`} />
                <line x1="14" y1="51.5" x2="346" y2="51.5" stroke="#252a3b" strokeWidth="1" />
                <line x1="14" y1="11" x2="346" y2="11" stroke="#3d445c" strokeWidth="0.8" />

                {/* Filament entry grommet on top frame */}
                <ellipse cx="78" cy="22" rx="4.5" ry="2.5" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />

                {/* Printer Model Branding & Status Indicator */}
                <circle cx="102" cy="28" r="3" fill="#22c55e" filter={`url(#${id}-glow)`}>
                    <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <text x="112" y="32" fontFamily="Space Mono, monospace" fontSize="9" fontWeight="bold" fill={cLight} letterSpacing="0.08em">
                    NRO-CoreXY
                </text>
                <text x="112" y="44" fontFamily="Space Mono, monospace" fontSize="7.5" fill="rgba(255,255,255,0.4)" letterSpacing="0.05em">
                    {telemetry.part} • {telemetry.layer}
                </text>

                {/* ── Z-AXIS MECHANICS (PRECISION RODS & HELICAL LEAD SCREWS) ── */}
                {/* Left Z-axis linear guide rod */}
                <rect x="50" y="58" width="6" height="256" rx="2" fill={`url(#${id}-steel-rod)`} />
                {/* Left Z-axis threaded lead screw */}
                <rect x="62" y="58" width="5" height="256" fill={`url(#${id}-screw)`} />
                {[...Array(32)].map((_, i) => (
                    <line key={i} x1="62" y1={62 + i * 8} x2="67" y2={64 + i * 8} stroke="#475569" strokeWidth="0.8" />
                ))}

                {/* Right Z-axis threaded lead screw */}
                <rect x="293" y="58" width="5" height="256" fill={`url(#${id}-screw)`} />
                {[...Array(32)].map((_, i) => (
                    <line key={i} x1="293" y1={62 + i * 8} x2="298" y2={64 + i * 8} stroke="#475569" strokeWidth="0.8" />
                ))}
                {/* Right Z-axis linear guide rod */}
                <rect x="304" y="58" width="6" height="256" rx="2" fill={`url(#${id}-steel-rod)`} />

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 2. Z-MOVING ASSEMBLY (HEATED BED + PIECE DESCENDING IN Z)          */}
                {/* ═════════════════════════════════════════════════════════════════ */}
                <g id={`${id}-z-motion-group`}>
                    {/* The entire bed assembly drops down by 7px after layer 1, and another 7px after layer 2 */}
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 0; 0 0; 0 7; 0 7; 0 7; 0 7; 0 14; 0 14; 0 14; 0 14; 0 0"
                        keyTimes="0; 0.24; 0.27; 0.32; 0.34; 0.58; 0.61; 0.66; 0.68; 0.92; 0.95; 1"
                        dur="6s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />

                    {/* Cantilever Bed Mount Arms gripping the lead screws & linear bearings */}
                    <path d="M 48 248 L 74 248 L 74 258 L 58 258 L 48 254 Z" fill="#242938" stroke="#373d52" strokeWidth="0.8" />
                    <circle cx="64.5" cy="253" r="3.5" fill="#d97706" stroke="#92400e" strokeWidth="0.6" />

                    <path d="M 312 248 L 286 248 L 286 258 L 302 258 L 312 254 Z" fill="#242938" stroke="#373d52" strokeWidth="0.8" />
                    <circle cx="295.5" cy="253" r="3.5" fill="#d97706" stroke="#92400e" strokeWidth="0.6" />

                    {/* Heated Bed Base Structure */}
                    <rect x="70" y="246" width="220" height="12" rx="3"
                        fill={`url(#${id}-bed-metal)`} stroke={c} strokeWidth="1.2" strokeOpacity="0.85" />

                    {/* Textured PEI Spring Steel Build Surface */}
                    <line x1="72" y1="246.5" x2="288" y2="246.5" stroke={c} strokeWidth="1.6" strokeOpacity="0.9" />
                    {[90, 115, 140, 165, 190, 215, 240, 265].map(x => (
                        <line key={x} x1={x} y1="243.5" x2={x} y2="246.5" stroke={c} strokeWidth="0.8" strokeOpacity="0.5" />
                    ))}
                    {/* Bed center alignment circle */}
                    <circle cx="180" cy="246.5" r="3" fill="none" stroke={c} strokeWidth="1" strokeOpacity="0.8" />

                    {/* Bed Leveling Knurled Thumbscrews */}
                    <rect x="88" y="258" width="14" height="6" rx="1" fill="#475569" stroke={c} strokeWidth="0.6" />
                    <rect x="258" y="258" width="14" height="6" rx="1" fill="#475569" stroke={c} strokeWidth="0.6" />
                    {/* Bed heating indicator LED */}
                    <circle cx="78" cy="252" r="2" fill="#ef4444" filter={`url(#${id}-glow)`} />

                    {/* ── 3D PRINTED PIECE (RESTING ON BED) ── */}
                    {/* First Layer Adhesion Brim */}
                    <rect x="88" y="244.5" width="184" height="2" rx="1"
                        fill={c} fillOpacity="0.3" stroke={c} strokeWidth="0.8" strokeOpacity="0.6" />

                    {/* MODEL 1: Planetary Gear Hub (CoreXY) */}
                    {isCoreXY && (
                        <g>
                            {/* Base Flange with Bolt Holes */}
                            <path d="M 98 245 L 98 226 L 115 216 L 245 216 L 262 226 L 262 245 Z"
                                fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1.4" strokeOpacity="0.85" />
                            <circle cx="122" cy="231" r="5" fill="#07080e" stroke={c} strokeWidth="1.2" strokeOpacity="0.8" />
                            <circle cx="122" cy="231" r="2" fill={c} fillOpacity="0.7" />
                            <circle cx="238" cy="231" r="5" fill="#07080e" stroke={c} strokeWidth="1.2" strokeOpacity="0.8" />
                            <circle cx="238" cy="231" r="2" fill={c} fillOpacity="0.7" />

                            {/* Stepped Gear Teeth Outer Silhouette */}
                            <path d="M 115 216 L 115 211 L 105 207 L 105 199 L 115 196 L 115 190 L 105 187 L 105 179 L 115 176 L 115 170 L 126 170 L 126 170 L 234 170 L 234 176 L 245 179 L 245 187 L 235 190 L 235 196 L 245 199 L 245 207 L 235 211 L 235 216 Z"
                                fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1.4" strokeOpacity="0.9" />

                            {/* HONEYCOMB / HEXAGONAL INFILL STRUCTURE */}
                            <g stroke={c} strokeWidth="1" strokeOpacity="0.65" fill={c} fillOpacity="0.08">
                                <polygon points="150,184 156,187 156,194 150,197 144,194 144,187" />
                                <polygon points="180,184 186,187 186,194 180,197 174,194 174,187" />
                                <polygon points="210,184 216,187 216,194 210,197 204,194 204,187" />
                                <polygon points="135,197 141,200 141,207 135,210 129,207 129,200" />
                                <polygon points="165,197 171,200 171,207 165,210 159,207 159,200" />
                                <polygon points="195,197 201,200 201,207 195,210 189,207 189,200" />
                                <polygon points="225,197 231,200 231,207 225,210 219,207 219,200" />
                            </g>
                        </g>
                    )}

                    {/* MODEL 2: Supersonic Rocket Nozzle (Delta) */}
                    {isDelta && (
                        <g>
                            {/* Base mounting collar */}
                            <path d="M 104 245 L 104 228 L 118 220 L 242 220 L 256 228 L 256 245 Z"
                                fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1.4" strokeOpacity="0.85" />
                            <circle cx="126" cy="233" r="4.5" fill="#07080e" stroke={c} strokeWidth="1.2" />
                            <circle cx="234" cy="233" r="4.5" fill="#07080e" stroke={c} strokeWidth="1.2" />

                            {/* De Laval bell curve */}
                            <path d="M 118 220 C 124 210, 144 204, 148 196 C 144 186, 126 178, 122 170 L 238 170 C 234 178, 216 186, 212 196 C 216 204, 236 210, 242 220 Z"
                                fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1.5" strokeOpacity="0.9" />

                            {/* Isogrid cooling ribs */}
                            <g stroke={c} strokeWidth="0.9" strokeOpacity="0.5">
                                <line x1="140" y1="216" x2="160" y2="182" />
                                <line x1="160" y1="216" x2="180" y2="174" />
                                <line x1="180" y1="216" x2="200" y2="174" />
                                <line x1="200" y1="216" x2="220" y2="182" />
                                <line x1="220" y1="216" x2="200" y2="182" />
                                <line x1="200" y1="216" x2="180" y2="174" />
                                <line x1="180" y1="216" x2="160" y2="174" />
                                <line x1="160" y1="216" x2="140" y2="182" />
                            </g>
                        </g>
                    )}

                    {/* MODEL 3: Compliant Bio-Lattice Gripper (Bio) */}
                    {isBio && (
                        <g>
                            <rect x="114" y="226" width="132" height="19" rx="3"
                                fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1.4" strokeOpacity="0.85" />
                            <circle cx="138" cy="235" r="4" fill="#07080e" stroke={c} strokeWidth="1.2" />
                            <circle cx="222" cy="235" r="4" fill="#07080e" stroke={c} strokeWidth="1.2" />

                            <path d="M 120 226 L 122 195 L 122 170 L 164 170 L 158 195 L 154 226 Z"
                                fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1.4" strokeOpacity="0.85" />
                            <path d="M 240 226 L 238 195 L 238 170 L 196 170 L 202 195 L 206 226 Z"
                                fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1.4" strokeOpacity="0.85" />

                            {/* Auxetic spring diamond flexures */}
                            <g stroke={c} strokeWidth="1.2" strokeOpacity="0.7" fill={c} fillOpacity="0.08">
                                <polygon points="180,224 190,214 180,204 170,214" />
                                <polygon points="180,204 190,194 180,184 170,194" />
                                <polygon points="180,184 190,174 180,170 170,174" />
                                <line x1="156" y1="214" x2="170" y2="214" />
                                <line x1="190" y1="214" x2="204" y2="214" />
                                <line x1="157" y1="194" x2="170" y2="194" />
                                <line x1="190" y1="194" x2="203" y2="194" />
                            </g>
                        </g>
                    )}

                    {/* Horizontal Layer Lines on the Base Piece */}
                    <g stroke={c} strokeWidth="0.4" strokeOpacity="0.25">
                        {baseLayerLines.map(y => {
                            const w = (y > 224) ? 144 : (y > 190) ? 120 : 108;
                            const lx = 180 - w / 2;
                            return <line key={y} x1={lx} y1={y} x2={lx + w} y2={y} />;
                        })}
                    </g>

                    {/* ── SUCCESSIVE LAYERS PRINTED IN THIS CYCLE ── */}
                    {/* LAYER 1 (Extruded at local y = 163 to 170) */}
                    <g clipPath={`url(#${id}-layer1-clip)`}>
                        <rect x={x1} y="163" width={w1} height="7" rx="1.5"
                            fill={c} fillOpacity="0.9" filter={`url(#${id}-glow)`} />
                        <rect x={x1} y="163" width={w1} height="7" rx="1.5"
                            fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1" />
                        <line x1={x1} y1="166.5" x2={x1 + w1} y2="166.5" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.8" />
                    </g>

                    {/* LAYER 2 (Extruded on top of layer 1 at local y = 156 to 163) */}
                    <g clipPath={`url(#${id}-layer2-clip)`}>
                        <rect x={x2} y="156" width={w2} height="7" rx="1.5"
                            fill={c} fillOpacity="0.9" filter={`url(#${id}-glow)`} />
                        <rect x={x2} y="156" width={w2} height="7" rx="1.5"
                            fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1" />
                        <line x1={x2} y1="159.5" x2={x2 + w2} y2="159.5" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.8" />
                    </g>

                    {/* LAYER 3 (Extruded on top of layer 2 at local y = 149 to 156) */}
                    <g clipPath={`url(#${id}-layer3-clip)`}>
                        <rect x={x3} y="149" width={w3} height="7" rx="1.5"
                            fill={c} fillOpacity="0.9" filter={`url(#${id}-glow)`} />
                        <rect x={x3} y="149" width={w3} height="7" rx="1.5"
                            fill={`url(#${id}-plastic)`} stroke={c} strokeWidth="1" />
                        <line x1={x3} y1="152.5" x2={x3 + w3} y2="152.5" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.8" />
                    </g>
                </g>

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 3. GANTRY & DIRECT-DRIVE EXTRUDER CARRIAGE (WORLD Y = 170)        */}
                {/* ═════════════════════════════════════════════════════════════════ */}

                {/* X-Axis Linear Guide Rail & Belts */}
                <line x1="38" y1="138" x2="322" y2="138" stroke="#1e293b" strokeWidth="2.5" />
                <line x1="38" y1="144" x2="322" y2="144" stroke="#334155" strokeWidth="2" />
                <rect x="36" y="146" width="288" height="11" rx="2" fill="#0f131f" stroke="#33394d" strokeWidth="1" />
                <rect x="38" y="149" width="284" height="2.5" fill="#64748b" opacity="0.6" />

                {/* Extruder Carriage with multi-pass sweep and micro Z-hop */}
                <g transform={`translate(${x1}, 170)`}>
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values={`${x1} 170; ${x1 + w1} 170; ${x1 + w1} 166; ${x2 + w2} 166; ${x2 + w2} 170; ${x2} 170; ${x2} 166; ${x3} 166; ${x3} 170; ${x3 + w3} 170; ${x3 + w3} 166; ${x1} 170`}
                        keyTimes="0; 0.24; 0.27; 0.32; 0.34; 0.58; 0.61; 0.66; 0.68; 0.92; 0.95; 1"
                        dur="6s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />

                    {/* Stepper motor on top */}
                    <rect x="-14" y="-48" width="28" height="17" rx="2" fill="#181c28" stroke="#373e54" strokeWidth="1" />
                    <line x1="-11" y1="-42" x2="11" y2="-42" stroke="#475569" strokeWidth="1" />
                    <line x1="-11" y1="-37" x2="11" y2="-37" stroke="#475569" strokeWidth="1" />

                    {/* Heatsink body */}
                    <rect x="-19" y="-32" width="38" height="19" rx="3" fill="#0a0d16" stroke={c} strokeWidth="1.2" strokeOpacity="0.8" />
                    <line x1="-14" y1="-28" x2="14" y2="-28" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="-14" y1="-24" x2="14" y2="-24" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="-14" y1="-20" x2="14" y2="-20" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="-14" y1="-16" x2="14" y2="-16" stroke="#94a3b8" strokeWidth="1" />

                    {/* Dual Part Cooling Fan Ducts angled at nozzle tip */}
                    <path d="M -17 -24 L -23 -15 L -15 -4 L -6 -2" fill="none" stroke={c} strokeWidth="1.6" strokeOpacity="0.8" />
                    <path d="M 17 -24 L 23 -15 L 16 -4 L 6 -2" fill="none" stroke={c} strokeWidth="1.6" strokeOpacity="0.8" />

                    {/* Silicone Heater Block */}
                    <rect x="-9" y="-13" width="18" height="9" rx="1.5" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />

                    {/* Solid Brass Nozzle Tip touching world Y = 170 */}
                    <polygon points="-4,-4 4,-4 1.8,-0.5 -1.8,-0.5" fill="#f59e0b" stroke="#b45309" strokeWidth="0.6" />

                    {/* Thermal molten light cone */}
                    <polygon points="-10,6 10,6 2,0 -2,0" fill={`url(#${id}-heat-light)`} opacity="0.8" />

                    {/* Molten filament glowing bead - flares when extruding, dims during rapid travel */}
                    <g>
                        <animate
                            attributeName="opacity"
                            values="1; 1; 0.2; 0.2; 1; 1; 0.2; 0.2; 1; 1; 0.2; 1"
                            keyTimes="0; 0.24; 0.27; 0.32; 0.34; 0.58; 0.61; 0.66; 0.68; 0.92; 0.95; 1"
                            dur="6s"
                            repeatCount="indefinite"
                            calcMode="linear"
                        />
                        <circle cx="0" cy="0" r="3.8" fill={c} filter={`url(#${id}-glow-strong)`} />
                        <circle cx="0" cy="0" r="2" fill="#ffffff" filter={`url(#${id}-glow)`} />
                        <circle cx="0" cy="0" r="1" fill="#ffffff" />
                    </g>
                </g>

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 4. TEMPERED GLASS FRONT DOOR EFFECT & HANDLE                      */}
                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* Glass Glare Highlight */}
                <polygon points="75,52 145,52 55,316 -15,316" fill={`url(#${id}-glass-glare)`} opacity="0.45" />

                {/* Glass Door Handle on right frame column */}
                <rect x="318" y="150" width="5" height="42" rx="2.5" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8" />

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 5. BOTTOM CHASSIS & COLOR TOUCHSCREEN CONSOLE                     */}
                {/* ═════════════════════════════════════════════════════════════════ */}
                <rect x="12" y="316" width="336" height="58" rx="6" fill={`url(#${id}-frame-metal)`} />
                <line x1="14" y1="316.5" x2="346" y2="316.5" stroke="#252b3d" strokeWidth="1" />

                {/* Rubber Vibration Damping Feet */}
                <rect x="28" y="372" width="36" height="6" rx="2" fill="#07080b" />
                <rect x="296" y="372" width="36" height="6" rx="2" fill="#07080b" />

                {/* Left Side: Ventilation Louvers & Power Switch */}
                <g opacity="0.6">
                    <line x1="36" y1="332" x2="90" y2="332" stroke="#33394d" strokeWidth="1.5" />
                    <line x1="36" y1="338" x2="90" y2="338" stroke="#33394d" strokeWidth="1.5" />
                    <line x1="36" y1="344" x2="90" y2="344" stroke="#33394d" strokeWidth="1.5" />
                    <line x1="36" y1="350" x2="90" y2="350" stroke="#33394d" strokeWidth="1.5" />
                </g>
                <circle cx="106" cy="341" r="5" fill="#141724" stroke="#373e54" strokeWidth="1" />
                <circle cx="106" cy="341" r="2" fill="#22c55e" filter={`url(#${id}-glow)`} />

                {/* Center: Live Z-Height Monospace Readout */}
                <g fontFamily="Space Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.4)">
                    <text x="130" y="337">Z-AXIS ACTIVE</text>
                    <text x="130" y="349" fill={cLight}>Δz: 0.20mm/layer</text>
                </g>

                {/* Right Side: Active Color Touchscreen UI */}
                <g>
                    {/* Bezel */}
                    <rect x="210" y="324" width="124" height="42" rx="4" fill="#06080e" stroke="#252b3d" strokeWidth="1" />
                    {/* Screen Area */}
                    <rect x="213" y="327" width="118" height="36" rx="3" fill="#090c15" />

                    {/* Progress bar track */}
                    <rect x="218" y="347" width="65" height="4" rx="2" fill="#1e2436" />
                    {/* Progress fill */}
                    <rect x="218" y="347" width="46" height="4" rx="2" fill={c} filter={`url(#${id}-glow)`} />

                    {/* Screen Status Text */}
                    <circle cx="221" cy="336" r="2" fill="#22c55e" />
                    <text x="226" y="338" fontFamily="Space Mono, monospace" fontSize="6.5" fontWeight="bold" fill="#22c55e">
                        PRINTING
                    </text>
                    <text x="290" y="338" fontFamily="Space Mono, monospace" fontSize="7" fontWeight="bold" fill="#ffffff">
                        {telemetry.progress}
                    </text>
                    <text x="218" y="358" fontFamily="Space Mono, monospace" fontSize="6" fill="rgba(255,255,255,0.5)">
                        N:{telemetry.noz} B:{telemetry.bed}
                    </text>
                    <text x="290" y="358" fontFamily="Space Mono, monospace" fontSize="6" fill={cLight}>
                        {telemetry.spd}
                    </text>
                </g>
            </svg>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* RESIN 3D PRINTER (SLA / MSLA) FOR BIO COMPLIANT GRIP                    */
/* ═══════════════════════════════════════════════════════════════════════ */
export function ResinPrinterVisual({ color = 'gold', printer }) {
    const c = '#f59e0b';
    const cLight = '#fde68a';
    const id = 'resin-printer';

    return (
        <div className="printer-visual">
            <svg viewBox="0 0 360 390" fill="none" xmlns="http://www.w3.org/2000/svg" className="printer-svg">
                <defs>
                    <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={`${id}-uv-glow`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Translucent Amber UV Cover Gradient */}
                    <linearGradient id={`${id}-amber-cover`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#78350f" stopOpacity="0.88" />
                        <stop offset="45%" stopColor="#b45309" stopOpacity="0.75" />
                        <stop offset="85%" stopColor="#92400e" stopOpacity="0.82" />
                        <stop offset="100%" stopColor="#451a03" stopOpacity="0.92" />
                    </linearGradient>

                    {/* Acrylic Glare */}
                    <linearGradient id={`${id}-acrylic-glare`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>

                    {/* Metal Gradients */}
                    <linearGradient id={`${id}-chassis-metal`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e2230" />
                        <stop offset="35%" stopColor="#141724" />
                        <stop offset="100%" stopColor="#0d0f17" />
                    </linearGradient>

                    <linearGradient id={`${id}-tower-metal`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1a1e2b" />
                        <stop offset="30%" stopColor="#2b3245" />
                        <stop offset="70%" stopColor="#1d212f" />
                        <stop offset="100%" stopColor="#11131c" />
                    </linearGradient>

                    <linearGradient id={`${id}-vat-metal`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2a2215" />
                        <stop offset="50%" stopColor="#3d2f19" />
                        <stop offset="100%" stopColor="#1a140b" />
                    </linearGradient>

                    <linearGradient id={`${id}-liquid-amber`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#b45309" stopOpacity="0.92" />
                    </linearGradient>

                    {/* UV Actinic 405nm Light Beam */}
                    <linearGradient id={`${id}-uv-beam`} x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.7" />
                        <stop offset="85%" stopColor="#f59e0b" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>

                    {/* Bio Resin Plastic */}
                    <linearGradient id={`${id}-bio-plastic`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.88" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0.95" />
                    </linearGradient>

                    <linearGradient id={`${id}-plate-metal`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#64748b" />
                        <stop offset="50%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#334155" />
                    </linearGradient>

                    {/* Dynamic Progressive Layer Reveal Clip Path (Piece grows downwards layer by layer) */}
                    <clipPath id={`${id}-piece-growth-clip`}>
                        <rect x="90" y="170" width="180" height="28">
                            <animate
                                attributeName="height"
                                values="28; 28; 47; 47; 65; 65; 98; 98; 28"
                                keyTimes="0; 0.18; 0.23; 0.52; 0.57; 0.79; 0.83; 0.95; 1"
                                dur="6s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </rect>
                    </clipPath>
                </defs>

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 1. AMBER UV-BLOCKING HOOD & CHASSIS FRAME                         */}
                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* Dark Inner Chamber Background */}
                <rect x="18" y="16" width="324" height="258" rx="8" fill="#08070a" stroke="#251b14" strokeWidth="1.5" />

                {/* Translucent Amber Acrylic Enclosure */}
                <rect x="18" y="16" width="324" height="258" rx="8"
                    fill={`url(#${id}-amber-cover)`} stroke="#d97706" strokeWidth="1.6" strokeOpacity="0.6" />

                {/* Diagonal Specular Reflection Glare on Acrylic Cover */}
                <polygon points="75,16 145,16 55,274 -15,274" fill={`url(#${id}-acrylic-glare)`} opacity="0.45" />
                <polygon points="165,16 195,16 105,274 75,274" fill={`url(#${id}-acrylic-glare)`} opacity="0.2" />

                {/* Hood Grip/Handle */}
                <rect x="150" y="10" width="60" height="9" rx="3" fill="#181c28" stroke="#475569" strokeWidth="0.8" />

                {/* Top Branding (Fixed NRO-CoreXY as requested) */}
                <circle cx="102" cy="28" r="3" fill="#22c55e" filter={`url(#${id}-glow)`}>
                    <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <text x="112" y="32" fontFamily="Space Mono, monospace" fontSize="9" fontWeight="bold" fill={cLight} letterSpacing="0.08em">
                    NRO-CoreXY
                </text>
                <text x="112" y="44" fontFamily="Space Mono, monospace" fontSize="7" fill="rgba(255,255,255,0.4)" letterSpacing="0.05em">
                    COMPLIANT_GRIP.STL • L: 112/175
                </text>

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 2. RIGID DUAL-RAIL CNC Z-TOWER & LEAD SCREW                        */}
                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* Aluminum Extruded Tower */}
                <rect x="154" y="38" width="52" height="222" rx="3"
                    fill={`url(#${id}-tower-metal)`} stroke="#373d52" strokeWidth="0.8" />
                {/* Left Linear Guide Rail */}
                <line x1="166" y1="40" x2="166" y2="258" stroke="#94a3b8" strokeWidth="2.5" />
                {/* Right Linear Guide Rail */}
                <line x1="194" y1="40" x2="194" y2="258" stroke="#94a3b8" strokeWidth="2.5" />
                {/* Central Threaded Ball Screw */}
                <rect x="178" y="40" width="4" height="218" fill="#cbd5e1" />
                {[...Array(24)].map((_, i) => (
                    <line key={i} x1="178" y1={44 + i * 8.8} x2="182" y2={46 + i * 8.8} stroke="#475569" strokeWidth="0.8" />
                ))}
                {/* Stepper Motor at Tower Top */}
                <rect x="164" y="30" width="32" height="12" rx="2" fill="#141724" stroke="#373e54" strokeWidth="0.8" />

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 3. RESIN VAT & ACTINIC UV 405nm CURING LIGHT (AT BOTTOM)           */}
                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* Vat Body */}
                <rect x="66" y="246" width="228" height="20" rx="4"
                    fill={`url(#${id}-vat-metal)`} stroke="#d97706" strokeWidth="1.4" strokeOpacity="0.9" />

                {/* Dual Vat Clamping Thumbscrews */}
                <circle cx="54" cy="256" r="6.5" fill="#1a1d29" stroke="#f59e0b" strokeWidth="1" />
                <line x1="50" y1="256" x2="58" y2="256" stroke="#f59e0b" strokeWidth="1.2" />
                <circle cx="306" cy="256" r="6.5" fill="#1a1d29" stroke="#f59e0b" strokeWidth="1" />
                <line x1="302" y1="256" x2="310" y2="256" stroke="#f59e0b" strokeWidth="1.2" />

                {/* Vat Volume Text */}
                <text x="74" y="259" fontFamily="Space Mono, monospace" fontSize="5.5" fill="#f59e0b" opacity="0.85">
                    MAX 400ml
                </text>

                {/* Liquid Resin Pool */}
                <rect x="82" y="249" width="196" height="15" rx="2" fill={`url(#${id}-liquid-amber)`} />
                <line x1="84" y1="250" x2="276" y2="250" stroke="#fef08a" strokeWidth="0.8" strokeOpacity="0.7" />

                {/* UV Exposure Light Source under optical window (Pulsing actinic UV light) */}
                <rect x="110" y="261" width="140" height="4" rx="2" fill="#a855f7" filter={`url(#${id}-uv-glow)`}>
                    <animate
                        attributeName="opacity"
                        values="0.05; 0.05; 1; 1; 0.05; 0.05; 1; 1; 0.05; 0.05; 1; 1; 0.05; 0.05"
                        keyTimes="0; 0.16; 0.20; 0.25; 0.29; 0.50; 0.54; 0.59; 0.63; 0.77; 0.81; 0.86; 0.90; 1"
                        dur="6s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                </rect>
                {/* Upward UV Light Cone into liquid resin */}
                <polygon points="125,262 235,262 216,236 144,236" fill={`url(#${id}-uv-beam)`}>
                    <animate
                        attributeName="opacity"
                        values="0; 0; 0.9; 0.9; 0; 0; 0.9; 0.9; 0; 0; 0.9; 0.9; 0; 0"
                        keyTimes="0; 0.16; 0.20; 0.25; 0.29; 0.50; 0.54; 0.59; 0.63; 0.77; 0.81; 0.86; 0.90; 1"
                        dur="6s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                </polygon>

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 4. MOVING BUILD PLATFORM & PROGRESSIVE BIO LAYER CURING          */}
                {/* ═════════════════════════════════════════════════════════════════ */}
                <g>
                    {/* Platform Z-Lift motion (lifting upside-down out of resin vat) */}
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 0; 0 -14; 0 -6; 0 -6; 0 -24; 0 -14; 0 -14; 0 -36; 0 -36; 0 0"
                        keyTimes="0; 0.25; 0.35; 0.45; 0.55; 0.68; 0.76; 0.82; 0.90; 0.95; 1"
                        dur="6s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />

                    {/* Cantilever Bracket Gripping Z-Tower Rails */}
                    <path d="M 158 160 L 180 148 L 202 160 L 190 173 L 170 173 Z" fill="#181c28" stroke="#373d52" strokeWidth="1" />
                    {/* Quick-release knurled ball-joint knob on top */}
                    <circle cx="180" cy="152" r="5" fill="#d97706" stroke="#92400e" strokeWidth="0.8" />
                    <rect x="175" y="143" width="10" height="5" rx="1.5" fill="#475569" stroke="#334155" strokeWidth="0.6" />

                    {/* Chamfered Aluminum Build Plate */}
                    <polygon points="105,175 255,175 248,166 112,166" fill={`url(#${id}-plate-metal)`} stroke="#94a3b8" strokeWidth="1" />
                    <line x1="106" y1="175.5" x2="254" y2="175.5" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.85" />

                    {/* Base Raft Adhering to Build Plate */}
                    <rect x="114" y="176" width="132" height="3" rx="1" fill="#d97706" stroke="#f59e0b" strokeWidth="0.8" />

                    {/* ── SUSPENDED BIO-LATTICE GRIPPER (PROGRESSIVELY CURED LAYER-BY-LAYER) ── */}
                    <g clipPath={`url(#${id}-piece-growth-clip)`}>
                        {/* Base Flange with Bolt Holes */}
                        <rect x="114" y="179" width="132" height="18" rx="3"
                            fill={`url(#${id}-bio-plastic)`} stroke="#f59e0b" strokeWidth="1.4" strokeOpacity="0.9" />
                        <circle cx="138" cy="188" r="4" fill="#07080e" stroke="#f59e0b" strokeWidth="1.2" />
                        <circle cx="222" cy="188" r="4" fill="#07080e" stroke="#f59e0b" strokeWidth="1.2" />

                        {/* Left Flexible Arm */}
                        <path d="M 120 197 L 122 226 L 122 246 L 164 246 L 158 226 L 154 197 Z"
                            fill={`url(#${id}-bio-plastic)`} stroke="#f59e0b" strokeWidth="1.4" strokeOpacity="0.9" />

                        {/* Right Flexible Arm */}
                        <path d="M 240 197 L 238 226 L 238 246 L 196 246 L 202 226 L 206 197 Z"
                            fill={`url(#${id}-bio-plastic)`} stroke="#f59e0b" strokeWidth="1.4" strokeOpacity="0.9" />

                        {/* Auxetic Spring Diamond Flexures */}
                        <g stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.8" fill="#f59e0b" fillOpacity="0.1">
                            <polygon points="180,200 190,210 180,220 170,210" />
                            <polygon points="180,220 190,230 180,240 170,230" />
                            <polygon points="180,240 188,245 180,246 172,245" />
                            <line x1="156" y1="210" x2="170" y2="210" />
                            <line x1="190" y1="210" x2="204" y2="210" />
                            <line x1="157" y1="230" x2="170" y2="230" />
                            <line x1="190" y1="230" x2="203" y2="230" />
                        </g>

                        {/* Horizontal SLA Micro-Layer Lines (50 micron layer striations) */}
                        <g stroke="#f59e0b" strokeWidth="0.4" strokeOpacity="0.3">
                            {[182, 186, 190, 194, 198, 202, 206, 210, 214, 218, 222, 226, 230, 234, 238, 242].map(y => {
                                const w = (y < 197) ? 132 : (y < 226) ? 116 : 96;
                                const lx = 180 - w / 2;
                                return <line key={y} x1={lx} y1={y} x2={lx + w} y2={y} />;
                            })}
                        </g>

                        {/* Liquid Resin Droplets Clinging & Dripping from Lowest Tips */}
                        <path d="M 178 246 C 178 250, 179 253, 180 253 C 181 253, 182 250, 182 246 Z" fill="#f59e0b" opacity="0.9" />
                        <circle cx="180" cy="255" r="1.5" fill="#f59e0b" opacity="0.8">
                            <animate attributeName="cy" values="253; 263; 253" dur="2.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.9; 0; 0.9" dur="2.2s" repeatCount="indefinite" />
                        </circle>
                    </g>

                    {/* ── NEWLY CURED LAYER BOUNDARY UV FLASHES (INDICATING ACTIVE LAYER ADDITION) ── */}
                    {/* Layer 1 Curing Flash Line */}
                    <g>
                        <line x1="120" y1="216" x2="240" y2="216" stroke="#ffffff" strokeWidth="2.5" filter={`url(#${id}-uv-glow)`}>
                            <animate
                                attributeName="opacity"
                                values="0; 0; 1; 1; 0; 0"
                                keyTimes="0; 0.18; 0.22; 0.32; 0.38; 1"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </line>
                        <line x1="120" y1="216" x2="240" y2="216" stroke="#fde68a" strokeWidth="1.2">
                            <animate
                                attributeName="opacity"
                                values="0; 0; 1; 1; 0; 0"
                                keyTimes="0; 0.18; 0.22; 0.32; 0.38; 1"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </line>
                    </g>

                    {/* Layer 2 Curing Flash Line */}
                    <g>
                        <line x1="121" y1="233" x2="239" y2="233" stroke="#ffffff" strokeWidth="2.5" filter={`url(#${id}-uv-glow)`}>
                            <animate
                                attributeName="opacity"
                                values="0; 0; 0; 1; 1; 0; 0"
                                keyTimes="0; 0.18; 0.52; 0.56; 0.66; 0.72; 1"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </line>
                        <line x1="121" y1="233" x2="239" y2="233" stroke="#fde68a" strokeWidth="1.2">
                            <animate
                                attributeName="opacity"
                                values="0; 0; 0; 1; 1; 0; 0"
                                keyTimes="0; 0.18; 0.52; 0.56; 0.66; 0.72; 1"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </line>
                    </g>

                    {/* Layer 3 Curing Flash Line */}
                    <g>
                        <line x1="122" y1="246" x2="238" y2="246" stroke="#ffffff" strokeWidth="2.5" filter={`url(#${id}-uv-glow)`}>
                            <animate
                                attributeName="opacity"
                                values="0; 0; 0; 0; 1; 1; 0; 0"
                                keyTimes="0; 0.52; 0.79; 0.83; 0.90; 0.94; 1"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </line>
                        <line x1="122" y1="246" x2="238" y2="246" stroke="#fde68a" strokeWidth="1.2">
                            <animate
                                attributeName="opacity"
                                values="0; 0; 0; 0; 1; 1; 0; 0"
                                keyTimes="0; 0.52; 0.79; 0.83; 0.90; 0.94; 1"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </line>
                    </g>
                </g>

                {/* ═════════════════════════════════════════════════════════════════ */}
                {/* 5. MACHINE BASE & ACTIVE TOUCHSCREEN                               */}
                {/* ═════════════════════════════════════════════════════════════════ */}
                <rect x="12" y="272" width="336" height="102" rx="6" fill={`url(#${id}-chassis-metal)`} />
                <line x1="14" y1="272.5" x2="346" y2="272.5" stroke="#252b3d" strokeWidth="1" />

                {/* Rubber Vibration Damping Feet */}
                <rect x="28" y="372" width="36" height="6" rx="2" fill="#07080b" />
                <rect x="296" y="372" width="36" height="6" rx="2" fill="#07080b" />

                {/* Left Side: Ventilation & Power Switch */}
                <g opacity="0.6">
                    <line x1="36" y1="316" x2="90" y2="316" stroke="#33394d" strokeWidth="1.5" />
                    <line x1="36" y1="322" x2="90" y2="322" stroke="#33394d" strokeWidth="1.5" />
                    <line x1="36" y1="328" x2="90" y2="328" stroke="#33394d" strokeWidth="1.5" />
                    <line x1="36" y1="334" x2="90" y2="334" stroke="#33394d" strokeWidth="1.5" />
                </g>
                <circle cx="106" cy="325" r="5" fill="#141724" stroke="#373e54" strokeWidth="1" />
                <circle cx="106" cy="325" r="2" fill="#22c55e" filter={`url(#${id}-glow)`} />

                {/* Center: Live SLA Readout */}
                <g fontFamily="Space Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.4)">
                    <text x="130" y="322">MSLA UV 405nm</text>
                    <text x="130" y="334" fill={cLight}>Δz: 0.05mm (50μm)</text>
                    <text x="130" y="346" fill="rgba(255,255,255,0.3)">VAT: HEATED 30°C</text>
                </g>

                {/* Right Side: Active Color Touchscreen UI */}
                <g>
                    {/* Bezel */}
                    <rect x="210" y="310" width="124" height="56" rx="4" fill="#06080e" stroke="#252b3d" strokeWidth="1" />
                    {/* Screen Area */}
                    <rect x="213" y="313" width="118" height="50" rx="3" fill="#090c15" />

                    {/* Progress bar track */}
                    <rect x="218" y="337" width="65" height="4" rx="2" fill="#1e2436" />
                    {/* Progress fill */}
                    <rect x="218" y="337" height="4" rx="2" fill={c} filter={`url(#${id}-glow)`}>
                        <animate
                            attributeName="width"
                            values="18; 18; 36; 36; 52; 52; 65; 65; 18"
                            keyTimes="0; 0.22; 0.26; 0.56; 0.60; 0.83; 0.87; 0.95; 1"
                            dur="6s"
                            repeatCount="indefinite"
                            calcMode="linear"
                        />
                    </rect>

                    {/* Screen Status Text */}
                    <circle cx="221" cy="325" r="2" fill="#22c55e" />
                    <text x="226" y="327" fontFamily="Space Mono, monospace" fontSize="6.5" fontWeight="bold" fill="#22c55e">
                        UV CURING
                    </text>
                    <text x="290" y="327" fontFamily="Space Mono, monospace" fontSize="7" fontWeight="bold" fill="#ffffff">
                        64%
                    </text>
                    <text x="218" y="352" fontFamily="Space Mono, monospace" fontSize="6" fill="rgba(255,255,255,0.5)">
                        EXP:2.4s L:112
                    </text>
                    <text x="290" y="352" fontFamily="Space Mono, monospace" fontSize="6" fill={cLight}>
                        60mm/m
                    </text>
                </g>
            </svg>
        </div>
    );
}

/* Master PrinterVisual router */
export function PrinterVisual({ color, printer }) {
    const pid = printer?.id || (color === 'purple' ? 'pr2' : color === 'gold' ? 'pr3' : 'ipr1');
    const isBio = pid === 'pr3';

    if (isBio) {
        return <ResinPrinterVisual color={color} printer={printer} />;
    }
    return <FdmPrinterVisual color={color} printer={printer} />;
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
