import React, { useEffect, useRef, useState } from "react";
import styles from "./Resume.module.css";
import { resumeData } from "../data.js";
import {
  FaGraduationCap,
  FaBriefcase,
  FaFileAlt, // Changed icon for "View"
  FaDownload,
  FaPrint,
  FaTimes,
} from "react-icons/fa";

const Resume = () => {
  const { resume } = resumeData;
  const [isViewing, setIsViewing] = useState(false);
  const modalRef = useRef(null); // 2. Reference for the modal

  // --- ESC KEY LOGIC ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsViewing(false);
      }
    };

    if (isViewing) {
      // Use capture phase (true) to ensure the event is caught
      window.addEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = "hidden";

      // Force focus to the modal so it captures keyboard events
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = "unset";
    };
  }, [isViewing]);

  // Print Function
  const handlePrint = () => {
    const pdfUrl = resumeData.downloadLink;
    const printWindow = window.open(pdfUrl, "_blank");
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>
          {"My Resume".slice(0, 3)}
          <span>{"My Resume".slice(3)}</span>
        </h2>

        {/* --- ADDED SUBTITLE HERE --- */}
        <p className={styles.headerSubtitle}>
          <b>18 Months</b> of internship experience specializing in ReactJS
          solutions.
        </p>

        {/* Updated Button to "View Resume" */}
        <button
          onClick={() => setIsViewing(true)}
          className={styles.downloadBtn}
        >
          <FaFileAlt /> View Resume
        </button>
      </div>

      {/* --- PROFESSIONAL PDF MODAL --- */}
      {isViewing && (
        <div className={styles.pdfOverlay}>
          <div
            className={styles.pdfModal}
            ref={modalRef} // 3. Attach Ref
            tabIndex="-1" // 4. Make focusable
            style={{ outline: "none" }}
          >
            <div className={styles.modalHeader}>
              <h3>Professional CV</h3>
              <button
                onClick={() => setIsViewing(false)}
                className={styles.closeBtn}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.pdfBody}>
              <iframe
                src={`${resumeData.downloadLink}#toolbar=0`}
                title="Resume PDF"
                className={styles.pdfFrame}
              />
            </div>

            <div className={styles.modalFooter}>
              <button onClick={handlePrint} className={styles.footerBtn}>
                <FaPrint /> Print
              </button>
              <a
                href={resumeData.downloadLink}
                download="My_Professional_CV.pdf"
                className={`${styles.footerBtn} ${styles.primaryBtn}`}
              >
                <FaDownload /> Download
              </a>
            </div>
          </div>
        </div>
      )}

      <div className={styles.resumeGrid}>
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <FaBriefcase className={styles.icon} />
            <h3>Experience & Projects</h3>
          </div>
          <div className={styles.timeline}>
            {resume.experience.map((exp, index) => (
              <div key={index} className={styles.resumeItem}>
                <span className={styles.date}>{exp.duration}</span>
                <h4 className={styles.itemTitle}>{exp.role}</h4>
                <p className={styles.company}>{exp.company}</p>
                <p className={styles.description}>{exp.description}</p>
                <div className={styles.techBadge}>Stack: {exp.tech}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <FaGraduationCap className={styles.icon} />
            <h3>Education</h3>
          </div>
          <div className={styles.timeline}>
            {resume.education.map((edu, index) => (
              <div key={index} className={styles.resumeItem}>
                <span className={styles.date}>{edu.duration}</span>
                <h4 className={styles.itemTitle}>{edu.degree}</h4>
                <p className={styles.company}>{edu.institution}</p>
                <p className={styles.description}>{edu.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
