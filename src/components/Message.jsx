import React from 'react';

const Message = ({ message }) => {
  const { role, content } = message;
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-xl px-4 py-3 max-w-lg ${isUser ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-800 border border-gray-200'}`}>
        <p className="text-lg whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default Message;
