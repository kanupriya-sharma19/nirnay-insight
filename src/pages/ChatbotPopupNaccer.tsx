import React, { useState, useRef, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ChatbotPopupNACCERProps {
  isChatOpen: boolean;
  onClose?: () => void;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

const suggestions = [
  "Show summary",
  "Explain scoring",
  "What is NACCER rationale?",
  "List proposal phases",
  "Financial overview",
  "Team capability",
];

const ChatbotPopupNACCER: React.FC<ChatbotPopupNACCERProps> = ({ isChatOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! 👋 I’m Nirnay Assistant. How can I help you with this proposal?",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputText("");
    simulateBotReply(text);
  };

  const simulateBotReply = (userText: string) => {
    setIsTyping(true);
    let reply = "";
  
    switch (userText) {
      case "Show summary":
        reply = `
  Proposal Title: AI-based Coal Quality Assessment System
  Institution: IIT Dhanbad
  Status: Under Review
  Score: 6.0/10
  
  This proposal demonstrates good technical feasibility with attention needed for scale-up costs. Expected ROI: 12%. Focuses on operational efficiency, safety, and environmental sustainability in coal quality assessment.`;
        break;
  
      case "Explain scoring":
        reply = `
  Weighted Score (5.74/10) - Modified S&T Guidelines (2021)
  Criteria and Weightage:
  - Technical Feasibility (15%) → 5.95/10 → Weighted: 8.92
  - Potential Impact (15%) → 5.72/10 → Weighted: 8.59
  - Novelty (15%) → 5.52/10 → Weighted: 8.28
  - Commercialization Strategy (25%) → 5.69/10 → Weighted: 14.23
  - Financial Feasibility (15%) → 5.74/10 → Weighted: 8.61
  - Team Capability (15%) → 5.85/10 → Weighted: 8.77
  
  Overall weighted score: 5.74/10`;
        break;
  
      case "What is NACCER rationale?":
        reply = `
  This proposal is currently under review. Key points:
  - Demonstrates technical feasibility and clear methodology
  - Addresses coal sector challenges and market needs
  - Offers innovative approaches with potential for IP generation
  - Budget is justified and includes clear cost breakdowns
  - Team has relevant expertise but scale-up costs need attention`;
        break;
  
      case "List proposal phases":
        reply = `
  The proposal includes 4 phases:
  1. Design & Simulation
  2. Prototype Development
  3. Testing & Validation
  4. Field Deployment`;
        break;
  
      case "Financial overview":
        reply = `
  Total Project Cost: ₹50.00L
  Budget Allocation:
  - Equipment, manpower, and operational expenses clearly defined
  Comparison: Previous similar project cost ₹40.00L
  Expected ROI: 12%
  Cost-benefit analysis shows positive returns over project lifecycle`;
        break;
  
      case "Team capability":
        reply = `
  Project led by IIT Dhanbad:
  - Experienced faculty and researchers in coal quality and AI
  - Includes technical experts, industry advisors, and project managers
  - Past projects and publications demonstrate capability
  - Collaboration with industry ensures practical implementation and validation support`;
        break;
  
      default:
        reply = "I’m still learning! Please choose one of the suggestions below.";
    }
  
    // Typing animation
    let i = 0;
    const interval = setInterval(() => {
      if (i <= reply.length) {
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages[newMessages.length - 1].sender === "bot") {
            newMessages[newMessages.length - 1].text = reply.slice(0, i);
          } else {
            newMessages.push({ sender: "bot", text: reply.slice(0, i) });
          }
          return newMessages;
        });
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);
  };
  
  
  return (
    <Dialog.Root open={isChatOpen} onOpenChange={(open) => !open && onClose?.()}>
      <Dialog.Overlay
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          position: "fixed",
          inset: 0,
          zIndex: 9999, // HIGHER than parent modal
        }}
      />
      <Dialog.Content
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          height: "80%",
          backgroundColor: "#fff",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          zIndex: 10000, // HIGHER than overlay and parent modal
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#004AAD",
            color: "#fff",
            padding: "12px 16px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Nirnay Assistant 🤖
          <Dialog.Close
            style={{
              background: "none",
              color: "white",
              border: "none",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✖
          </Dialog.Close>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: 12,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            backgroundColor: "#f4f6f8",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-end",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                gap: 8,
              }}
            >
              <div>
                {msg.sender === "user" ? (
                  <img
                    src="https://img.icons8.com/color/48/000000/user-male-circle.png"
                    alt="user"
                    style={{ width: 24, height: 24 }}
                  />
                ) : (
                  <img
                    src="https://img.icons8.com/color/48/000000/artificial-intelligence.png"
                    alt="bot"
                    style={{ width: 24, height: 24 }}
                  />
                )}
              </div>
              <div
                style={{
                  backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#fff",
                  padding: "10px 14px",
                  borderRadius: 20,
                  maxWidth: "75%",
                  fontSize: 14,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
                {msg.sender === "bot" && isTyping && <span>▌</span>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div
          style={{
            display: "flex",
            padding: "8px",
            borderTop: "1px solid #eee",
            gap: 8,
            backgroundColor: "#fff",
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 20,
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            style={{
              padding: "10px 16px",
              borderRadius: 20,
              border: "none",
              backgroundColor: "#004AAD",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>

        {/* Suggestions */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: 8,
            gap: 6,
            borderTop: "1px solid #eee",
            backgroundColor: "#f8f9fa",
          }}
        >
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(s)}
              style={{
                padding: "6px 10px",
                borderRadius: 20,
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ChatbotPopupNACCER;
