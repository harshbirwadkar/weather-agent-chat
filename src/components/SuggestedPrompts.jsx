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
            className="bg-white border border-gray-200 text-gray-700 text-base rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors duration-200 max-w-sm text-right"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
