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
  // State to track which social link was clicked/active
  const [activeSocial, setActiveSocial] = useState(null);

  const iconMap = {
    github: <FaGithub />,
    linkedin: <FaLinkedinIn />,
    instagram: <FaInstagram />,
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    whatsapp: <FaWhatsapp />,
  };

  return (
    <footer className={styles.footer}>
      <h2 className={styles.brand}>
        {footer.brand.slice(0, 6)}
        <span>{footer.brand.slice(6)}</span>
      </h2>
      <p className={styles.tagline}>{footer.tagline}</p>

      <div className={styles.socials}>
        {footer.socials.map((social, i) => (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setActiveSocial(social.platform)}
            className={`${styles.socialCircle} ${
              activeSocial === social.platform ? styles.active : ""
            }`}
          >
            {iconMap[social.platform]}
          </a>
        ))}
      </div>

      <div className={styles.divider}></div>
      <p className={styles.copy}>{footer.copyright}</p>
    </footer>
  );
};

export default Footer;
