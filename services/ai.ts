import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Categorize expense based on text description
export const categorizeExpenseAI = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Categorize this expense description into one of these categories: Food, Travel, Leisure, Academic, Shopping, Misc. 
      Also provide a 2-word summary and a relevant emoji.
      Description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            emoji: { type: Type.STRING },
            summary: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("AI Categorization failed", e);
    return { category: 'Misc', emoji: '📦', summary: description };
  }
};

// Analyze receipt image to extract amount and merchant
export const analyzeReceiptAI = async (base64Image: string) => {
  try {
    // Remove data URL prefix if present
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Flash is good for multimodal
      contents: {
        parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
            { text: "Extract the Total Amount and Merchant Name from this receipt. Guess the Category." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            amount: { type: Type.NUMBER },
            merchant: { type: Type.STRING },
            category: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Receipt analysis failed", e);
    return null;
  }
};

// Generate a smart financial nudge based on spending context
export const getSmartNudgeAI = async (spent: number, budget: number, categories: any[]) => {
  try {
    const categorySummary = categories.map(c => `${c.name}: ${c.amount}`).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `I have spent ${spent} out of my ${budget} budget. 
      Breakdown: ${categorySummary}.
      Give me a friendly, 1-sentence motivational or cautionary financial nudge for a student.
      Start with an emoji.`,
    });
    return response.text;
  } catch (e) {
    return "⚡ You're doing great! Keep an eye on your daily limit.";
  }
};

// Generate a savings plan for a goal
export const generateGoalPlanAI = async (goalName: string, amount: number, weeks: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a motivational savings plan for a student saving for "${goalName}" costing ${amount} over ${weeks} weeks.
      Return a JSON with a list of 3 short milestones (strings) and a motivational quote.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            milestones: { type: Type.ARRAY, items: { type: Type.STRING } },
            quote: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return { milestones: ["Start saving", "Halfway there", "Goal reached!"], quote: "You got this!" };
  }
};
