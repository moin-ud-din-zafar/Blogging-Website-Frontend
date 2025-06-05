import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../contexts/DarkModeContext";

const ProfilePage = () => {
  const [profile, setProfile] = useState({ user: null, posts: [] });
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Ensure axios points to your backend
  axios.defaults.baseURL = "https://blogging-website-backened-8ds8.vercel.app";

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("GET /api/profile/me →", res.data);
        setProfile({ user: res.data.user, posts: res.data.posts });
      } catch (err) {
        console.error("Error fetching profile:", err);
        navigate("/auth");
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile((prev) => ({
        user: prev.user,
        posts: prev.posts.filter((p) => p._id !== postId),
      }));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete the post. Please try again.");
    }
  };

  const { user, posts } = profile;

  return (
    <div
      className={`min-h-screen py-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Your Profile</h2>
          {user ? (
            <p className="text-lg text-gray-500">
              Logged in as{" "}
              <span className="font-medium text-gray-700">
                {user.fullName || user.email}
              </span>
            </p>
          ) : (
            <p className="text-lg text-gray-500">Loading your info…</p>
          )}
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          {Array.isArray(posts) ? (
            posts.length === 0 ? (
              <p>You haven’t posted any articles yet.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className={`p-4 rounded-lg shadow ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        to={`/blog/${post._id}`}
                        className={`text-sm underline hover:text-accent ${
                          darkMode
                            ? "text-gray-300 hover:text-gray-100"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-post/${post._id}`}
                        className={`text-sm underline hover:text-accent ${
                          darkMode
                            ? "text-gray-300 hover:text-gray-100"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <p>Loading posts…</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
