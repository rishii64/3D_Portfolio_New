
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Components
import Preloader from '../Components/Preloader';
import Navigation from '../Components/Navigation';
import HeroSection from '../Components/HeroSection';
import AboutSection from '../Components/AboutSection';
import ProjectsSection from '../Components/ProjectSection';
import ContactSection from '../Components/ContactSection';
import FooterSection from '../Components/FooterSection';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [locomotiveScroll, setLocomotiveScroll] = useState<LocomotiveScroll | null>(null);

    useEffect(() => {
        console.log('Index component mounted, loading state:', isLoading);

        // Initialize Locomotive Scroll after preloader
        if (!isLoading) {
            const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement;

            if (scrollContainer) {
                const scroll = new LocomotiveScroll({
                    el: scrollContainer,
                    smooth: true,
                    multiplier: 1,
                    class: 'is-revealed',
                    smartphone: {
                        smooth: true
                    },
                    tablet: {
                        smooth: true
                    }
                });

                setLocomotiveScroll(scroll);

                // Update ScrollTrigger when Locomotive Scroll updates
                scroll.on('scroll', ScrollTrigger.update);

                ScrollTrigger.scrollerProxy(scrollContainer, {
                    scrollTop(value) {
                        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
                    },
                    getBoundingClientRect() {
                        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                    },
                    pinType: scrollContainer.style.transform ? 'transform' : 'fixed'
                });

                ScrollTrigger.addEventListener('refresh', () => scroll.update());
                ScrollTrigger.refresh();

                // Cleanup
                return () => {
                    if (scroll) scroll.destroy();
                };
            }
        }
    }, [isLoading]);

    const handlePreloaderComplete = () => {
        console.log('Preloader completed');
        setIsLoading(false);
    };

    if (isLoading) {
        return <Preloader onComplete={handlePreloaderComplete} />;
    }

    return (
        <div className="relative">
            <Navigation />
            <main>
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <FooterSection />
        </div>
    );
};

export default Index;
