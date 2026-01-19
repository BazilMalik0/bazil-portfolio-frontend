import React, { useEffect, useState, useRef } from "react";
import "./App.css";

import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/Routes";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import BackgroundParticle from "./components/LoadingScreen/BackgroundParticle";
import MouseTrail from "./components/LoadingScreen/MouseTrail";
import BackToTop from "./components/BackToTop/BackToTop";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBlackout, setIsBlackout] = useState(false);
  const loopRef = useRef();

  useEffect(() => {
    if (!isBlackout) return;

    const timer = setTimeout(() => {
      setIsBlackout(false);
    }, 1000); // ⏱ 2 seconds

    return () => clearTimeout(timer);
  }, [isBlackout]);

  useEffect(() => {
    // ✅ Detect input fields
    const isInputField = (target) =>
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable);

    // 🔒 Right click control
    const disableRightClick = (e) => {
      if (isInputField(e.target)) return; // ✅ Allow on inputs
      e.preventDefault(); // ❌ Block everywhere else
    };

    // 🔒 Focus loss detection loop
    const protectionLoop = () => {
      if (!document.hasFocus() || document.visibilityState === "hidden") {
        setIsBlackout(true);
      }
      loopRef.current = requestAnimationFrame(protectionLoop);
    };
    loopRef.current = requestAnimationFrame(protectionLoop);

    // 🔒 Keyboard lockdown
    const handleKeyEvent = (e) => {
      if (isInputField(e.target)) return; // ✅ Allow typing in inputs

      if (
        e.key === "PrintScreen" ||
        e.keyCode === 44 ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.ctrlKey
      ) {
        setIsBlackout(true);
        navigator.clipboard.writeText("");
      }

      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // 🔒 Recovery
    const handleFocus = () => {
      setTimeout(() => {
        if (document.hasFocus()) setIsBlackout(false);
      }, 1000);
    };

    window.addEventListener("contextmenu", disableRightClick);
    window.addEventListener("keydown", handleKeyEvent, true);
    window.addEventListener("keyup", handleKeyEvent, true);
    // document
    //   .getElementById("iFrame")
    //   .addEventListener("click", handleKeyEvent, false);
    // window.addEventListener("blur", () => setIsBlackout(true));
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("contextmenu", disableRightClick);
      window.removeEventListener("keydown", handleKeyEvent, true);
      window.removeEventListener("keyup", handleKeyEvent, true);
      cancelAnimationFrame(loopRef.current);
    };
  }, []);

  return (
    <>
      {/* 🌑 ATOMIC OVERLAY */}
      <div
        className={`protection-overlay ${isBlackout ? "force-blackout" : ""}`}
      />
      {isBlackout && (
        <div className="blackout-message">
          <p>
            Specific key commands are currently suspended to maintain system
            integrity.
          </p>
        </div>
      )}
      <div className={isBlackout ? "App hidden-capture" : "App"}>
        <MouseTrail />
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <div className="AppInner">
            <BackgroundParticle />
            <Navbar />
            <main>
              <AppRoutes />
            </main>
            <Footer />
            <BackToTop />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
