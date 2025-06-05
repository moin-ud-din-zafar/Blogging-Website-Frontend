import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BlogCard from "../Components/BlogCard";
import { DarkModeContext } from "../contexts/DarkModeContext";

const HomePage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://blogging-website-backened-8ds8.vercel.app/api/posts");
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // First three posts (already sorted by createdAt desc on server)
  const featuredPosts = posts.slice(0, 3);

  // Shuffle the remaining posts so they don’t overlap with featured
  const allPosts =
    posts.length > 3
      ? posts
          .slice(3)
          .sort(() => Math.random() - 0.5) // simple Fisher–Yates shuffle
      : [];

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (token) {
      navigate("/new-post");
    } else {
      alert("Please sign in");
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen select-none ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />

      {/* Hero Section */}
      <section
        className={`relative overflow-hidden py-24 sm:py-28 text-white ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700"
            : "bg-gradient-to-br from-blue-700 to-blue-500"
        }`}
      >
        <div
          className={`absolute inset-0 opacity-40 ${
            darkMode
              ? "bg-gradient-to-tr from-gray-600 to-transparent"
              : "bg-gradient-to-tr from-white to-transparent"
          }`}
        ></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to MyBlog2025
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 opacity-90">
            Your source for expert web development, design, and tech trend insights in 2025.
          </p>
          <a
            href="#"
            onClick={handleGetStarted}
            className={`inline-block px-6 sm:px-8 py-3 rounded-full font-medium shadow-md transition ${
              darkMode
                ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                : "bg-white text-blue-600 hover:shadow-lg"
            }`}
          >
            Get Started
          </a>
        </div>
        <div className="absolute bottom-0 w-full overflow-hidden leading-none">
          <svg
            className={`relative block w-[calc(100%+1px)] h-10 ${
              darkMode ? "text-gray-900" : "text-gray-100"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M0,0V46.29c47.81,22,103.64,29.17,158,19.79s108.75-38.3,163-30.13c59,9,112,61,171,73.12s123-17,183-41.73c59-23.86,117-52.86,176-45.32,69,8.31,130,65.35,199,73.14s139-30.36,198-49.66V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Featured Posts */}
      <section className={`py-16 sm:py-20 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center ${
              darkMode ? "text-gray-100" : "text-blue-800"
            }`}
          >
            Featured Posts
          </h2>

          {loading ? (
            <p className="text-center text-base">Loading posts...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : featuredPosts.length === 0 ? (
            <p className="text-center text-base">No featured posts available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <div key={post._id} className="group">
                  <BlogCard
                    post={{
                      id: post._id,
                      title: post.title,
                      excerpt:
                        post.content.substring(0, 100) +
                        (post.content.length > 100 ? "…" : ""),
                      author: post.author,
                      category: post.category,
                      date: new Date(post.createdAt).toLocaleDateString(),
                      coverImage: post.coverImageUrl || "",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Articles */}
      <section className={`py-16 sm:py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center ${
              darkMode ? "text-gray-100" : "text-blue-800"
            }`}
          >
            All Articles
          </h2>

          {loading ? (
            <p className="text-center text-base">Loading posts...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : allPosts.length === 0 ? (
            <p className="text-center text-base">No other posts available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPosts.map((post) => (
                <div key={post._id} className="group">
                  <BlogCard
                    post={{
                      id: post._id,
                      title: post.title,
                      excerpt:
                        post.content.substring(0, 100) +
                        (post.content.length > 100 ? "…" : ""),
                      author: post.author,
                      category: post.category,
                      date: new Date(post.createdAt).toLocaleDateString(),
                      coverImage: post.coverImageUrl || "",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section
        className={`py-14 sm:py-16 text-white ${
          darkMode
            ? "bg-gray-700"
            : "bg-gradient-to-tr from-blue-500 to-blue-300"
        }`}
      >
        <div
          className={`max-w-2xl mx-auto px-4 sm:px-6 rounded-xl py-10 sm:py-12 text-center shadow-lg ${
            darkMode
              ? "bg-gray-800 bg-opacity-80 backdrop-blur-sm"
              : "bg-white bg-opacity-10 backdrop-blur-sm"
          }`}
        >
          <h3
            className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-4 ${
              darkMode ? "text-gray-100" : "text-blue-900"
            }`}
          >
            Stay Updated
          </h3>
          <p
            className={`mb-8 sm:mb-10 opacity-90 text-base sm:text-lg ${
              darkMode ? "text-gray-200" : "text-blue-900"
            }`}
          >
            Subscribe to receive exclusive content and tutorials directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Email address"
              className={`w-full sm:w-auto flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-gray-500"
                  : "bg-white border border-transparent placeholder-gray-500 text-black focus:ring-white"
              }`}
            />
            <button
              type="submit"
              className={`px-6 py-3 rounded-full font-medium transition ${
                darkMode
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  : "bg-white text-blue-600 hover:bg-white/90"
              }`}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
