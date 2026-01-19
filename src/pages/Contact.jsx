import React, { useState } from "react";
import styles from "./Contact.module.css";
import { contactData } from "../data.js";
import { MdPhoneInTalk, MdEmail } from "react-icons/md";
import { FaMosque } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { GrCircleInformation } from "react-icons/gr";

const Contact = () => {
  const { title, subtitle, mapUrl, info, address } = contactData;

  // ✅ FORM STATE (UNCHANGED)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // ✅ SNACKBAR STATE (FIELD + MESSAGE)
  const [snackbar, setSnackbar] = useState({
    field: "",
    message: "",
  });

  // ✅ TOAST MESSAGE STATE
  const [toastMessage, setToastMessage] = useState("");
  const renderIcon = (type) => {
    switch (type) {
      case "mosque":
        return <FaMosque />;
      case "phone":
        return <MdPhoneInTalk />;
      case "email":
        return <MdEmail />;
      default:
        return null;
    }
  };

  // ✅ HANDLE CHANGE (DO NOT TOUCH INPUT STYLES)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSnackbar({ field: "", message: "" }); // clear snackbar on typing
  };

  // ✅ SNACKBAR VALIDATION (FIRST EMPTY FIELD ONLY)
  const validate = () => {
    if (!formData.name.trim()) {
      setSnackbar({ field: "name", message: "Please fill out this field" });
      return false;
    }

    if (!formData.email.trim()) {
      setSnackbar({ field: "email", message: "Please fill out this field" });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setSnackbar({
        field: "email",
        message: "Please enter a valid email address",
      });
      return false;
    }

    if (!formData.subject.trim()) {
      setSnackbar({ field: "subject", message: "Please fill out this field" });
      return false;
    }
    if (formData.subject.trim().length < 10) {
      setSnackbar({
        field: "subject",
        message: "Subject must be at least 10 characters",
      });
      return false;
    }
    if (!formData.message.trim()) {
      setSnackbar({ field: "message", message: "Please fill out this field" });
      return false;
    }
    if (formData.message.trim().length < 10) {
      setSnackbar({
        field: "message",
        message: "Message must be at least 10 characters",
      });
      return false;
    }
    return true;
  };
  // ✅ HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await fetch(
        "https://bazil-portfolio-backend-1.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // 🔥 RESET TOAST FIRST
      setToastMessage("");

      // 🔥 SHOW SUCCESS TOAST
      setTimeout(() => {
        setToastMessage("Message sent successfully✅");
      }, 10);

      // 🔄 RESET FORM
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setSnackbar({ field: "", message: "" });

      // ⏱ AUTO HIDE TOAST
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
    } catch (error) {
      console.error("Contact Error:", error);

      setToastMessage("");
      setTimeout(() => {
        setToastMessage(" ❌Failed to send message. Try again.");
      }, 10);

      setTimeout(() => {
        setToastMessage("");
      }, 3000);
    }
  };
  return (
    <section className={styles.contactSection}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>{title}</h1>
        <p className={styles.sideSubtitle}>{subtitle}</p>
      </div>
      <div className={styles.mapContainer}>
        <iframe
          id="iFrame"
          src={mapUrl}
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="location"
        />
      </div>
      <div className={styles.container}>
        <h2 className={styles.formTitle}>How Can I Help You?</h2>

        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.infoCol}>
            {info.map((item) => (
              <div key={item.id} className={styles.infoItem}>
                <span className={styles.iconBox}>
                  {renderIcon(item.iconType)}
                </span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle: Contact Form */}
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            {/* NAME */}
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
              {snackbar.field === "name" && (
                <div className={styles.snackbar}>
                  <span className={styles.snackbarArrow}></span>
                  {snackbar.message}
                </div>
              )}
            </div>

            {/* EMAIL */}
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
              {snackbar.field === "email" && (
                <div className={styles.snackbar}>
                  <span className={styles.snackbarArrow}></span>
                  {snackbar.message}
                </div>
              )}
            </div>

            {/* SUBJECT */}
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className={styles.input}
              />
              {snackbar.field === "subject" && (
                <div className={styles.snackbar}>
                  <span className={styles.snackbarArrow}></span>
                  {snackbar.message}
                </div>
              )}
            </div>

            {/* MESSAGE */}
            <div className={styles.inputWrapper}>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
              ></textarea>
              {snackbar.field === "message" && (
                <div className={styles.snackbar}>
                  <span className={styles.snackbarArrow}></span>
                  {snackbar.message}
                </div>
              )}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message
              <IoMdSend />
            </button>
          </form>

          {/* Right */}
          <div className={styles.addressCol}>
            <div className={styles.addressBox}>
              <CiLocationOn className={styles.locationIcon} />
              <p>
                <strong>{address.location}</strong>
              </p>
            </div>
            <p className={styles.note}>
              <GrCircleInformation className={styles.noteIcon} />
              <strong> {address.note}</strong>
            </p>
          </div>
        </div>
      </div>
      {/* ✅ TOAST MESSAGE */}{" "}
      {toastMessage && (
        <div className={styles.toastMessage}>{toastMessage}</div>
      )}
    </section>
  );
};

export default Contact;
