import { GoogleGenerativeAI } from "@google/generative-ai";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const parseResume = async (pdfBuffer) => {
    try {
        // Extract text from PDF buffer
        const pdfData = await pdfParse(pdfBuffer);
        const extractedText = pdfData.text;

        if (!extractedText || extractedText.trim() === "") {
            throw new Error("Could not extract any text from the PDF. The file might be corrupted or image-based.");
        }

        // Initialize Gemini client
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing from environment variables.");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `You are a resume parsing assistant. Extract information from the 
resume text below and return ONLY a valid JSON object with no extra 
text, no markdown, no code blocks, no backticks. 
The JSON must have exactly these fields:
{
  "fullname": string,
  "email": string,
  "phoneNumber": string,
  "bio": string (2-3 line professional summary),
  "skills": array of strings (individual skills only, no descriptions),
  "education": array of { "degree": string, "institution": string, "year": string },
  "experience": array of { "title": string, "company": string, "duration": string, "description": string }
}
If a field cannot be found, use empty string or empty array.

Resume text:
${extractedText}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Strip any accidental markdown fences before parsing
        const clean = responseText.replace(/```json|```/g, "").trim();
        
        const parsedData = JSON.parse(clean);
        return parsedData;

    } catch (error) {
        console.error("Error in resumeParser:", error);
        throw new Error(error.message || "Failed to parse resume");
    }
};
