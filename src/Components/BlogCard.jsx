import React, { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { Link } from "react-router-dom";

// Helper to strip any HTML tags from excerpt
const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
};

// Helper to truncate the title to a fixed number of characters
const truncateTitle = (title, maxLength) => {
  if (!title) return "";
  return title.length > maxLength
    ? title.slice(0, maxLength) + "..."
    : title;
};

const BlogCard = ({ post }) => {
  const { darkMode: isDarkMode } = useContext(DarkModeContext);

  // 1. Truncate the title if it’s too long
  const MAX_TITLE_LENGTH = 50;
  const displayTitle = truncateTitle(post.title, MAX_TITLE_LENGTH);

  // 2. Determine author display name
  const authorName = post.author?.username || post.author || "Unknown";

  // 3. Precompute any CSS classes based on darkMode
  // Container is now responsive:
  // - w-full on mobile
  // - sm:max-w-sm (≈ 24rem) on small screens
  // - md:max-w-md (≈ 28rem) on medium screens
  const containerBase = `
    relative
    group
    flex flex-col justify-between
    w-full sm:max-w-sm md:max-w-md
    h-48 sm:h-56 md:h-64
    rounded-2xl
    overflow-hidden
    transition-transform duration-300
    hover:scale-105
    ${isDarkMode
      ? "bg-gray-900 text-gray-200 shadow-lg hover:shadow-2xl"
      : "bg-white text-black shadow-md hover:shadow-xl"}
  `;

  const leftEdgeBar = `
    absolute left-0 top-0
    h-full w-1
    bg-blue-500
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300
  `;

  const ribbon = `
    absolute top-0 right-0
    h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16
    ${isDarkMode ? "bg-blue-600" : "bg-blue-500"}
    transform rotate-45 translate-x-1/2 -translate-y-1/2
    origin-center
    shadow-md
  `;

  const badge = `
    absolute top-3 left-3 sm:top-4 sm:left-4
    text-xs sm:text-sm font-semibold uppercase tracking-wide
    px-2 sm:px-3 py-1 rounded-full
    ${isDarkMode ? "bg-blue-600 text-gray-100" : "bg-blue-100 text-blue-800"}
    z-10
  `;

  // Title: responsive text sizes
  const title = `
    text-center
    text-base sm:text-lg md:text-xl lg:text-2xl font-bold
    mt-2 sm:mt-4 mb-1
    transition-colors duration-200
    group-hover:text-blue-500
  `;

  // Excerpt: responsive padding and text size
  const excerpt = `
    ${isDarkMode ? "text-gray-300" : "text-gray-600"}
    text-xs sm:text-sm
    line-clamp-3
    mt-2 mb-4
    px-3 sm:px-4
  `;

  const footer = `
    flex items-center justify-between
    px-3 sm:px-4 pb-3 sm:pb-4
  `;

  const authorDate = `
    text-[9px] sm:text-[10px] uppercase tracking-wider
    ${isDarkMode ? "text-gray-400" : "text-gray-500"}
  `;

  const readMore = `
    inline-flex items-center
    text-[8px] sm:text-[8px] font-semibold uppercase
    ${isDarkMode
      ? "bg-blue-600 text-white hover:bg-blue-500"
      : "bg-blue-500 text-white hover:bg-blue-600"}
    px-2 py-1 sm:px-3 sm:py-2 rounded-full
    transition-colors duration-200
  `;

  // 4. Strip any potential HTML from the excerpt
  const safeExcerpt = stripHtmlTags(post.excerpt);

  return (
    <div className={containerBase}>
      {/* Left-Edge Highlight Bar */}
      <div className={leftEdgeBar}></div>

      {/* Corner Ribbon */}
      <div className={ribbon}></div>

      {/* Category Badge */}
      <span className={badge}>{post.category}</span>

      {/* Main Content */}
      <div className="relative z-10 mt-2 sm:mt-4 flex flex-col justify-between h-full">
        {/* Title & Excerpt */}
        <div className="flex flex-col items-center mt-8 sm:mt-10 px-2">
          <h3 className={title}>{displayTitle}</h3>
          <p className={excerpt}>{safeExcerpt}</p>
        </div>

        {/* Footer: Author/Date & Read More */}
        <div className={footer}>
          <div className={authorDate}>
            <span>By {authorName}</span>
            <span className="mx-1 sm:mx-2">•</span>
            <time>{post.date}</time>
          </div>
          <Link to={`/blog/${post.id}`} className={readMore}>
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
