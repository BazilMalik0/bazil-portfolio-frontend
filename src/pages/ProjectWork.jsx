import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProjectWork.module.css";
import { projectsData } from "../data.js";
import { FaGithub } from "react-icons/fa";

const ProjectWork = () => {
  return (
    <section className={styles.ProjectWorkSection}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>ProjectWork</h1>
        <p className={styles.sideSubtitle}>A Curated Gallery of My Work</p>
      </div>

      <div className={styles.projectsContainer}>
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

// Internal component to handle the specific animations
const ProjectCard = ({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 3000); // 3 seconds interval
    return () => clearInterval(timer);
  }, [project.images.length]);

  return (
    <motion.div
      // Ensure NO dynamic key is here so the card stays stable
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`${styles.projectCard} ${
        index % 2 !== 0 ? styles.reverse : ""
      }`}
    >
      {/* Image Section */}
      <div className={styles.imageWrapper}>
        {/* Added overflow hidden and relative positioning to prevent "line" jumps */}
        <div
          className={styles.imageCard}
          style={{
            perspective: "1200px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Changed mode to "popLayout" for a seamless transition */}
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={project.images[currentImageIndex]}
              alt={project.title}
              // 2. Turn Right: Smooth rotation without the "refresh" shock
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ width: "100%", borderRadius: "8px", display: "block" }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Content Section - Remains static and smooth */}
      <div className={styles.contentWrapper}>
        <h2 className={styles.projectTitle}>{project.title}</h2>
        <p className={styles.projectDesc}>{project.description}</p>

        <div className={styles.techStack}>
          {project.tech.map((tag, i) => (
            <span key={i} className={styles.techTag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.btnGroup}>
          <a href={project.sourceLink} className={styles.sourceBtn}>
            <FaGithub /> Source
          </a>
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectWork;
