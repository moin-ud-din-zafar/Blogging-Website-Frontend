// src/Components/AuthForm.jsx
import React, { useState, useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { signup, login } from "../Data/api";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      if (isSignup) {
        // Sign-Up API call (returns { token, user })
        await signup(
          formData.fullName,
          formData.email,
          formData.password
        );
        
        // Clear passwords & switch to Login form
        setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
        setIsSignup(false);
        alert("Account created successfully! Please log in.");
      } else {
        const { token, user } = await login(
          formData.email,
          formData.password
        );
        localStorage.setItem("token", token);
        localStorage.setItem("fullName", user.fullName);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${
      darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
    }`}>
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg transition-colors ${
        darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
      }`}>
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create an Account" : "Log In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className={`w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 transition-colors ${
                  darkMode
                    ? "bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-gray-500"
                    : "bg-gray-50 border border-gray-300 placeholder-gray-500 text-black focus:ring-blue-200"
                }`} />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className={`w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 transition-colors ${
                darkMode
                  ? "bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-gray-500"
                  : "bg-gray-50 border border-gray-300 placeholder-gray-500 text-black focus:ring-blue-200"
              }`} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className={`w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 transition-colors ${
                darkMode
                  ? "bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-gray-500"
                  : "bg-gray-50 border border-gray-300 placeholder-gray-500 text-black focus:ring-blue-200"
              }`} />
          </div>

          {isSignup && (
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className={`w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 transition-colors ${
                  darkMode
                    ? "bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-gray-500"
                    : "bg-gray-50 border border-gray-300 placeholder-gray-500 text-black focus:ring-blue-200"
                }`} />
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-full font-semibold transition-colors ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}>
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don’t have an account yet?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className={`font-medium underline transition-colors ${
              darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-500"
            }`}>
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
