import { useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Mic, Minimize2, Send } from "lucide-react";
import BotAnimation from "../../public/animations/chat-bot-animation.json";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState(false);

  const voiceSupported = "webkitSpeechRecognition" in window;

  const handleSend = async (message) => {
    if (!message.trim()) return;
    const newMessage = {
      message,
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    setInputText("");

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((msg) => ({
      role: msg.sender === "ChatGPT" ? "assistant" : "user",
      content: msg.message,
    }));

    const apiRequestBody = {
      model: "deepseek/deepseek-r1:free",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "www.crusious.com",
            "X-Title": "CRUSIOUS",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      const data = await response.json();
      const reply = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        {
          message: reply,
          sender: "ChatGPT",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsTyping(false);
    }
  }

  const handleVoiceInput = () => {
    if (!voiceSupported) return alert("Voice recognition not supported");

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => setRecording(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };
    recognition.onerror = () => {
      setRecording(false);
      console.error("Voice recognition error.");
    };
    recognition.onend = () => {
      setRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="relative font-sans">
      {isChatOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200 backdrop-blur-md bg-white"
          style={{ height: "600px", width: "400px" }}
        >
          {/* Header */}
          <header className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[#1E5BA9] to-blue-600 text-white">
            <div className="flex items-center space-x-2 font-semibold">
              <Lottie
                animationData={BotAnimation}
                className="w-10 h-10"
                loop
                autoplay
              />
              <span>CRUSIOUS AI</span>
            </div>
            <motion.button
              onClick={() => setIsChatOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white"
            >
              <Minimize2 size={18} />
            </motion.button>
          </header>

          {/* Chat Body */}
          <div className="flex flex-col justify-between h-[540px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-white text-gray-800 self-start mr-auto shadow"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
              {isTyping && (
                <div className="text-sm text-gray-500 italic">
                  ChatGPT is typing...
                </div>
              )}
            </div>

            {/* Input Field */}
            <div className="flex items-center px-3 py-4 border-t border-gray-200 bg-white">
              <button
                onClick={handleVoiceInput}
                className="text-blue-500 hover:text-blue-600 mr-2"
              >
                <Mic className={recording ? "animate-pulse" : ""} size={20} />
              </button>
              <input
                className="flex-grow px-3 py-1.5 rounded-lg border border-gray-300 text-sm outline-none"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputText);
                  }
                }}
              />
              <button
                onClick={() => handleSend(inputText)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lottie animationData={BotAnimation} className="w-30 h-30" />
        </motion.button>
      )}
    </div>
  );
};

export default ChatBot;
