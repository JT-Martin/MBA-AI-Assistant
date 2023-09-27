import { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Define a type for message objects
type Message = {
  role: "system" | "user" | "assistant"; // Adjust role types as needed
  content: string;
};

// Function to build the prompt message
function buildPrompt(prompt: string): Message[] {
  return [
    {
      role: "user",
      content: prompt.trim(),
    },
  ];
}

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    max_tokens: 1600,
    messages: buildPrompt(prompt),
  });

  // Create a new StreamingTextResponse using OpenAIStream
  const streamingResponse = new StreamingTextResponse(OpenAIStream(response));

  // Respond with the streamingResponse
  return streamingResponse;
}
