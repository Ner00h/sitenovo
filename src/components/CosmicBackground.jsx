import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './CosmicBackground.css';

export default function CosmicBackground() {
    const mountRef = useRef(null);
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, clientX: -1000, clientY: -1000 });
    const animFrameRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const W = window.innerWidth;
        const H = window.innerHeight;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 2000);
        camera.position.z = 600;

        // ---- STAR LAYERS ----
        function createStars(count, size, spread, color) {
            const geo = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            for (let i = 0; i < count * 3; i++) {
                positions[i] = (Math.random() - 0.5) * spread;
            }
            geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const mat = new THREE.PointsMaterial({
                size,
                color,
                transparent: true,
                opacity: 0.85,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                sizeAttenuation: true,
            });
            return new THREE.Points(geo, mat);
        }

        const stars1 = createStars(300, 1.8, 2000, 0xffffff);
        const stars2 = createStars(150, 0.9, 1800, 0x88ccff);
        const stars3 = createStars(80, 3.2, 2200, 0xaaffee);
        scene.add(stars1, stars2, stars3);

        // ---- NEBULA PARTICLES ----
        function createNebula(count, color1, color2, spread) {
            const geo = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const c1 = new THREE.Color(color1);
            const c2 = new THREE.Color(color2);
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * spread;
                positions[i3 + 1] = (Math.random() - 0.5) * (spread * 0.6);
                positions[i3 + 2] = (Math.random() - 0.5) * (spread * 0.3) - 200;
                const mix = Math.random();
                colors[i3] = c1.r * mix + c2.r * (1 - mix);
                colors[i3 + 1] = c1.g * mix + c2.g * (1 - mix);
                colors[i3 + 2] = c1.b * mix + c2.b * (1 - mix);
            }
            geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            const mat = new THREE.PointsMaterial({
                size: 28,
                vertexColors: true,
                transparent: true,
                opacity: 0.06,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                sizeAttenuation: true,
            });
            return new THREE.Points(geo, mat);
        }

        const nebula1 = createNebula(80, 0x0070ff, 0x7c3aed, 1600);
        const nebula2 = createNebula(50, 0x00c8ff, 0x003366, 1400);
        scene.add(nebula1, nebula2);

        // ---- FLOATING GEOMETRY ----
        function createFloatingRings() {
            const group = new THREE.Group();
            const ringGeo = new THREE.TorusGeometry(80, 0.5, 8, 100);
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0x00c8ff,
                transparent: true,
                opacity: 0.12,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI * 0.3;
            group.add(ring);

            const ring2Geo = new THREE.TorusGeometry(140, 0.3, 8, 120);
            const ring2Mat = new THREE.MeshBasicMaterial({
                color: 0x7c3aed,
                transparent: true,
                opacity: 0.08,
            });
            const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
            ring2.rotation.x = Math.PI * 0.5;
            ring2.rotation.y = Math.PI * 0.2;
            group.add(ring2);

            group.position.set(300, -100, -300);
            return { group, ring, ring2 };
        }

        const { group: ringGroup, ring: ring1, ring2 } = createFloatingRings();
        scene.add(ringGroup);

        // Mouse tracking
        const handleMouse = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
            mouseRef.current.clientX = e.clientX;
            mouseRef.current.clientY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouse);

        // Resize
        const handleResize = () => {
            const W = window.innerWidth;
            const H = window.innerHeight;
            camera.aspect = W / H;
            camera.updateProjectionMatrix();
            renderer.setSize(W, H);
        };
        window.addEventListener('resize', handleResize);

        // Animation loop
        let t = 0;
        let camX = 0, camY = 0;
        const animate = () => {
            animFrameRef.current = requestAnimationFrame(animate);
            t += 0.001;

            // Smooth camera drift following mouse
            camX += (mouseRef.current.x * 30 - camX) * 0.04;
            camY += (mouseRef.current.y * 20 - camY) * 0.04;
            camera.position.x = camX;
            camera.position.y = camY;

            // Rotate star layers at different speeds
            stars1.rotation.y = t * 0.05;
            stars1.rotation.x = t * 0.02;
            stars2.rotation.y = -t * 0.03;
            stars3.rotation.y = t * 0.08;

            // Nebula drift
            nebula1.rotation.z = t * 0.015;
            nebula2.rotation.z = -t * 0.01;

            // Rings
            ring1.rotation.z = t;
            ring2.rotation.z = -t * 0.7;
            ringGroup.rotation.y = t * 0.3;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('mousemove', handleMouse);
            window.removeEventListener('resize', handleResize);
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    // Constellation Canvas Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let W = window.innerWidth;
        let H = window.innerHeight;
        let particles = [];

        const initCanvas = () => {
            canvas.width = W;
            canvas.height = H;
        };
        initCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * W;
                this.y = Math.random() * H;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 1.2 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > W) this.vx *= -1;
                if (this.y < 0 || this.y > H) this.vy *= -1;

                // Mouse interaction / Repulsion
                const dx = mouseRef.current.clientX - this.x;
                const dy = mouseRef.current.clientY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 140;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    this.x -= (dx / distance) * force * 4;
                    this.y -= (dy / distance) * force * 4;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 200, 255, 0.5)';
                ctx.fill();
            }
        }

        for (let i = 0; i < 120; i++) {
            particles.push(new Particle());
        }

        const animateCanvas = () => {
            ctx.clearRect(0, 0, W, H);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 200, 255, ${0.12 * (1 - distance / 120)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animateCanvas);
        };
        animateCanvas();

        const handleResize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            initCanvas();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="cosmic-bg-container">
            <div ref={mountRef} className="cosmic-bg" />
            <canvas ref={canvasRef} className="cosmic-canvas" />
        </div>
    );
}
