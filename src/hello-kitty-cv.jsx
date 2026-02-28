import React, { useState, useEffect } from 'react';
import {
  Heart, Mail, Phone, MapPin, Briefcase, GraduationCap,
  Award, Star, Sparkles, Menu, X, Github, Linkedin, Instagram
} from 'lucide-react';

const HelloKittyBow = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none">
    <ellipse cx="20" cy="30" rx="20" ry="25" fill="currentColor"/>
    <ellipse cx="80" cy="30" rx="20" ry="25" fill="currentColor"/>
    <circle cx="50" cy="30" r="12" fill="white" opacity="0.4"/>
    <circle cx="50" cy="30" r="6" fill="white" opacity="0.3"/>
  </svg>
);

const LacoRosaHeader = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 100 100" fill="none">
    <ellipse cx="25" cy="50" rx="25" ry="30" fill="#EC4899"/>
    <ellipse cx="75" cy="50" rx="25" ry="30" fill="#EC4899"/>
    <circle cx="50" cy="50" r="15" fill="#F9A8D4"/>
    <circle cx="50" cy="50" r="8" fill="#BE185D"/>
  </svg>
);

/* Wave that drips DOWN from white (place at bottom of white section) */
const WaveDown = () => (
  <div style={{ marginBottom: '-2px', lineHeight: 0 }}>
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '52px' }}>
      <path d="M0,0 L0,30 C240,65 480,5 720,35 C960,65 1200,10 1440,30 L1440,0 Z" fill="white" />
    </svg>
  </div>
);

/* Wave that rises UP into white (place at top of white section) */
const WaveUp = () => (
  <div style={{ marginTop: '-2px', lineHeight: 0 }}>
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '52px' }}>
      <path d="M0,60 L0,30 C240,-5 480,55 720,25 C960,-5 1200,50 1440,30 L1440,60 Z" fill="white" />
    </svg>
  </div>
);

const ScrollProgressBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollPercentage((scrollTop / docHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-pink-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-75 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};

const JobSearchProgressBar = () => {
  const [progress, setProgress] = useState(15);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 85 ? 15 : prev + Math.random() * 3));
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-pink-50 rounded-2xl p-4 mb-6 border-2 border-pink-100">
      <div className="flex items-center gap-3 mb-3">
        <HelloKittyBow className="w-8 h-5 text-pink-400 animate-pulse" />
        <span className="text-pink-700 font-semibold" style={{fontFamily: "'Comfortaa', cursive"}}>
          Procurando novas oportunidades...
        </span>
        <Sparkles className="w-4 h-4 text-pink-500 animate-pulse ml-auto" />
      </div>
      <div className="h-6 bg-pink-200 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
          </div>
        </div>
      </div>
      <p className="text-center text-pink-600 text-sm mt-2 font-medium">
        {progress < 30 && "Buscando..."}
        {progress >= 30 && progress < 60 && "💗 Encontrando..."}
        {progress >= 60 && "Em breve!"}
      </p>
    </div>
  );
};

const scrollMessages = [
  { threshold: 0,  message: "Olá! Bem-vindo(a)!" },
  { threshold: 15, message: "Conheça minhas habilidades!" },
  { threshold: 30, message: "Experiência profissional" },
  { threshold: 50, message: "Formação acadêmica" },
  { threshold: 70, message: "Meus hobbies!" },
  { threshold: 85, message: "Entre em contato!" },
  { threshold: 95, message: "Obrigada pela visita!" },
];

const FloatingHelloKitty = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const percent = (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
      const idx = scrollMessages.findIndex(m => percent < m.threshold);
      setMessageIndex(idx === -1 ? scrollMessages.length - 1 : Math.max(0, idx - 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed bottom-8 right-8 z-40 hidden md:block">
      <div className="relative mb-2">
        <div className="absolute right-20 top-0 bg-white px-4 py-2 rounded-2xl shadow-lg border-2 border-pink-200 max-w-[180px]">
          <p className="text-pink-600 text-sm font-semibold text-center" style={{fontFamily: "'Comfortaa', cursive"}}>
            {scrollMessages[messageIndex]?.message || "Olá!!"}
          </p>
          <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-pink-200" />
        </div>
      </div>
      <img src="/favicon.ico" alt="Hello Kitty" className="w-20 h-20 drop-shadow-xl" />
    </div>
  );
};

const NavigationMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navItems = [
    { id: 'sobre', title: 'Sobre Mim' },
    { id: 'experiencia', title: 'Experiência' },
    { id: 'formacao', title: 'Formação' },
    { id: 'hobbies', title: 'Hobbies' },
    { id: 'habilidades', title: 'Habilidades' },
  ];
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-fadeIn">
      <button onClick={onClose} className="absolute top-6 right-6 text-pink-500 hover:text-pink-700 transition-transform transform hover:scale-125" aria-label="Fechar menu">
        <X className="w-10 h-10" />
      </button>
      <ul className="space-y-8 text-center">
        {navItems.map((item, index) => (
          <li key={item.id} className="transform transition-all duration-300 hover:scale-110" style={{ animationDelay: `${index * 100}ms` }}>
            <a href={`#${item.id}`} onClick={onClose} className="text-4xl text-pink-600 font-semibold hover:text-pink-800 transition-colors" style={{fontFamily: "'Comfortaa', cursive"}}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-10"><LacoRosaHeader /></div>
    </div>
  );
};

const SocialLink = ({ href, icon: Icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="p-2 rounded-full bg-white/20 text-white hover:bg-white hover:text-pink-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12">
    <Icon className="w-5 h-5" />
  </a>
);

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
};

const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref) observer.observe(ref);
    return () => ref && observer.unobserve(ref);
  }, [ref]);
  return (
    <div ref={setRef}
      className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const SkillRibbon = ({ skill, delay }) => (
  <div
    className="bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold py-2 px-5 rounded-full flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
    style={{ animationDelay: `${delay}ms`, boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)' }}
  >
    <Heart className="w-4 h-4 fill-white flex-shrink-0" />
    <span className="text-sm sm:text-base">{skill}</span>
  </div>
);

const SectionTitle = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-3 mb-6">
    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 flex-shrink-0" />
    <h2 className="text-2xl sm:text-3xl font-bold text-pink-600" style={{fontFamily: "'Comfortaa', cursive"}}>
      {children}
    </h2>
  </div>
);

export default function CurriculoHelloKitty() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const titleMessages = [
      { threshold: 0,  title: "Vitória Berdtt - Currículo" },
      { threshold: 15, title: "Minhas Habilidades" },
      { threshold: 30, title: "Experiência Profissional" },
      { threshold: 50, title: "Formação Acadêmica" },
      { threshold: 70, title: "Meus Hobbies" },
      { threshold: 85, title: "Entre em Contato!" },
      { threshold: 95, title: "Obrigada pela visita!" },
    ];
    const handleScroll = () => {
      const percent = (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
      const idx = titleMessages.findIndex(m => percent < m.threshold);
      document.title = titleMessages[idx === -1 ? titleMessages.length - 1 : Math.max(0, idx - 1)]?.title || "Vitória Berdtt";
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { href: 'https://www.instagram.com/vitoria_4ever/', icon: Instagram, label: 'Instagram' },
    { href: 'https://github.com/vitoriaberdtt-boop', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/vit%C3%B3ria-berdtt/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:vitoria.berdtt@gmail.com', icon: Mail, label: 'Email' },
  ];

  const skills = ['Comunicação', 'Resolução de Problemas', 'Criatividade', 'Design', 'Trabalho em Equipe', 'Proatividade', 'Empatia'];
  const hobbies = [
    { title: 'Programar', desc: 'Adoro criar projetos e aprender novas tecnologias.' },
    { title: 'Colecionar laços', desc: 'De todas as cores e tamanhos, para todas as ocasiões.' },
    { title: 'Jardinagem', desc: 'Cuidar de flores, especialmente rosas.' },
  ];

  return (
    <>
      <style>{'html { scroll-behavior: smooth; }'}</style>
      <ScrollProgressBar />
      <FloatingHelloKitty />
      <NavigationMenu isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <button
        onClick={() => setIsNavOpen(true)}
        className={`fixed top-6 right-6 z-50 p-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white transition-all duration-300 shadow-lg ${isNavOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Abrir menu"
      >
        <Menu className="w-8 h-8" />
      </button>

      <div className="relative min-h-screen">

        {/* ── HEADER ── */}
        <header className="py-8 sm:py-12 fixed top-0 left-0 w-full z-40 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #9d174d 0%, #be185d 35%, #ec4899 70%, #f472b6 100%)',
            boxShadow: '0 4px 30px rgba(157, 23, 77, 0.45)',
          }}>
          {/* Blobs decorativos */}
          <div style={{position:'absolute',top:'-50px',left:'-50px',width:'220px',height:'220px',borderRadius:'50%',background:'rgba(255,255,255,0.08)',pointerEvents:'none'}} />
          <div style={{position:'absolute',bottom:'-60px',right:'8%',width:'260px',height:'260px',borderRadius:'50%',background:'rgba(255,255,255,0.06)',pointerEvents:'none'}} />
          <div style={{position:'absolute',top:'10px',right:'22%',width:'90px',height:'90px',borderRadius:'50%',background:'rgba(255,255,255,0.10)',pointerEvents:'none'}} />
          {/* Laços decorativos */}
          <div style={{position:'absolute',top:'6px',left:'4%',opacity:0.18,pointerEvents:'none'}}>
            <HelloKittyBow className="w-20 h-12 text-white" />
          </div>
          <div style={{position:'absolute',bottom:'6px',right:'6%',opacity:0.14,pointerEvents:'none',transform:'rotate(-12deg)'}}>
            <HelloKittyBow className="w-16 h-10 text-pink-200" />
          </div>
          <div style={{position:'absolute',top:'40%',left:'1%',opacity:0.10,pointerEvents:'none',transform:'translateY(-50%) rotate(8deg)'}}>
            <HelloKittyBow className="w-12 h-7 text-white" />
          </div>
          <div style={{position:'absolute',top:'15px',right:'2%',opacity:0.12,pointerEvents:'none',transform:'rotate(15deg)'}}>
            <HelloKittyBow className="w-14 h-9 text-pink-300" />
          </div>

          {/* Conteúdo */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-1">
                <LacoRosaHeader />
                <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-md" style={{fontFamily: "'Comfortaa', cursive"}}>
                  Vitória
                </h1>
                <LacoRosaHeader />
              </div>
              <p className="text-lg sm:text-xl text-pink-100 font-medium mb-4" style={{fontFamily: "'Comfortaa', cursive"}}>
                {getGreeting()}!
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-4">
                {socialLinks.map(link => <SocialLink key={link.label} {...link} />)}
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5 text-pink-100 text-sm sm:text-base">
                <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /><span>vitoria.berdtt@gmail.com</span></div>
                <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /><span>+55 51 9XXXX-XXXX</span></div>
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /><span>Alvorada, RS</span></div>
              </div>
            </div>
          </div>
        </header>

        {/* ── CONTEÚDO ── */}
        <div className="pt-64 sm:pt-72">

          {/* SOBRE MIM — branco full-width */}
          <div className="bg-white">
            <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-12">
              <AnimatedSection delay={0}>
                <section id="sobre">
                  <SectionTitle icon={Heart}>Sobre Mim</SectionTitle>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    Uma desenvolvedora apaixonada, criativa e determinada a aprender e crescer na área de tecnologia.
                    Trago energia positiva, dedicação e uma perspectiva única para tudo o que faço.
                    Sempre ansiosa para aprender coisas novas e contribuir em projetos inovadores!
                  </p>
                </section>
              </AnimatedSection>
            </div>
          </div>
          <WaveDown />

          {/* EXPERIÊNCIA — transparente */}
          <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-12">
            <AnimatedSection delay={100}>
              <section id="experiencia">
                <SectionTitle icon={Briefcase}>Experiência Profissional</SectionTitle>
                <JobSearchProgressBar />
                <div
                  className="bg-white rounded-2xl p-5 sm:p-7 border-2 border-pink-100 hover:border-pink-300 hover:-translate-y-1 transition-all duration-300"
                  style={{boxShadow: '0 4px 20px rgba(236,72,153,0.14)'}}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Star className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" fill="#FCE7F3" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-pink-600" style={{fontFamily: "'Comfortaa', cursive"}}>
                        Desenvolvedora Full Stack Jr.
                      </h3>
                      <p className="text-pink-400 font-semibold text-sm sm:text-base">Em busca da primeira oportunidade • 2026</p>
                    </div>
                  </div>
                  <ul className="ml-8 list-disc space-y-2 text-gray-600 text-sm sm:text-base marker:text-pink-400">
                    <li>Estudante de Análise e Desenvolvimento de Sistemas</li>
                    <li>Projetos pessoais com React, Node.js e mais tecnologias</li>
                    <li>Determinada a contribuir e aprender em ambiente corporativo</li>
                  </ul>
                </div>
              </section>
            </AnimatedSection>
          </div>
          <WaveUp />

          {/* FORMAÇÃO — branco full-width */}
          <div className="bg-white">
            <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-12">
              <AnimatedSection delay={200}>
                <section id="formacao">
                  <SectionTitle icon={GraduationCap}>Formação Acadêmica</SectionTitle>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" fill="#FCE7F3" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-pink-600" style={{fontFamily: "'Comfortaa', cursive"}}>
                        Análise e Desenvolvimento de Sistemas
                      </h3>
                      <p className="text-pink-400 font-semibold text-sm sm:text-base">IFSUL - Instituto Federal Sul-rio-grandense • Fev 2026 - Fev 2029</p>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">Aprovada no vestibular 2026/1</p>
                    </div>
                  </div>
                </section>
              </AnimatedSection>
            </div>
          </div>
          <WaveDown />

          {/* HOBBIES — transparente */}
          <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-12">
            <AnimatedSection delay={300}>
              <section id="hobbies">
                <SectionTitle icon={Sparkles}>Hobbies & Interesses</SectionTitle>
                <div className="space-y-4">
                  {hobbies.map(item => (
                    <div key={item.title}
                      className="flex items-start gap-3 group bg-white rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300"
                      style={{boxShadow: '0 4px 16px rgba(236,72,153,0.12)'}}>
                      <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" fill="#FCE7F3" />
                      <div>
                        <h3 className="text-lg font-bold text-pink-600" style={{fontFamily: "'Comfortaa', cursive"}}>{item.title}</h3>
                        <p className="text-gray-600 mt-0.5 text-sm sm:text-base">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          </div>
          <WaveUp />

          {/* HABILIDADES — branco full-width */}
          <div className="bg-white">
            <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-12">
              <AnimatedSection delay={400}>
                <section id="habilidades">
                  <SectionTitle icon={Award}>Habilidades & Competências</SectionTitle>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {skills.map((skill, i) => <SkillRibbon key={skill} skill={skill} delay={i * 50} />)}
                  </div>
                </section>
              </AnimatedSection>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="text-center py-8 sm:py-10 bg-white border-t-2 border-pink-100">
            <div className="flex justify-center gap-3 mb-3">
              <LacoRosaHeader />
              <LacoRosaHeader />
              <LacoRosaHeader />
            </div>
            <p className="text-pink-500 font-bold text-base sm:text-lg" style={{fontFamily: "'Comfortaa', cursive"}}>
              Feito com amor, por Marlon • Vamos criar algo incrível juntas!
            </p>
          </footer>

        </div>
      </div>
    </>
  );
}
