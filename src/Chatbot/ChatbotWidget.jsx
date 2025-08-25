import { useState } from "react";
import styles from "./ChatbotWidget.module.css";
import Close from "../Components/Close";
import Maximize from "../Components/Maximize";
import Laugh from "../Components/Laugh";
import Link from "../Components/Link";
import Send from "../Components/Send";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hi 👋. I'm your assistant today. How can I help you?",
    },
    { sender: "user", text: "I can't log into my account." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMaximized(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isMaximized && (
        <button
          className={styles.chatButton}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div
          className={`${styles.chatWindow} ${
            isMaximized ? styles.fullscreen : ""
          }`}
        >
          <div className={styles.header}>
            <span>Chatbot</span>
            <div className={styles.headerButtons}>
              <button onClick={() => setIsMaximized(!isMaximized)}>
                <Maximize />
              </button>
              <button onClick={handleClose} className={styles.closeButton}>
                <Close />
              </button>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  msg.sender === "assistant" ? styles.assistant : styles.user
                }`}
              >
                {/* Icon */}
                <div className={styles.icon}>
                  {msg.sender === "assistant" ? (
                    <span role="img" aria-label="assistant">
                      🤖
                    </span>
                  ) : (
                    <span role="img" aria-label="user">
                      👤
                    </span>
                  )}
                </div>
                {/* Message Bubble */}
                <div className={styles.messageBubble}>
                  <div className={styles.text}>{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.inputArea}>
            <button>
              <Laugh />
            </button>
            <button>
              <Link />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}>
              <Send />
            </button>
          </div>

          <div className={styles.poweredText}>Powered by Onedoc</div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
