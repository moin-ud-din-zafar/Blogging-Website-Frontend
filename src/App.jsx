import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Wrap in DarkModeProvider so “darkMode” is accessible
import { DarkModeProvider } from "./contexts/DarkModeContext";

import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Technology from "./Pages/Technology";
import Fashion from "./Pages/Fashion";
import CurrentAffairs from "./Pages/CurrentAffairs";
import Health from "./Pages/Health";

import AuthForm from "./Components/AuthForm";
// import PostBlog from "./Components/PostBlog";
// Remove the direct PostBlog import—use NewPost instead
// import PostBlog from "./Components/PostBlog";
import NewPost from "./Pages/NewPost";
import BlogPage from "./Pages/BlogPage";

// const BlogDetail = ({ id }) => (
//   <div className="min-h-screen flex items-center justify-center">
//     <h2 className="text-2xl font-semibold">Blog Detail for ID: {id}</h2>
//   </div>
// );
import ProfilePage from "./Pages/ProfilePage";
import EditPost from "./Pages/EditPost";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories-technology" element={<Technology />} />
          <Route path="/categories-fashion" element={<Fashion />} />
          <Route
            path="/categories-current-affairs"
            element={<CurrentAffairs />}
          />
          <Route path="/categories-health" element={<Health />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/blog/:id" element={<BlogDetail />} /> */}
          <Route path="/auth" element={<AuthForm />} />
          {/* <Route path="/new-post" element={<PostBlog />} /> */}

           {/* Point “/new-post” at NewPost (which wraps PostBlog + onSubmit logic) */}
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/blog/:id" element={<BlogPage />} />

               <Route path="/profile" element={<ProfilePage />} />
               <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
