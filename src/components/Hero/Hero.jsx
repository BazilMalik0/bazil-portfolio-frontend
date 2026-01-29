import React, { useEffect, useRef, useState } from "react";
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
  const rings = Array.from({ length: 40 });
  const { hero, whatIDo } = portfolioData;

  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [activeCard, setActiveCard] = useState(null);

  // --- ADD THIS USEEFFECT FOR ESC KEY ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveCard(null);
      }
    };

    if (activeCard) {
      // Adding 'true' as the third argument uses the "Capture" phase
      // This ensures this listener runs before others.
      window.addEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = "unset";
    };
  }, [activeCard]);

  const modalRef = useRef(null);

  // 2. Add this second useEffect to force focus
  useEffect(() => {
    if (activeCard && modalRef.current) {
      modalRef.current.focus();
    }
  }, [activeCard]);

  useEffect(() => {
    let index = 0;
    setDisplayedSubtitle("");

    const typingInterval = setInterval(() => {
      if (index < hero.subtitle.length) {
        setDisplayedSubtitle(hero.subtitle.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [hero.subtitle]);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
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

      {/* ================= WHAT I DO SECTION ================= */}
      <section>
        <div className={styles.whatIDo}>
          <h3 className={styles.whatIDoTitle}>
            <span className={styles.gradientText}>
              {"WhatI Do".slice(0, 4)}
            </span>
            <span className={styles.grayText}>
              {"\u00A0" + "WhatI Do".slice(4)}
            </span>
          </h3>

          <div className={styles.cardGrid}>
            {whatIDo.map((item, index) => (
              <div
                key={item.id}
                className={styles.card}
                onClick={() => setActiveCard(item)}
              >
                <span className={styles.icon}>
                  {index === 0 && <IoLogoDesignernews />}
                  {index === 1 && <MdDeveloperBoard />}
                  {index === 2 && <GrOptimize />}
                  {index === 3 && <MdDevices size={32} />}
                  {index === 4 && <SiHostinger />}
                  {index === 5 && <FaWrench size={32} />}
                </span>

                <h4>{item.title}</h4>
                <p>{item.short}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODAL POPUP ================= */}
      {activeCard && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modal}
            ref={modalRef} // Attach the ref
            tabIndex="-1" // Makes the div focusable via JavaScript
            style={{ outline: "none" }} // Hide the focus border
          >
            <h3>{activeCard.title}</h3>
            <p>{activeCard.details}</p>

            <button
              className={styles.closeBtn}
              onClick={() => setActiveCard(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
