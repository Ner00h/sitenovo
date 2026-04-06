import { useEffect, useRef } from 'react';
import './SectionReveal.css';

export default function SectionReveal({ children, className = '', delay = 0, type = 'up' }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    const cls = type === 'scale' ? 'reveal-scale' : 'reveal';

    return (
        <div ref={ref} className={`${cls} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}
