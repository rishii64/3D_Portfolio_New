
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const social = socialRef.current;
    const inputs = form?.querySelectorAll('input, textarea');
    const submitBtn = form?.querySelector('.submit-btn');

    if (section && form && social && inputs && submitBtn) {
      // Set initial states
      gsap.set([form, social], {
        opacity: 0,
        y: 50,
        filter: "blur(10px)"
      });
      gsap.set(inputs, { opacity: 0, x: -30 });
      gsap.set(submitBtn, { opacity: 0, scale: 0.8 });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to([form, social], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      })
      .to(inputs, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5")
      .to(submitBtn, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Animate success
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
    
    setIsSubmitting(false);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-6 py-4 glass-strong rounded-lg focus:glow-primary focus:outline-none transition-all duration-300"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-6 py-4 glass-strong rounded-lg focus:glow-primary focus:outline-none transition-all duration-300"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <div>
              <textarea
                rows={6}
                placeholder="Your Message"
                required
                className="w-full px-6 py-4 glass-strong rounded-lg focus:glow-primary focus:outline-none transition-all duration-300 resize-none"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn w-full py-4 bg-gradient-to-r from-primary to-accent rounded-lg font-semibold text-white hover:glow-primary transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <PaperPlaneTilt size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div ref={socialRef} className="flex justify-center space-x-6">
            <a
              href="#"
              className="p-4 glass-strong rounded-full hover:glow-accent transition-all duration-300 group"
            >
              <GithubLogo size={24} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="#"
              className="p-4 glass-strong rounded-full hover:glow-primary transition-all duration-300 group"
            >
              <LinkedinLogo size={24} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
