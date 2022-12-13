import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.audience, req.body.service, req.body.offer),
    temperature: 0.6,
    max_tokens: 2048
  });
  //res.status(200).json({ result: completion.data.choices[0].text });
  res.status(200).json({ result: completion.data });
}

function generatePrompt(audience, service, offer) {
  return `
  Write 10 paragraphs of Facebook ad copy designed to sell a ${service} service.
  Do not label the paragraphs by number. 
  Talk about common problems people have if they're not using a ${service} service and try to minimize the amount of times you mention ${service}.
  Write it at a 4th grade level. 
  Write in a direct response style in the voice of a trusted consultant.
  Direct it towards an audience of ${audience}.
  Use a call to action of getting a ${offer}.
  Do not start your response with a full stop or white space.
  `;
}