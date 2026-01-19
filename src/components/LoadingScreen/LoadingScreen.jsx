import React, { useEffect, useState, useRef } from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  // Using a ref to calculate the path length for the SVG animation
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    // Calculate the total length of the infinity path once mounted
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Calculate the offset: (Total Length) - (Percentage of Length)
  const strokeDashoffset = pathLength - (progress / 100) * pathLength;

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.svgWrapper}>
        <svg
          className={styles.infinity}
          viewBox="0 0 300 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20,60 C60,10 120,10 150,60 C180,110 240,110 280,60 
             C240,10 180,10 150,60 C120,110 60,110 20,60"
            className={styles.basePath}
          />
          <path
            ref={pathRef}
            d="M20,60 C60,10 120,10 150,60 C180,110 240,110 280,60 
             C240,10 180,10 150,60 C120,110 60,110 20,60"
            className={styles.movingPath}
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: strokeDashoffset,
              // We remove the infinite CSS animation and let React control it
              animation: "none",
              stroke: "#ff3344", // Ensure this matches your red theme
              transition: "stroke-dashoffset 0.1s linear",
            }}
          />
        </svg>

        <div className={styles.svgCenterText}>
          <div className={styles.percentage}>{progress}%</div>
          <div
            className={styles.welcomeText}
            data-text="Crafting Digital Experiences..."
          >
            Crafting Digital Experiences...
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
