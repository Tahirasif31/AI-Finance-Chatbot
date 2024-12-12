"use client";
import { useState } from "react";
import axios from "axios";
import "./globals.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!userInput) return;

    const newChat = [...chatHistory, { role: "user", content: userInput }];
    setChatHistory(newChat);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: userInput,
      });

      const botMessage = response.data.response || "No response from bot.";
      setChatHistory([...newChat, { role: "bot", content: botMessage }]);
    } catch (error) {
      setChatHistory([
        ...newChat,
        { role: "bot", content: "Error connecting to the server." },
      ]);
    }

    setUserInput(""); // Clear input
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center text-white">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">AI Chat</h1>
        <p className="text-lg">
          AI Chat is an AI chatbot that writes text. You can use it to write
          stories, messages, or programming code.
        </p>
      </header>
      <div className="w-full max-w-3xl bg-[#2a2a2a] rounded-lg shadow-lg p-6 flex flex-col items-center">
        <div className="w-full max-h-80 overflow-y-auto bg-[#1c1c1c] border border-gray-700 rounded-md mb-4 p-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`my-2 ${
                chat.role === "user" ? "text-blue-400" : "text-green-400"
              }`}
            >
              <strong>{chat.role === "user" ? "You:" : "Bot:"}</strong>{" "}
              {chat.content}
            </div>
          ))}
        </div>
        <div className="flex w-full">
          <input
            type="text"
            className="flex-1 bg-[#1c1c1c] border border-gray-700 text-white rounded-l-lg p-2 outline-none"
            placeholder="Chat with AI..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-r-lg"
          >
            Go
          </button>
        </div>
      </div>
      <footer className="mt-6">
        <button className="text-gray-400 underline">What is AI</button>
      </footer>
    </div>
  );
}
