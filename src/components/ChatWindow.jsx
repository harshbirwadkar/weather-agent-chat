import React, { useEffect, useRef } from 'react';
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';

const ChatWindow = ({ messages, isLoading, error }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
      {isLoading && messages[messages.length - 1]?.role === 'user' && <LoadingIndicator />}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;
