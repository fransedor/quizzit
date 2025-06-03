"use server";
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

// Ensure GEMINI_API_KEY is defined before creating the ai instance
if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY is not set in environment variables. Cannot initialize GoogleGenAI."
  );
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export async function generateQuiz(formData: FormData) {
  // API key is already checked at the module level during 'ai' instantiation.
  // If it was missing, the server would have failed to start or this module to load.

  const { file, topic, amount } = {
    file: formData.get("file"),
    topic: formData.get("topic"),
    amount: formData.get("amount") as string,
  };

  if (!file || !topic || !amount) {
    console.error("Missing required fields in generateQuiz", { file, topic, amount });
    throw new Error("Missing required fields");
  }
  if (!(file instanceof File)) {
    console.error("Expected a file in formData, but got:", typeof file);
    throw new Error("Expected a file in formData");
  }

  
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    console.log("Transforming to uint8Array");
    const parts = [
      {
        inlineData: {
          mimeType: file.type,
          data: Buffer.from(uint8Array).toString("base64"),
        },
      },
      {
        text: `Based on the content of the provided file, generate ${amount} multiple choice questions about "${topic}". Each question should have 4 options and one correct answer. Format the output as a JSON array of objects, where each object has the following properties: "question" (string), "options" (array of strings), and "answer" (string). Ensure the answer is one of the provided options. The JSON should be well-formed and parseable.`,
      },
    ];

    console.log("Generating quiz");

    // Use the globally defined 'ai' instance
    const result = await ai.models.generateContentStream({
      model: "gemini-2.0-flash-lite",
      config: {
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      },
      contents: [{ role: "user", parts }],
    });

    let responseText = "";
    for await (const chunk of result) {
      const chunkText = chunk.text;
      if (chunkText) {
        responseText += chunkText;
      }
    }

    let cleanedResponseText = responseText.trim();
    if (cleanedResponseText.startsWith("```json")) {
      // Remove ```json prefix (and any potential leading/trailing whitespace around it)
      cleanedResponseText = cleanedResponseText
        .substring(cleanedResponseText.indexOf("```json") + 7)
        .trimStart();
    }
    if (cleanedResponseText.endsWith("```")) {
      // Remove ``` suffix (and any potential leading/trailing whitespace around it)
      cleanedResponseText = cleanedResponseText
        .substring(0, cleanedResponseText.lastIndexOf("```"))
        .trimEnd();
    }
    cleanedResponseText = cleanedResponseText.trim();

    try {
      const quizQuestions: QuizQuestion[] = JSON.parse(cleanedResponseText);
      return quizQuestions;
    } catch (parseError) {
      console.error("Failed to parse JSON response from AI:", parseError);
      console.error("Cleaned response text that failed to parse:", cleanedResponseText);
      throw new Error("Failed to parse quiz questions from AI response");
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
} 