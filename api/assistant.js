export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ reply: "Invalid input." });
    }

    const msg = message.toLowerCase();

    /* FORCE PROJECT LIST */

    if (msg.includes("project")) {
      return res.status(200).json({
        reply: `• Host-Based Network Reconnaissance & Service Enumeration
• Windows Security Event Log Analysis & Threat Detection
• Linux SSH Brute Force Detection System`
      });
    }

    /* FORCE SKILLS LIST */

    if (msg.includes("skill")) {
      return res.status(200).json({
        reply: `• Network Traffic Analysis
• SIEM Monitoring
• Log Analysis
• Incident Detection & Response
• Threat Intelligence
• Packet Analysis (Wireshark)
• Linux Security
• Windows Security
• Vulnerability Assessment`
      });
    }

    const systemPrompt = `

You are an AI assistant for Lokesh Adusumalli's cybersecurity portfolio.

Rules:
- Keep answers SHORT
- Maximum 5 lines
- No long paragraphs

About Lokesh:

Lokesh Adusumalli is a cybersecurity enthusiast focused on SOC operations,
threat detection, and network security monitoring.

If asked "Who is Lokesh":

Lokesh Adusumalli
Cybersecurity Enthusiast
Focused on SOC Analysis, Threat Detection & Network Security.

If asked about contact:

You can contact Lokesh through the contact section of this portfolio.

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