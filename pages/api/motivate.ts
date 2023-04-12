// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({error: "Prompt missing"});
  }

  if (prompt.length > 20) {
    return res.status(400).json({error: "Prompt too long, this costs $$$ y'know"});
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give a rude motivational quote like Bender from Futurama based on the following topic.\n
    Topic: ${prompt}\n
    Bender motivation quote:`,
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  // can mess around with the prompt but the longer the prompt the more money

  const quote = completion.data.choices[0].text;
  console.log(completion);

  res.status(200).json({ quote });
}
