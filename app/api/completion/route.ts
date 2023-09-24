import {OpenAI} from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

// function buildPrompt(prompt: string) {
//   console.log(prompt.split('\n').map((message) => ({
//     role: 'user',
//     content: message,
//   })));
//   return prompt.split('\n').map((message) => ({
//     role: 'user',
//     content: message,
//   }));
// }

function buildPrompt(prompt: string) {
  return [
    {
      role: 'user',
      content: prompt.trim(),
    },
  ];
}


export async function POST(req: Request) {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      max_tokens: 1600,
      messages: buildPrompt(prompt)
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
} 


// function generatePrompt(input) {
//   return `${input}`
// }