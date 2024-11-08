import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from '../../pages/routes';
import Lenis from 'lenis';
import './MainContainer.css';

function Pane({ children }) {
    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!wrapperRef.current || !contentRef.current) return;

        const lenis = new Lenis({
            easing: function(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); },
            smooth: true,
            direction: 'vertical',
            wrapper: wrapperRef.current,
            content: contentRef.current,
            eventsTarget: wrapperRef.current,
        });

        // Restablecer el scroll al inicio
        lenis.scrollTo(0, { duration: 0 });

        const handleScroll = () => {
          
    
        };

        lenis.on('scroll', handleScroll);

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
        
    }, []);

    return (
        <div className={`Pane`} ref={wrapperRef}>
            <div className="wrapper" ref={contentRef}>
                {children}
            </div>
        </div>
    );
}

export default Pane;
