import React from 'react';

const SuggestedPrompts = ({ onPromptClick }) => {
  const prompts = [
    "What's the weather like today?",
    "Will it rain this weekend?",
    "Show me the 7-day forecast for Mumbai."
  ];

  return (
    <div className="p-4 pt-0">
      <div className="flex flex-col items-end space-y-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className=" border border-gray-200 text-gray-500 text-lg rounded-xl px-4 py-5 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 max-w-[70%] text-right"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
