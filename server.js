import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 API KEY BURAYA
const API_KEY = "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";

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "Kullanıcıya komik, serbest, eğlenceli bir şekilde cevap veren ama küfür etmeyen premium bir yapay zekasın. Adın nigg.ai." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    res.json({ reply: botMessage });
  } catch (err) {
    console.log(err);
    res.json({ reply: "⚠️ Sunucu hatası." });
  }
});

app.listen(3000, () => console.log("🚀 Backend çalışıyor (3000)"));
