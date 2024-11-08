import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from 'classnames';

import routes from '../../pages/routes';

import './Navbar.css';

function NavItems({ setActiveTab }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [hoveredItem, setIsHovered] = useState(null);

    // Función para determinar si una ruta es activa
    const isActiveRoute = (route) => {
        return location.pathname === route.path || 
               location.pathname.startsWith(route.path + '/');
    };

    // Determinar la ruta activa
    const activeItem = useMemo(() => {
        const currentRoute = routes.find(route => isActiveRoute(route));
        return currentRoute || routes.find(route => route.path === "/");
    }, [location.pathname]);

    useEffect(() => {
        if (activeItem) {
            setActiveTab(activeItem.title);
        }
    }, [activeItem, setActiveTab]);

    const handleItemClick = (route) => {
        setActiveTab(route.title);
        navigate(route.path);
    };

    return (
        <ul>
            {routes
                .filter(route => route.navigable)
                .map((route, index) => (
                    <li
                        key={index}
                        className={classNames('navItem', { 
                            'isActive': isActiveRoute(route), 
                            'isHovered': hoveredItem === route 
                        })}
                        onMouseOver={() => setIsHovered(route)}
                        onMouseOut={() => setIsHovered(null)}
                        onClick={() => handleItemClick(route)}
                    >
                        <>
                            <span className="material-symbols-outlined">{route.icon}</span>
                            <p>{route.title}</p>
                        </>
                    </li>
                ))}
        </ul>
    );
}

export default NavItems;
