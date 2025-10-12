import React, { useState, useRef, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ChatbotPopupProps {
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

const ChatbotPopup: React.FC<ChatbotPopupProps> = ({ isChatOpen, onClose }) => {
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
  Proposal Title: Sustainable Mining Practices using IoT
  Institution: NIT Rourkela
  Approval: NACCER Approved
  Score: 9.8/10
  
  This proposal demonstrates exceptional technical feasibility, strong commercialization potential, and ROI of 20%. The IoT-based system addresses environmental sustainability goals and aligns with national digitization initiatives.`;
        break;
  
      case "Explain scoring":
        reply = `
  Weighted Score (9.34/10) - Modified S&T Guidelines (2021)
  Criteria and Weightage:
  - Technical Feasibility (15%) → 9.68/10 → Weighted: 14.52
  - Potential Impact (15%) → 9.24/10 → Weighted: 13.86
  - Novelty (15%) → 8.96/10 → Weighted: 13.44
  - Commercialization Strategy (25%) → 9.42/10 → Weighted: 23.55
  - Financial Feasibility (15%) → 9.00/10 → Weighted: 13.50
  - Team Capability (15%) → 9.67/10 → Weighted: 14.51
  
  Overall weighted score: 9.34/10`;
        break;
  
      case "What is NACCER rationale?":
        reply = `
  NACCER selected this proposal due to:
  - Exceptional technical merit (9.8/10)
  - Strong cost-benefit ratio with expected ROI of 20%
  - Alignment with national digitization and mining safety initiatives
  - Scalable deployment potential across multiple mining sites
  - Clear demonstration of environmental sustainability benefits`;
        break;
  
      case "List proposal phases":
        reply = `
  The proposal includes 5 phases:
  1. Design & Simulation
  2. Prototype Manufacturing
  3. Pre-field Testing & Calibration
  4. Field Deployment & Trials
  5. Evaluation & Reporting`;
        break;
  
      case "Financial overview":
        reply = `
  Total Project Cost: ₹2.96 crore
  Budget Allocation:
  - Equipment: ₹1.2 crore
  - Manpower: ₹80 lakhs
  - Operational: ₹96 lakhs
  Expected ROI: 20% through improved productivity and safety measures
  Cost-benefit analysis shows positive NPV over 5 years`;
        break;
  
      case "Team capability":
        reply = `
  Project led by IIT(ISM), SECL, and APHMEL:
  - Strong institutional expertise in mining engineering and safety
  - Proven success in SAGES-I and SAGES-II projects
  - Access to field testing facilities and operational insights
  - Experienced principal investigators with relevant publications and industry connections
  - Capable of executing the advanced 500T SAGES-III project`;
        break;
  
      default:
        reply = "I’m still learning! Please choose one of the suggestions below.";
    }
  
    // Typing simulation
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
          className="bg-slate-800 text-white px-4 py-3 font-bold flex justify-between items-center"
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
            className="px-4 py-2.5 rounded-[20px] bg-slate-800 text-white border-0 cursor-pointer"
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

export default ChatbotPopup;
