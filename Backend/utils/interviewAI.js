import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateFirstQuestion = async (jobData, userProfile) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing from environment variables.");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using gemini-flash-latest to avoid free tier quota limits
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `You are a professional interviewer at ${jobData.companyName} conducting a 
    real interview for the position of ${jobData.title}.
    
    Job Description: ${jobData.description}
    Required Skills: ${(jobData.requirements || []).join(', ')}
    
    Candidate Profile:
    - Name: ${userProfile.fullname}
    - Skills: ${(userProfile.skills || []).join(', ')}
    - Bio: ${userProfile.bio}
    
    Start the interview with a warm professional greeting addressing 
    the candidate by first name, then ask your first interview question. 
    The question should be relevant to the job role. 
    Keep your response under 150 words.
    Do NOT number the question.
    Do NOT say 'Question 1' or similar.`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error in generateFirstQuestion:", error);
        throw new Error(error.message || "Failed to generate first question");
    }
};

export const continueInterview = async (jobData, userProfile, conversationHistory, userAnswer, questionNumber) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing from environment variables.");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const formattedHistory = conversationHistory
            .map(msg => `${msg.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${msg.message}`)
            .join('\n');

        let prompt = "";

        if (questionNumber < 5) {
            prompt = `You are a professional interviewer at ${jobData.companyName} for the role 
      of ${jobData.title}.
      
      Job Requirements: ${(jobData.requirements || []).join(', ')}
      Candidate Skills: ${(userProfile.skills || []).join(', ')}
      
      Interview conversation so far:
      ${formattedHistory}
      
      The candidate just answered: "${userAnswer}"
      
      This is question ${questionNumber} of 5.
      
      First, give brief positive feedback on their answer in 1-2 sentences.
      Then ask the next interview question relevant to the job role.
      Vary question types: technical, behavioral, situational.
      Keep total response under 180 words.
      Do NOT number the question.`;
        } else {
            prompt = `You are a professional interviewer at ${jobData.companyName} for the role 
      of ${jobData.title}.
      
      Job Requirements: ${(jobData.requirements || []).join(', ')}
      Candidate Skills: ${(userProfile.skills || []).join(', ')}
      
      Complete interview conversation:
      ${formattedHistory}
      
      Final answer from candidate: "${userAnswer}"
      
      The interview is now complete. Do the following:
      1. Thank the candidate professionally by first name
      2. Give overall feedback in 2-3 sentences
      3. Mention 1-2 strengths you observed
      4. Mention 1 area for improvement
      5. Give a performance score out of 10 in this EXACT format 
         on its own line: SCORE: X/10
      
      Keep response under 250 words.`;
        }

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error in continueInterview:", error);
        throw new Error(error.message || "Failed to continue interview");
    }
};
