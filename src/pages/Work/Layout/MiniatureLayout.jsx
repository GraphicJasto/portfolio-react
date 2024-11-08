// MiniatureLayout.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
import routes from '../../routes';
import Miniature from "../../../components/miniatures/Miniature";
import '../../../components/miniatures/miniatures.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function MiniatureLayout() {
  const [persistentLayout, setPersistentLayout] = useState({
    lg: [], md: [], sm: [], xs: [], xl: []
  });
  const [componentMap, setComponentMap] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false); // Estado para controlar el retraso

  // Memoriza el componente y layout
  const { newComponentMap, newLayout } = useMemo(() => {
    const newComponentMap = {};
    const newLayout = { lg: [], md: [], sm: [], xs: [], xl: [] };

    const workRoutes = routes.filter(route => route.path.includes("/work/"));

    workRoutes.forEach(route => {
      if (route.title && route.miniatures) {
        route.miniatures.forEach((miniature, index) => {
          const key = `${route.title}-${index}`;
          newComponentMap[key] = {
            component: miniature.miniature,
            path: route.path,
            tag: miniature.tag,
            title: route.title
          };

          ['lg', 'md', 'sm', 'xs', 'xl'].forEach(size => {
            if (miniature.layout[size]) {
              newLayout[size].push({ ...miniature.layout[size], i: key });
            }
          });
        });
      }
    }); 

    return { newComponentMap, newLayout };
  }, [routes]); // Dependencias, en este caso rutas

  useEffect(() => {
    // Solo se configura el layout una vez después del retraso
    const timer = setTimeout(() => {
      if (Object.keys(componentMap).length === 0) {
        setComponentMap(newComponentMap);
        setPersistentLayout(newLayout); // Establece el layout persistente
        setIsDelayed(true); // Activar el retraso
      }
    }, 0); // Retraso de 2 segundos

    return () => clearTimeout(timer); // Limpieza del temporizador
  }, [newComponentMap, newLayout]); // Solo se ejecuta si newComponentMap o newLayout cambian

  const handleDragStart = () => setIsDragging(true);
  const handleDragStop = () => setIsDragging(false);

  // Previene la actualización del layout al cambiar el tamaño
  const handleLayoutChange = () => {
    // No hacer nada para evitar que se actualice el layout
  };

  return (
    <div>
      {isDelayed && ( // Renderizar solo si se ha activado el retraso
        <ResponsiveReactGridLayout
          breakpoints={{ xl: 1200, lg: 899, md: 768, sm: 480, xs: 200 }}
          cols={{ xl: 3, lg: 3, md: 1, sm: 1, xs: 1 }}
          rowHeight={350}
          margin={[0, 0]}
          layouts={persistentLayout} // Usar el layout persistente
          isDraggable={true}
          isResizable={false}
          transitionDuration={300} // Cambiado a un valor bajo
          onDragStart={handleDragStart}
          onDragStop={handleDragStop}
          onLayoutChange={handleLayoutChange} // Previene actualizaciones
        >
          {Object.entries(componentMap).map(([key, { component: ComponentToRender, path, tag, title }]) => {
            const layoutItem = persistentLayout.lg.find(layout => layout.i === key);

            return (
              <div key={key} data-grid={layoutItem}>
                {ComponentToRender ? (
                  <ComponentToRender
                    path={path}
                    tag={tag}
                    title={title}
                    isDragging={isDragging}
                  />
                ) : (
                  "Empty miniature"
                )}
              </div>
            );
          })}
        </ResponsiveReactGridLayout>
      )}
    </div>
  );
}

export default MiniatureLayout;
