"use client"

import { useState, useRef, useEffect } from "react"
import { Send, MessageCircle, Minimize2, Maximize2, X, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

export default function AiDocsAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm Aarogya AI Assistant. I'm here to help you with information about our healthcare modules, workflows, and features. Ask me anything!",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const messagesEndRef = useRef(null)

  const suggestions = [
    { text: "Doctor workflow", icon: "👨‍⚕️" },
    { text: "Platform modules", icon: "🏥" },
    { text: "Patient registration", icon: "👤" },
    { text: "User roles", icon: "🔐" },
    { text: "OPD workflow", icon: "🚑" },
  ]

  const nextSuggestion = () => {
    setSuggestionIndex((prev) => (prev + 1) % suggestions.length)
  }

  const prevSuggestion = () => {
    setSuggestionIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
  }

  // SEND MESSAGE
  const sendMessage = async (customMessage = null) => {
  const finalMessage =
    typeof customMessage === "string"
      ? customMessage
      : customMessage?.text || inputValue;

  if (!finalMessage || typeof finalMessage !== "string" || !finalMessage.trim()) return;


    const userMsg = {
      id: Date.now().toString(),
      text: finalMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setIsLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/ai-docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalMessage }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data.reply || "I encountered an issue processing your request. Please try again.",
           buttons: data.buttons || [],
          sender: "ai",
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "The AI service is currently unavailable. Please try again in a moment.",
          sender: "ai",
          timestamp: new Date(),
        },
      ])
    }

    setIsLoading(false)
  }

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
  const formatBoldHeadings = (text) => {
  return text.replace(/^(.*?):/gm, "**$1:**");
};

function convertLinksToAnchors(text) {
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" style="color:#2563eb; text-decoration:underline; cursor:pointer;">$1</a>'
  );
}

  return (
    <>
      {/* FLOATING BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[99999] bg-gradient-to-br from-primary to-accent text-primary-foreground w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-300"
          aria-label="Open Aarogya Assistant"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
<div
  className={`fixed bottom-6 right-6 z-[99999] bg-card border border-border shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col
    ${isMinimized
      ? "w-[85vw] max-w-xs h-16 sm:w-80"
      : "w-[92vw] max-w-[420px] h-[75vh] max-h-[560px] sm:w-[420px] sm:h-[560px]"}
  `}
>
          {/* HEADER */}
          <div className="px-5 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-between rounded-t-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-primary-foreground text-primary p-2 rounded-lg shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold text-sm tracking-wide">Aarogya Assistant</h5>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* BODY */}
          {!isMinimized && (
            <>
              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto p-4 bg-background space-y-3">
                 {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {msg.sender === "ai" && (
                        <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                          <Sparkles className="w-4 h-4 text-accent-foreground" />
                        </div>
                      )}
                      <div className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
<div
  className={`px-4 py-3 rounded-xl text-[14px] leading-relaxed shadow-sm transition-all ${
    msg.sender === "user"
      ? "bg-primary text-primary-foreground rounded-tr-none"
      : "bg-muted text-foreground rounded-tl-none"
  }`}
  style={{ pointerEvents: "auto" }}
>
  <div
    className="whitespace-pre-line leading-relaxed font-normal"
    style={{ pointerEvents: "auto" }}
    dangerouslySetInnerHTML={{
      __html: convertLinksToAnchors(
        formatBoldHeadings(msg.text).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      )
    }}
  ></div>

  {/* BUTTONS REMAIN SAME */}
  {msg.sender === "ai" && msg.buttons && msg.buttons.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-3">
      {msg.buttons.map((btn, index) => (
        <a
          key={index}
          href={btn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg shadow hover:bg-blue-700 transition"
          style={{ pointerEvents: "auto" }}
        >
          {btn.label}
        </a>
      ))}
    </div>
  )}
</div>
                        <span className="text-xs text-muted-foreground mt-1 px-1">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-accent-foreground animate-pulse" />
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-muted text-foreground rounded-tl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="px-4 py-3 bg-background border-t border-border">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSuggestion}
                    className="flex-shrink-0 p-1.5 hover:bg-accent/20 rounded-lg transition-colors"
                    aria-label="Previous suggestion"
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => sendMessage(suggestions[suggestionIndex].text)}
                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-accent/10 hover:bg-accent/20 text-foreground transition-all duration-200 border border-accent/30 hover:border-accent/60 flex items-center gap-2 min-h-10"
                  >
                    <span className="text-base">{suggestions[suggestionIndex].icon}</span>
                    <span className="truncate font-medium">{suggestions[suggestionIndex].text}</span>
                  </button>

                  <button
                    onClick={nextSuggestion}
                    className="flex-shrink-0 p-1.5 hover:bg-accent/20 rounded-lg transition-colors"
                    aria-label="Next suggestion"
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Indicator dots */}
                <div className="flex justify-center gap-1 mt-2">
                  {suggestions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === suggestionIndex ? "bg-accent w-6" : "bg-muted-foreground/30 w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* INPUT */}
              <div className="p-3 bg-card border-t border-border flex gap-2">
                <input
                  className="flex-1 px-4 py-2.5 border border-input rounded-lg shadow-sm text-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask your question..."
                  aria-label="Message input"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="p-2.5 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
