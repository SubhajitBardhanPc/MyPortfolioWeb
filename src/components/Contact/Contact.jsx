import React, { useEffect, useState } from "react";
import "./Contact.css";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { app } from "../../firebase";

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState("Fetching weather...");
  const [typingText, setTypingText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  const questions = [
    "\u00A0\u00A0 How are things at your end today? 😊",
    "\u00A0\u00A0 Looking to collaborate with a passionate developer? 💼",
    "\u00A0\u00A0 Exploring new talent for your team? Let's connect! 🤝",
    "\u00A0\u00A0 Interested in building meaningful digital products together? 🚀",
    "\u00A0\u00A0 Need someone who's eager to learn and deliver? I’m all ears! 👨‍💻"
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(now);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const db = getDatabase(app);
    const contactRef = ref(db, "contact");
    return onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setContact(data);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setWeather("☀️ Sunny, 32°C in Kolkata");
    }, 1500);
  }, []);

  useEffect(() => {
    let current = 0, charIndex = 0, typingInterval, eraseTimeout;

    const typeNextChar = () => {
      setTypingText((prev) => prev + questions[current].charAt(charIndex));
      charIndex++;
      if (charIndex === questions[current].length) {
        clearInterval(typingInterval);
        eraseTimeout = setTimeout(() => {
          setTypingText("\u00A0\u00A0");
          charIndex = 2;
          current = (current + 1) % questions.length;
          typingInterval = setInterval(typeNextChar, 70);
        }, 2500);
      }
    };

    setTypingText("\u00A0\u00A0");
    charIndex = 2;
    typingInterval = setInterval(typeNextChar, 70);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(eraseTimeout);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !userEmail || !userMessage) {
      setSubmissionStatus("❌ Please fill in all fields.");
      return;
    }

    const db = getDatabase(app);
    const messageRef = ref(db, "messages");
    push(messageRef, {
      name: userName,
      email: userEmail,
      message: userMessage,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        setSubmissionStatus("✅ Message sent successfully!");
        setUserName("");
        setUserEmail("");
        setUserMessage("");
        setTimeout(() => {
          setShowForm(false);
          setSubmissionStatus("");
        }, 700);
      })
      .catch((err) => {
        console.error(err);
        setSubmissionStatus("❌ Failed to send message.");
      });
  };

  if (!contact) return <p className="loading">Loading Contact...</p>;

  return (
    <section id="contact" className="contact-section">
      <div className="animated-greeting">
        <h1 className="wave-emoji">👋</h1>
        <h2 className="hello-text">Hey there, welcome to my digital space!</h2>
        <p className="time-display">Current Time (IST): 🕒 {time}</p>
        <p className="time-display">Weather Now: {weather}</p>
        <p className="typing-effect">💬 {typingText}</p>
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
        <p><strong>Available for:</strong> Full-time Positions 💼</p>
        <p><strong>Timezone:</strong> IST (GMT +5:30) ⏰</p>
        <p className="quote">“Building the future — one line of code at a time 🚀💻”</p>
        <button className="collab-btn" onClick={() => setShowForm(true)}>
          👨‍💻 Let’s Collaborate
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-box">
            <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>
            <h3>📩 Send Me a Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                required
              />
              <button type="submit">Send</button>
              {submissionStatus && <p className="form-status">{submissionStatus}</p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
