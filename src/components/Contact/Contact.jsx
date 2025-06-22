import React, { useEffect, useState } from "react";
import "./Contact.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase";

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState("Fetching weather...");
  const [typingText, setTypingText] = useState(" ");

  const questions = [
  "How are things at your end today? 😊",
  "Looking to collaborate with a passionate developer? 💼",
  "Exploring new talent for your team? Let's connect! 🤝",
  "Interested in building meaningful digital products together? 🚀",
  "Need someone who's eager to learn and deliver? I’m all ears! 👨‍💻"
];


  // Clock (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      setTime(now);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Firebase Contact Fetch
  useEffect(() => {
    const db = getDatabase(app);
    const contactRef = ref(db, "contact");
    const unsubscribe = onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setContact(data);
    });
    return () => unsubscribe();
  }, []);

  // Simulate weather
  useEffect(() => {
    setTimeout(() => {
      setWeather("☀️ Sunny, 32°C in Kolkata");
    }, 1500);
  }, []);

  // Typing animation
  useEffect(() => {
    let current = 0;
    let charIndex = 0;
    let typingInterval;
    let eraseTimeout;

    const typeNextChar = () => {
      setTypingText((prev) => prev + questions[current].charAt(charIndex));
      charIndex++;

      if (charIndex === questions[current].length) {
        clearInterval(typingInterval);
        eraseTimeout = setTimeout(() => {
          setTypingText("");
          charIndex = 0;
          current = (current + 1) % questions.length;
          typingInterval = setInterval(typeNextChar, 70);
        }, 2500);
      }
    };

    setTypingText("");
    typingInterval = setInterval(typeNextChar, 70);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(eraseTimeout);
    };
  }, []);

  if (!contact) return <p className="loading">Loading Contact...</p>;

  return (
    <section id="contact" className="contact-section">
      <div className="animated-greeting">
        <h1 className="wave-emoji">👋</h1>
        <h2 className="hello-text">Hey there, welcome to my digital space!</h2>
        <p className="time-display">Current Time (IST): 🕒 {time}</p>
        <p className="time-display">Weather Now: {weather}</p>
        <p className="typing-effect">💬  {typingText}</p>

      </div>

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <h2 className="let-connect">📬 Let's Connect</h2>
      <p className="connect-subtitle">Open to Full-Time Roles | Let’s build together 🚀</p>

      <div className="contact-card">
        <p><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <p><strong>LinkedIn:</strong> <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">View Profile 🔗</a></p>
        <p><strong>GitHub:</strong> <a href={contact.github} target="_blank" rel="noopener noreferrer">Check Github 🐱‍💻</a></p>

        <hr className="divider" />

        <p><strong>Available for :</strong> Full-time Positions 💼</p>
        <p><strong>Timezone :</strong> IST (GMT +5:30) ⏰</p>
        {/* <p className="quote">“Let’s turn coffee ☕ into code 💻”</p> */}
        <p className="quote">“Building the future — one line of code at a time 🚀💻”</p>


        <button className="collab-btn" onClick={() => window.scrollTo(0, 0)}>
          👨‍💻 Let’s Collaborate
        </button>
      </div>
    </section>
  );
};

export default Contact;
