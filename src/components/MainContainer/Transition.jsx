// Transition.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MainContainer.css'; // Asegúrate de que tu archivo CSS esté vinculado

function Transition({ children, keyProp }) {
  return (
    <AnimatePresence>
      {/* Pane de entrada */}
      <motion.div
        key={`slide-in-${keyProp}`}
        className="slide-in"
        initial={{
          opacity: 0,
          translateY: 100, // Comienza 20px hacia abajo
          height: '1%',
        }}
        animate={{
          opacity: 1,
          translateY: 0, // Regresa a su posición original
          height: '100%',
        }}
        exit={{
          opacity: 0,
          height: '1%',
          width: '80%',
        }}
        transition={{ duration: 1.2, ease: [0.05, 0.7, 0.1, 1.0] }} // Duración de la animación
      >
        {children}
      </motion.div>

      {/* Pane de salida (anterior) */}
      <motion.div
        key={`slide-out-${keyProp}`}
        className="slide-out"
        initial={{
          opacity: 1,
          translateY: 0, // Comienza en su posición original
          height: '100%',
        }}
        animate={{
          opacity: 0,
          translateY: 100, // Se desplaza hacia abajo
          height: '1%',
        }}
        exit={{
          opacity: 0,
          height: '1%',
          width: '80%',
        }}
        transition={{ duration: 1.2, ease: [0.05, 0.7, 0.1, 1.0] }} // Duración de la animación
      >
       
      </motion.div>
    </AnimatePresence>
  );
}

export default Transition;
