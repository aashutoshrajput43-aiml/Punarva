import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const q = (message || "").toLowerCase();

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey && geminiKey.trim().length > 0) {
      try {
        const aiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are PunarvaBot AI, the official intelligent assistant for Punarva — an Indian circular economy and surplus food rescue platform connecting hotels, restaurants, caterers with NGOs, verified volunteers, and municipal recyclers.
You know about:
- Food donation safety and FSSAI surplus food regulations
- Good Samaritan Act protections for donors
- 80G tax deduction certificates generated on delivery
- Waste sorting: wet/organic, recyclables (paper, plastic, glass, metal), e-waste, hazardous
- Live GPS tracking on the /map radar
- How volunteers rescue food with insulated cold-chain bags

User Query: "${message}"

Give a helpful, encouraging, concise (2-4 sentences) answer with practical guidance and links if helpful.`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          const replyText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText.trim() });
          }
        }
      } catch (err) {
        // quiet fallback
      }
    }

    // Deterministic Rule Engine for Chatbot
    let reply = "Welcome to Punarva! You can donate surplus food in under 30 seconds at /donate, view live food dispatches on our tactical Live Map (/map), or sort waste materials at /waste-sorter.";
    let quickReplies: { label: string; action: string }[] = [];

    if (q.includes("donate") || q.includes("extra food") || q.includes("hotel") || q.includes("wedding")) {
      reply = "Donating surplus food is simple! Go to the Donate page (/donate) where our 5-step wizard (or 30-second quick mode) allows you to log meals, run instant AI Freshness Scoring, and dispatch the nearest verified volunteer to collect it.";
      quickReplies = [
        { label: "Go to Donate Wizard", action: "How do I start donating?" },
        { label: "Check Food Safety Rules", action: "What food can be donated under FSSAI?" },
      ];
    } else if (q.includes("pizza") || q.includes("box") || q.includes("cardboard") || q.includes("oil")) {
      reply = "Oily or greasy food packaging (like cheesy pizza box bottoms) cannot be recycled with paper because oils contaminate the pulping process. Tear off the clean dry lid for paper recycling, and compost the greasy base with wet organic waste!";
      quickReplies = [
        { label: "Open Waste Sorter", action: "How to use Waste Sorter?" },
        { label: "Nearest Composting Facility", action: "Where is Gobar-Dhan Bio-CNG plant?" },
      ];
    } else if (q.includes("ngo") || q.includes("shelter") || q.includes("robin")) {
      reply = "We partner with verified NGOs including Robin Hood Army, Indore Food Bank, Asha Jyoti Foundation, and Roti Bank. You can see their locations and daily intake capacity directly on our Live Map (/map).";
      quickReplies = [
        { label: "View on Live Map", action: "Show me live dispatch map" },
      ];
    } else if (q.includes("volunteer") || q.includes("driver") || q.includes("bike")) {
      reply = "Volunteers are the backbone of Punarva! As a volunteer, you receive real-time SMS/WhatsApp and in-app alerts when surplus food is ready near you. You use insulated bags for cold-chain safety and drop meals at verified shelters.";
      quickReplies = [
        { label: "Sign Up as Volunteer", action: "How do I become a volunteer?" },
        { label: "Open Volunteer App", action: "Open Volunteer Dashboard" },
      ];
    } else if (q.includes("80g") || q.includes("tax") || q.includes("receipt") || q.includes("certificate")) {
      reply = "Every verified food rescue on Punarva automatically generates an auditable 80G-style tax deduction certificate for the donor, signed digitally with delivery PIN verification and meal calculation formulas.";
    } else if (q.includes("fssai") || q.includes("safety") || q.includes("hygiene") || q.includes("law")) {
      reply = "Under the FSSAI (Recovery & Distribution of Surplus Food) Regulations and the Good Samaritan provisions, donors who act in good faith are protected from liability. Food must be stored at safe holding temperatures (hot above 60°C or cold below 5°C).";
    }

    return NextResponse.json({ reply, quickReplies });
  } catch (err: any) {
    return NextResponse.json({
      reply: "Punarva is live and monitoring surplus food rescue missions across India. How can I assist you?",
    });
  }
}

