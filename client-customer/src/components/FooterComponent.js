import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css'
class Footer extends Component {
  render() {

    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h2>About Us</h2>
            <p>Provide a brief description of your company or website.</p>
          </div>
          <div className="footer-section">
            <h2>Quick Links</h2>
            <ul>
              <li><Link to='/contactinfo'>Thông Tin Liên Hệ</Link></li>
              <li><Link to='/gmap'>Địa Chỉ SHOP</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Connect with Us</h2>
            {/* Add social media icons or links here */}
            <div className="social-icons">
              <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
              <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
              {/* Add more social media icons as needed */}
            </div>
          </div>
        </div>
      </footer>
    );
  };
}
export default Footer;


