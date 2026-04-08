import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ logo }) => {
    const location = useLocation();

    return (
        <header id="header" className="all_colors header_color">
            <div id="header_meta">
                <div className="container">
                    <div className="phone-info">
                        <div className="top-links">
                            <a href="https://www.brightridge.com/electric-outages-tech-support/" target="_blank" rel="noopener noreferrer">Outage/Tech Support</a>
                            <span className="sep">|</span>
                            <a href="https://www.brightridge.com/" target="_blank" rel="noopener noreferrer">Electric Service</a>
                        </div>
                        <div className="language-btns">
                            <span className="english_btn"><a href="#" className="active">English</a></span>
                            <span className="spanish_btn"><a href="#">Español</a></span>
                        </div>
                    </div>
                </div>
            </div>

            <div id="header_main">
                <div className="container av-logo-container">
                    <div className="inner-container">
                        <div className="logo">
                            <Link to="/">
                                <img src={logo || "https://www.mybrightridge.com/wp-content/uploads/BrightRidge-Broadband-Logo.png"} alt="BrightRidge Broadband" />
                            </Link>
                        </div>
                        <nav className="main_menu">
                            <ul className="menu av-main-nav">
                                <li><Link to="/" className={location.pathname === '/' ? 'active-nav' : ''}>Broadband For Home</Link></li>
                                <li><a href="#">Business Solutions</a></li>
                                <li><a href="#">The Difference</a></li>
                                <li><a href="#">Resources</a></li>
                                <li><Link to="/contact" className={location.pathname === '/contact' ? 'active-nav' : ''}>Contact Us</Link></li>
                                <li className="pay-bill"><a href="https://brightridge.smarthub.coop/ui/#/login" target="_blank" rel="noopener noreferrer">Pay My Bill</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
