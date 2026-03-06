import OpenAI from "openai";

export default async function handler(req, res) {

  try {

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

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

Answer questions professionally about Lokesh.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply: "AI error occurred."
    });

  }

}