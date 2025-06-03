// src/pages/BlogPage.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BlogPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the single post by ID from your server.
    // Adjust the URL if needed (e.g. include auth headers, etc.).
    setLoading(true);
    fetch(`http://localhost:8000/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Assuming your API returns an object like:
        // { _id, title, author, createdAt, category, coverImageUrl, content }
        setPost({
          id: data._id,
          title: data.title,
          author: data.author,
          date: new Date(data.createdAt).toLocaleDateString(),
          category: data.category,
          coverImage: data.coverImageUrl || null,
          content: data.content, // assume this is already sanitized HTML
        });
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("Failed to load post.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div
        className={`
          min-h-screen flex items-center justify-center
          ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}
        `}
      >
        <p className="text-lg font-medium">Loading post…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`
          min-h-screen flex flex-col items-center justify-center px-4
          ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}
        `}
      >
        <p className="text-lg text-red-500 mb-4">{error}</p>
        <Link
          to="/blog"
          className={`
            text-sm font-semibold transition
            ${darkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-800"}
          `}
        >
          ← Back to Blog List
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className={`
          min-h-screen flex flex-col items-center justify-center px-4
          ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}
        `}
      >
        <p className="text-lg text-red-500 mb-4">Post not found.</p>
        <Link
          to="/blog"
          className={`
            text-sm font-semibold transition
            ${darkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-800"}
          `}
        >
          ← Back to Blog List
        </Link>
      </div>
    );
  }

  // Preprocess post.content so that <h1>, <h2>, <h3> get Tailwind classes
  const styledContent = post.content
    // Add classes to any <h1 ...> occurrences
    .replace(/<h1([^>]*)>/g, '<h1$1 class="text-5xl font-bold my-4">')
    // Add classes to any <h2 ...> occurrences
    .replace(/<h2([^>]*)>/g, '<h2$1 class="text-4xl font-bold my-4">')
    // Add classes to any <h3 ...> occurrences
    .replace(/<h3([^>]*)>/g, '<h3$1 class="text-3xl font-semibold my-4">');

  return (
    <div
      className={`
        ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}
        flex flex-col min-h-screen
      `}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Section (Gradient + Title, Category & Meta) */}
      <section
        className={`relative overflow-hidden py-24 sm:py-28 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white"
            : "bg-gradient-to-br from-blue-700 to-blue-500 text-white"
        }`}
      >
        {/* Overlay for subtle shading */}
        <div
          className={`absolute inset-0 opacity-40 ${
            darkMode
              ? "bg-gradient-to-tr from-gray-600 to-transparent"
              : "bg-gradient-to-tr from-white to-transparent"
          }`}
        ></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6">
          {/* Category Badge */}
          {post.category && (
            <span
              className={`
                inline-block px-3 py-1 mb-4 rounded-full text-xs font-semibold uppercase
                ${darkMode ? "bg-blue-600 text-gray-100" : "bg-blue-100 text-blue-800"}
              `}
            >
              {post.category}
            </span>
          )}

          {/* Post Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            {post.title}
          </h1>

          {/* Author/Date */}
          <div className="flex justify-center items-center text-sm sm:text-base opacity-90">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <time>{post.date}</time>
          </div>
        </div>

        {/* SVG Wave Divider at Bottom */}
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

      {/* Main Article Content */}
      <main className="flex-grow max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* Cover Image (if provided) */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={`Cover for ${post.title}`}
            className="w-full rounded-xl object-cover shadow-lg mb-6"
          />
        )}

        {/* Article Body */}
        <article className="prose prose-indigo max-w-none dark:prose-light">
          <div dangerouslySetInnerHTML={{ __html: styledContent }} />
        </article>

        {/* Back to Blog List */}
        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className={`
              inline-block text-sm font-semibold transition
              ${darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-800"}
            `}
          >
            ← Back to Blog List
          </Link>
        </div>
      </main>

      {/* Optional Subscribe CTA */}
      <section
        className={`py-14 sm:py-16 text-white ${
          darkMode
            ? "bg-gray-700"
            : "bg-gradient-to-tr from-blue-500 to-blue-300"
        }`}
      >
        <div
          className={`
            max-w-2xl mx-auto px-4 sm:px-6 rounded-xl py-10 sm:py-12 text-center shadow-lg
            ${darkMode
              ? "bg-gray-800 bg-opacity-80 backdrop-blur-sm"
              : "bg-white bg-opacity-10 backdrop-blur-sm"}
          `}
        >
          <h3
            className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-4 ${
              darkMode ? "text-gray-100" : "text-blue-900"
            }`}
          >
            Enjoyed this article?
          </h3>
          <p
            className={`mb-8 sm:mb-10 opacity-90 text-base sm:text-lg ${
              darkMode ? "text-gray-200" : "text-blue-900"
            }`}
          >
            Subscribe to our newsletter for more tips and tutorials.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Email address"
              className={`
                w-full sm:w-auto flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2
                ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-gray-500"
                    : "bg-white border border-transparent placeholder-gray-500 text-black focus:ring-white"
                }
              `}
            />
            <button
              type="submit"
              className={`
                px-6 py-3 rounded-full font-medium transition
                ${
                  darkMode
                    ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    : "bg-white text-blue-600 hover:bg-white/90"
                }
              `}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogPage;
