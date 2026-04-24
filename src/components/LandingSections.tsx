import React, { useEffect, useRef, useState } from 'react';
import { Play, Shield, Plus, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal, .reveal-stagger');
    elements.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
}

const SectionGrain = () => (
  <div 
    className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-[0.06]"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
);

function AnimatedCounter({ end, text, prefix = "", suffix = "", isRange = false }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let startTimestamp = null;
        const duration = 1800;
        
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          setCount(easeProgress * end);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(end);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  const displayCount = Math.floor(count);
  const formattedCount = new Intl.NumberFormat('es-ES').format(displayCount);
  
  // Custom logic for the 4-8 range
  const displayValue = isRange && displayCount >= 4 ? `4-${displayCount}` : formattedCount;

  return (
    <div ref={ref} className="flex flex-col items-center text-center reveal">
      <div className="font-serif text-5xl md:text-6xl text-brand-black tracking-tight mb-2">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="font-sans text-sm text-brand-gray max-w-[200px] leading-relaxed">{text}</div>
    </div>
  );
}

function AnimatedBadgeNumber({ end }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let startTimestamp = null;
        const duration = 1500;
        
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          setCount(easeProgress * end);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(end);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      +{Math.floor(count).toLocaleString('es-ES')}€/mes
    </span>
  );
}

function ProgressLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
      }
    }, { threshold: 0.5 });
    
    if (lineRef.current) observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={lineRef}
      className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-brand-black/20 z-0"
    >
      <div 
        className="h-full bg-brand-accent transition-all duration-[2000ms] ease-out origin-left"
        style={{ transform: `scaleX(${active ? 1 : 0})` }}
      />
    </div>
  );
}

export default function LandingSections() {
  useScrollReveal();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="w-full font-sans text-base leading-[1.75]">
      
      {/* 2. BARRA DE ESTADÍSTICAS */}
      <section id="stats" className="w-full bg-brand-white border-y border-brand-border py-16 md:py-24 relative content-layer">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <AnimatedCounter end={72} text="Pymes españolas sin IA. Adelantate a tu competencia." suffix="%" />
          <AnimatedCounter end={9880} text="Ahorro medio/mes por negocio automatizado" suffix="€" />
          <AnimatedCounter end={12} text="ROI desde el primer mes" isRange={false} suffix="×" />
        </div>
      </section>

      {/* 3. EL PROBLEMA */}
      <section id="problema" className="w-full bg-brand-bg relative py-20 md:py-32 content-layer overflow-hidden">
        <SectionGrain />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-16 max-w-3xl mx-auto leading-tight reveal">
            Mientras lees esto, estás perdiendo dinero.
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left reveal-stagger">
            {/* Card 1 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-9 flex flex-col items-start transition-all hover:-translate-y-1 hover:shadow-sm">
              <div className="bg-brand-accent text-brand-black text-[0.7rem] uppercase font-bold px-3 py-1 rounded-full mb-6 flex items-center gap-2 tracking-wider">
                <span>📞</span> LLAMADAS PERDIDAS
              </div>
              <h3 className="font-serif font-semibold text-2xl text-brand-black mb-3">Llamadas perdidas.</h3>
              <p className="text-brand-gray">De las llamadas a negocios después de las 18:00 gran parte se pierden. Cada llamada tiene un valor estimado de 400€ tirados a la basura.</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-9 flex flex-col items-start transition-all hover:-translate-y-1 hover:shadow-sm">
              <div className="bg-brand-accent text-brand-black text-[0.7rem] uppercase font-bold px-3 py-1 rounded-full mb-6 flex items-center gap-2 tracking-wider">
                <span>💬</span> WHATSAPPS SIN CONTESTAR
              </div>
              <h3 className="font-serif font-semibold text-2xl text-brand-black mb-3">2 minutos de paciencia.</h3>
              <p className="text-brand-gray">Un equipo humano responde en 47 y mientras tanto tu competencia está cerrando lo que tú dejas abierto.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-9 flex flex-col items-start transition-all hover:-translate-y-1 hover:shadow-sm">
              <div className="bg-brand-accent text-brand-black text-[0.7rem] uppercase font-bold px-3 py-1 rounded-full mb-6 flex items-center gap-2 tracking-wider">
                <span>⏱️</span> HORAS MUERTAS
              </div>
              <h3 className="font-serif font-semibold text-2xl text-brand-black mb-3">18 horas semanales.</h3>
              <p className="text-brand-gray">Tu gente pasa 18 horas a la semana haciendo lo mismo. Copiando datos. Mandando emails. Facturando. Esas horas cuestan 9.880€ al mes.</p>
            </div>
          </div>

          <div className="mt-20 reveal">
            <h3 className="font-serif text-[clamp(2rem,3vw,3rem)] text-brand-black leading-tight">
              Esto no es un problema de IA. Es un problema de<br/>
              <span className="inline-block relative">
                dinero.
                <span className="absolute bottom-1 left-0 w-full h-[4px] bg-brand-accent -z-10"></span>
              </span> Y tiene solución.
            </h3>
          </div>
          
          <div style={{ textAlign: 'center', margin: '48px auto', maxWidth: '600px' }} className="reveal">
            <a href="https://cal.com/clinca/reservas?utm_source=web&utm_medium=cta&utm_campaign=dolor" target="_blank" className="bg-brand-accent text-brand-black font-bold uppercase tracking-[0.15em] px-10 py-5 rounded hover:bg-brand-white transition-colors duration-300 w-full md:w-auto inline-block">
              CALCULAR CUÁNTO ESTOY PERDIENDO (GRATIS) &rarr;
            </a>
            <p style={{ marginTop: '12px', fontSize: '13px', color: '#888888', letterSpacing: '0.3px' }}>
              Sin compromiso &middot; 30 min &middot; Si no encajamos, te lo decimos en 5 min
            </p>
          </div>
        </div>
      </section>

      {/* 4. DEMO */}
      <section id="demo" className="w-full bg-brand-white py-20 md:py-32 content-layer">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-12 max-w-4xl mx-auto leading-tight reveal">
            No te vamos a contar lo que hacemos. Te lo vamos a enseñar.
          </h2>
          
          <div className="w-full max-w-[900px] mx-auto aspect-video bg-brand-bg border border-brand-border rounded-lg flex flex-col items-center justify-center relative group cursor-pointer overflow-hidden reveal">
            <SectionGrain />
            <div className="w-20 h-20 rounded-full bg-brand-white border border-brand-border flex items-center justify-center transition-transform group-hover:scale-110 z-10 shadow-sm relative">
              <Play className="w-8 h-8 fill-brand-black ml-1 text-brand-black" />
            </div>
          </div>
          <p className="mt-6 text-sm text-brand-gray reveal">Demo: agente IA contesta y agenda en 18 segundos</p>
          
          <p className="mt-12 text-lg text-brand-gray max-w-2xl mx-auto reveal">
            Esto lo puedes tener funcionando en tu negocio en menos de 14 días.
          </p>

          <div style={{ textAlign: 'center', margin: '48px auto', maxWidth: '600px' }} className="reveal">
            <a href="https://cal.com/clinca/reservas?utm_source=web&utm_medium=cta&utm_campaign=demo" target="_blank" className="bg-brand-accent text-brand-black font-bold uppercase tracking-[0.15em] px-10 py-5 rounded hover:bg-brand-white transition-colors duration-300 w-full md:w-auto inline-block">
              QUIERO TENER ESTO MONTADO EN MI NEGOCIO YA &rarr;
            </a>
            <p style={{ marginTop: '12px', fontSize: '13px', color: '#888888', letterSpacing: '0.3px' }}>
              Sin compromiso &middot; 30 min &middot; Si no encajamos, te lo decimos en 5 min
            </p>
          </div>
        </div>
      </section>

      {/* 5. SERVICIOS */}
      <section id="servicios" className="w-full bg-brand-bg py-20 md:py-32 content-layer relative">
        <SectionGrain />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-16 max-w-4xl leading-tight reveal text-center md:text-left">
            Lo que un humano tarda 8 horas, nosotros lo hacemos en 8 segundos, sin bajas ni vacaciones.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
            {/* Serv 1 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group relative">
              <div className="absolute top-6 right-6 bg-brand-accent text-brand-black text-[0.75rem] uppercase font-bold px-3 py-1 rounded-sm tracking-widest whitespace-nowrap">
                <AnimatedBadgeNumber end={3200} />
              </div>
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">📞</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Agente de Voz IA</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Contesta tu teléfono 24/7 con voz natural en español. Agenda citas, cualifica leads y traspasa a humano cuando hace falta.</p>
            </div>
            
            {/* Serv 2 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group relative">
              <div className="absolute top-6 right-6 bg-brand-accent text-brand-black text-[0.75rem] uppercase font-bold px-3 py-1 rounded-sm tracking-widest whitespace-nowrap">
                <AnimatedBadgeNumber end={2800} />
              </div>
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">💬</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Chatbot WhatsApp & Web</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Tu cliente pregunta, la IA responde en 3 segundos. Integrado con tu sistema, calendario y pagos. Atención 24/7 sin contratar a nadie.</p>
            </div>

            {/* Serv 3 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group relative">
              <div className="absolute top-6 right-6 bg-brand-accent text-brand-black text-[0.75rem] uppercase font-bold px-3 py-1 rounded-sm tracking-widest whitespace-nowrap">
                <AnimatedBadgeNumber end={4500} />
              </div>
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">🎯</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Agente de IA</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Encuentra leads, les escribe emails hiperpersonalizados con IA y te los entrega calientes. Miles por semana, sin que muevas un dedo.</p>
            </div>

            {/* Serv 4 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group relative">
              <div className="absolute top-6 right-6 bg-brand-accent text-brand-black text-[0.75rem] uppercase font-bold px-3 py-1 rounded-sm tracking-widest whitespace-nowrap">
                <AnimatedBadgeNumber end={1800} />
              </div>
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">🧠</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Cerebro Interno</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Tu propio ChatGPT privado, entrenado con tus manuales, SOPs y contratos. Tu equipo deja de perder tiempo buscando información.</p>
            </div>

            {/* Serv 5 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group relative">
              <div className="absolute top-6 right-6 bg-brand-accent text-brand-black text-[0.75rem] uppercase font-bold px-3 py-1 rounded-sm tracking-widest whitespace-nowrap">
                <AnimatedBadgeNumber end={2200} />
              </div>
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">🎬</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Vídeos & UGC con IA</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Avatares realistas, ads a escala y contenido diario sin grabar a nadie ni producir nada. Listo para redes y campañas.</p>
            </div>

            {/* Serv 6 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group relative">
              <div className="absolute top-6 right-6 bg-brand-accent text-brand-black text-[0.75rem] uppercase font-bold px-3 py-1 rounded-sm tracking-widest whitespace-nowrap">
                <AnimatedBadgeNumber end={3400} />
              </div>
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">⚙️</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Automatizaciones Operativas</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Facturas, reportes, onboarding, seguimientos, clasificación de correos. Todo lo mecánico, delegado a una máquina que no se cansa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AGENTES DE IA */}
      <section id="agentes" className="w-full bg-[#f0eeea] py-[80px] px-[40px] max-md:px-6 content-layer">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="bg-brand-white border border-[#d8d5cf] shadow-sm rounded-full px-4 py-1.5 flex items-center gap-3 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00]"></span>
              </span>
              <span className="text-sm font-medium text-[#111111]">Lo más buscado ahora mismo</span>
            </div>
            <p className="text-[11px] text-[#888888] uppercase tracking-[0.2em] font-bold mb-4">AGENTES DE INTELIGENCIA ARTIFICIAL</p>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[#111111] leading-tight mb-4">Tu equipo trabaja. El agente no para nunca.</h2>
            <p className="text-[16px] text-[#555555] max-w-2xl mx-auto">Un agente de IA no es un chatbot. Es un empleado digital que toma decisiones, actúa y entrega resultados — solo, sin que nadie lo vigile.</p>
          </div>

          {/* Grid: 2 cols */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Left Col - Large Dark Card */}
            <div className="bg-[#111111] rounded-[12px] p-8 md:p-10 relative flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                  <span className="bg-[#CCFF00] text-[#1a2200] text-[10px] uppercase font-bold px-3 py-1.5 rounded-full">Más solicitado</span>
                </div>
                <h3 className="font-serif text-3xl text-white mb-4">Agente de Voz IA</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">Contesta tu teléfono 24/7 con voz natural en español. Entiende el contexto, califica al cliente, agenda citas y traspasa a humano cuando hace falta.</p>
              </div>
              
              <div>
                <hr className="border-gray-800 mb-8" />
                <ul className="space-y-4 mb-8">
                  {["Responde en menos de 1 segundo", "Agenda directamente en tu calendario", "Califica leads y traspasa en caliente", "Integrado con tu CRM actual"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#CCFF00] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]"></span>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {["Retell AI", "HighLevel", "Cal.com"].map((tag, i) => (
                    <span key={i} className="bg-[#222222] text-gray-400 text-xs px-3 py-1 rounded-md">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col - Stacked Cards */}
            <div className="flex flex-col gap-6">
              {/* Top Right Card */}
              <div className="bg-[#ffffff] border-[0.5px] border-[#d8d5cf] rounded-[12px] p-8 md:p-10 flex flex-col justify-between flex-1">
                <div className="mb-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <span className="bg-[#CCFF00] text-[#1a2200] text-[10px] uppercase font-bold px-3 py-1.5 rounded-full">Captación automatizada</span>
                  </div>
                  <h3 className="font-serif text-2xl text-brand-black mb-3">Agente de Prospección IA</h3>
                  <p className="text-[#555555] text-sm leading-relaxed">Encuentra leads, les escribe emails hiperpersonalizados con IA y te los entrega calientes. Miles por semana, sin que muevas un dedo.</p>
                </div>
                <ul className="space-y-3">
                  {["Emails con contexto real del lead", "Seguimientos automáticos", "Resultados desde la semana 1"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-brand-black text-sm">
                      <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-[#CCFF00] flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-[#111111]"></span>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Right Card */}
              <div className="bg-[#ffffff] border-[0.5px] border-[#d8d5cf] rounded-[12px] p-8 md:p-10 flex flex-col justify-between flex-1">
                <div className="mb-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <span className="bg-[#CCFF00] text-[#1a2200] text-[10px] uppercase font-bold px-3 py-1.5 rounded-full">Atención al cliente</span>
                  </div>
                  <h3 className="font-serif text-2xl text-brand-black mb-3">Agente WhatsApp & Web</h3>
                  <p className="text-[#555555] text-sm leading-relaxed">Tu cliente pregunta. El agente responde en 3 segundos. Integrado con tu calendario, sistema de pagos y CRM.</p>
                </div>
                <ul className="space-y-3">
                  {["Atención 24/7 sin contratar a nadie", "Cierra ventas mientras duermes", "Sin coste por cada conversación"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-brand-black text-sm">
                      <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-[#CCFF00] flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-[#111111]"></span>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3 Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#ffffff] rounded-[12px] p-8 text-center border-[0.5px] border-[#d8d5cf]">
              <div className="font-serif text-4xl text-[#111111] mb-2">24/7</div>
              <p className="text-[#555555] text-sm">Operativo sin descanso ni bajas ni vacaciones</p>
            </div>
            <div className="bg-[#ffffff] rounded-[12px] p-8 text-center border-[0.5px] border-[#d8d5cf]">
              <div className="font-serif text-4xl text-[#111111] mb-2">&lt; 1s</div>
              <p className="text-[#555555] text-sm">Tiempo de respuesta en voz y texto</p>
            </div>
            <div className="bg-[#ffffff] rounded-[12px] p-8 text-center border-[0.5px] border-[#d8d5cf]">
              <div className="font-serif text-4xl text-[#111111] mb-2">14d</div>
              <p className="text-[#555555] text-sm">De cero a agente funcionando en tu negocio</p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', margin: '48px auto 0', maxWidth: '600px' }}>
            <a href="https://cal.com/clinca/reservas?utm_source=web&utm_medium=cta&utm_campaign=agentes" target="_blank" className="bg-brand-accent text-brand-black font-bold uppercase tracking-[0.15em] px-10 py-5 rounded hover:bg-brand-white transition-colors duration-300 w-full md:w-auto inline-block">
              QUIERO UN AGENTE EN MI NEGOCIO &rarr;
            </a>
            <p style={{ marginTop: '12px', fontSize: '13px', color: '#888888', letterSpacing: '0.3px' }}>
              Sin compromiso &middot; 30 min &middot; Si no encajamos, te lo decimos en 5 min
            </p>
          </div>
        </div>
      </section>

      {/* 6. NICHOS / SECTORES */}
      <section id="sectores" className="w-full bg-brand-white py-20 md:py-32 content-layer">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-left mb-16 reveal">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-4 leading-tight">
              3 razones. Cero dudas.
            </h2>
            <p className="text-xl text-brand-gray custom-measure">
              Toda la IA que necesitas, enfocada en resultados inmediatos, eficiencia medible y ROI escalable.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal-stagger">
            {/* Card 1 */}
            <div className="bg-brand-bg border border-brand-border rounded-lg p-10 flex flex-col items-start relative overflow-hidden">
              <div className="bg-brand-accent text-brand-black text-xs uppercase font-bold px-3 py-1.5 rounded-sm tracking-wider mb-8">MAYOR EFICIENCIA</div>
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="font-serif text-3xl text-brand-black mb-2">Automatización</h3>
              <p className="text-brand-gray text-sm mb-6">Tareas repetitivas, flujos internos, procesos manuales.</p>
              <p className="font-semibold text-brand-black leading-relaxed mb-10">Elimina el trabajo que consume horas y no genera valor.</p>
              <div className="mt-auto w-full pt-6 border-t border-brand-border/50 text-sm text-brand-gray">
                15h/sem ahorradas · <span className="font-semibold text-brand-black">desde 1.800€/mes</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-bg border border-brand-border rounded-lg p-10 flex flex-col items-start relative overflow-hidden">
              <div className="bg-brand-accent text-brand-black text-xs uppercase font-bold px-3 py-1.5 rounded-sm tracking-wider mb-8">MAYOR CONVERSIÓN</div>
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-serif text-3xl text-brand-black mb-2">Captación de leads</h3>
              <p className="text-brand-gray text-sm mb-6">Web, redes sociales, email, WhatsApp.</p>
              <p className="font-semibold text-brand-black leading-relaxed mb-10">Responde, cualifica y agenda sin intervención humana.</p>
              <div className="mt-auto w-full pt-6 border-t border-brand-border/50 text-sm text-brand-gray">
                <span className="font-semibold text-brand-black">ROI 6×</span> en 90 días · 0 leads perdidos
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-bg border border-brand-border rounded-lg p-10 flex flex-col items-start relative overflow-hidden">
              <div className="bg-brand-accent text-brand-black text-xs uppercase font-bold px-3 py-1.5 rounded-sm tracking-wider mb-8">MAYOR AHORRO</div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-serif text-3xl text-brand-black mb-2">Atención al cliente</h3>
              <p className="text-brand-gray text-sm mb-6">Soporte 24/7 sin ampliar equipo.</p>
              <p className="font-semibold text-brand-black leading-relaxed mb-10">Tu equipo deja de apagar fuegos y empieza a cerrar ventas.</p>
              <div className="mt-auto w-full pt-6 border-t border-brand-border/50 text-sm text-brand-gray">
                <span className="font-semibold text-brand-black">3.200€/mes</span> ahorrados en soporte
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMPARATIVA */}
      <section id="comparativa" className="w-full bg-brand-bg py-20 md:py-32 content-layer relative">
        <SectionGrain />
        <div className="max-w-[860px] mx-auto px-6 relative z-10">
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-16 text-center leading-tight reveal">
            Empleado humano vs. Empleado IA.<br className="hidden md:block"/> Haz los números tú mismo.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
            {/* Humano */}
            <div className="bg-brand-white border border-brand-border rounded-lg overflow-hidden flex flex-col">
              <div className="p-6 border-b border-brand-border bg-brand-white/50 text-center">
                <h3 className="font-serif text-xl text-brand-gray">Empleado Humano</h3>
              </div>
              <div className="flex-col flex divide-y divide-brand-border/50">
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Inversión mensual</span>
                  <span className="font-semibold text-brand-gray">1.800 – 2.400€</span>
                </div>
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2 bg-brand-bg/30">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Horas activas</span>
                  <span className="font-semibold text-brand-gray">40h/semana</span>
                </div>
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Bajas y vac.</span>
                  <span className="font-semibold text-brand-gray">30+ días/año</span>
                </div>
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2 bg-brand-bg/30">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Respuesta</span>
                  <span className="font-semibold text-brand-gray">15 – 45 min</span>
                </div>
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Fatiga/Errores</span>
                  <span className="font-semibold text-brand-gray">Sí</span>
                </div>
              </div>
            </div>

            {/* IA */}
            <div className="bg-brand-white border-2 border-brand-black border-t-4 border-t-brand-accent rounded-lg overflow-hidden flex flex-col shadow-lg relative -translate-y-2 md:-translate-y-4">
              <div className="p-6 bg-brand-black text-center">
                <h3 className="font-serif text-xl text-brand-white">Empleado IA — FORJA</h3>
              </div>
              <div className="flex-col flex divide-y divide-brand-border/50">
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Inversión mensual</span>
                  <span className="font-semibold text-brand-black text-lg">297 – 897€</span>
                </div>
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2 bg-brand-bg/30">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Horas activas</span>
                  <span className="font-semibold text-brand-black">168h/sem (24/7)</span>
                </div>
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Bajas y vac.</span>
                  <span className="font-semibold text-brand-black">0 días</span>
                </div>
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2 bg-brand-bg/30">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Respuesta</span>
                  <span className="font-semibold text-brand-black">3 segundos</span>
                </div>
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Fatiga/Errores</span>
                  <span className="font-semibold text-brand-black">No</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-12 font-serif text-xl text-center text-brand-gray max-w-2xl mx-auto reveal">
            "No se trata de sustituir a tu equipo. Se trata de liberarlo de lo que no debería estar haciendo."
          </p>
          
          <div style={{ textAlign: 'center', margin: '48px auto', maxWidth: '600px' }} className="reveal">
            <a href="https://cal.com/clinca/reservas?utm_source=web&utm_medium=cta&utm_campaign=precios" target="_blank" className="bg-brand-accent text-brand-black font-bold uppercase tracking-[0.15em] px-10 py-5 rounded hover:bg-brand-white transition-colors duration-300 w-full md:w-auto inline-block">
              ¿QUÉ PACK ENCAJA MEJOR CON MI NEGOCIO? &rarr;
            </a>
            <p style={{ marginTop: '12px', fontSize: '13px', color: '#888888', letterSpacing: '0.3px' }}>
              Sin compromiso &middot; 30 min &middot; Si no encajamos, te lo decimos en 5 min
            </p>
          </div>
        </div>
      </section>

      {/* 8. CÓMO FUNCIONA */}
      <section id="proceso" className="w-full bg-brand-white py-20 md:py-32 content-layer overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-20 max-w-4xl mx-auto leading-tight reveal">
            <span className="block text-brand-accent text-sm uppercase tracking-widest mb-4 font-bold">Para escalar tu negocio</span>
            De "no sé por dónde empezar" a facturando solo, en solo 14 días.
          </h2>

          <div className="relative">
            <ProgressLine />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10 reveal-stagger text-left md:text-center">
              {/* Step 1 */}
              <div className="flex flex-col md:items-center relative bg-brand-white">
                <div className="font-serif text-[3.5rem] leading-none text-brand-accent mb-4">01</div>
                <h3 className="font-sans font-semibold text-lg text-brand-black mb-3">Auditoría gratuita <span className="md:block text-brand-gray font-normal">(30 min)</span></h3>
                <p className="text-brand-gray text-sm md:px-4">Te hacemos preguntas, entendemos tu cuello de botella, te decimos si podemos ayudarte o no.</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:items-center relative bg-brand-white">
                <div className="font-serif text-[3.5rem] leading-none text-brand-accent mb-4">02</div>
                <h3 className="font-sans font-semibold text-lg text-brand-black mb-3">Blueprint <span className="md:block text-brand-gray font-normal">(en 48h)</span></h3>
                <p className="text-brand-gray text-sm md:px-4">Te mandamos un plan por escrito con qué vamos a automatizar, cómo y cuánto te va a ahorrar.</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:items-center relative bg-brand-white">
                <div className="font-serif text-[3.5rem] leading-none text-brand-accent mb-4">03</div>
                <h3 className="font-sans font-semibold text-lg text-brand-black mb-3">Implementación <span className="md:block text-brand-gray font-normal">(7-21 días)</span></h3>
                <p className="text-brand-gray text-sm md:px-4">Nosotros construimos, tú validas. Te formamos a ti y a tu equipo.</p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:items-center relative bg-brand-white">
                <div className="font-serif text-[3.5rem] leading-none text-brand-accent mb-4">04</div>
                <h3 className="font-sans font-semibold text-lg text-brand-black mb-3">Optimización <span className="md:block text-brand-gray font-normal">(continua)</span></h3>
                <p className="text-brand-gray text-sm md:px-4">Cada mes mejoramos el sistema. Sumamos automatizaciones. Medimos ROI de verdad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. GARANTÍA */}
      <section id="garantia" className="w-full bg-brand-bg py-20 md:py-32 content-layer relative">
        <SectionGrain />
        <div className="max-w-[800px] mx-auto px-6 relative z-10 reveal">
          <div className="bg-brand-white border border-brand-border border-t-[3px] border-t-brand-accent rounded-lg p-10 md:p-14 text-center shadow-sm">
            <div className="mx-auto w-24 h-24 mb-8 relative flex items-center justify-center">
              <svg viewBox="0 0 180 180" className="w-full h-full">
                {/* Exterior */}
                <circle cx="90" cy="90" r="87" fill="#111111" stroke="#AAFF00" strokeWidth="3" />
                {/* Star */}
                <path d="M90 15 L98 45 L128 45 L105 65 L115 95 L90 75 L65 95 L75 65 L52 45 L82 45 Z" fill="#AAFF00" fillOpacity="0.15" />
                {/* Interior border */}
                <circle cx="90" cy="90" r="80" fill="none" stroke="#AAFF00" strokeWidth="1.5" />
                {/* Text paths */}
                <path id="topText" d="M 90 90 m -65, 0 a 65,65 0 1,1 130,0" fill="none" />
                <path id="bottomText" d="M 90 90 m -65, 0 a 65,65 0 1,0 130,0" fill="none" />
                <text fill="#AAFF00" fontSize="11" fontWeight="700" letterSpacing="1" className="uppercase">
                  <textPath href="#topText" startOffset="12%">GARANTÍA TOTAL · 30 DÍAS —</textPath>
                </text>
                <text fill="#AAFF00" fontSize="10" fontWeight="700" letterSpacing="1" className="uppercase">
                  <textPath href="#bottomText" startOffset="10%">100% DEVUELTO · ASEGURADO</textPath>
                </text>
                {/* Center */}
                <text x="90" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="32" fontWeight="bold">✓</text>
                <text x="90" y="108" textAnchor="middle" fill="#AAFF00" fontSize="9" fontWeight="bold" letterSpacing="3" className="uppercase">GARANTIZADO</text>
              </svg>
            </div>
            <h2 className="font-serif text-[clamp(2rem,3vw,2.5rem)] text-brand-black leading-tight mb-6">
              O cumplimos o te devolvemos el dinero. Asegurado.
            </h2>
            <p className="text-brand-gray text-lg leading-relaxed">
              Si en 30 días desde la entrega no ves resultados, te devolvemos el dinero completo. Sin preguntas. Sin letra pequeña.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="w-full bg-brand-white py-20 md:py-32 content-layer">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-12 text-center reveal">
            Preguntas frecuentes
          </h2>
          
          <div className="flex flex-col reveal">
            {[
              { q: "¿Y si mis clientes notan que es una IA y se molestan?", a: "No los vamos a engañar. El agente se presenta como asistente digital del negocio. El 94% de usuarios prefieren ser atendidos rápido por una IA competente que esperar 20 minutos a un humano. La clave está en que la IA sepa cuándo traspasar a humano, y eso lo configuramos juntos." },
              { q: "¿Funciona con mi CRM actual?", a: "Sí, conectamos con HubSpot, Pipedrive, Salesforce, GHL, Holded, Zoho, Odoo y cualquier CRM que tenga API. Si tu CRM es de 2005 y no tiene API, te recomendamos migrar y te ayudamos con ello." },
              { q: "¿Qué pasa si se cae el sistema un fin de semana?", a: "Igual que tu coche tiene rueda de repuesto, tu sistema tiene 'repuestos digitales'. Si algo falla, automáticamente entra el respaldo y sigue funcionando como si nada. Además, lo vigilamos 24/7. Si pasa algo raro un domingo a las 3 de la mañana, nos llega un aviso al móvil y lo solucionamos antes de que abras el lunes. Te garantizamos por escrito que tu sistema estará operativo el 99,5% del tiempo." },
              { q: "¿Puedo cancelar cuando quiera?", a: "Sí, pasados los primeros 90 días. Después, mes a mes con 30 días de aviso. Sin penalizaciones ni permanencias. ¿Por qué 90 días? Porque montar el sistema bien hecho lleva tiempo y queremos que veas resultados reales antes de juzgar. Spoiler: por lo que cuesta y lo que ahorra, nadie se baja del barco una vez lo prueba, lo verás tú mismo." },
              { q: "¿Dónde están mis datos?", a: "Tranquilo, esta es una de las preguntas que más nos hacen y es normal: Tus datos viven en servidores europeos (Alemania e Irlanda), donde la ley de protección de datos es la más estricta del planeta. Nada se va ni a EEUU, ni a China, ni nada por el estilo. Y lo más importante: tus datos son tuyos. No los usamos para entrenar a ningún ChatGPT ni IA pública. Solo trabajan para tu negocio (lo firmamos contigo). Si algún día decides irte, te los llevas todos. Por último, tanto cuando se mueven como cuando se almacenan, están cifrados. En cristiano: si alguien intentara robarlos, vería un montón de letras sin sentido y no podría hacer nada." },
              { q: "¿Cuánto tardo en ver retorno?", a: "En tu primer mes empiezas a ver retorno. Asegurado." },
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item border-b border-brand-border py-6 ${activeFaq === idx ? 'active' : ''}`}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer group"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={activeFaq === idx}
                >
                  <h3 className="font-semibold text-brand-black pr-8 text-lg group-hover:text-brand-gray transition-colors">{faq.q}</h3>
                  <div className={`shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-45' : ''}`}>
                    <Plus className="w-6 h-6 text-brand-black" />
                  </div>
                </div>
                <div className="faq-content">
                  <p className="pt-4 text-brand-gray leading-relaxed pr-8">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CTA FINAL */}
      <section id="cta" className="w-full bg-brand-black py-24 md:py-36 content-layer relative text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10 reveal">
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-brand-white mb-6 leading-tight">
            Mañana a esta hora, tu negocio puede estar facturando solo.
          </h2>
          <p className="text-xl text-brand-white/80 mb-12 max-w-2xl mx-auto">
            O puedes seguir contestando llamadas mientras tu competencia te come. Tú decides.
          </p>
          
          <div style={{ textAlign: 'center', margin: '48px auto', maxWidth: '600px' }}>
            <a href="https://cal.com/clinca/reservas?utm_source=web&utm_medium=cta&utm_campaign=final" target="_blank" className="bg-brand-accent text-brand-black font-bold uppercase tracking-[0.15em] px-10 py-5 rounded hover:bg-brand-white transition-colors duration-300 w-full md:w-auto inline-block">
              RESERVAR MIS 30 MIN DE AUDITORÍA CON NEXORA &rarr;
            </a>
            <p style={{ marginTop: '12px', fontSize: '13px', color: '#888888', letterSpacing: '0.3px' }}>
              Sin compromiso &middot; 30 min &middot; Si no encajamos, te lo decimos en 5 min
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: '900px', margin: '40px auto 0', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://cal.com/clinca/reservas?utm_source=web&utm_medium=cta&utm_campaign=final"
              width="100%"
              height="700px"
              frameBorder="0"
              style={{ border: 'none', borderRadius: '12px', minHeight: '700px', background: 'transparent' }}
              allow="camera; microphone; payment"
              className="md:h-[700px] h-[900px]"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer id="footer" className="w-full bg-brand-black border-t border-brand-white/10 pt-20 pb-8 content-layer">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start reveal">
              <a href="#" className="text-3xl font-black font-serif tracking-tighter text-brand-white mb-4">
                NEXORA®
              </a>
              <p className="text-brand-gray text-sm">Crafted with intent.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-4 reveal">
              <a href="#servicios" className="text-sm text-brand-gray hover:text-brand-white uppercase tracking-wider transition-colors">Servicios</a>
              <a href="#sectores" className="text-sm text-brand-gray hover:text-brand-white uppercase tracking-wider transition-colors">Sectores</a>
              <a href="#proceso" className="text-sm text-brand-gray hover:text-brand-white uppercase tracking-wider transition-colors">Proceso</a>
              <a href="#garantia" className="text-sm text-brand-gray hover:text-brand-white uppercase tracking-wider transition-colors">Garantía</a>
            </div>
            
            <div className="flex justify-center md:justify-end gap-6 reveal">
              <a href="#" aria-label="Instagram" className="text-brand-gray hover:text-brand-accent transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" aria-label="TikTok" className="text-brand-gray hover:text-brand-accent transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-.9 4.45-2.43 6.08-1.48 1.54-3.55 2.37-5.69 2.11-2.22-.24-4.27-1.51-5.45-3.35-1.18-1.84-1.39-4.22-.55-6.23.82-1.95 2.53-3.41 4.54-3.95 1.74-.46 3.63-.16 5.17.81.01-1.36.02-2.71-.01-4.07-1.49-.49-3.13-.39-4.57.29-1.48.69-2.58 2-3.08 3.55-.54 1.63-.38 3.46.43 4.97.8 1.51 2.2 2.65 3.84 3.06 1.7.42 3.55.07 4.96-.98 1.4-1.03 2.24-2.73 2.22-4.51-.04-4.75-.01-9.51-.01-14.27z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-brand-gray hover:text-brand-accent transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" aria-label="YouTube" className="text-brand-gray hover:text-brand-accent transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" aria-label="X" className="text-brand-gray hover:text-brand-accent transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-brand-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-gray reveal">
            <div>© 2026 NEXORA — Todos los derechos reservados</div>
            <div className="hidden md:block">Servidores EU · RGPD · Cifrado end-to-end</div>
            <div>Hecho con IA. Implementado por humanos.</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
