import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Resume from "../pages/Resume";
import Contact from "../pages/Contact";
import ProjectWork from "../pages/ProjectWork";
// import Projects from "../pages/Projects"; // For future use

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Hero />} />

      {/* Resume Route - Separate Page */}
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<ProjectWork />} />

      {/* Fallback route (Optional) */}
      <Route path="*" element={<Hero />} />
    </Routes>
  );
};

export default AppRoutes;
