
export class SupportAI {
  async getResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    try {
      const systemInstruction = `You are the AI Assistant for SRI THIRUMALA ENTERPRISES, an authorized Sun Direct DTH service provider.
          
          Business Identity:
          - Name: SRI THIRUMALA ENTERPRISES
          - Support Number: 9985265605
          
          Inventory Knowledge (6 Core Parts):
          1. Satellite Antenna Dish (Blue): ₹850
          2. Remote Control (Standard/Universal): ₹399
          3. RG6 Coaxial Cable (30m Roll): ₹450
          4. Dual LNB (Signal Receiver): ₹599
          5. 4K Ultra HD STB (HSG200): ₹1999
          6. HDMI 2.1 Cable (8K Ready): ₹299
          
          Guidelines: Professional, local, helpful. Support: 9985265605. If customers ask about hardware, refer to the prices above.`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, systemInstruction })
      });

      if (!res.ok) throw new Error("Backend AI Proxy Error");
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("AI Response was not JSON!");
      }

      const data = await res.json();
      return data.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Chat Error:", error);
      return "An error occurred while connecting to our support servers. Please try again later.";
    }
  }
}

export const supportAI = new SupportAI();
