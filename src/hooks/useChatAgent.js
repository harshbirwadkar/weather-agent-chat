import { useState, useCallback } from 'react';

const API_URL = 'https://brief-thousands-sunset-9fcb1c78-485f-4967-ac04-2759a8fa1462.mastra.cloud/api/agents/weatherAgent/stream';

// A mock function to simulate a streaming API response as a fallback
const streamMockResponse = async (onChunk) => {
  const response = "(Fallback) The real API seems to be down. This is a mocked response: It's sunny with a high of 28°C.";
  const words = response.split(' ');

  for (const word of words) {
    await new Promise(resolve => setTimeout(resolve, 80)); // Delay between words
    onChunk(word + ' ');
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

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'x-mastra-dev-playground': 'true',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: message }
          ],
          runId: 'weatherAgent',
          maxRetries: 2,
          maxSteps: 5,
          temperature: 0.5,
          topP: 1,
          runtimeContext: {},
          threadId: '803', //actual roll number
          resourceId: 'weatherAgent',
        }),
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
      // Fallback to mock response on API failure
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