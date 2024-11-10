// MainContainer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../../pages/routes';

import Pane from './Pane';
import Transition from './Transition';
import './MainContainer.css';

function MainContainer({ activeTab, setIsTransitioning }) {
  const location = useLocation();
  const previousPath = useRef(location.pathname); // Guarda el path anterior
  const [currentPane, setCurrentPane] = useState(routes[0].element); // Panel inicial
  const [nextPane, setNextPane] = useState(null);

  useEffect(() => {
    // Evita que la animación ocurra si el path anterior y el actual son iguales
    if (location.pathname === previousPath.current) return;

    // Busca la ruta actual en el arreglo de rutas y actualiza el siguiente panel
    const nextRoute = routes.find(route => route.path === location.pathname);
    if (nextRoute) {
      if (nextRoute.transitionNav) { // Verifica la propiedad transitionNav
        setNextPane(nextRoute.element);
        setIsTransitioning(true); // Inicia la transición

        // Después de la animación, actualiza el panel actual y limpia el panel siguiente
        const timer = setTimeout(() => {
          setCurrentPane(nextRoute.element);
          setNextPane(null);
          previousPath.current = location.pathname; // Actualiza el path anterior
          setIsTransitioning(false); // Finaliza la transición
        }, 1200); // Duración de la animación en milisegundos

        return () => clearTimeout(timer);
      } else {
        // Si no hay animación, actualiza directamente el panel actual
        setCurrentPane(nextRoute.element);
        previousPath.current = location.pathname; // Actualiza el path anterior
      }
    }
  }, [location, setIsTransitioning]);

  return (
    <main className="MainContainer">
      <section className="Main">
        {/* Renderiza el panel actual con el siguiente */}
        <Transition keyProp="current">
          <Pane activeTab={activeTab}>{currentPane}</Pane>
        </Transition>
        
        {nextPane && (
          <Transition keyProp="next">
            <Pane activeTab={activeTab}>{nextPane}</Pane>
          </Transition>
        )}
      </section>
    </main>
  );
}

export default MainContainer;
