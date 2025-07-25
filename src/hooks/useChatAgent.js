// // import { useState, useCallback } from 'react';

// const API_URL = 'https://brief-thousands-sunset-9fcb1c78-485f-4967-ac04-2759a8fa1462.mastra.cloud/api/agents/weatherAgent/stream';

// // A mock function to simulate a streaming API response as a fallback
// const streamMockResponse = async (onChunk) => {
//   const response = "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww wwwwwwwwwww(Fallback) The real API seems to be down. This is a mocked response: It's sunny with a high of 28°C.";
//   const words = response.split(' ');

//   for (const word of words) {
//     await new Promise(resolve => setTimeout(resolve, 80)); // Delay between words
//     onChunk(word + ' ');
//   }
// };

// const updateLastMessage = (prev, chunk) => {
//   const lastMessageIndex = prev.length - 1;
//   const lastMessage = prev[lastMessageIndex];
  
//   if (lastMessage && lastMessage.role === 'agent') {
//     const updatedMessages = [...prev];
//     updatedMessages[lastMessageIndex] = {
//       ...lastMessage,
//       content: lastMessage.content + chunk,
//     };
//     return updatedMessages;
//   }
//   return prev;
// };

// export const useChatAgent = () => {
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const sendMessage = useCallback(async (message) => {
//     setIsLoading(true);
//     setError(null);

//     const userMessage = { role: 'user', content: message };
//     setMessages(prev => [...prev, userMessage, { role: 'agent', content: '' }]);

//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // headers: {
//         //   'Accept': '*/*',
//         //   'Accept-Language': 'en-US,en-GB;q=0.9,en;q=0.8,fr;q=0.7',
//         //   'Connection': 'keep-alive',
//         //   'Content-Type': 'application/json',
//         //   'x-mastra-dev-playground': 'true',
//         // },
//         body: JSON.stringify({message}),
        
//         // body: JSON.stringify({
//         //   messages: [
//         //     { role: 'user', content: message }
//         //   ],
//         //   runId: 'weatherAgent',
//         //   maxRetries: 2,
//         //   maxSteps: 5,
//         //   temperature: 0.5,
//         //   topP: 1,
//         //   runtimeContext: {},
//         //   threadId: '803', //actual roll number
//         //   resourceId: 'weatherAgent',
//         // }),
//       });

//       if (!response.ok || !response.body) {
//         throw new Error('API request failed');
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value, { stream: true });
//         setMessages(prev => updateLastMessage(prev, chunk));
//       }

//     } catch (e) {
//       console.error('API call failed, switching to mock response:', e);
//       // Fallback to mock response on API failure
//       await streamMockResponse((chunk) => {
//         setMessages(prev => updateLastMessage(prev, chunk));
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   return { messages, isLoading, error, sendMessage };
// };
// export default useChatAgent;

import { useState, useCallback } from 'react';

const API_URL = 'https://brief-thousands-sunset-9fcb1c78-485f-4967-ac04-2759a8fa1462.mastra.cloud/api/agents/weatherAgent/stream';

// A mock function to simulate a streaming API response as a fallback
// const mockResponses = [
//   "Today in Mumbai, the weather is warm and slightly humid. As of now, the temperature is around 32°C with a RealFeel of 36°C due to the high humidity levels of approximately 72%. Skies are mostly sunny with a few scattered clouds. Winds are light, blowing from the west-northwest at 13 km/h, making it feel a bit more comfortable along the coast.",
//   "Currently, it's raining lightly in Bengaluru with a cool breeze coming from the south. The temperature is 24°C and humidity is at 80%. Expect showers to continue until the evening.",
//   "Delhi is experiencing a heatwave today, with temperatures soaring up to 41°C. Skies are clear and no rain is expected. Air quality is poor, so outdoor activities are not recommended.",
//   "In Kolkata, the weather is partly cloudy with occasional sunshine. The temperature is 30°C, and there's a chance of a thunderstorm later in the afternoon.",
//   "Chennai is hot and humid today. The temperature is 34°C and humidity is 78%. A sea breeze will bring some relief in the evening.",
//   "Pune is enjoying pleasant weather with clear skies and a temperature of 26°C. Light winds from the west are making it a comfortable day.",
//   "There's a mild chill in Shimla this morning. The temperature is 14°C, and skies are mostly clear. Perfect weather for a walk in the hills.",
//   "Goa is sunny and warm, ideal for beachgoers. The temperature is 31°C, and the sea is calm. UV index is high, so sunscreen is recommended.",
//   "Hyderabad is cloudy with a chance of rain in the late afternoon. The temperature is 29°C, and humidity is moderate.",
//   "Lucknow is experiencing moderate temperatures around 28°C with partly cloudy skies. No rain is expected today."
// ];

const mockResponses = [
  `# Weather Update\n\nToday’s forecast brings a mix of sun and clouds across most regions, with weather patterns showing significant variation between the north and south. In the northern areas, residents can expect mild temperatures accompanied by a gentle breeze, making it an ideal day for outdoor activities such as walking or cycling. Meanwhile, southern cities will experience a noticeable rise in temperatures, with highs reaching up to 35°C by the afternoon. Meteorologists advise that a brief shower may occur in some central regions, but skies are expected to clear by evening, providing a pleasant end to the day.\n\n**Tips:**\n- Stay hydrated throughout the day, especially during peak afternoon hours.\n- Use sun protection if you’re heading outside for extended periods.\n- Keep an umbrella handy in case of unexpected showers.`,

  `# Did You Know?\n\nThe water cycle is one of the most crucial natural processes on Earth, ensuring the continuous movement of water within the atmosphere, land, and oceans. It begins with the evaporation of water from surfaces like lakes and rivers, followed by condensation that forms clouds, and finally precipitation which returns water to the ground. This ongoing cycle not only sustains plant and animal life but also plays a vital role in regulating the planet’s climate and supporting diverse ecosystems. Without the water cycle, life as we know it would not be possible.\n\nThis cycle is essential for:\n- Maintaining life on Earth\n- Regulating climate\n- Supporting ecosystems`,

  `# Healthy Living Tips\n\nMaintaining a healthy lifestyle is more important than ever in today’s fast-paced world. Simple daily habits can have a profound impact on your overall well-being. Drinking enough water helps regulate body temperature and supports vital organ functions. Including a variety of fruits and vegetables in your meals ensures you get essential vitamins and minerals. Regular movement, even if just stretching at your desk, helps reduce muscle tension and improve circulation.\n\n- Drink at least **8 glasses of water** daily.\n- Include **fruits and vegetables** in every meal.\n- Take short breaks to stretch often, especially if you’re working at a desk.\n- Aim for at least **30 minutes** of physical activity daily.`,

  `# Cloud Computing Overview\n\nCloud computing has revolutionized the way individuals and businesses access, store, and process data. Instead of relying solely on local computers or servers, cloud computing enables users to leverage powerful remote servers accessible via the internet. This shift has led to increased flexibility, allowing people to work from anywhere and collaborate in real time. Security, scalability, and cost-effectiveness are some of the main reasons organizations are rapidly adopting cloud-based solutions.\n\n**Key benefits include:**\n- Scalability: Easily adjust resources to match your needs.\n- Cost-effectiveness: Pay only for what you use, reducing unnecessary expenses.\n- Flexibility: Access data and applications from any location.\n- Enhanced collaboration: Share and work on documents with others in real time.`,

  `# Renewable Energy Sources\n\nRenewable energy is derived from natural processes that are constantly replenished, such as sunlight, wind, and water flow. Unlike fossil fuels, these sources do not deplete over time and have a much lower environmental impact. The adoption of renewable energy technologies is crucial for reducing greenhouse gas emissions and combating climate change. As technology advances, the efficiency and affordability of renewable energy systems continue to improve, making them a viable option for more communities around the world.\n\n**Examples:**\n- Solar panels: Convert sunlight into electricity.\n- Wind turbines: Harness wind energy to generate power.\n- Hydropower: Uses flowing water to produce electricity.`
];

// const streamMockResponse = async (onChunk) => {
//   // Pick a random response
//   const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
//   const words = response.split(' ');

//   for (const word of words) {
//     await new Promise(resolve => setTimeout(resolve, 80)); // Delay between words
//     onChunk(word + ' ');
//   }
// };

const streamMockResponse = async (onChunk) => {
  const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  const lines = response.split('\n');

  for (const line of lines) {
    await new Promise(resolve => setTimeout(resolve, 150)); // Slightly longer for lines
    onChunk(line + '\n');
  }
};

const updateLastMessage = (prev, chunk) => {
  const lastMessageIndex = prev.length - 1;
  const lastMessage = prev[lastMessageIndex];
  
  if (lastMessage && lastMessage.role === 'agent') {
    const updatedMessages = [...prev];
    updatedMessages[lastMessageIndex] = {
      ...lastMessage,
      content: lastMessage.content + chunk,
    };
    return updatedMessages;
  }
  return prev;
};

export const useChatAgent = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    setError(null);

    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage, { role: 'agent', content: '' }]);

    // --- ORIGINAL CODE COMMENTED OUT ---
    /*
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message}),
      });

      if (!response.ok || !response.body) {
        throw new Error('API request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => updateLastMessage(prev, chunk));
      }
    } catch (e) {
      console.error('API call failed, switching to mock response:', e);
      await streamMockResponse((chunk) => {
        setMessages(prev => updateLastMessage(prev, chunk));
      });
    } finally {
      setIsLoading(false);
    }
    */

    // --- MASTRA AGENT STREAMING IMPLEMENTATION ---
    try {
      const { MastraClient } = await import("@mastra/client-js");
      const client = new MastraClient();
      const agent = client.getAgent("weatherAgent");
      const response = await agent.stream({
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        runId: "weatherAgent",
        maxRetries: 2,
        maxSteps: 5,
        temperature: 0.5,
        topP: 1,
        runtimeContext: {},
        threadId: "803",
        resourceId: "weatherAgent"
      });

      await response.processDataStream({
        onTextPart: (text) => {
          setMessages(prev => updateLastMessage(prev, text));
        },
        onErrorPart: (error) => {
          setError(error?.message || 'Agent error');
        }
      });
    } catch (e) {
      console.error('Mastra API call failed, switching to mock response:', e);
      await streamMockResponse((chunk) => {
        setMessages(prev => updateLastMessage(prev, chunk));
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, error, sendMessage };
};
export default useChatAgent;