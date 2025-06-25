import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content border-t border-base-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-3">
            <img src="/logo.png" alt="DevLog Logo" className="w-10 h-10 mr-2" />
            <span className="text-2xl font-bold text-primary">DevLog</span>
          </div>
          <p className="max-w-sm text-sm text-base-content/80">
            Your personal space to write and share Development ideas. Explore, express, and evolve.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <span className="footer-title">Quick Links</span>
            <ul className="space-y-1">
              <li><Link to="/" className="link link-hover">Home</Link></li>
              <li><Link to="/create" className="link link-hover">Create Blog</Link></li>
              <li><Link to="/profile" className="link link-hover">Profile</Link></li>
            </ul>
          </div>

          <div>
            <span className="footer-title">Legal</span>
            <ul className="space-y-1">
              <li><Link to="#" className="link link-hover">Terms of Use</Link></li>
              <li><Link to="#" className="link link-hover">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-base-200 text-sm py-4 text-center text-base-content/70 flex flex-col items-center gap-2">
        <div>
          © {new Date().getFullYear()} DevLog. Developed by <span className="text-primary font-medium">Sai Krishna Bathina</span>
        </div>
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/saikrishnabathina?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-info transition">
            <FaLinkedin size={20} />
          </a>
          <a href="https://github.com/Saikrishna-Bathina" target="_blank" rel="noopener noreferrer" className="hover:text-info transition">
            <FaGithub size={20} />
          </a>
          <a href="https://www.instagram.com/saikrishna_bathina/profilecard/?igsh=YWJlZzRrNDBjNnM5" target="_blank" rel="noopener noreferrer" className="hover:text-info transition">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
