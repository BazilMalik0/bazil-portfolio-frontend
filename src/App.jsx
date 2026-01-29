import React, { useEffect, useState, useRef } from "react";
import "./App.css";

import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/Routes";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import backgroundImage from "./assets/background.webp";
import MouseTrail from "./components/LoadingScreen/MouseTrail";
import BackToTop from "./components/BackToTop/BackToTop";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBlackout, setIsBlackout] = useState(false);
  // ✅ NEW: Prevent blackout until user has interacted with the site
  const [hasInteracted, setHasInteracted] = useState(false);
  const loopRef = useRef();
  // ✅ NEW: Ref to store scroll position if needed (though CSS fix is preferred)
  const scrollPos = useRef(0);

  // ✅ Capture first click/tap to enable protection
  useEffect(() => {
    const enableProtection = () => setHasInteracted(true);
    window.addEventListener("mousedown", enableProtection);
    window.addEventListener("touchstart", enableProtection);
    window.addEventListener("keydown", enableProtection);

    return () => {
      window.removeEventListener("mousedown", enableProtection);
      window.removeEventListener("touchstart", enableProtection);
      window.removeEventListener("keydown", enableProtection);
    };
  }, []);

  useEffect(() => {
    if (isBlackout) {
      // 🔒 Capture current position the moment blackout starts
      scrollPos.current =
        window.pageYOffset || document.documentElement.scrollTop;

      const timer = setTimeout(() => {
        setIsBlackout(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // 🔓 When blackout ends, force return to stored position
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPos.current,
          behavior: "instant",
        });
      });
    }
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
      // ✅ ONLY trigger blackout if the user has already interacted and we lose focus
      if (
        hasInteracted &&
        (!document.hasFocus() || document.visibilityState === "hidden")
      ) {
        if (!isBlackout) setIsBlackout(true);
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

      // Only prevent default if it's a protected key to avoid breaking scroll
      if (e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 🔒 Recovery
    const handleFocus = () => {
      setTimeout(() => {
        if (document.hasFocus()) {
          setIsBlackout(false);
        }
      }, 300);
    };

    // window.addEventListener("contextmenu", disableRightClick);
    window.addEventListener("keydown", handleKeyEvent, true);
    window.addEventListener("keyup", handleKeyEvent, true);
    // document
    //   .getElementById("iFrame")
    //   .addEventListener("click", handleKeyEvent, false);
    // window.addEventListener("blur", () => setIsBlackout(true));
    window.addEventListener("focus", handleFocus);

    return () => {
      // window.removeEventListener("contextmenu", disableRightClick);
      window.removeEventListener("keydown", handleKeyEvent, true);
      window.removeEventListener("keyup", handleKeyEvent, true);
      cancelAnimationFrame(loopRef.current);
    };
  }, [isBlackout, hasInteracted]); // ✅ Added hasInteracted to dependency

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
      <div className={`App ${isBlackout ? "hidden-capture" : ""}`}>
        <MouseTrail />
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <div className="AppInner">
            {/* ✅ ADD THE IMAGE HERE */}
            <img
              src={backgroundImage}
              alt="Red Smoke Cube Background"
              className="background-image"
            />
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
