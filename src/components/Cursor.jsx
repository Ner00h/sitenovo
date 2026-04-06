import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const posRef = useRef({ x: -100, y: -100 });
    const ringPosRef = useRef({ x: -100, y: -100 });
    const rafRef = useRef(null);
    const hoveredRef = useRef(false);

    useEffect(() => {
        document.body.classList.add('cursor-active');

        const onMove = (e) => {
            posRef.current = { x: e.clientX, y: e.clientY };
        };

        const onOver = (e) => {
            const t = e.target;
            if (t.matches('a, button, [data-cursor], .project-card, .printer-card, .capability-card, .nav-link')) {
                hoveredRef.current = true;
                dotRef.current?.classList.add('hovered');
                ringRef.current?.classList.add('hovered');
            }
        };

        const onOut = () => {
            hoveredRef.current = false;
            dotRef.current?.classList.remove('hovered');
            ringRef.current?.classList.remove('hovered');
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);

        const animate = () => {
            rafRef.current = requestAnimationFrame(animate);
            const { x, y } = posRef.current;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
            }
            // Ring follows with lag
            ringPosRef.current.x += (x - ringPosRef.current.x) * 0.12;
            ringPosRef.current.y += (y - ringPosRef.current.y) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px)`;
            }
        };
        animate();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
            document.body.classList.remove('cursor-active');
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}
