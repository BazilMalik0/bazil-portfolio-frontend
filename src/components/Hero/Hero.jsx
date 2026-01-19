import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { portfolioData } from "../../data.js";
import myphoto from "../../assets/hero/myphoto.webp";
import { IoLogoDesignernews, IoMdContacts } from "react-icons/io";
import { MdDeveloperBoard, MdDevices } from "react-icons/md";
import { FaWrench } from "react-icons/fa";
import { GrOptimize } from "react-icons/gr";
import { SiHostinger, SiReactiveresume } from "react-icons/si";
import { Link } from "react-router-dom";

const Hero = () => {
  // Increased to 40 for a long, trailing tail effect
  const rings = Array.from({ length: 40 });

  const { hero } = portfolioData;

  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const fullSubtitle = hero.subtitle;

  useEffect(() => {
    let index = 0;
    setDisplayedSubtitle(""); // Clear on mount

    const typingInterval = setInterval(() => {
      if (index < fullSubtitle.length) {
        // Appends one letter at a time: F, then R, then O...
        setDisplayedSubtitle((prev) => prev + fullSubtitle.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust this number (ms) to make typing faster or slower

    return () => clearInterval(typingInterval);
  }, [fullSubtitle]);
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>{hero.title}</h1>
          <h2 className={styles.subtitle}>{displayedSubtitle}</h2>
          <p className={styles.description}>{hero.description}</p>
          <div className={styles.btnGroup}>
            <Link to="/resume">
              <button className={styles.primaryBtn}>
                <SiReactiveresume />
                Resume
              </button>
            </Link>

            <Link to="/contact">
              <button className={styles.secondaryBtn}>
                <IoMdContacts />
                Contact Me
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.scene}>
          <div className={styles.springWrapper}>
            <div className={styles.photoContainer}>
              <img src={myphoto} alt="Profile" className={styles.profileImg} />
            </div>

            {rings.map((_, i) => (
              <div
                key={i}
                className={styles.ring}
                style={{ "--index": i + 1 }}
              ></div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className={styles.whatIDo}>
          <h3 className={styles.whatIDoTitle}>
            <span className={styles.gradientText}>{"WhatIDo".slice(0, 4)}</span>
            <span className={styles.grayText}>{"WhatIDo".slice(4)}</span>
          </h3>
          <div className={styles.cardGrid}>
            {/* Card 1 */}
            <div className={styles.card}>
              <span className={styles.icon}>
                <IoLogoDesignernews />
              </span>
              <h4>UI/UX Enhancement</h4>
              <p>
                Crafting intuitive and visually appealing interfaces focused on
                usability, accessibility, and user satisfaction.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.card}>
              <span className={styles.icon}>
                <MdDeveloperBoard />
              </span>
              <h4>Frontend Development</h4>
              <p>
                Building responsive and scalable applications using React,
                Next.js, and modern frontend technologies.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.card}>
              <span className={styles.icon}>
                <GrOptimize />
              </span>
              <h4>Performance Optimization</h4>
              <p>
                Improving website speed, loading times, and smooth interactions
                across all devices.
              </p>
            </div>

            {/* Card 4 */}
            <div className={styles.card}>
              <span className={styles.icon}>
                <MdDevices size={32} />
              </span>
              <h4>Responsive Design</h4>
              <p>
                Creating layouts that adapt perfectly to mobile, tablet, and
                desktop screens.
              </p>
            </div>

            {/* Card 5 */}
            <div className={styles.card}>
              <span className={styles.icon}>
                <SiHostinger />
              </span>
              <h4>Deployment & Hosting</h4>
              <p>
                Launching production-ready websites with SEO optimization and
                secure hosting.
              </p>
            </div>

            {/* Card 6 */}
            <div className={styles.card}>
              <span className={styles.icon}>
                <FaWrench size={32} />
              </span>
              <h4>Maintenance & Support</h4>
              <p>
                Ongoing updates, bug fixes, and feature enhancements for
                long-term stability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
