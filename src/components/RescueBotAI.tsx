"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, MessageSquare, X, Send, Bot, User, ArrowRight, CornerDownLeft } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  quickReplies?: { label: string; action: string }[];
}

export default function RescueBotAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Namaste! I am PunarvaBot AI — your 24/7 circular economy and surplus food rescue assistant. How can I assist your mission today?",
      quickReplies: [
        { label: "🍲 How to donate surplus food?", action: "How do I donate extra food?" },
        { label: "📦 Is a pizza box recyclable?", action: "Is an oily pizza box recyclable or wet waste?" },
        { label: "📍 Find nearest NGO shelters", action: "Show me nearest NGOs in Indore" },
        { label: "📜 Good Samaritan & 80G tax rules", action: "What are the legal protections and 80G tax deductions?" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: data.reply,
            quickReplies: data.quickReplies || undefined,
          },
        ]);
      } else {
        throw new Error("Chatbot failed");
      }
    } catch (e) {
      // Deterministic fallback answers
      let fallback = "Punarva facilitates rapid food rescue with FSSAI compliance and AI freshness verification. You can list surplus in under 30 seconds at /donate or view live dispatches on /map.";
      if (query.toLowerCase().includes("pizza") || query.toLowerCase().includes("box")) {
        fallback = "Greasy or food-soiled pizza boxes cannot be recycled with paper because oil contaminates the pulp! Segregate clean lids for dry paper recycling, and put the greasy bottom into wet/composting waste.";
      } else if (query.toLowerCase().includes("ngo") || query.toLowerCase().includes("shelter")) {
        fallback = "We partner with verified NGOs like Robin Hood Army, Indore Food Bank, and Asha Jyoti Foundation. Open the Live Map (/map) to see their real-time locations and daily capacity.";
      } else if (query.toLowerCase().includes("80g") || query.toLowerCase().includes("tax") || query.toLowerCase().includes("law")) {
        fallback = "Under the FSSAI Food Safety and Standards (Recovery & Distribution of Surplus Food) Regulations and the Good Samaritan Act, donors are protected against liability when donating in good faith. Additionally, every verified delivery automatically generates an 80G-style tax exemption certificate!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: fallback,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open PunarvaBot AI"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-2xl shadow-emerald-950/60 transition-all transform hover:scale-105 active:scale-95 border border-emerald-400/40"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-emerald-900 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-emerald-900" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold leading-none tracking-wide">PunarvaBot AI</div>
              <div className="text-[10px] text-emerald-200 opacity-90 leading-tight">Gemini & Heuristic</div>
            </div>
          </button>
        ) : null}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] max-h-[85vh] rounded-2xl border border-emerald-800/40 bg-slate-950/95 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950 to-slate-900 border-b border-emerald-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  PunarvaBot AI
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-300/80">Food & Waste Intelligence Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-900/60 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-slate-900/90 text-slate-200 border border-emerald-900/40 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {m.quickReplies && m.quickReplies.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-emerald-900/40 flex flex-wrap gap-1.5">
                      {m.quickReplies.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(q.action)}
                          className="text-[10px] bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-800/40 transition-colors"
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {m.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-amber-600/30 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-emerald-400 text-xs italic">
                <Bot className="w-4 h-4 animate-bounce" />
                RescueBot is analyzing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick links footer */}
          <div className="px-3 py-1.5 bg-slate-900/40 border-t border-emerald-900/30 flex items-center justify-between text-[11px] text-slate-400">
            <span>Quick Nav:</span>
            <div className="flex gap-2">
              <Link href="/donate" className="text-amber-400 hover:underline">Donate</Link>
              <span>•</span>
              <Link href="/map" className="text-emerald-400 hover:underline">Live Map</Link>
              <span>•</span>
              <Link href="/waste-sorter" className="text-cyan-400 hover:underline">Waste Sorter</Link>
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-emerald-900/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about food rescue, waste sorting, or FSSAI..."
                className="flex-1 bg-slate-950 text-white rounded-xl px-3.5 py-2 text-xs border border-emerald-900/60 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

