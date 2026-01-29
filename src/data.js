//navbar
export const portfolioData = {
  navLinks: [
    { name: "About", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: "Resume", url: "/resume" },
    { name: "Contact", url: "/contact" },
  ],
  hero: {
    title: "Hi, I’m Bazil. I Build Modern Websites for You",
    subtitle: "FRONTEND DEVELOPER & UI/UX DESIGNER",
    description:
      "If you want a professional, fast, and stunning website for your business or personal brand, you’re in the right place. My passion is turning complex ideas into intuitive interfaces that captivate users and push boundaries.",
    image: "https://via.placeholder.com/400x400",
  },

  whatIDo: [
    {
      id: 1,
      title: "UI/UX Enhancement",
      short: "Crafting intuitive and visually appealing interfaces.",
      details:
        "I focus on user-centered design principles, accessibility standards, and modern UI trends to create experiences that are not only beautiful but also easy to use and highly engaging.",
    },
    {
      id: 2,
      title: "Frontend Development",
      short: "Building responsive and scalable applications.",
      details:
        "Using React, Next.js, and modern JavaScript, I build fast, maintainable, and scalable frontend architectures with clean code and reusable components.",
    },
    {
      id: 3,
      title: "Performance Optimization",
      short: "Improving website speed and smooth interactions.",
      details:
        "I optimize assets, reduce bundle sizes, implement lazy loading, and improve rendering performance to ensure lightning-fast experiences.",
    },
    {
      id: 4,
      title: "Responsive Design",
      short: "Layouts that adapt perfectly to all screens.",
      details:
        "I ensure your website looks and works perfectly on mobile, tablet, and desktop devices using modern CSS and responsive techniques.",
    },
    {
      id: 5,
      title: "Deployment & Hosting",
      short: "Launching production-ready websites.",
      details:
        "From Vercel and Netlify to custom servers, I deploy secure, SEO-friendly, and optimized applications with CI/CD best practices.",
    },
    {
      id: 6,
      title: "Maintenance & Support",
      short: "Long-term stability and updates.",
      details:
        "I provide continuous support, bug fixes, performance checks, and feature enhancements to keep your website running smoothly.",
    },
  ],

  footer: {
    brand: "Malik.Dev",
    tagline:
      "Creating digital experiences that illuminate the future of web development",
    socials: [
      { platform: "github", url: "https://github.com/BazilMalik0" },
      { platform: "linkedin", url: "https://www.linkedin.com/in/malikbazil/" },
      {
        platform: "instagram",
        url: "https://www.instagram.com/bazil.malik_/?next=%2F",
      },
      { platform: "twitter", url: "https://x.com/malikbazil05" },
      { platform: "facebook", url: "https://www.facebook.com/malik.bazil.560" },
      {
        platform: "whatsapp",
        url: "https://api.whatsapp.com/send/?phone=%2B916005766348&text&type=phone_number&app_absent=0",
      },
    ],
    copyright: "© 2024 Malik.Dev All rights reserved.",
  },
};

// Resume data
import cv from "../public/BAZIL BILAL RESUME.pdf";
export const resumeData = {
  downloadLink: cv,
  resume: {
    experience: [
      {
        role: "Frontend Developer Intern",
        company: "FlareX Infotech | Pulwama, J&K",
        duration: "July 2025 - Sep 2025",
        // Full AWS Project details included here
        description:
          "Developed 'AWS Infotech', a modern company portfolio website using ReactJS, Framer Motion, and Tailwind CSS. Implemented smooth animations, interactive sliders with Swiper, and focused on clean UI/UX and cross-device compatibility.",
        tech: "ReactJS, Framer Motion, Material UI, Tailwind CSS, Swiper",
      },
      {
        role: "Full Stack Developer (Intern)",
        company: "Engineers' Computer Hub | Pulwama, J&K",
        duration: "June 2024 - July 2025",
        description:
          "Built a 'Hotel Management System' to manage bookings and staff operations. Developed dynamic interfaces in ReactJS and secure RESTful APIs with Express.js.",
        tech: "ReactJS, Express.js, MongoDB",
      },
      {
        role: "Academic Project: Auditorium Booking System",
        company: "PHP & MySQL",
        duration: "Academic Period",
        description:
          "Developed a web-based system for event scheduling and venue reservations. Designed a MySQL database to handle secure bookings and real-time status updates.",
        tech: "PHP,Bootstrap,MySQL",
      },
    ],
    education: [
      {
        degree: "Bachelor of Computer Applications",
        institution: "UNIVERSITY OF KASHMIR",
        duration: "CGPA: 5.70",
        location: "Srinagar, India ",
      },
    ],
  },
};
//contact
export const contactData = {
  title: "Contact",
  subtitle: "Let's Connect",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1656.2806188025756!2d74.90145923859093!3d33.87519682022181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1f45c02fd36a1%3A0x2d08cf945befc7d8!2sMalik%20Masjid%20(HANAFI%20db)%20215!5e0!3m2!1sen!2sin!4v1767181350942!5m2!1sen!2sin",
  info: [
    {
      id: 1,
      title: "ایمان۔الصلاة۔ اخلاق۔محبت۔",
      desc: "Imaan (ایمان). As-Salah (الصلاة).Akhlaq (اخلاق). Muhabbat (محبت)",
      iconType: "mosque",
    },

    {
      id: 2,
      title: "+91 60057 66348",
      desc: "If your call is not received please contact us through email.",
      iconType: "phone",
    },
    {
      id: 3,
      title: "malikbazil01933@gmail.com",
      desc: "Your email will be replied soon إن شاء الله",
      iconType: "email",
    },
  ],
  address: {
    location:
      "MALIK MOHALLAH, BEHIND SHAHEED PARK, PULWAMA 192301 JAMMU KASHMIR",
    note: "If you are facing any difficulty in finding the address then please use the map given above.",
  },
};
//PROJECTDATA.JS
import aws1 from "./assets/project/aws1.webp";
import aws2 from "./assets/project/aws2.webp";
import aws3 from "./assets/project/aws3.webp";

import ech1 from "./assets/project/ech1.webp";
import ech2 from "./assets/project/ech2.webp";
import ech3 from "./assets/project/ech3.webp";

import hotel1 from "./assets/project/hotel1.webp";
import hotel2 from "./assets/project/hotel2.webp";
import hotel3 from "./assets/project/hotel3.webp";

import quiz1 from "./assets/project/quiz1.webp";
import quiz2 from "./assets/project/quiz2.webp";
import quiz3 from "./assets/project/quiz3.webp";

import snake1 from "./assets/project/snake1.webp";
import snake2 from "./assets/project/snake2.webp";
import snake3 from "./assets/project/snake3.webp";

import tictacto1 from "./assets/project/tictacto1.webp";
import tictacto2 from "./assets/project/tictacto2.webp";
import tictacto3 from "./assets/project/tictacto3.webp";

export const projectsData = [
  {
    id: 1,
    title: "Aws Infotech- Company Portfolio Website",
    description:
      "A professional corporate landing page designed to showcase IT services and cloud solutions. Features a high-performance UI with smooth transitions and a focus on lead generation and brand identity.",
    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Swiper.js",
    ],
    images: [aws1, aws2, aws3],

    visitLink: "https://aws-infotech.netlify.app/",
  },
  {
    id: 2,
    title: "Engineers' Computer Hub - (ECH)",
    description:
      "An educational resource platform tailored for engineering students. It provides access to study materials, project documentation, and technical blogs, featuring a robust search and categorization system.",
    tech: [
      "React.js",
      "Express.js",
      "MongoDB",
      "Modular CSS",
      "RESTful APIs",
      "Swiper.js",
    ],
    images: [ech1, ech2, ech3],
    visitLink: "https://ech-i.netlify.app/",
  },
  {
    id: 3,
    title: "Hotel Management System",
    description:
      "A comprehensive dashboard for hospitality administration. Streamlines room bookings, guest check-ins, and billing processes while providing real-time availability updates for staff.",
    tech: [
      "React.js",
      "Express.js",
      "MongoDB",
      "Modular CSS",
      "RESTful APIs",
      "Swiper.js",
    ],
    images: [hotel1, hotel2, hotel3],
    visitLink: "https://hotel-app-reg.netlify.app/",
  },
  {
    id: 4,
    title: "Quiz Application",
    description:
      "An interactive trivia platform with multiple categories and difficulty levels. Features a dynamic countdown timer, real-time score tracking, and a final performance summary.",
    tech: [
      "React.js",
      "JavaScript",
      "Modular CSS",
      "Timer Functionality",
      "Dynamic Question Loading",
      "Score Tracking",
      "Responsive Design",
    ],
    images: [quiz1, quiz2, quiz3],
    visitLink: "https://quiz-app-g.netlify.app/",
  },
  {
    id: 5,
    title: "Snake Game",
    description:
      "A classic arcade recreation using the Canvas API. Includes features like high-score persistence, increasing difficulty levels, and responsive touch controls for mobile play.",
    tech: [
      "React.js",
      "JavaScript",
      "Modular CSS",
      "Canvas API",
      "Keyboard Controls",
      "Score Tracking",
      "Responsive Design",
      "Collision Detection",
    ],
    images: [snake1, snake2, snake3],
    visitLink: "https://snake-gamee-g.netlify.app/",
  },
  {
    id: 6,
    title: "Tic-Tac-Toe Application",
    description:
      "A classic interactive game featuring a sleek UI and complex win-condition logic. It includes features like turn-tracking, a reset functionality, and an intelligent state management system to determine winners or draws instantly.",
    tech: [
      "React.js",
      "JavaScript",
      "Modular CSS",
      "Game Logic",
      "State Management",
      "Responsive Design",
      "Array Mapping",
    ],
    images: [tictacto1, tictacto2, tictacto3],
    visitLink: "https://tic-tac-toee-g.netlify.app/",
  },
];
