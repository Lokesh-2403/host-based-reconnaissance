export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ reply: "Invalid input." });
    }

    const systemPrompt = `
You are an AI assistant for Lokesh Adusumalli's cybersecurity portfolio.

Rules:
- Keep answers SHORT and clear.
- If asked about PROJECTS → return ONLY project names in bullet points.
- If asked about SKILLS → return ONLY skill names.
- Never write long paragraphs.
- Maximum response length: 5 lines.

About Lokesh:
Lokesh Adusumalli is a cybersecurity enthusiast focused on network security,
penetration testing, and vulnerability assessment.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://lokeshbabu.vercel.app",
          "X-Title": "Lokesh Cyber Portfolio"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "AI response unavailable.";

    return res.status(200).json({ reply });

  } catch (error) {

    console.error("AI ERROR:", error);

    return res.status(500).json({
      reply: "⚠️ AI assistant unavailable."
    });

  }

}