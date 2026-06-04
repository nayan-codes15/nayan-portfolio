"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

import {
  Bot,
  Send,
  X,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Trash2,
} from "lucide-react";

const QUICK_REPLIES = [
  "What are your top skills?",
  "Tell me about your projects",
  "Are you available for internship?",
  "What technologies do you know?",
  "How can I contact Nayan?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error, regenerate, setMessages } =
    useChat({
      onError: (err) => console.error("Chat error:", err),
    });

  const isLoading = status === "submitted" || status === "streaming";

  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input.trim() });
    setInput("");
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen, isLoading]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpened(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    if (confirm("Clear conversation history?")) {
      setMessages([]);
    }
  };

  const handleQuickReply = (text: string) => {
    sendMessage({ text });
  };

  // Handle enter key in textarea (Shift+Enter for newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const fakeEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      // @ts-expect-error - fake event for form submission
      handleSubmit(fakeEvent);
    }
  };

  return (
    <>
      {/* Launcher Button */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col-reverse items-start gap-4 pointer-events-none">
        <div className="pointer-events-auto relative group">
          {/* Notification Badge (only shows before first open) */}
          <AnimatePresence>
            {!hasOpened && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--accent-1)] text-black px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Ask me anything!
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-[6px] border-transparent border-r-[var(--accent-1)]" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={isOpen ? handleClose : handleOpen}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-2xl relative overflow-hidden ${isOpen ? "border" : "bg-[var(--accent-1)] text-black"}`}
            style={
              isOpen
                ? {
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border)",
                  }
                : {}
            }
            title="Chat with AI about Nayan's portfolio"
          >
            {/* Pulsing ring */}
            {!isOpen && (
              <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-1)] animate-ping opacity-50" />
            )}

            {isOpen ? (
              <X className="w-6 h-6" style={{ color: "var(--text-primary)" }} />
            ) : (
              <Bot className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Chat Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="pointer-events-auto fixed inset-0 sm:inset-auto sm:bottom-24 sm:left-6 w-full sm:w-[380px] h-[100dvh] sm:h-[520px] glass-panel border sm:rounded-2xl border-[var(--border)] flex flex-col overflow-hidden shadow-2xl z-[10000]"
            >
              {/* Header */}
              <div
                className="p-4 border-b flex items-center justify-between shrink-0"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(var(--bg-primary-rgb), 0.4)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center p-[2px]">
                    <div className="w-full h-full bg-[var(--bg-primary)] rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-[var(--accent-1)]" />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Nayan&apos;s AI Assistant
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Online
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <button
                      onClick={handleClear}
                      className="p-2 rounded-full transition-colors"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                      title="Clear chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full transition-colors sm:hidden"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar relative">
                {/* Welcome Message & Quick Replies */}
                {messages.length === 0 && (
                  <div className="flex flex-col gap-4 mt-auto">
                    <div
                      className="p-4 rounded-2xl rounded-tl-sm w-[85%] self-start text-sm"
                      style={{
                        backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                        borderColor: "var(--border)",
                        border: "1px solid",
                        color: "var(--text-primary)",
                      }}
                    >
                      Hi! 👋 I&apos;m an AI assistant trained on Nayan&apos;s
                      portfolio. How can I help you today?
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      {QUICK_REPLIES.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReply(reply)}
                          className="self-end text-right px-4 py-2 rounded-full border border-[var(--accent-1)]/30 text-[var(--accent-1)] text-xs hover:bg-[var(--accent-1)]/10 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message History */}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[85%] group ${m.role === "user" ? "self-end items-end" : "self-start items-start"}`}
                  >
                    <div
                      className="p-3 rounded-2xl text-sm relative"
                      style={
                        m.role === "user"
                          ? {
                              backgroundColor: "var(--accent-1)",
                              color: "black",
                              borderRadius: "1rem 0 1rem 1rem",
                            }
                          : {
                              backgroundColor:
                                "rgba(var(--bg-primary-rgb), 0.05)",
                              borderColor: "var(--border)",
                              border: "1px solid",
                              color: "var(--text-primary)",
                              borderRadius: "0 1rem 1rem 0",
                            }
                      }
                    >
                      <div className="whitespace-pre-wrap">
                        {m.parts
                          ?.filter((p: any) => p.type === "text")
                          .map((p: any) => p.text)
                          .join("")}
                      </div>
                    </div>

                    {/* Copy Button (only for AI responses) */}
                    {m.role === "assistant" && (
                      <button
                        onClick={() =>
                          handleCopy(
                            m.id,
                            m.parts
                              ?.filter((p: any) => p.type === "text")
                              .map((p: any) => p.text)
                              .join("") || "",
                          )
                        }
                        className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 flex items-center gap-1 text-[10px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        {copiedId === m.id ? "Copied" : "Copy"}
                      </button>
                    )}
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div
                    className="self-start p-4 rounded-2xl rounded-tl-sm flex items-center gap-1"
                    style={{
                      backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                      borderColor: "var(--border)",
                      border: "1px solid",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        animationDelay: "0ms",
                        backgroundColor: "var(--text-secondary)",
                      }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        animationDelay: "150ms",
                        backgroundColor: "var(--text-secondary)",
                      }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        animationDelay: "300ms",
                        backgroundColor: "var(--text-secondary)",
                      }}
                    />
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="self-center bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center w-full mt-2">
                    <p className="mb-2">Oops! Something went wrong.</p>
                    <button
                      onClick={() => regenerate()}
                      className="flex items-center justify-center gap-2 mx-auto px-3 py-1 bg-red-500/20 rounded hover:bg-red-500/30 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Retry
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} className="h-1 shrink-0" />
              </div>

              {/* Input Area */}
              <div
                className="p-3 border-t shrink-0"
                style={{
                  backgroundColor: "rgba(var(--bg-primary-rgb), 0.6)",
                  borderColor: "var(--border)",
                }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="relative flex items-end gap-2 rounded-xl p-1"
                  style={{
                    backgroundColor: "rgba(var(--bg-primary-rgb), 0.4)",
                    borderColor: "var(--border)",
                    border: "1px solid",
                  }}
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Nayan..."
                    className="w-full max-h-[120px] min-h-[44px] bg-transparent resize-none outline-none text-sm p-3 custom-scrollbar"
                    rows={1}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 shrink-0 mb-1 mr-1 rounded-lg bg-[var(--accent-1)] text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent-1)]/90 transition-colors"
                  >
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </form>
                <div className="text-center mt-2">
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--text-secondary)", opacity: 0.6 }}
                  >
                    AI can make mistakes. Verify important info.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
