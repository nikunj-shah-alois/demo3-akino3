import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer" className="container_wrap footer_color">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col about">
                        <img src="https://www.mybrightridge.com/wp-content/uploads/BrightRidge-Broadband-Logo.png" alt="BrightRidge Logo" className="footer-logo" />
                        <p>BrightRidge Broadband is providing high-speed fiber internet and broadband services to customers across Johnson City and Washington County.</p>
                    </div>
                    <div className="footer-col">
                        <h3>Broadband</h3>
                        <ul>
                            <li><a href="#">Fiber Internet</a></li>
                            <li><a href="#">Streaming Services</a></li>
                            <li><a href="#">Voice Services</a></li>
                            <li><a href="#">Business Solutions</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Customer Support</h3>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Tech Support</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Outage Map</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Electric Service</h3>
                        <ul>
                            <li><a href="https://www.brightridge.com/">BrightRidge Electric</a></li>
                            <li><a href="#">Power Outages</a></li>
                            <li><a href="#">Pay Bill</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div id="socket">
                <div className="container">
                    <span className="copyright">© Copyright - BrightRidge Broadband - <a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a></span>
                    <ul className="social_bookmarks">
                        <li><a href="#" className="facebook">FB</a></li>
                        <li><a href="#" className="twitter">TW</a></li>
                        <li><a href="#" className="instagram">IG</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
