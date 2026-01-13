import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { message } = req.body;

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: "Du bist Mabel, freundlich, klar, nicht explizit." },
        { role: "user", content: message },
      ],
    });

    res.status(200).json({ reply: response.output_text });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
}
