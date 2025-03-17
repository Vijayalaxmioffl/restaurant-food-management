import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import googlePlaystore from "../customer/goog-playstore.png"; 

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Left Section - Company Info & Contact */}
          <div className="col-md-4 text-start">
            <h5>Hotel Marriott</h5>
            <p className="mb-1">📍 123, Grand Avenue, Madurai, India - 625014</p>
            <p className="mb-1">📧 <a href="mailto:care@hotelmarriott.com" className="text-white">care@hotelmarriott.com</a></p>
            <p className="mb-1">☎ <a href="tel:+919000990009" className="text-white">+91 90009 90009</a></p>
          </div>

          {/* Center Section - Quick Links & Top Cities */}
          <div className="col-md-4 text-center">
            <h6>Quick Links</h6>
            <div className="d-flex flex-column">
              <a href="/about" className="text-white text-decoration-none">About Us</a>
              <a href="/services" className="text-white text-decoration-none">Our Services</a>
              <a href="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</a>
              <a href="/terms" className="text-white text-decoration-none">Terms & Conditions</a>
            </div>

            <h6 className="mt-3">Top Cities</h6>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <a href="/city/delhi" className="text-white text-decoration-none">New Delhi</a> |
              <a href="/city/Madurai" className="text-white text-decoration-none">Madurai</a> |
              <a href="/city/bangalore" className="text-white text-decoration-none">Bangalore</a> |
              <a href="/city/chennai" className="text-white text-decoration-none">Chennai</a> 
            </div>
          </div>

          <div className="col-md-4 text-end">
            <h6>Follow Us</h6>
            <div className="d-flex justify-content-end gap-3">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaInstagram />
              </a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaLinkedin />
              </a>
            </div>

           
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="text-center mt-3 small text-secondary">
          <p className="mb-0">Disclaimer: All trademarks, logos, and brand names are the property of their respective owners.</p>
          <p className="mb-0">&copy; {new Date().getFullYear()} Hotel Marriott. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
