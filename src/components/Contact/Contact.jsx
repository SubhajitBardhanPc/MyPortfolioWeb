import React, { useEffect, useState } from "react";
import "./Contact.css";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { app } from "../../firebase";
import { Helmet } from "react-helmet";

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
    "\u00A0  How’s your day going? 😊",
    "\u00A0  Looking for a dev to team up with? 💼",
    "\u00A0  Hiring tech talent? Let’s chat! 🤝",
    "\u00A0  Got an idea? I can help build it 🚀",
    "\u00A0  Eager to grow with exciting projects 👨‍💻",
  ];

  // Update time every second
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

  // Fetch contact info from Firebase
  useEffect(() => {
    const db = getDatabase(app);
    const contactRef = ref(db, "contact");
    return onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setContact(data);
    });
  }, []);

  // Simulate weather
  useEffect(() => {
    setTimeout(() => {
      setWeather("☀️ Sunny, 32°C in Kolkata");
    }, 1500);
  }, []);

  // Typing animation
  useEffect(() => {
    let current = 0,
      charIndex = 0,
      typingInterval,
      eraseTimeout;

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

  // Handle form submission
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
    <>
      <Helmet>
        <title>Contact | Subhajit Bardhan - React & Java Developer</title>
        <meta
          name="description"
          content="Let's connect! Reach out to Subhajit Bardhan for collaborations, full-time roles or project ideas. Open to exciting opportunities."
        />
        <meta
          name="keywords"
          content="Subhajit Bardhan, contact, React developer, Java developer, Spring Boot, hire developer, web development"
        />
        <link
          rel="canonical"
          href="https://subhajitbardhan.netlify.app/contact"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://subhajitbardhan.netlify.app/contact"
        />
        <meta
          property="og:title"
          content="Contact | Subhajit Bardhan - React & Java Developer"
        />
        <meta
          property="og:description"
          content="Reach out for collaborations or job opportunities!"
        />
        <meta
          property="og:image"
          content="https://subhajitbardhan.netlify.app/og-image.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://subhajitbardhan.netlify.app/contact"
        />
        <meta
          name="twitter:title"
          content="Contact | Subhajit Bardhan - React & Java Developer"
        />
        <meta
          name="twitter:description"
          content="Let's collaborate or discuss your next project!"
        />
        <meta
          name="twitter:image"
          content="https://subhajitbardhan.netlify.app/og-image.png"
        />
      </Helmet>

      <section id="contact" className="contact-section">
        <div className="animated-greeting">
          <h1 className="wave-emoji">👋</h1>
          <h2 className="hello-text">
            Hey there, welcome to my digital space!
          </h2>
          <p className="time-display">Current Time (IST): 🕒 {time}</p>
          <p className="time-display">Weather Now: {weather}</p>
          <p className="typing-effect">💬 {typingText}</p>
        </div>

        <div className="blob blob1"></div>
        <div className="blob blob2"></div>

        <h2 className="let-connect">📬 Let's Connect</h2>
        <p className="connect-subtitle">
          Open to Full-Time Roles | Let’s build together 🚀
        </p>

        <div className="contact-card">
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile 🔗
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              Check Github 🐱‍💻
            </a>
          </p>
          <hr className="divider" />
          <p>
            <strong>Available for:</strong> Full-time Positions 💼
          </p>
          <p>
            <strong>Timezone:</strong> IST (GMT +5:30) ⏰
          </p>
          <p className="quote">
            “Building the future — one line of code at a time 🚀💻”
          </p>
          <button className="collab-btn" onClick={() => setShowForm(true)}>
            👨‍💻 Let’s Collaborate
          </button>
        </div>

        {showForm && (
          <div className="form-modal">
            <div
              className="form-box"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✖
              </button>
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
                {submissionStatus && (
                  <p className="form-status">{submissionStatus}</p>
                )}
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Contact;
