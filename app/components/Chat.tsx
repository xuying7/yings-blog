"use client";

import { readFileSync } from "fs";
import { handleClientScriptLoad } from "next/script";
import React, { useRef } from "react";

interface conversation {
  role: string;
  content: string;
}

const Chat = () => {
  const [value, setValue] = React.useState<string>("");
  const [conversation, setConversation] = React.useState<conversation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const chatHistory = [...conversation, { role: "user", content: value }];
      const response = await fetch("/api/chat/openAIChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: chatHistory }),
      });
      const data = await response.json();
      setValue("");
      setConversation([
        ...chatHistory,
        { role: "assistant", content: data.content },
      ]);
    }
  };
  const handleRefresh = () => {
    inputRef.current?.focus();
    setValue("");
    setConversation([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <h1 className="text-3xl font-light mb-4">
          Hey there, here is virtual Ying!
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ask anything about me
        </p>
      </div>
      <div className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="space-y-4 mb-6 h-[400px] overflow-y-auto">
          {conversation.map((item, index) => (
            <React.Fragment key={index}>
              {item.role === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-blue-500 dark:bg-blue-600 p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm text-white">{item.content}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {item.content}
                    </p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <input
            ref={inputRef}
            placeholder="Type your message here..."
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button
            className="w-full p-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-gray-800 dark:text-gray-200"
            onClick={handleRefresh}
          >
            New conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
