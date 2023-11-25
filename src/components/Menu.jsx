import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="navbackground">
            <nav className="menu">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/flag-guessing-game">Flag Guessing Game</Link>
                    </li>
                    <li>
                        <Link to="/capital-guessing-game">Capital Geussing Game</Link>
                    </li>
                    <li>
                        <Link to="/learn-about-countries">Learn About Countries</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;