import React, { useEffect, useState, useRef } from "react";
import styles from "./BackToTop.module.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const BackToTop = () => {
  const [scrollDir, setScrollDir] = useState("up");
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Hide/Show Logic (Hide at very top and very bottom)
      const isAtVeryTop = currentScrollY < 10;
      const isAtVeryBottom =
        currentScrollY + windowHeight >= documentHeight - 10;

      if (isAtVeryTop || isAtVeryBottom) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      // 2. Direction Logic
      if (currentScrollY > lastScrollY.current) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAction = () => {
    if (scrollDir === "down") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.show : styles.hide}`}
      onClick={handleAction}
      aria-label={scrollDir === "down" ? "Scroll to bottom" : "Scroll to top"}
    >
      <div className={styles.iconContainer}>
        {scrollDir === "down" ? <FaArrowDown /> : <FaArrowUp />}
      </div>
    </button>
  );
};

export default BackToTop;
