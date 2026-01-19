import React from "react";
import styles from "./Resume.module.css";
import { resumeData } from "../data.js";
import {
  FaGraduationCap,
  FaBriefcase,
  FaDownload,
  FaCode,
} from "react-icons/fa";

const Resume = () => {
  const { resume } = resumeData;

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

        <a
          href={resumeData.downloadLink}
          download="My_Professional_CV.pdf"
          className={styles.downloadBtn}
        >
          <FaDownload /> Download CV
        </a>
      </div>

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
