import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const MessageInput = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-white">
      <form onSubmit={handleSubmit}>
        <div className="flex items-end p-3 border-2 border-gray-100 rounded-2xl focus-within:ring-2 focus-within:ring-gray-300 transition-shadow duration-200 shadow-lg min-h-24">
          <TextareaAutosize
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            minRows={1}
            maxRows={7}
            disabled={isLoading}
            className="flex-grow text-lg p-0 pr-3 bg-transparent border-none focus:outline-none focus:ring-0 resize-none min-h-24"
            style={{ lineHeight: '24px' }}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-white bg-black rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg> */}
            <svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <line x1="7" y1="17" x2="17" y2="7"></line> <polyline points="7 7 17 7 17 17"></polyline> </g></svg>
           </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
