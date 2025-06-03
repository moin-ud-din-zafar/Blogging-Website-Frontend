// src/Pages/About.jsx
import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { DarkModeContext } from "../contexts/DarkModeContext";

const About = () => {
  const { darkMode } = useContext(DarkModeContext);

  const timelineItems = [
    { year: "2025", event: "Founded MyBlog2025" },
    { year: "2026", event: "Reached 1K Subscribers" },
    { year: "2027", event: "Launched Video Tutorials" },
    { year: "2028", event: "Hosted First Virtual Summit" },
  ];

  const metrics = [
    { label: "Posts Published", value: "150+" },
    { label: "Active Subscribers", value: "12K+" },
    { label: "Expert Contributors", value: "20+" },
  ];

  const testimonials = [
    {
      quote:
        "MyBlog2025’s in-depth tutorials have revolutionized how I build UI components!",
      author: "Emily R.",
    },
    {
      quote:
        "The accessibility tips here are top-notch—my apps have never been more inclusive.",
      author: "Carlos M.",
    },
  ];

  const teamImages = [
    "https://i.pravatar.cc/200?img=5",
    "https://i.pravatar.cc/200?img=6",
    "https://i.pravatar.cc/200?img=7",
    "https://i.pravatar.cc/200?img=8",
  ];

  return (
    <div
      className={`flex flex-col min-h-screen select-none ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />

      {/* Hero Section */}
      <section
        className={`py-16 sm:py-24 text-center px-4 sm:px-6 md:px-6 lg:px-6 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-600 text-gray-100"
            : "bg-gradient-to-br from-blue-600 to-blue-400 text-white"
        }`}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          About MyBlog2025
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mx-auto opacity-90">
          MyBlog2025 is a platform dedicated to sharing cutting-edge tutorials,
          design insights, and tech trends. Founded in 2025, our mission is to
          empower developers and designers worldwide to build modern web
          experiences.
        </p>
      </section>

      {/* Company Timeline */}
      <section className={`py-10 sm:py-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-6">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center ${
              darkMode ? "text-gray-100" : "text-blue-800"
            }`}
          >
            Our Journey
          </h2>
          <div
            className={`relative before:absolute before:top-1/2 before:left-0 before:right-0 before:h-1 rounded-sm ${
              darkMode ? "before:bg-gray-700" : "before:bg-blue-200"
            }`}
          >
            {timelineItems.map((item, idx) => (
              <div
                key={item.year}
                className={`relative mb-10 flex flex-col items-center sm:flex-row ${
                  idx % 2 === 0
                    ? "sm:justify-start"
                    : "sm:justify-end"
                }`}
              >
                <div
                  className={`p-4 rounded-lg shadow-lg w-full sm:w-64 transition ${
                    darkMode
                      ? "bg-gray-700 border border-gray-600 text-gray-200"
                      : "bg-white border border-gray-200 text-black"
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-1 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {item.year}
                  </h3>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {item.event}
                  </p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full mt-4 sm:mt-0 mx-4 transition ${
                    darkMode ? "bg-gray-500" : "bg-blue-600"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Metrics */}
      <section
        className={`py-10 sm:py-16 ${
          darkMode ? "bg-gray-700" : "bg-blue-50"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div
                className={`text-3xl sm:text-4xl md:text-4xl font-extrabold mb-1 transition ${
                  darkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                {metric.value}
              </div>
              <div
                className={`text-base sm:text-lg mt-1 transition ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-10 sm:py-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 ${
              darkMode ? "text-gray-100" : "text-blue-800"
            }`}
          >
            What Our Readers Say
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-6 rounded-lg shadow transition ${
                  darkMode ? "bg-gray-700" : "bg-blue-50"
                }`}
              >
                <p className={`italic mb-3 sm:mb-4 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                  “{test.quote}”
                </p>
                <p
                  className={`font-semibold ${
                    darkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  — {test.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Photo Collage */}
      <section className={`py-12 sm:py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 transition ${
              darkMode ? "text-blue-400" : "text-blue-800"
            }`}
          >
            Meet the Core Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-center items-center">
            {teamImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Core Team Member ${idx + 1}`}
                className="rounded-lg shadow-lg w-full aspect-square object-cover hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section
        className={`py-10 sm:py-16 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 transition ${
              darkMode ? "text-blue-400" : "text-blue-800"
            }`}
          >
            Our Mission & Values
          </h2>
          <ul className={`space-y-2 sm:space-y-4 text-base sm:text-lg transition ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li>🔍 Deliver high-quality, modern web development content.</li>
            <li>🌐 Promote inclusivity and accessibility for all.</li>
            <li>💡 Inspire innovation through insightful tutorials.</li>
            <li>🤝 Foster a strong, collaborative community.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
