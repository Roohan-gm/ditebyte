import axios from "axios";
import OpenAI from "openai";

// Initialize client with proper configuration
const openaiClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1", // Ensure this is the correct endpoint
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true, // Required for React Native
});

// Unified API call function
const createChatCompletion = async (prompt) => {
  try {
    return await openaiClient.chat.completions.create({
      model: "deepseek/deepseek-prover-v2:free", // Ensure this model is available
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to create chat completion: " + error.message);
  }
};

// Generic handler for all endpoints
export const aiHandler = async (prompt, parser) => {
  try {
    const response = await createChatCompletion(prompt);
    if (!response.choices || response.choices.length === 0) {
      throw new Error("No choices available in the response.");
    }
    return parser(response);
  } catch (error) {
    console.error("Handler Error:", error);
    return null;
  }
};

// Specific service functions
export const CalculateCaloriesAi = async (prompt) =>
  aiHandler(prompt, (response) => response.choices[0]?.message?.content);

export const GenerateRecipeOptionsAi = async (prompt) =>
  aiHandler(prompt, (response) => response.choices[0]?.message?.content);

export const GenerateAIRecipeModel = async (prompt) =>
  aiHandler(prompt, (response) => response.choices[0]?.message?.content);

// export async function GenerateImage(prompt) {
//   try {

//     console.log('start img gen');
//     const response = await fetch('https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev', {
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_HUGGINGFACE_READ_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//       body: JSON.stringify({
//         inputs: prompt
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const blob = await response.blob();
//     console.log('Blog data: ', blob);

//     // Convert blob to data URL
//     const reader = new FileReader();
//     return new Promise((resolve, reject) => {
//       reader.onloadend = () => {
//         const dataUrl = reader.result;
//         resolve(dataUrl);
//       };
//       reader.onerror = (error) => {
//         reject(new Error('Error reading blob data', error));
//       };
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Error generating image:', error);
//     throw error;
//   }
// }
