import HomePage from "./Home/Home";
import WorkPage from "./Work/Work";
import ContactPage from "./Contact/Contact";
import NotFoundPage from "./Error/NotFoundPage";

import ProjectAlgoritcom from "./Work/Projects/algoritcom/Algoritcom.jsx";
import ProjectEmiles from "./Work/Projects/emiles/Emiles.jsx";
import Miniature from "../components/miniatures/Miniature.jsx";

const routes = [
    // Navbar Routes
    { 
        title: 'about',
        icon: 'error',
        customIcon: true,
        path: "/", 
        element: <HomePage />,
        navigable: true,
        transitionNav: false,
    },
    {   
        title: 'work',
        icon: 'edit',
        path: "/work", 
        element: <WorkPage />,
        navigable: true,
        transitionNav: false,
    },
    {   
        title: 'contact',
        icon: 'front_hand',
        path: "/contact", 
        element: <ContactPage />,
        navigable: true,
        transitionNav: false,
    },
    // Work Projects Routes
    { 
        title: 'Algoritcom',
        icon: 'project',
        path: "/work/algoritcom", 
        element: <ProjectAlgoritcom />,
        navigable: false,
        transitionNav: true,
        miniatures: [
            { 
                copy: "Crushing the competence by familiarity",
                tag: "wspdasudhalksdjhaLKS",
                miniature: Miniature,
                layout: { 
                    xl: { i: "prism", x: 0, y: 0, w: 1, h: 1, isResizable: false },
                    lg: { i: "prism", x: 0, y: 0, w: 2, h: 2, isResizable: false },
                    md: { i: "prism", x: 0, y: 0, w: 3, h: 2, isResizable: false },
                    sm: { i: "prism", x: 0, y: 0, w: 3, h: 2, isResizable: false },
                    xs: { i: "prism", x: 0, y: 0, w: 3, h: 2, isResizable: false },
                },
            },
            
        ], 
    },
    { 
        title: 'Emiles',
        icon: 'project',
        path: "/work/emiles", 
        element: <ProjectEmiles />,
        navigable: false,
        transitionNav: true,
        miniatures: [
            {   
                copy: "Brand positioning",
                tag: "brand positioning",
                miniature: Miniature,
                layout: { 
                    lg: { i: "emiles", x: 2, y: 1, w: 1, h: 1, isResizable: false },
                    xl: { i: "emiles", x: 2, y: 1, w: 1, h: 1, isResizable: false },
                    md: { i: "emiles", x: 0, y: 2, w: 1, h: 2, isResizable: false },
                    sm: { i: "emiles", x: 0, y: 2, w: 1, h: 2, isResizable: false },
                    xs: { i: "emiles", x: 0, y: 2, w: 1, h: 2, isResizable: false },
                },
            },
            
        ], 
    },
    { 
        title: 'Another',
        icon: 'project',
        path: "/work/another",
        element: <ProjectEmiles />,
        navigable: false,
        transitionNav: true,
        miniatures: [
            {   
                copy: "Another project one",
                tag: "another1",
                miniature: Miniature,
                layout: { 
                    lg: { i: "another1", x: 2, y: 1, w: 1, h: 1, isResizable: false },
                    xl: { i: "another1", x: 2, y: 1, w: 1, h: 1, isResizable: false },
                    md: { i: "another1", x: 0, y: 0, w: 1, h: 1, isResizable: false },
                    sm: { i: "another1", x: 0, y: 0, w: 1, h: 1, isResizable: false },
                    xs: { i: "another1", x: 0, y: 0, w: 1, h: 1, isResizable: false },
                },
            },
            
            
        ], 
    },
    // Error Routes
    { 
        title: 'Not Found',
        icon: 'error',
        path: "*", 
        element: <NotFoundPage />,
        navigable: false,
        transitionNav: false,
    }
]

export default routes;
