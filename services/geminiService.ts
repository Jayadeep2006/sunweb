
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export class SupportAI {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async getResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: `You are the AI Assistant for SRI THIRUMALA ENTERPRISES, an authorized Sun Direct DTH service provider.
          
          Business Identity:
          - Name: SRI THIRUMALA ENTERPRISES
          - Support Number: 9985265605
          
          Hardware Parts Knowledge (Always quote these prices if asked):
          1. Antenna Dish: ₹850 (High-gain 60cm)
          2. Remote Control: Standard ₹249, Universal ₹499
          3. Coaxial Cable: RG6 Wire ₹450 (30-meter bundle)
          4. LNB (Signal Receiver): Dual LNB ₹599
          5. STB (Set Top Box): Standard HD ₹1999, 4K Ultra HD ₹2999
          
          Technical Support Guidelines:
          - Error E-32-52: No signal. Tell customer to check if the dish is loose or if rain is blocking signal.
          - No Power: If STB lights aren't on, check the power adapter and wall socket.
          - Retailers/Workers: Mention that we have a network of 50+ retailers and 20+ field technicians (DTH workers) ready for home visits.
          
          Tone: Helpful, professional, and locally grounded. If you can't solve it, tell them to call 9985265605.`,
          temperature: 0.7,
        }
      });

      return response.text || "I'm sorry, I couldn't process that request. Please try again.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while connecting to the AI service.";
    }
  }
}

export const supportAI = new SupportAI();
