
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const particles = particlesRef.current?.querySelectorAll('.particle');

    if (footer && particles) {
      // Set initial state
      gsap.set(footer, {
        opacity: 0,
        y: 60,
        filter: "blur(10px)"
      });

      // Animate footer
      gsap.to(footer, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate particles
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: -30,
          x: Math.random() * 20 - 10,
          duration: 4 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2
        });
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative py-16 mt-20 overflow-hidden">
      {/* Floating Particles Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary rounded-full glow-primary opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Saptarsi
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8 mb-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="hover:text-accent transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-accent transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="hover:text-accent transition-colors duration-300"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-accent transition-colors duration-300"
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-red-500 animate-pulse" /> by Saptarsi
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2024 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
