import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BlogCard from "../Components/BlogCard";
import { DarkModeContext } from "../contexts/DarkModeContext";

const Technology = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [techPosts, setTechPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTechPosts = async () => {
      try {
        const res = await fetch("https://blogging-website-backened-8ds8.vercel.app/api/posts");
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        const data = await res.json();
        const filtered = data.filter((post) => post.category === "Technology");
        setTechPosts(filtered);
      } catch (err) {
        console.error("Error fetching Technology posts:", err);
        setError("Failed to load Technology articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechPosts();
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen select-none ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />

      {/* Hero Section */}
      <section
        className={`relative overflow-hidden py-20 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-600 text-gray-100"
            : "bg-gradient-to-br from-blue-700 to-blue-500 text-white"
        }`}
      >
        <div
          className={`absolute inset-0 opacity-30 ${
            darkMode
              ? "bg-gradient-to-tr from-gray-600 to-transparent"
              : "bg-gradient-to-tr from-white to-transparent"
          }`}
        ></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Technology
          </h1>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            All articles in our Technology category.
          </p>
        </div>
        <div className="absolute bottom-0 w-full overflow-hidden leading-none">
          <svg
            className={`relative block w-[calc(100%+1px)] h-10 transition-colors ${
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

      {/* Posts Grid */}
      <section className={`${darkMode ? "bg-gray-800" : "bg-white"} py-20`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-8 text-center transition-colors ${
              darkMode ? "text-gray-100" : "text-blue-800"
            }`}
          >
            Technology Articles
          </h2>

          {loading ? (
            <p className="text-center text-base">Loading articles...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : techPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {techPosts.map((post) => (
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
          ) : (
            <p
              className={`col-span-full text-center transition-colors ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No Technology articles found.
            </p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section
        className={`py-16 ${
          darkMode
            ? "bg-gradient-to-tr from-gray-700 to-gray-500 text-gray-100"
            : "bg-gradient-to-tr from-blue-500 to-blue-300 text-white"
        }`}
      >
        <div
          className={`max-w-2xl mx-auto px-6 rounded-xl py-12 text-center shadow-lg transition-colors ${
            darkMode
              ? "bg-gray-800 bg-opacity-80 backdrop-blur-sm"
              : "bg-white bg-opacity-10 backdrop-blur-sm"
          }`}
        >
          <h3
            className={`text-2xl sm:text-3xl font-semibold mb-4 transition-colors ${
              darkMode ? "text-gray-100" : "text-blue-900"
            }`}
          >
            Stay Updated
          </h3>
          <p
            className={`mb-10 opacity-90 text-lg transition-colors ${
              darkMode ? "text-gray-200" : "text-blue-900"
            }`}
          >
            Subscribe to receive exclusive content and tutorials directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Email address"
              className={`w-full sm:w-auto flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 transition-colors ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-gray-500"
                  : "bg-white border-transparent placeholder-gray-500 text-black focus:ring-white"
              }`}
            />
            <button
              type="submit"
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
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

export default Technology;
