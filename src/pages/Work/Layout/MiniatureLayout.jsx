// MiniatureLayout.jsx

import React, { useState, useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import routes from '../../routes';
import '../../../components/miniatures/miniatures.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function MiniatureLayout() {
  const [isDragging, setIsDragging] = useState(false);

  // Memoriza los items y layouts basados en las rutas
  const { items, layouts } = useMemo(() => {
    const items = [];
    const layouts = { lg: [], md: [], sm: [], xs: [], xl: [] };

    const workRoutes = routes.filter((route) => route.path.includes('/work/'));

    workRoutes.forEach((route) => {
      if (route.title && route.miniatures) {
        route.miniatures.forEach((miniature, index) => {
          const key = `${route.title}-${index}`;

          // Agrega layouts para cada tamaño disponible
          ['lg', 'md', 'sm', 'xs', 'xl'].forEach((size) => {
            if (miniature.layout[size]) {
              const layout = { ...miniature.layout[size], i: key };
              layouts[size].push(layout);
            }
          });

          items.push({
            key,
            component: miniature.miniature,
            path: route.path,
            tag: miniature.tag,
            title: route.title,
          });
        });
      }
    });

    return { items, layouts };
  }, []);

  const handleDragStart = () => setIsDragging(true);
  const handleDragStop = () => setIsDragging(false);

  // Previene la actualización del layout al cambiar el tamaño
  const handleLayoutChange = () => {
    // Intencionalmente vacío
  };

  return (
    <ResponsiveReactGridLayout
      breakpoints={{ xl: 1200, lg: 899, md: 768, sm: 480, xs: 200 }}
      cols={{ xl: 3, lg: 3, md: 1, sm: 1, xs: 1 }}
      rowHeight={350}
      margin={[0, 0]}
      layouts={layouts}
      isDraggable={true}
      isResizable={false}
      transitionDuration={300}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onLayoutChange={handleLayoutChange}
    >
      {items.map(({ key, component: ComponentToRender, path, tag, title }) => (
        <div key={key}>
          {ComponentToRender ? (
            <ComponentToRender
              path={path}
              tag={tag}
              title={title}
              isDragging={isDragging}
            />
          ) : (
            'Empty miniature'
          )}
        </div>
      ))}
    </ResponsiveReactGridLayout>
  );
}

export default MiniatureLayout;
