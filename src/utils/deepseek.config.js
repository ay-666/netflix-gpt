import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEPSEEK_API_SECRET_KEY,
  dangerouslyAllowBrowser:true
});

export default openai;