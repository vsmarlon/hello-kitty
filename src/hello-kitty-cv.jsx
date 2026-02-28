import React, { useState, useEffect } from 'react';
import { 
  Heart, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Award, Star, Sparkles, Menu, X 
} from 'lucide-react';

// --- COMPONENTES DO LAÇO ---
// (Definidos fora para serem reutilizados)
const LacoRosaHeader = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 100 100" fill="none">
    <ellipse cx="25" cy="50" rx="25" ry="30" fill="#EC4899"/> 
    <ellipse cx="75" cy="50" rx="25" ry="30" fill="#EC4899"/>
    <circle cx="50" cy="50" r="15" fill="#F9A8D4"/>
    <circle cx="50" cy="50" r="8" fill="#BE185D"/>
  </svg>
);


// --- NOVO COMPONENTE: BARRA DE PROGRESSO ---
const ScrollProgressBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollPercentage(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Barra fixa no topo, com z-index alto
    <div className="fixed top-0 left-0 w-full h-2 bg-pink-200 z-50">
      <div 
        className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-75 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};


// --- NOVO COMPONENTE: MENU DE NAVEGAÇÃO FULLSCREEN ---
const NavigationMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'sobre', title: 'Sobre Mim' },
    { id: 'experiencia', title: 'Experiência' },
    { id: 'formacao', title: 'Formação' },
    { id: 'hobbies', title: 'Hobbies' },
    { id: 'habilidades', title: 'Habilidades' }
  ];

  const handleLinkClick = () => {
    onClose(); // Fecha o menu ao clicar em um link
  };

  return (
    // Container do menu (tela cheia)
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center animate-fadeIn">
      {/* Botão de Fechar */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-pink-500 hover:text-pink-700 transition-transform transform hover:scale-125"
        aria-label="Fechar menu"
      >
        <X className="w-10 h-10" />
      </button>

      {/* Itens de navegação centralizados */}
      <ul className="space-y-8 text-center">
        {navItems.map((item) => (
          <li key={item.id} className="transform transition-transform hover:scale-110">
            <a 
              href={`#${item.id}`} 
              onClick={handleLinkClick} // Adiciona o handler
              className="text-4xl text-pink-600 font-semibold"
              style={{fontFamily: 'Comic Sans MS, cursive'}}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      
      <div className="absolute bottom-10">
        <LacoRosaHeader />
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL DO CURRÍCULO ---
export default function CurriculoHelloKitty() {
  
  // Estado para controlar o menu de navegação
  const [isNavOpen, setIsNavOpen] = useState(false);
  // Estado para controlar o header fixo (transparência)
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Se rolar mais de 10 pixels, ativa o estado
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Estilo global para rolagem suave */}
      <style>{'html { scroll-behavior: smooth; }'}</style>
      
      {/* Barra de Progresso */}
      <ScrollProgressBar />

      {/* Menu Hambúrguer (Tela Cheia) */}
      <NavigationMenu isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      {/* Botão do Menu Hambúrguer (Fixo) */}
      <button
        onClick={() => setIsNavOpen(true)}
        className={`fixed top-6 right-6 z-50 p-2 rounded-full text-white transition-all duration-300 transform
                    ${isScrolled ? 'bg-pink-500/90 hover:bg-pink-600' : 'bg-pink-500 hover:bg-pink-600'}
                    ${isNavOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
                  `}
        aria-label="Abrir menu"
      >
        <Menu className="w-8 h-8" />
      </button>

      {/* Container Principal */}
      <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100">
        
        {/* Conteúdo (sem padding lateral da sidebar) */}
        <div className="flex-1">
          
          {/* Cabeçalho Fixo */}
          <header 
            className={`py-8 sm:py-12 shadow-lg border-b-2 border-pink-200
                        fixed top-0 left-0 w-full z-40 transition-all duration-300
                        ${isScrolled 
                          ? 'bg-gradient-to-r from-pink-500/90 via-rose-500/90 to-pink-600/90 backdrop-blur-sm' 
                          : 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600'
                        }`}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2 sm:gap-3 mb-4">
                  <LacoRosaHeader />
                  <h1 
                    className="text-4xl sm:text-6xl font-bold text-white" 
                    style={{fontFamily: 'Comic Sans MS, cursive'}}
                  >
                    Vitória
                  </h1>
                  <LacoRosaHeader />
                </div>
                <p 
                  className="text-xl sm:text-2xl text-pink-100 font-semibold mb-4"
                  style={{fontFamily: 'Comic Sans MS, cursive'}}
                >
                  Garota de Programa
                </p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-pink-100">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">vitoria@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">+55 51 9XXXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Alvorada City</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Conteúdo da Página 
              !!! IMPORTANTE: Adicionado padding-top para não ficar atrás do header fixo !!! 
              Ajuste 'pt-64 sm:pt-80' se o seu header for mais alto ou mais baixo
          */}
          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pt-64 sm:pt-80">
            
            {/* Seção Sobre Mim */}
            <section id="sobre" className="bg-white rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="#FBCFE8" />
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-pink-600" 
                  style={{fontFamily: 'Comic Sans MS, cursive'}}
                >
                  Sobre Mim
                </h2>
              </div>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                Uma menina apaixonada, meigae e  criativa. 
                Trago energia, dedicação e uma perspectiva única para tudo o que faço. 
                Sempre ansiosa para aprender e crescer! 💖
              </p>
            </section>

            {/* Seção Experiência */}
            <section id="experiencia" className="bg-rose-50 rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-rose-600" />
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-rose-600" 
                  style={{fontFamily: 'Comic Sans MS, cursive'}}
                >
                  Experiência Profissional
                </h2>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <Star className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" fill="#FCE7F3" />
                    <div className="flex-1">
                      <h3 
                        className="text-lg sm:text-xl font-bold text-rose-700" 
                        style={{fontFamily: 'Comic Sans MS, cursive'}}
                      >
                        Título do Cargo
                      </h3>
                      <p className="text-rose-600 font-semibold text-sm sm:text-base">Nome da Empresa • 2020 - Presente</p>
                    </div>
                  </div>
                  <ul className="ml-8 list-disc list-outside space-y-2 text-gray-700 text-sm sm:text-base marker:text-pink-400">
                    <li>Alcancei resultados incríveis e superei expectativas</li>
                    <li>Liderei projetos inovadores com soluções criativas</li>
                    <li>Colaborei com equipes para entregar excelência</li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <Star className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" fill="#FCE7F3" />
                    <div className="flex-1">
                      <h3 
                        className="text-lg sm:text-xl font-bold text-rose-700" 
                        style={{fontFamily: 'Comic Sans MS, cursive'}}
                      >
                        Cargo Anterior
                      </h3>
                      <p className="text-rose-600 font-semibold text-sm sm:text-base">Empresa Anterior • 2018 - 2020</p>
                    </div>
                  </div>
                  <ul className="ml-8 list-disc list-outside space-y-2 text-gray-700 text-sm sm:text-base marker:text-pink-400">
                    <li>Desenvolvi habilidades e ganhei experiência valiosa</li>
                    <li>Construí relacionamentos sólidos com clientes</li>
                    <li>Contribuí para o sucesso e crescimento da equipe</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Seção Formação */}
            <section id="formacao" className="bg-white rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-pink-600" 
                  style={{fontFamily: 'Comic Sans MS, cursive'}}
                >
                  Formação Acadêmica
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" fill="#FCE7F3" />
                  <div>
                    <h3 
                      className="text-lg sm:text-xl font-bold text-pink-700" 
                      style={{fontFamily: 'Comic Sans MS, cursive'}}
                    >
                      Nome do Curso
                    </h3>
                    <p className="text-pink-600 font-semibold text-sm sm:text-base">Nome da Universidade • Ano</p>
                    <p className="text-gray-700 mt-1 text-sm sm:text-base">Cursos relevantes, honras, conquistas</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção Hobbies */}
            <section id="hobbies" className="bg-rose-50 rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-rose-600" />
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-rose-600" 
                  style={{fontFamily: 'Comic Sans MS, cursive'}}
                >
                  Hobbies & Interesses
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" fill="#FCE7F3" />
                  <div>
                    <h3 
                      className="text-lg sm:text-xl font-bold text-pink-700" 
                      style={{fontFamily: 'Comic Sans MS, cursive'}}
                    >
                      Incomodar meu namorado
                    </h3>
                    <p className="text-gray-700 mt-1 text-sm sm:text-base">Todos os dias.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" fill="#FCE7F3" />
                  <div>
                    <h3 
                      className="text-lg sm:text-xl font-bold text-pink-700" 
                      style={{fontFamily: 'Comic Sans MS, cursive'}}
                    >
                      Colecionar laços
                    </h3>
                    <p className="text-gray-700 mt-1 text-sm sm:text-base">De todas as cores e tamanhos, para todas as ocasiões.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" fill="#FCE7F3" />
                  <div>
                    <h3 
                      className="text-lg sm:text-xl font-bold text-pink-700" 
                      style={{fontFamily: 'Comic Sans MS, cursive'}}
                    >
                      Jardinagem
                    </h3>
                    <p className="text-gray-700 mt-1 text-sm sm:text-base">Cuidar de flores, especialmente rosas.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção Habilidades */}
            <section id="habilidades" className="bg-white rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-rose-600" />
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-rose-600" 
                  style={{fontFamily: 'Comic Sans MS, cursive'}}
                >
                  Habilidades & Competências
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                 'Comunicação', 'Resolução de Problemas', 'Criatividade', 
                  'Desenhar', 'Fofa'
                ].map((skill) => (
                  <div key={skill} className="bg-pink-100 rounded-full py-2 px-4 shadow-sm flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500 flex-shrink-0" />
                    <span className="text-pink-800 font-semibold text-sm sm:text-base">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Rodapé */}
          <footer className="text-center py-6 sm:py-8">
            <div className="flex justify-center gap-2 mb-4">
              <LacoRosaHeader />
              <LacoRosaHeader />
              <LacoRosaHeader />
            </div>
            <p 
              className="text-pink-600 font-bold text-base sm:text-lg" 
              style={{fontFamily: 'Comic Sans MS, cursive'}}
            >
              Feito com amor, por Marlon 💕 • Vamos criar algo incrível juntas!
            </p>
          </footer>

        </div>
      </div>
    </>
  );
}

