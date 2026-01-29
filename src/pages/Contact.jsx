import React, { useEffect, useRef, useState } from "react";
import styles from "./Contact.module.css";
import { contactData } from "../data.js";
import { MdPhoneInTalk, MdEmail } from "react-icons/md";
import { FaFileImage, FaMosque } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { GrCircleInformation } from "react-icons/gr";

const Contact = () => {
  const { title, subtitle, mapUrl, info, address } = contactData;

  // ✅ FORM STATE (UNCHANGED)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    file: null,
    filePreview: null,
  });

  // ✅ NEW: Submitting State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ SNACKBAR STATE (FIELD + MESSAGE)
  const [snackbar, setSnackbar] = useState({
    field: "",
    message: "",
  });

  // ✅ TOAST MESSAGE STATE
  const [toastMessage, setToastMessage] = useState("");
  // ✅ NEW: State for the Professional Mini-Popup
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null); // 2. Ref for focus management

  // --- FIXED ESC KEY LOGIC ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      // Use 'true' for capture phase to ensure it's caught
      window.addEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = "hidden";

      // Force focus to the popup so it captures the keypress
      if (popupRef.current) {
        popupRef.current.focus();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = "unset";
    };
  }, [showPopup]);

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
    const { name, value, files } = e.target;
    if (name === "name") {
      // Allows only letters and spaces. Removes numbers and special chars immediately.
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData({ ...formData, [name]: sanitizedValue });
    } else if (name === "phone") {
      // ✅ Allow ONLY digits (removes letters/symbols)
      const sanitizedPhone = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: sanitizedPhone });
    } else if (name === "file") {
      const selectedFile = files[0]; // Logic fixed here
      if (selectedFile) {
        // Create a preview URL if it's an image
        const previewUrl = selectedFile.type.startsWith("image/")
          ? URL.createObjectURL(selectedFile)
          : null;

        setFormData({
          ...formData,
          file: selectedFile,
          filePreview: previewUrl,
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setSnackbar({ field: "", message: "" });
  };

  // ✅ NEW: Remove File Function
  const removeFile = () => {
    setFormData({ ...formData, file: null, filePreview: null });
  };

  // ✅ SNACKBAR VALIDATION (FIRST EMPTY FIELD ONLY)
  const validate = () => {
    // Requires a real domain like @gmail.com, @outlook.co.uk, etc.
    const strictEmailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|io|co|in|ai)$/;

    // Limits phone to exactly 10-12 digits only
    const strictPhoneRegex = /^[0-9]{10,12}$/;
    if (!formData.name.trim()) {
      setSnackbar({ field: "name", message: "Full Name is required" });
      return false;
    }
    if (!formData.email.trim()) {
      setSnackbar({ field: "email", message: "Email is required" });
      return false;
    }
    if (!strictEmailRegex.test(formData.email.toLowerCase())) {
      setSnackbar({
        field: "email",
        message: "Please enter a proper domain (e.g., .com, .net, .org)",
      });
      return false;
    }
    if (!formData.phone.trim()) {
      setSnackbar({ field: "phone", message: "Phone number is required" });
      return false;
    }
    if (!strictPhoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      setSnackbar({
        field: "phone",
        message: "Phone must be between 10 and 12 digits",
      });
      return false;
    }
    if (!formData.subject.trim() || formData.subject.length < 5) {
      setSnackbar({
        field: "subject",
        message: "Subject must be at least 5 characters",
      });
      return false;
    }
    // ✅ ADDED: FILE VALIDATION (Required)
    if (!formData.file) {
      setSnackbar({
        field: "file",
        message: "Please attach a document or image",
      });
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 5) {
      setSnackbar({
        field: "message",
        message: "Message must be at least 5 characters",
      });
      return false;
    }
    return true;
  };
  // ✅ HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // ✅ START LOADING
    setIsSubmitting(true);

    try {
      // When sending files, use FormData object instead of JSON string
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("phone", formData.phone);
      dataToSend.append("subject", formData.subject);
      dataToSend.append("message", formData.message);
      if (formData.file) {
        dataToSend.append("file", formData.file);
      }
      const res = await fetch(
        "https://bazil-portfolio-backend-1.onrender.com/contact",
        {
          method: "POST",
          body: dataToSend,
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
        phone: "",
        subject: "",
        message: "",
        file: null,
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
    } finally {
      // ✅ STOP LOADING (Re-enables button)
      setIsSubmitting(false);
    }
  };
  return (
    <section className={styles.contactSection}>
      {/* ✅ PROFESSIONAL MINI POPUP */}
      {showPopup && formData.filePreview && (
        <div className={styles.popupOverlay}>
          <div
            className={styles.popupCard}
            ref={popupRef} // 3. Attach Ref
            tabIndex="-1" // 4. Make focusable
            style={{ outline: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popupHeader}>
              <span>Image Preview</span>
              <button
                onClick={() => setShowPopup(false)}
                className={styles.popupClose}
              >
                ✕
              </button>
            </div>
            <img
              src={formData.filePreview}
              alt="Selected"
              className={styles.popupImg}
            />
          </div>
        </div>
      )}
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
                disabled={isSubmitting} // Added disabled state
                spellCheck="true" // Added Grammatical/Spell Check
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
                disabled={isSubmitting} // Added disabled state
                spellCheck="true" // Added Grammatical/Spell Check
              />
              {snackbar.field === "email" && (
                <div className={styles.snackbar}>
                  <span className={styles.snackbarArrow}></span>
                  {snackbar.message}
                </div>
              )}
            </div>

            {/* ✅ NEW: PHONE NUMBER */}

            <div className={styles.inputWrapper}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                disabled={isSubmitting} // Added disabled state
                spellCheck="false" // Not needed for numbers
              />
              {snackbar.field === "phone" && (
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
                disabled={isSubmitting} // Added disabled state
                spellCheck="true" // Added Grammatical/Spell Check
              />
              {snackbar.field === "subject" && (
                <div className={styles.snackbar}>
                  <span className={styles.snackbarArrow}></span>
                  {snackbar.message}
                </div>
              )}
            </div>

            {/* ✅ ATTACHMENT WITH PREVIEW & VALIDATION */}
            <div className={styles.inputWrapper}>
              {!formData.file ? (
                <div
                  className={`${styles.fileLabelWrapper} ${isSubmitting ? styles.disabledLabel : ""}`}
                >
                  <label className={styles.fileLabel}>
                    <input
                      type="file"
                      name="file"
                      accept="image/*,application/pdf"
                      onChange={handleChange}
                      className={styles.fileInput}
                      disabled={isSubmitting} // Added disabled state
                    />
                  </label>
                </div>
              ) : (
                <div className={styles.filePreviewContainer}>
                  {/* Clickable Icon for Popup */}
                  <div
                    className={styles.fileIconPlaceholder}
                    onClick={() =>
                      !isSubmitting &&
                      formData.filePreview &&
                      setShowPopup(true)
                    }
                    style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
                    title="Click to preview image"
                  >
                    <FaFileImage />
                    <div className={styles.fileInfo}>
                      <span className={styles.fileName}>
                        {formData.file.name}
                      </span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className={styles.removeFileBtn}
                        disabled={isSubmitting} // Added disabled state
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* THIS BOX SHOWS THE ERROR FOR FILE */}
              {snackbar.field === "file" && (
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
                disabled={isSubmitting} // Added disabled state
                spellCheck="true" // Added Grammatical/Spell Check
              ></textarea>
              {snackbar.field === "message" && (
                <div className={styles.snackbar}>
                  <span className={styles.snackbarArrow}></span>
                  {snackbar.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <IoMdSend />}
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
