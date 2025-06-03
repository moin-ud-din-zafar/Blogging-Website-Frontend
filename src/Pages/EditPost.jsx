import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new"; // Use the React 19–compatible fork
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import { DarkModeContext } from "../contexts/DarkModeContext";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  // Quill toolbar options (same as in PostBlog)
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
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

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    // Fetch existing post data
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category.trim()) {
      setErrorMessage("All fields (title, content, category) are required.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await axios.put(
        `/api/posts/${id}`,
        { title: title.trim(), content: content.trim(), category: category.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/profile");
    } catch (err) {
      console.error("Error updating post:", err);
      setErrorMessage("Failed to update blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`max-w-xl mx-auto p-4 ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    } rounded shadow mt-8`}>
      <h2 className="text-2xl font-semibold mb-4">Edit Blog Post</h2>

      {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}

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
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200 text-sm"
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
            placeholder="Edit your blog content here..."
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
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200 text-sm"
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
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          {isSubmitting ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
