import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_SECRET_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true
});

export default openai;