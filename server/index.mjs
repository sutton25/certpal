import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  console.log("ping was called");
  res.json({ ok: true, message: "Server is alive and this is index.mjs" });
});

// ---- API CHAT HANDLER ----
app.post("/api/chat", async (req, res) => {
  console.log("/api/chat hit at:", new Date().toLocaleTimeString());

  try {
    const { messages } = req.body;
    console.log("Last incoming message:", messages?.[messages.length - 1]?.content);
    const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        model: "llama3.2",
        messages,
        stream: false,
        options: {
          num_predict: -1,   

          temperature: 0.5,
        },
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      console.error("Ollama API error:", errorText);
      return res.status(500).json({ error: "Ollama API failed" });
    }

    const data = await ollamaResponse.json();

    console.log("Ollama replied with:", data?.message?.content);

    res.json({ reply: data.message });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Failed to connect to Ollama" });
  }
});

// ---- SERVER START ----
const PORT = 3001;

app.listen(PORT, () => {
  console.log(` index.mjs loaded`);
  console.log(`Ollama AI server running at http://localhost:${PORT}`);
});
