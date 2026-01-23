import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const PLATFORM_CONTEXT = `
You are AarogyaAI, documentation assistant for Aarogya Aadhar.

RULES:
- Only provide links from https://work.aarogyaaadhar.com/
- Never include any other government or external site.
- Do NOT generate markdown links. Always output plain URLs only.
- Keep responses clean and structured.
`;

// Auto-link buttons
const LINK_MAP = [
  {
    keywords: ["login as patient", "patient login", "patient signin"],
    label: "Patient Login",
    url: "https://work.aarogyaaadhar.com/patient/login"
  },
  {
    keywords: ["doctor login", "doctor signin"],
    label: "Doctor Login",
    url: "https://work.aarogyaaadhar.com/doctor/login"
  },
  {
    keywords: ["pharmacy login", "chemist login"],
    label: "Pharmacy Login",
    url: "https://work.aarogyaaadhar.com/pharmacy/login"
  },
  {
    keywords: ["admin login", "admin panel"],
    label: "Admin Login",
    url: "https://work.aarogyaaadhar.com/admin/login"
  }
];

// Clean links
function cleanLinks(text) {
  if (!text) return "";

  const allowed = "https://work.aarogyaaadhar.com";

  // 1️⃣ Remove any markdown hyperlink but KEEP the visible text
  text = text.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, (match, label, url) => {
    return url.startsWith(allowed) ? url : "";
  });

  // 2️⃣ Remove ALL raw URLs NOT from allowed domain
  text = text.replace(/https?:\/\/[^\s)]+/g, (url) => {
    return url.startsWith(allowed) ? url : "";
  });

  return text.trim();
}

// Main AI route
app.post("/api/ai-docs", async (req, res) => {
  try {
    const { message } = req.body;

    let buttons = [];

    for (const item of LINK_MAP) {
      if (item.keywords.some(k => message.toLowerCase().includes(k))) {
        buttons.push({
          label: item.label,
          url: item.url
        });
      }
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: PLATFORM_CONTEXT },
        { role: "user", content: message }
      ],
      temperature: 0.4
    });

    let aiReply = completion.choices[0].message.content;

    // Remove unwanted links
    aiReply = cleanLinks(aiReply);

    res.json({
      reply: aiReply,
      buttons
    });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({
      reply: "⚠️ AI server error.",
      buttons: []
    });
  }
});

app.listen(5000, () =>
  console.log("🚀 Groq AI Server running at http://localhost:5000")
);
