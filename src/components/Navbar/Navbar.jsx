import React from 'react';

import NavItems from './NavItems'
import './Navbar.css'



function Navbar({ setActiveTab }) {



    return (

        <nav className="nav">

            <NavItems setActiveTab={setActiveTab} />

        </nav>

    )
}

export default Navbar;
