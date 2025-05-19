"use client";
import React, { useState } from "react";
import ChatButton from "./ChatButton";
import ChatInterface from "./ChatInterface";

interface ChatWidgetProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  offset?: number;
  buttonColor?: string;
  widgetTitle?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <ChatInterface onClose={toggleChat} />}
      <ChatButton onClick={toggleChat} isOpen={isOpen} />
    </>
  );
};

export default ChatWidget;
