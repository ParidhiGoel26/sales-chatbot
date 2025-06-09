import React, { useState } from 'react';
import '../styles/ChatWindow.css';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/search?q=${encodeURIComponent(input)}`);
      const data = await res.json();

      const botText =
        data.length > 0
          ? `🔍 Found ${data.length} product(s):\n` +
            data.map((item, i) => `${i + 1}. ${item.name} - ₹${item.price}`).join('\n')
          : '❌ No matching products found.';

      const botMessage = {
        text: botText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: '⚠️ Error fetching products. Please try again later.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  const handleDownload = () => {
    const content = messages
      .map((msg) => `[${msg.timestamp}] ${msg.sender.toUpperCase()}: ${msg.text}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat_history.txt';
    link.click();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Sales Chatbot</h3>
        <div>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleDownload}>Download Chat</button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
        {loading && (
          <div className="message bot typing">
            <p>Bot is typing...</p>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Ask about products..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
