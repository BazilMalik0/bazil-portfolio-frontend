import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProjectWork.module.css";
import { projectsData } from "../data.js";
import { FaGithub } from "react-icons/fa";

const ProjectWork = () => {
  // ✅ UPDATED: State to track the array and the index
  const [preview, setPreview] = useState({
    images: [],
    index: 0,
    isOpen: false,
  });
  // ✅ NAVIGATION FUNCTIONS
  const showNext = (e) => {
    e.stopPropagation();
    setPreview((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setPreview((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));
  };
  return (
    <section className={styles.ProjectWorkSection}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>ProjectWork</h1>
        <p className={styles.sideSubtitle}>A Curated Gallery of My Work</p>
      </div>

      <div className={styles.projectsContainer}>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            // ✅ UPDATED: Pass the whole images array and current index
            onImageClick={(imgs, idx) =>
              setPreview({ images: imgs, index: idx, isOpen: true })
            }
          />
        ))}
      </div>
      {/* ✅ UPDATED: Large Image Preview Modal with Arrows */}
      <AnimatePresence>
        {preview.isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview({ ...preview, isOpen: false })}
          >
            {/* Left Arrow */}
            <button
              className={`${styles.navBtn} ${styles.left}`}
              onClick={showPrev}
            >
              &#10094;
            </button>

            <motion.img
              key={preview.index} // Key change triggers animation per image
              src={preview.images[preview.index]}
              className={styles.largeImage}
              initial={{ scale: 0.8, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.8, opacity: 0, x: -50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Right Arrow */}
            <button
              className={`${styles.navBtn} ${styles.right}`}
              onClick={showNext}
            >
              &#10095;
            </button>

            <button
              className={styles.closeBtn}
              onClick={() => setPreview({ ...preview, isOpen: false })}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Internal component to handle the specific animations
const ProjectCard = ({ project, index, onImageClick }) => {
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
            cursor: "zoom-in",
          }}
          // ✅ UPDATED: Call with array and index
          onClick={() => onImageClick(project.images, currentImageIndex)}
        >
          <div className={styles.gridStack}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={project.title}
                /* ✅ Smooth Infinite Book Turn */
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={styles.responsiveImg}
              />
            </AnimatePresence>
          </div>
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
