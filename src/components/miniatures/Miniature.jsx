import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './miniatures.css';

const Miniature =  ({ path, tag, title, copy, isDragging }) => {
    const navigate = useNavigate();
    const [mouseDownTime, setMouseDownTime] = useState(0);

    const handleMouseDown = () => {
        setMouseDownTime(Date.now());
    };

    const handleMouseUp = () => {
        const mouseUpTime = Date.now();
        const clickDuration = mouseUpTime - mouseDownTime;

        if (!isDragging && clickDuration < 200 && path) {
            navigate(path);  // Navega solo si no es un arrastre y el clic es breve
        }
    };

    return (
        <article
            className="miniatureContainer"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            
        >
            <div>
                <p>{tag}</p>
                <p>{copy}</p>
                <h3>{title}</h3>
            </div>
            <span>
                <img src="" alt="Imagen de fondo" />
            </span>
        </article>
    );
};

export default Miniature;
