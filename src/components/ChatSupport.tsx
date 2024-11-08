import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  HelpCircle,
  BookOpen,
  Clock,
  Mail,
} from "lucide-react";

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "support"; time: string }>
  >([
    {
      text: "Hello! How can I help you today?",
      sender: "support",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        if (Date.now() - lastInteraction > 10000) {
          setShowHelpPopup(true);
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, lastInteraction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [...prev, { text: message, sender: "user", time }]);
    setMessage("");
    setLastInteraction(Date.now());

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thank you for your message. One of our support agents will be with you shortly.",
          sender: "support",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const quickActions = [
    {
      icon: BookOpen,
      text: "Track my order",
      action: () => setMessage("I need help tracking my order"),
    },
    {
      icon: Clock,
      text: "Delivery time",
      action: () => setMessage("What's the estimated delivery time?"),
    },
    {
      icon: Mail,
      text: "Returns",
      action: () => setMessage("I need help with a return"),
    },
  ];

  return (
    <>
      {/* Help Popup */}
      {showHelpPopup && !isOpen && (
        <div className="fixed bottom-4 right-24 w-60 bg-sky-100 rounded-2xl shadow-xl p-4 animate-fade-in-up z-50">
          <button
            onClick={() => setShowHelpPopup(false)}
            className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <HelpCircle className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Need Help?</h3>
              <p className="text-sm text-gray-600">We're here to assist you!</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => {
          setIsOpen((pre) => !pre);
          setShowHelpPopup(false);
          setLastInteraction(Date.now());
        }}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Customer Support</h3>
                <p className="text-sm text-white/80">
                  We typically reply in a few minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b">
            <p className="text-sm text-gray-600 mb-3">Common Questions:</p>
            <div className="flex space-x-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex-1 flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <action.icon className="h-5 w-5 text-primary-600 mb-1" />
                  <span className="text-xs text-gray-700 text-center">
                    {action.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="h-52 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.sender === "user"
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    <span className="text-sm text-gray-500">
                      Support is typing...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
                disabled={!message.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
