import React from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import useChatAgent from './hooks/useChatAgent';

import SuggestedPrompts from './components/SuggestedPrompts';

function App() {
  const { messages, isLoading, error, sendMessage } = useChatAgent();

  const handleSuggestedPrompt = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center font-sans w-full">
      <div className="w-full max-w-4xl h-[75vh] flex flex-col bg-white rounded-lg">
        <ChatWindow messages={messages} isLoading={isLoading} error={error} />
        {messages.length === 0 && <SuggestedPrompts onPromptClick={handleSuggestedPrompt} />}
        <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
