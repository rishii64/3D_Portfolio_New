
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "3D Gaming Interface",
      description: "Immersive gaming UI with 3D elements and smooth animations",
      image: "/lovable-uploads/79c908e4-fc31-4562-ab2f-24f72a0bc446.png",
      tech: ["React", "Three.js", "GSAP"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Developer Portfolio",
      description: "Clean and modern portfolio showcasing development skills",
      image: "/lovable-uploads/55a2c17a-143c-4a00-98ca-12ace1d45150.png",
      tech: ["React", "Tailwind", "Spline"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Gaming Platform UI",
      description: "Dynamic gaming platform with character customization",
      image: "/lovable-uploads/f604ffac-843d-4b4b-9074-4428a31a2a66.png",
      tech: ["Vue.js", "CSS3", "WebGL"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Animation Tools Platform",
      description: "Professional platform for web animation tools and tutorials",
      image: "/lovable-uploads/e7486e62-3c86-48ec-8039-ec82e65edc0c.png",
      tech: ["Next.js", "GSAP", "Framer"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Interactive 3D Web",
      description: "3D interactive web experience with smooth transitions",
      image: "/lovable-uploads/20970909-00ec-4cc4-b567-456179dd4842.png",
      tech: ["React", "Spline", "GSAP"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "AuthKit Platform",
      description: "Modern authentication platform with glassmorphic design",
      image: "/lovable-uploads/2d69b5f4-de2f-4eaa-ac57-b2ae7eb99674.png",
      tech: ["React", "Node.js", "Auth0"],
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.querySelectorAll('.project-card');

    if (section && cards) {
      // Set initial states
      gsap.set(cards, {
        opacity: 0,
        y: 100,
        scale: 0.8
      });

      // Create timeline with ScrollTrigger
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }).to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });
    }
  }, []);

  const handleCardHover = (card: Element, isHovering: boolean) => {
    gsap.to(card, {
      y: isHovering ? -10 : 0,
      scale: isHovering ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring cutting-edge web technologies and immersive user experiences.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glass-strong rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500 group"
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs glass rounded-full text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={project.demoUrl}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:glow-accent transition-all duration-300 text-sm"
                  >
                    <ArrowUpRight size={16} />
                    Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:glow-primary transition-all duration-300 text-sm"
                  >
                    <GithubLogo size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;