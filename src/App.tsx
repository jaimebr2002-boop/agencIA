import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import LandingSections from './components/LandingSections';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'El problema', href: '#problema' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Sectores', href: '#sectores' },
    { label: 'Cómo funciona', href: '#proceso' },
    { label: 'Garantía', href: '#garantia' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-grain bg-halftone font-sans">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-[999]" style={{ backgroundColor: 'rgba(234,234,234,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="w-full h-20 max-w-[1440px] mx-auto px-6 md:px-8 flex justify-between items-center relative">
          <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} className="translate-y-[2px]" style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, color: '#111111' }}>
            NEXORA<sup style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 400 }}>®</sup>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center mr-12" style={{ gap: '32px' }}>
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="transition-colors duration-200 uppercase translate-y-[1.5px]"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', color: '#666666' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#111111'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#cta" 
              onClick={(e) => handleSmoothScroll(e, '#cta')}
              className="uppercase transition-colors duration-200"
              style={{ backgroundColor: '#111111', color: '#ffffff', padding: '9px 18px', borderRadius: '4px', fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.1em' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#B4FF00'; e.currentTarget.style.color = '#111111'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.color = '#ffffff'; }}
            >
              Agenda llamada &rarr;
            </a>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-[20px] h-[20px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ gap: '5px' }}
          >
            <span className={`w-[20px] h-[2px] bg-[#111111] transition-transform duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`w-[20px] h-[2px] bg-[#111111] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-[20px] h-[2px] bg-[#111111] transition-transform duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div 
          className="md:hidden absolute top-20 left-0 w-full overflow-hidden transition-all duration-300 flex flex-col"
          style={{ 
            backgroundColor: '#EAEAEA',
            borderBottom: isMobileMenuOpen ? '1px solid rgba(0,0,0,0.08)' : 'none',
            maxHeight: isMobileMenuOpen ? '500px' : '0px',
            opacity: isMobileMenuOpen ? 1 : 0,
            visibility: isMobileMenuOpen ? 'visible' : 'hidden'
          }}
        >
          <div className="flex flex-col" style={{ padding: '24px 40px' }}>
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="uppercase"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', letterSpacing: '0.08em', color: '#111111', padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#cta" 
              onClick={(e) => handleSmoothScroll(e, '#cta')}
              className="inline-block uppercase text-center"
              style={{ backgroundColor: '#111111', color: '#ffffff', padding: '12px 20px', borderRadius: '4px', fontFamily: 'var(--font-sans)', fontSize: '14px', letterSpacing: '0.08em', marginTop: '12px' }}
            >
              Agenda llamada &rarr;
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main id="hero" className="flex-grow flex flex-col items-center justify-end pt-40 md:pt-52 pb-12 md:pb-16 w-full min-h-[82vh] content-layer relative overflow-hidden">
        
        {/* Background Image Layer for the Hero */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-multiply pointer-events-none overflow-visible">
          {/* Mobile Image */}
          <img 
            src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1776930984/hero_movil_hxdvrd.png" 
            alt="Hero Background Image Mobile"
            className="md:hidden w-full h-full object-cover object-[center_30%] filter grayscale contrast-125 select-none scale-[2.0]"
            referrerPolicy="no-referrer"
          />
          {/* Desktop Image */}
          <img 
            src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1776894926/IMG_1434_hipmia.png" 
            alt="Hero Background Image Desktop"
            className="hidden md:block w-full h-full object-cover object-[center_15%] md:object-top filter grayscale contrast-125 select-none scale-[1.15] translate-y-10 md:translate-y-14"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Mobile Main Brand Title */}
        <div 
          className="md:hidden absolute left-1/2 text-center w-full px-6 z-10 select-none pointer-events-none" 
          style={{ bottom: '55%', transform: 'translateX(calc(-50% + 5px))' }}
        >
          <span 
            className="block font-serif font-bold"
            style={{
              fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
              color: 'transparent',
              WebkitTextStroke: '1.5px #111111',
              letterSpacing: '0.05em',
              lineHeight: 1
            }}
          >
            NEXORA
          </span>
        </div>

        {/* Desktop Main Brand Title */}
        <div 
          className="hidden md:block absolute left-1/2 text-center w-full px-6 z-10 select-none pointer-events-none" 
          style={{ bottom: '65%', transform: 'translateX(calc(-50% - 12px))' }}
        >
          <span 
            className="block font-serif font-bold"
            style={{
              fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
              color: 'transparent',
              WebkitTextStroke: '1.5px #111111',
              letterSpacing: '0.05em',
              lineHeight: 1
            }}
          >
            NEXORA
          </span>
        </div>

        {/* Tagline - Original lower position */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 text-center w-full px-6 z-10 select-none pointer-events-none flex flex-col items-center gap-2" 
          style={{ bottom: '12%' }}
        >
          <span 
            className="block font-sans uppercase"
            style={{
              fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
              fontWeight: 900,
              letterSpacing: '0.22em',
              color: '#555555'
            }}
          >
            AGENCIA DE IA · ESPAÑA
          </span>
          <span 
            className="block font-sans"
            style={{
              fontSize: 'clamp(0.8rem, 1.25vw, 1rem)',
              fontWeight: 700,
              color: '#333333'
            }}
          >
            El empleado que no te va a fallar
          </span>
        </div>
      </main>

      <div style={{ textAlign: 'center', margin: '48px auto', maxWidth: '600px', padding: '0 24px' }} className="relative z-50">
        <a href="https://cal.com/clinca/reservas?utm_source=web&utm_medium=cta&utm_campaign=hero" target="_blank" className="bg-brand-accent text-brand-black font-bold uppercase tracking-[0.15em] px-10 py-5 rounded hover:bg-brand-white transition-colors duration-300 w-full md:w-auto inline-block">
          QUIERO VER CÓMO FUNCIONARÍA EN MI NEGOCIO &rarr;
        </a>
        <p style={{ marginTop: '12px', fontSize: '13px', color: '#888888', letterSpacing: '0.3px' }}>
          Sin compromiso &middot; 30 min &middot; Si no encajamos, te lo decimos en 5 min
        </p>
      </div>

      {/* Floating mobile button */}
      <div id="cta-flotante" className="md:hidden fixed bottom-0 left-0 w-full z-[999] p-3 text-center bg-[#111111] border-t border-[#222222]">
        <a href="https://cal.com/clinca/reservas?utm_source=web&utm_medium=cta&utm_campaign=flotante" target="_blank" className="bg-brand-accent text-brand-black font-bold uppercase tracking-[0.15em] py-3 rounded hover:bg-brand-white transition-colors duration-300 block w-full text-sm">
          RESERVAR MIS 30 MIN &rarr;
        </a>
      </div>

      {/* Logo Strip Section */}
      <section className="w-full border-y border-ink bg-[#F5F5F5] z-50 relative">
        <div className="flex flex-col items-center w-full px-6 pt-2 pb-10 md:pt-3 md:pb-12 max-w-[1440px] mx-auto content-layer gap-2 md:gap-3">
          <p className="font-sans text-[11px] font-bold uppercase text-gray-500 tracking-[0.2em] text-center pt-8">
            INTEGRADO CON LAS MEJORES PLATAFORMAS
          </p>
          
          <div className="flex flex-row flex-wrap xl:flex-nowrap justify-center items-center gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-6 px-2 md:px-4 w-full">
            <div className="h-8 md:h-11 lg:h-12 flex items-center justify-center mix-blend-multiply shrink-0">
              <img 
                src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1776897946/IMG_1441_d37szu.jpg" 
                alt="Higgsfield logo" 
                className="h-full w-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1776896944/N8n-logo-new.svg_bmzgka.png" 
              alt="n8n logo" 
              className="h-9 md:h-12 lg:h-[52px] w-auto object-contain select-none translate-y-0.5 md:translate-y-1 shrink-0"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1776896023/make-logo-png_seeklogo-506859_kfniqp.png" 
              alt="Make logo" 
              className="h-[110px] md:h-[130px] lg:h-[150px] w-auto object-contain select-none shrink-0"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1776896944/Claude_AI_logo.svg_sdvulm.png" 
              alt="Claude AI logo" 
              className="h-7 md:h-9 lg:h-10 w-auto object-contain select-none shrink-0"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1776896944/gohighlevel-logo-1024x232_rxrpha.png" 
              alt="GoHighLevel logo" 
              className="h-6 md:h-8 lg:h-9 w-auto object-contain select-none shrink-0"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1776897328/1fbcdb65-c2aa-44ae-97f7-0d064e3ef1c4_nzdysm.png" 
              alt="Retell AI logo" 
              className="h-5 md:h-7 lg:h-8 w-auto object-contain select-none shrink-0 translate-y-0.5 md:translate-y-1"
              referrerPolicy="no-referrer"
            />
            <div className="h-7 md:h-9 lg:h-10 flex items-center justify-center mix-blend-multiply shrink-0 translate-y-0.5 md:translate-y-1">
              <img 
                src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1776897945/ChatGPT-Vertical-Logo-Vector.svg-_c6kjdd.png" 
                alt="ChatGPT logo" 
                className="h-full w-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <LandingSections />

    </div>
  );
}
