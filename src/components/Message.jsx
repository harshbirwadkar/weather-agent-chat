import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Message = ({ message }) => {
  const { role, content } = message;
  const isUser = role === 'user';

  const markdownComponents = {
    h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-3" {...props} />,
    p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
    li: ({ node, ...props }) => <li className="pl-2" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`py-5 ${isUser ? 'bg-gray-100 text-lg text-gray-600 rounded-tr rounded-xl pl-6 pr-14 max-w-[70%]' : 'w-full bg-white text-gray-700 rounded-md px-4 max-w-full'}`}>
        <div className="text-lg font-medium whitespace-pre-wrap break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;
