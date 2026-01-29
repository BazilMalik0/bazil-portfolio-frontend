import React, { useState } from "react";
import styles from "./Footer.module.css";
import { portfolioData } from "../../data.js";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const { footer } = portfolioData;
  const [activeSocial, setActiveSocial] = useState(null);

  // Official Brand Colors Mapping
  const iconMap = {
    github: { icon: <FaGithub />, color: "#ffffff" },
    linkedin: { icon: <FaLinkedinIn />, color: "#0077B5" },
    instagram: {
      icon: <FaInstagram />,
      color: "#E4405F", // Used for the glow/shadow
      gradient:
        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    },
    twitter: { icon: <FaTwitter />, color: "#1DA1F2" },
    facebook: { icon: <FaFacebook />, color: "#1877F2" },
    whatsapp: { icon: <FaWhatsapp />, color: "#25D366" },
  };

  return (
    <footer className={styles.footer}>
      <h2 className={styles.brand}>
        {footer.brand.slice(0, 6)}
        <span>{footer.brand.slice(6)}</span>
      </h2>
      <p className={styles.tagline}>{footer.tagline}</p>

      <div className={styles.socials}>
        {footer.socials.map((social, i) => {
          const brand = iconMap[social.platform];
          const isActive = activeSocial === social.platform;
          return (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setActiveSocial(social.platform)}
              className={`${styles.socialCircle} ${isActive ? styles.active : ""}`}
              style={{
                "--brand-color": brand.color,
                "--brand-gradient": brand.gradient || brand.color, // Use gradient if it exists, else use solid color
              }}
            >
              {brand.icon}
            </a>
          );
        })}
      </div>

      <div className={styles.divider}></div>
      <p className={styles.copy}>{footer.copyright}</p>
    </footer>
  );
};

export default Footer;
