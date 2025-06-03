// src/pages/PostBlog.js
import React, { useState } from "react";
import ReactQuill from "react-quill-new";                     // Use the React 19–compatible fork
import "react-quill-new/dist/quill.snow.css";                 // Quill’s Snow theme CSS

const PostBlog = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Quill toolbar options: headings (H1/H2/H3), bold, italic, lists, links, clean
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],      // H1, H2, H3, Normal (i.e. <p>)
      ["bold", "italic", "underline"],     // Bold, Italic, Underline
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate: title/content/category must not be empty
    if (!title.trim() || !content.trim() || !category.trim()) {
      setErrorMessage("All fields (title, content, category) are required.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const blogData = {
        title: title.trim(),
        content: content.trim(),   // ReactQuill returns an HTML string
        category: category.trim(),
        createdAt: new Date().toISOString(),
      };

      if (onSubmit) {
        // If parent passed an onSubmit handler, call it
        await onSubmit(blogData);
      } else {
        // Otherwise just log to console
        console.log("Blog submitted:", blogData);
      }

      // Clear the form and show success
      setTitle("");
      setContent("");
      setCategory("");
      setSuccessMessage("Blog post created successfully!");
    } catch (error) {
      console.error("Error posting blog:", error);
      setErrorMessage("Failed to post blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Post a New Blog</h2>

      {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}
      {successMessage && <p className="mb-4 text-green-600">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Rich‐Text Editor for Content */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <ReactQuill
            id="content"
            theme="snow"
            value={content}
            onChange={setContent}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your blog content here..."
            className="bg-white rounded"
            style={{ height: "300px", marginBottom: "40px" }}
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Current Affairs">Current Affairs</option>
            <option value="Health">Health</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : "Post Blog"}
        </button>
      </form>
    </div>
  );
};

export default PostBlog;
