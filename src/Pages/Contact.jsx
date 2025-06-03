// src/Pages/Contact.jsx
import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { DarkModeContext } from "../contexts/DarkModeContext";

const Contact = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex flex-col min-h-screen select-none ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />

      {/* Hero Section */}
      <section
        className={`py-24 text-center px-6 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-600 text-gray-100"
            : "bg-gradient-to-br from-blue-600 to-blue-400 text-white"
        }`}
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Get in Touch
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
          We’d love to hear from you! Whether you have feedback, questions, or
          ideas, drop us a line and we’ll get back to you soon.
        </p>
      </section>

      {/* Contact Info */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: "📍",
              title: "Address",
              detail: "123 Tech Avenue, Web City, 2025",
            },
            {
              icon: "✉️",
              title: "Email",
              detail: "contact@myblog2025.com",
            },
            {
              icon: "📞",
              title: "Phone",
              detail: "+1 (800) 123-4567",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`p-6 rounded-lg shadow transition ${
                darkMode
                  ? "bg-gray-700 border border-gray-600 text-gray-200"
                  : "bg-blue-50 border border-blue-100 text-black"
              }`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3
                className={`text-xl font-semibold mb-1 transition ${
                  darkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`transition ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section
        className={`py-16 flex-grow px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-6 text-center transition ${
              darkMode ? "text-gray-100" : "text-blue-800"
            }`}
          >
            Send Us a Message
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for reaching out! We’ll be in touch soon.");
            }}
            className="grid grid-cols-1 gap-6"
          >
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full px-5 py-3 rounded-full focus:outline-none focus:ring-4 transition ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-gray-500"
                  : "bg-white border border-blue-300 placeholder-gray-500 text-black focus:ring-blue-200"
              }`}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className={`w-full px-5 py-3 rounded-full focus:outline-none focus:ring-4 transition ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-gray-500"
                  : "bg-white border border-blue-300 placeholder-gray-500 text-black focus:ring-blue-200"
              }`}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className={`w-full px-5 py-3 rounded-full focus:outline-none focus:ring-4 transition ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-gray-500"
                  : "bg-white border border-blue-300 placeholder-gray-500 text-black focus:ring-blue-200"
              }`}
              required
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className={`w-full px-5 py-3 rounded-2xl resize-none focus:outline-none focus:ring-4 transition ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-gray-500"
                  : "bg-white border border-blue-300 placeholder-gray-500 text-black focus:ring-blue-200"
              }`}
              required
            />
            <div className="text-center">
              <button
                type="submit"
                className={`px-8 py-3 rounded-full font-semibold transition ${
                  darkMode
                    ? "bg-blue-300 text-gray-900 hover:bg-blue-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Optional Map Embed */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h3
            className={`text-2xl font-bold mb-4 text-center transition ${
              darkMode ? "text-gray-100" : "text-blue-800"
            }`}
          >
            Our Location
          </h3>
          <div
            className={`w-full h-64 rounded-lg overflow-hidden shadow transition ${
              darkMode ? "border border-gray-700" : "border border-gray-200"
            }`}
          >
            {/* Replace src with your actual map embed URL */}
            <iframe
              title="Office Location"
              src="https://maps.google.com/maps?q=Tech%20Avenue%2C%20Web%20City%2C%202025&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
