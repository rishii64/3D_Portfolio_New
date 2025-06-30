
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the logo text
    tl.fromTo('.preloader-text', 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.8,
        filter: 'blur(10px)'
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      }
    );

    // Animate progress bar
    tl.to('.progress-bar', {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
    }, '-=0.5');

    // Add pulsing glow effect
    tl.to('.preloader-text', {
      textShadow: '0 0 30px rgba(139, 92, 246, 0.8)',
      duration: 0.5,
      yoyo: true,
      repeat: 3,
      ease: 'power2.inOut'
    }, '-=1');

    // Exit animation
    tl.to('.preloader', {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader">
      <div className="preloader-text text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
        SAPTARSI
      </div>
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
      <div className="mt-8 text-sm text-white/60 tracking-wider">
        WEB DEVELOPER
      </div>
    </div>
  );
};

export default Preloader;


// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// interface PreloaderProps {
//   onComplete: () => void;
// }

// const Preloader = ({ onComplete }: PreloaderProps) => {
//   const preloaderRef = useRef<HTMLDivElement>(null);
//   const progressRef = useRef<HTMLDivElement>(null);
//   const logoRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const tl = gsap.timeline();

//     // Initial setup
//     gsap.set([logoRef.current, progressRef.current], { opacity: 0, y: 30 });

//     // Animate logo appearance
//     tl.to(logoRef.current, {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power2.out"
//     })
//     // Animate progress bar
//     .to(progressRef.current, {
//       opacity: 1,
//       y: 0,
//       duration: 0.5,
//       ease: "power2.out"
//     }, "-=0.5")
//     // Fill progress bar
//     .to(progressRef.current?.querySelector('.progress-fill'), {
//       width: "100%",
//       duration: 2,
//       ease: "power2.inOut"
//     })
//     // Fade out preloader
//     .to(preloaderRef.current, {
//       opacity: 0,
//       scale: 0.9,
//       duration: 1,
//       ease: "power2.inOut",
//       onComplete: () => {
//         onComplete();
//       }
//     }, "+=0.5");
//   }, [onComplete]);

//   return (
//     <div 
//       ref={preloaderRef}
//       className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
//     >
//       <div ref={logoRef} className="text-center mb-8">
//         <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent glow-text">
//           Saptarsi
//         </h1>
//         <p className="text-lg text-muted-foreground mt-4">Loading Experience...</p>
//       </div>
      
//       <div ref={progressRef} className="w-80 max-w-sm">
//         <div className="glass rounded-full h-2 overflow-hidden">
//           <div className="progress-fill h-full bg-gradient-to-r from-primary to-accent rounded-full w-0 glow-primary"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Preloader;