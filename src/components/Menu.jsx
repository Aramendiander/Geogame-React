import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="navbackground">
            <nav className="menu">
                <ul>
                    <li className="menuitem">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="menuitem">
                        <Link to="/flag-guessing-game">Flag Guessing Game</Link>
                    </li>
                    <li className="menuitem">
                        <Link to="/capital-guessing-game">Capital Guessing Game</Link>
                    </li>
                    <li className="menuitem">
                        <Link to="/learn-about-countries">Learn About Countries</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;