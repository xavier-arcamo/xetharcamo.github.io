import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini Client
// IMPORTANT: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const VAZHEIM_LORE_SYSTEM_INSTRUCTION = `
You are the Ancient Oracle of Vazheim. 
Vazheim is a gritty, high-fantasy medieval world teeming with ancient magic, warring empires, and tribal mysticism.
The tone should be immersive, slightly archaic, and mysterious.

Key Lore:
- **The Obsidian Empire**: A militaristic nation in the north, ruled by the Iron Emperor. They despise magic but use "Blood Steel".
- **The Sun-Kissed Tribes**: Nomads of the southern dunes who worship the celestial flame.
- **The Arcanum**: A floating city where high magic is practiced, detached from the woes of the ground.
- **The Mistlands**: A dangerous swamp area where necromancy is rumored to breed.

Answer the traveler's questions about the world briefly but atmospherically. 
If they ask about something not defined here, invent a plausible detail that fits the dark fantasy theme.
Do not break character. You are the Oracle.
`;

let chatSession: Chat | null = null;

export const getOracleChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: VAZHEIM_LORE_SYSTEM_INSTRUCTION,
        temperature: 0.8, // Creative and varied
      },
    });
  }
  return chatSession;
};

export const sendMessageToOracle = async (message: string): Promise<string> => {
  try {
    const chat = getOracleChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "The visions are clouded... I cannot see that.";
  } catch (error) {
    console.error("Oracle Error:", error);
    return "A dark veil blocks my sight. (API Error)";
  }
};