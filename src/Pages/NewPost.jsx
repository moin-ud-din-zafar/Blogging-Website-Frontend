import React from "react";
import { useNavigate } from "react-router-dom";
import PostBlog from "../Components/PostBlog";

const NewPost = () => {
  const navigate = useNavigate();

  const handlePostSubmit = async (blogData) => {
    try {
      const fullName = localStorage.getItem("fullName") || "Unknown Author";
      const author = fullName.split(" ")[0] || fullName;

      const payload = {
        title: blogData.title,
        author,
        content: blogData.content,
        category: blogData.category,
        coverImageUrl: "",
      };

      // Use the full backend URL so React dev server doesn’t intercept
      const res = await fetch("https://blogging-website-backened-8ds8.vercel.app/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server responded ${res.status}: ${text}`);
      }

      navigate("/");
    } catch (err) {
      console.error("Error posting blog:", err);
      throw err;
    }
  };

  return <PostBlog onSubmit={handlePostSubmit} />;
};

export default NewPost;
