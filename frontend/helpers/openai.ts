import dotenv from 'dotenv';
import {GoogleGenerativeAI} from '@google/generative-ai';
import pLimit from 'p-limit';

dotenv.config();

console.log('openai')

const limit = pLimit(3)

const GOOGLE_GEMINI_API_KEY: string = 'AIzaSyBNd0mXSDLl-NicOoQ9kfzI_2Rdc9XA2V4';
const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);

console.log('API Key:', process.env.OPENAI_API_KEY);


 
export const generateJobDescription = async (title: string) => {
    return limit(async () => {
        try {
            const prompt = `Generate a professional job description for the job title: "${title}".`;
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            // const models = await genAI.lise
            // console.log('Available Models:', models);
            // Generate content
            const result = await model.generateContent(prompt);
            const response = await result.response;

            // Extract the generated text
            const generatedText = response.text();
            return generatedText;
        } catch (error) {
            console.error('Error generating job description:', error);
            throw error;
        }
    });
};