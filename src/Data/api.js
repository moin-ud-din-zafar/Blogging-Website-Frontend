// src/Data/api.js
import axios from "axios";

// Safely get API URL from environment, with fallback to localhost
const baseURL =
  (typeof process !== "undefined" && process.env.REACT_APP_API_URL) ||
  "http://localhost:8000/api";

const API = axios.create({
  baseURL,
});

// Attach token automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const signup = async (fullName, email, password) => {
  const res = await API.post("/auth/signup", { fullName, email, password });
  return res.data; // { user: {...}, token: "..." }
};

export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data; // { user: {...}, token: "..." }
};

// ─── Posts ────────────────────────────────────────────────────────────────────

export const createPost = async (postData) => {
  const res = await API.post("/posts", postData);
  return res.data; // newly created post
};

export const fetchPosts = async () => {
  const res = await API.get("/posts");
  return res.data; // array of posts
};
