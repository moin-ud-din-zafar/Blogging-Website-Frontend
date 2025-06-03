// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark-bg text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h4 className="text-white text-lg font-semibold mb-2">MyBlog2025</h4>
            <p>© 2025 MyBlog2025. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
