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
          <AnimatedCounter end={72} text="Pymes españolas sin IA (Microsoft · 02/2026)" suffix="%" />
          <AnimatedCounter end={2880} text="Ahorro medio/mes por negocio automatizado" suffix="€" />
          <AnimatedCounter end={8} text="ROI desde el primer mes" isRange={true} suffix="×" />
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
              <h3 className="font-serif font-semibold text-2xl text-brand-black mb-3">El 62% se pierden.</h3>
              <p className="text-brand-gray">El 62% de las llamadas a negocios locales después de las 18:00 se pierden. Cada una son 150-400€ tirados a la basura.</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-9 flex flex-col items-start transition-all hover:-translate-y-1 hover:shadow-sm">
              <div className="bg-brand-accent text-brand-black text-[0.7rem] uppercase font-bold px-3 py-1 rounded-full mb-6 flex items-center gap-2 tracking-wider">
                <span>💬</span> WHATSAPPS SIN CONTESTAR
              </div>
              <h3 className="font-serif font-semibold text-2xl text-brand-black mb-3">2 minutos de paciencia.</h3>
              <p className="text-brand-gray">El lead medio espera 2 minutos y se va. Tu equipo responde en 47. Tu competencia está cerrando lo que tú dejas abierto.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-9 flex flex-col items-start transition-all hover:-translate-y-1 hover:shadow-sm">
              <div className="bg-brand-accent text-brand-black text-[0.7rem] uppercase font-bold px-3 py-1 rounded-full mb-6 flex items-center gap-2 tracking-wider">
                <span>⏱️</span> HORAS MUERTAS
              </div>
              <h3 className="font-serif font-semibold text-2xl text-brand-black mb-3">18 horas semanales.</h3>
              <p className="text-brand-gray">Tu gente pasa 18 horas a la semana haciendo lo mismo. Copiando datos. Mandando emails. Facturando. Esas horas cuestan 2.880€ al mes.</p>
            </div>
          </div>

          <div className="mt-20 reveal">
            <h3 className="font-serif text-[clamp(2rem,3vw,3rem)] text-brand-black leading-tight">
              Esto no es un problema de IA. Es un problema de<br/>
              <span className="inline-block relative">
                plata.
                <span className="absolute bottom-1 left-0 w-full h-[4px] bg-brand-accent -z-10"></span>
              </span> Y tiene solución.
            </h3>
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
        </div>
      </section>

      {/* 5. SERVICIOS */}
      <section id="servicios" className="w-full bg-brand-bg py-20 md:py-32 content-layer relative">
        <SectionGrain />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-16 max-w-4xl leading-tight reveal text-center md:text-left">
            No somos una agencia de marketing con IA. Somos la agencia que automatiza todo lo demás.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
            {/* Serv 1 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group">
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">📞</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Agente de Voz IA</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Contesta tu teléfono 24/7 con voz natural en español. Agenda citas, cualifica leads y traspasa a humano cuando hace falta.</p>
            </div>
            
            {/* Serv 2 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group">
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">💬</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Chatbot WhatsApp & Web</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Tu cliente pregunta, la IA responde en 3 segundos. Integrado con CRM, calendario y pagos. Atención 24/7 sin contratar a nadie.</p>
            </div>

            {/* Serv 3 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group">
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">🎯</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">AI SDR Outbound</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Encuentra leads, les escribe emails hiperpersonalizados con IA y te los entrega calientes. Cientos por semana, sin que muevas un dedo.</p>
            </div>

            {/* Serv 4 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group">
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">🧠</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Cerebro Interno (RAG)</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Tu propio ChatGPT privado, entrenado con tus manuales, SOPs y contratos. Tu equipo deja de perder tiempo buscando información.</p>
            </div>

            {/* Serv 5 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group">
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">🎬</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Vídeos & UGC con IA</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Avatares realistas, ads a escala y contenido diario sin grabar a nadie ni producir nada. Listo para redes y campañas.</p>
            </div>

            {/* Serv 6 */}
            <div className="bg-brand-white border border-brand-border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-b-[3px] hover:border-b-brand-accent flex flex-col group">
              <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center text-xl mb-6">⚙️</div>
              <h3 className="font-serif font-semibold text-xl text-brand-black mb-3">Automatizaciones Operativas</h3>
              <p className="text-brand-gray text-sm leading-relaxed">Facturas, reportes, onboarding, seguimientos, clasificación de correos. Todo lo mecánico, delegado a una máquina que no se cansa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NICHOS / SECTORES */}
      <section id="sectores" className="w-full bg-brand-white py-20 md:py-32 content-layer">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-left mb-16 reveal">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-4 leading-tight">
              3 sectores. Cero distracción.
            </h2>
            <p className="text-xl text-brand-gray custom-measure">
              Nos especializamos en los nichos con mayor urgencia, mejor ROI y más volumen de ahorro.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal-stagger">
            {/* Sector 1 */}
            <div className="bg-brand-bg border border-brand-border rounded-lg p-10 flex flex-col items-start relative overflow-hidden">
              <div className="bg-brand-accent text-brand-black text-xs uppercase font-bold px-3 py-1.5 rounded-sm tracking-wider mb-8">MAYOR URGENCIA</div>
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-serif text-3xl text-brand-black mb-2">Clínicas</h3>
              <p className="text-brand-gray text-sm mb-6">Dentales, estéticas, fisio, veterinarias.</p>
              <p className="font-semibold text-brand-black leading-relaxed mb-10">Recupera las 200+ llamadas al mes que estás perdiendo fuera de horario.</p>
              <div className="mt-auto w-full pt-6 border-t border-brand-border/50 text-sm text-brand-gray">
                18h/sem automatizables · <span className="font-semibold text-brand-black">3.200€/mes</span> en ineficiencias
              </div>
            </div>

            {/* Sector 2 */}
            <div className="bg-brand-bg border border-brand-border rounded-lg p-10 flex flex-col items-start relative overflow-hidden">
              <div className="bg-brand-accent text-brand-black text-xs uppercase font-bold px-3 py-1.5 rounded-sm tracking-wider mb-8">MEJOR ROI</div>
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="font-serif text-3xl text-brand-black mb-2">Inmobiliarias</h3>
              <p className="text-brand-gray text-sm mb-6">Agencias y promotoras.</p>
              <p className="font-semibold text-brand-black leading-relaxed mb-10">Responde en 3 segundos a cada lead de Idealista o Fotocasa. Agenda visitas automáticamente.</p>
              <div className="mt-auto w-full pt-6 border-t border-brand-border/50 text-sm text-brand-gray">
                <span className="font-semibold text-brand-black">ROI 8×</span> en 3 meses · Sector en boom 2026
              </div>
            </div>

            {/* Sector 3 */}
            <div className="bg-brand-bg border border-brand-border rounded-lg p-10 flex flex-col items-start relative overflow-hidden">
              <div className="bg-brand-accent text-brand-black text-xs uppercase font-bold px-3 py-1.5 rounded-sm tracking-wider mb-8">MAYOR AHORRO</div>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-serif text-3xl text-brand-black mb-2">Gestorías y despachos</h3>
              <p className="text-brand-gray text-sm mb-6">Asesorías, gestorías, despachos.</p>
              <p className="font-semibold text-brand-black leading-relaxed mb-10">Tu equipo deja de ser un procesador de PDFs y vuelve a ser asesor.</p>
              <div className="mt-auto w-full pt-6 border-t border-brand-border/50 text-sm text-brand-gray">
                17h/sem ahorradas · <span className="font-semibold text-brand-black">3.400€/mes</span> por gestoría
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
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Coste mensual</span>
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
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2 bg-brand-bg/30">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Escalabilidad</span>
                  <span className="font-semibold text-brand-gray">+2.000€/mes</span>
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
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Coste mensual</span>
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
                <div className="p-5 flex flex-col md:flex-row justify-between items-center text-center gap-2 bg-brand-bg/30">
                  <span className="text-xs uppercase tracking-wider text-brand-gray">Escalabilidad</span>
                  <span className="font-semibold text-brand-black">+50€/mes</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-12 font-serif text-xl text-center text-brand-gray max-w-2xl mx-auto reveal">
            "No se trata de sustituir a tu equipo. Se trata de liberarlo de lo que no debería estar haciendo."
          </p>
        </div>
      </section>

      {/* 8. CÓMO FUNCIONA */}
      <section id="proceso" className="w-full bg-brand-white py-20 md:py-32 content-layer overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-brand-black mb-20 max-w-4xl mx-auto leading-tight reveal">
            De "no sé por dónde empezar" a facturando solo. En 14 días.
          </h2>

          <div className="relative">
            <ProgressLine />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10 reveal-stagger text-left md:text-center">
              {/* Step 1 */}
              <div className="flex flex-col md:items-center relative bg-brand-white">
                <div className="font-serif text-[3.5rem] leading-none text-brand-accent mb-4">01</div>
                <h3 className="font-sans font-semibold text-lg text-brand-black mb-3">Auditoría gratuita <span className="md:block text-brand-gray font-normal">(30 min)</span></h3>
                <p className="text-brand-gray text-sm md:px-4">Te hacemos preguntas, entendemos tu cuello de botella, te decimos si podemos ayudarte o no. Sin humo.</p>
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
            <div className="mx-auto w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mb-8">
              <Shield className="w-8 h-8 text-brand-black" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-[clamp(2rem,3vw,2.5rem)] text-brand-black leading-tight mb-6">
              Garantía: o lo arreglamos o te devolvemos el setup.
            </h2>
            <p className="text-brand-gray text-lg leading-relaxed">
              Si en 30 días desde la entrega tu sistema no cumple con los KPIs firmados en el blueprint, tienes dos opciones: (1) Lo reconstruimos a tu medida sin coste adicional hasta que cumpla. (2) Te devolvemos el 100% del setup. Sin preguntas raras. Sin letra pequeña.
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
              { q: "¿Qué pasa si se cae el sistema un fin de semana?", a: "Redundancia: si un proveedor falla, el sistema escala automáticamente a backup. Monitorización 24/7 con alertas. Garantía de uptime 99.5% o superior según el nivel de servicio." },
              { q: "¿Puedo cancelar cuando quiera?", a: "Tras los primeros 3 meses de compromiso, cancelas mes a mes con 30 días de preaviso. Sin penalizaciones, sin permanencias raras." },
              { q: "¿Dónde están mis datos?", a: "Servidores EU (Frankfurt, Dublín). Cumplimiento RGPD total. Nunca entrenamos modelos globales con tus datos. Cifrado end-to-end en tránsito y reposo." },
              { q: "¿Cuánto tardo en ver retorno?", a: "Cliente medio: ROI positivo en mes 2. Clínicas: habitualmente en mes 1 gracias a la reducción de no-shows y captura de llamadas fuera de horario." }
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
          
          <button className="bg-brand-accent text-brand-black font-bold uppercase tracking-[0.15em] px-10 py-5 rounded hover:bg-brand-white transition-colors duration-300 mb-8 w-full md:w-auto">
            Agendar auditoría gratis
          </button>
          
          <p className="text-sm text-brand-gray max-w-xl mx-auto">
            Sin compromiso. Sin humo. Sin vendedores agresivos. Si no podemos ayudarte, te lo decimos en los primeros 5 minutos.
          </p>
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
