
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav on mount
    gsap.fromTo('.nav-container',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }
    );
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      gsap.to('.mobile-menu', {
        x: '0%',
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.fromTo('.mobile-menu-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 }
      );
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`nav-container fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-morphism' : ''
        }`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            SM
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative text-white/80 hover:text-white transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white/80 hover:text-white transition-colors duration-300"
          >
            <List size={24} weight="light" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu fixed top-0 right-0 w-full h-full bg-black/95 backdrop-blur-xl z-50 transform translate-x-full md:hidden">
        <div className="flex justify-end p-6">
          <button
            onClick={toggleMenu}
            className="text-white/80 hover:text-white transition-colors duration-300"
          >
            <X size={24} weight="light" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="mobile-menu-item text-3xl text-white/80 hover:text-white transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;

// import { useState, useEffect } from 'react';
// import { List, X, GithubLogo, LinkedinLogo } from 'phosphor-react';
// import { gsap } from 'gsap';

// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
//         isScrolled ? 'glass-strong py-5' : 'py-6'
//       }`}>
//         <div className="container mx-auto px-6 flex items-center justify-between">
//           <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//             Saptarsi
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <button onClick={() => scrollToSection('home')} className="hover:text-accent transition-colors">
//               Home
//             </button>
//             <button onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors">
//               About
//             </button>
//             <button onClick={() => scrollToSection('projects')} className="hover:text-accent transition-colors">
//               Projects
//             </button>
//             <button onClick={() => scrollToSection('contact')} className="hover:text-accent transition-colors">
//               Contact
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={toggleMenu}
//             className="md:hidden p-2 rounded-lg glass hover:glow-primary transition-all duration-300"
//           >
//             {isOpen ? <X size={24} /> : <List size={24} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 md:hidden">
//           <div className="absolute inset-0 bg-background/90 backdrop-blur-lg">
//             <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
//               <button onClick={() => scrollToSection('home')} className="hover:text-accent transition-colors">
//                 Home
//               </button>
//               <button onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors">
//                 About
//               </button>
//               <button onClick={() => scrollToSection('projects')} className="hover:text-accent transition-colors">
//                 Projects
//               </button>
//               <button onClick={() => scrollToSection('contact')} className="hover:text-accent transition-colors">
//                 Contact
//               </button>
//               <div className="flex space-x-6 mt-8">
//                 <a href="#" className="p-3 glass rounded-full hover:glow-accent transition-all duration-300">
//                   <GithubLogo size={24} />
//                 </a>
//                 <a href="#" className="p-3 glass rounded-full hover:glow-accent transition-all duration-300">
//                   <LinkedinLogo size={24} />
//                 </a>
//               </div>
//             </div>
//             <button
//               onClick={toggleMenu}
//               className="absolute top-6 right-6 p-2 rounded-lg glass"
//             >
//               <X size={24} />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navigation;