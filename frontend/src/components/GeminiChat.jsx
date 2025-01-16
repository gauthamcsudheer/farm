import React, { useState } from "react";
import axios from "axios";
import "./GeminiChat.css";

const GeminiChat = ({ extractedText }) => {
  const [userMessage, setUserMessage] = useState("");
  const [chatbotMessages, setChatbotMessages] = useState([]);

  const handleSendMessage = async () => {
    if (userMessage.trim() === "") return;

    setChatbotMessages([
      ...chatbotMessages,
      { sender: "user", message: userMessage },
    ]);
    setUserMessage("");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCEifdgxuEBQ5jU-TzAN5xFz6OgBhZi7gw",
        {
          contents: [
            {
              parts: [
                {
                  text: `${extractedText} \nUser query: ${userMessage}`,
                },
              ],
            },
          ],
        }
      );

      const geminiMessage = response.data.candidates[0].content.parts[0].text;
      setChatbotMessages((prevMessages) => [
        ...prevMessages,
        { sender: "chatbot", message: geminiMessage },
      ]);
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
    }
  };

  return (
    <div className="gemini-chat-container">
      <div className="chat-messages">
        {chatbotMessages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user-message" : "chatbot-message"}`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default GeminiChat;
