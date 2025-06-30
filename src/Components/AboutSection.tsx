
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileHtml, FileCss, FileJs, Atom, Palette, Code } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'HTML5', icon: FileHtml, color: 'text-orange-500' },
    { name: 'CSS3', icon: FileCss, color: 'text-blue-500' },
    { name: 'JavaScript', icon: FileJs, color: 'text-yellow-500' },
    { name: 'React', icon: Atom, color: 'text-cyan-500' },
    { name: 'GSAP', icon: Palette, color: 'text-green-500' },
    { name: 'Node.js', icon: Code, color: 'text-green-600' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in animation
      gsap.fromTo(sectionRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0, rotation: -5 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current?.children || [],
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Skills animation
      gsap.fromTo(skillsRef.current?.children || [],
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 min-h-screen flex items-center" data-scroll-section>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/829d2ee7-a6cf-4609-8cc7-e5b5ce717fcc.png" 
                    alt="Saptarsi"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-400 rounded-full animate-float opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-cyan-400 rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                I'm a passionate web developer with over 1.5 years of experience creating
                stunning digital experiences. I specialize in modern web technologies
                and love bringing creative ideas to life through code.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                My expertise spans from front-end development to creating immersive
                user interfaces with advanced animations and 3D elements. I'm always
                exploring new technologies to push the boundaries of web development.
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-3 gap-4">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="skill-icon glass p-4 rounded-lg text-center hover:glow-accent transition-all duration-300 group cursor-pointer"
                  >
                    <IconComponent size={32} className={`mx-auto mb-2 ${skill.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;