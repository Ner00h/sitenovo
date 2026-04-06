import { useState } from 'react';
import SectionReveal from './SectionReveal';
import './Contact.css';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Compose mailto link
        const mailto = `mailto:contato@nerooh.com?subject=${encodeURIComponent(form.subject || 'Contato - ' + form.name)}&body=${encodeURIComponent(`Nome: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
        window.open(mailto, '_blank');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <SectionReveal>
                    <div className="section-header">
                        <span className="label-tag">⬡ Contato</span>
                        <h2>Vamos <span className="gradient-text">Trabalhar Juntos</span></h2>
                        <p>
                            Tem um projeto de manufatura aditiva em mente? Entre em contato
                            e vamos transformar sua ideia em realidade.
                        </p>
                    </div>
                </SectionReveal>

                <div className="contact-layout">
                    {/* Left: info */}
                    <SectionReveal delay={100}>
                        <div className="contact-info">
                            <div className="contact-info-head">
                                <div className="contact-avatar">N</div>
                                <div>
                                    <p className="contact-brand">Nerooh</p>
                                    <p className="contact-tagline">Manufatura Aditiva Profissional</p>
                                </div>
                            </div>

                            <p className="contact-text">
                                Desenvolvemos soluções completas em manufatura aditiva — do projeto ao produto final.
                                Impressoras customizadas, peças industriais, consultoria DfAM.
                            </p>

                            <div className="contact-links">
                                <a href="mailto:contato@nerooh.com" className="contact-link" data-cursor>
                                    <div className="contact-link-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact-link-label">Email</span>
                                        <span className="contact-link-value">contato@nerooh.com</span>
                                    </div>
                                </a>

                                <a href="https://github.com/nerooh" target="_blank" rel="noopener noreferrer" className="contact-link" data-cursor>
                                    <div className="contact-link-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact-link-label">GitHub</span>
                                        <span className="contact-link-value">github.com/nerooh</span>
                                    </div>
                                </a>

                                <div className="contact-link">
                                    <div className="contact-link-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact-link-label">Localização</span>
                                        <span className="contact-link-value">Brasil</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Right: form */}
                    <SectionReveal delay={200}>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Seu nome"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Assunto</label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    placeholder="Projeto FDM Industrial, Desenvolvimento de impressora..."
                                    value={form.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mensagem</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Descreva seu projeto ou dúvida..."
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className={`btn-primary contact-submit ${submitted ? 'sent' : ''}`}>
                                {submitted ? (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Mensagem Preparada!
                                    </>
                                ) : (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                        Enviar Mensagem
                                    </>
                                )}
                            </button>
                        </form>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}
