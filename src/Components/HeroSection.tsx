
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'phosphor-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Initial setup
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current, splineRef.current], {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    });

    // Animate elements in sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");

    // Floating orbs animation
    const orbs = heroRef.current?.querySelectorAll('.glow-orb');
    orbs?.forEach((orb, index) => {
      gsap.to(orb, {
        y: -20,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3
      });
    });
  }, []);

  const handleCTAHover = (isHovering: boolean) => {
    gsap.to(ctaRef.current, {
      scale: isHovering ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Spline 3D */}
      <div ref={splineRef} className="absolute inset-0 opacity-60">
        <iframe 
          src='https://my.spline.design/orb-fpSgIo9vVTsDQkg7xV0kuDlo/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-none"
        />
      </div>

      {/* Floating Orbs */}
      <div className="glow-orb absolute top-20 left-10 w-4 h-4 bg-primary rounded-full glow-primary opacity-60"></div>
      <div className="glow-orb absolute top-40 right-20 w-6 h-6 bg-accent rounded-full glow-accent opacity-40"></div>
      <div className="glow-orb absolute bottom-32 left-20 w-3 h-3 bg-primary rounded-full glow-primary opacity-50"></div>
      <div className="glow-orb absolute bottom-20 right-10 w-5 h-5 bg-accent rounded-full glow-accent opacity-30"></div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
            Saptarsi
          </span>
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground font-light">
            Web Developer
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
        </p>

        <button
          ref={ctaRef}
          className="glass-strong px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-primary to-accent text-white hover:glow-primary transition-all duration-300 inline-flex items-center gap-3"
          onMouseEnter={() => handleCTAHover(true)}
          onMouseLeave={() => handleCTAHover(false)}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Hire Me
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;