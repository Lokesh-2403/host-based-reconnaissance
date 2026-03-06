export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const systemPrompt = `
You are an AI assistant for Lokesh's cybersecurity portfolio.

About Lokesh:
- Cybersecurity enthusiast
- Skilled in networking and SOC analysis
- Built Host Based Intrusion Detection project
- Built Windows Event Log Analysis project
- Tools: Wireshark, Nmap, Splunk, Linux
- Passionate about blue team operations and threat detection
`;

  try {

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply: "AI error occurred."
    });

  }

}