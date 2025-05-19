"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Message, MessageType, ChatNode } from "@/shared/types";
import { apiRequest } from "@/lib/queryClient";

export interface ChatHook {
  messages: Message[];
  sendMessage: (text: string, displayText?: string) => Promise<void>;
  isTyping: boolean;
}

export function useChat(): ChatHook {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const { i18n, t } = useTranslation();

  // Initialize chat with welcome message
  useEffect(() => {
    initializeChat();
    // Reiniciar el chat cuando cambie el idioma
  }, []);

  // Efecto para reinicializar el chat cuando cambia el idioma
  useEffect(() => {
    // Reiniciamos el chat cuando el idioma cambia
    if (messages.length > 0) {
      setMessages([]);
      setCurrentNode(null);
      setNavigationHistory([]);
      initializeChat();
    }
  }, [i18n.language]);

  const initializeChat = async () => {
    try {
      setIsTyping(true);

      // Fetch the initial welcome node with current language
      const response = await apiRequest(
        "GET",
        `/api/chat/node/welcome?lang=${i18n.language}`,
        undefined
      );
      const welcomeNode: ChatNode = await response.json();

      setCurrentNode(welcomeNode.id);

      // Add initial message
      setMessages([
        {
          id: welcomeNode.id,
          type: MessageType.BOT,
          text: welcomeNode.message,
          options: welcomeNode.options,
          showFeedback: true,
          parentId: welcomeNode.parentId,
        },
      ]);

      setIsTyping(false);
    } catch (error) {
      console.error("Failed to initialize chat:", error);
      setIsTyping(false);
    }
  };

  const sendMessage = async (text: string, displayText?: string) => {
    // Handle special navigation commands
    if (text === "_home") {
      handleNavigateHome();
      return;
    }

    if (text === "_back") {
      handleNavigateBack();
      return;
    }

    // Handle direct navigation to specific node
    if (text === "_navigate_to" && displayText) {
      await handleNavigateToNode(displayText);
      return;
    }

    // Add user message to chat (if not a special command)
    if (!text.startsWith("_")) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: MessageType.USER,
        text: displayText || text, // Usar el texto de visualización si está disponible
        showFeedback: false,
      };

      setMessages((prev) => [...prev, userMessage]);
    }

    // Save current node to history before navigating
    if (currentNode) {
      setNavigationHistory((prev) => [...prev, currentNode]);
    }

    // Start typing animation
    setIsTyping(true);

    try {
      // Get bot's response
      const response = await apiRequest("POST", "/api/chat/response", {
        message: text,
        currentNode,
        language: i18n.language,
      });

      const chatNode: ChatNode = await response.json();

      // Wait a bit to simulate typing
      await new Promise((resolve) => setTimeout(resolve, 500));

      setCurrentNode(chatNode.id);

      // Add bot message
      const botMessage: Message = {
        id: chatNode.id,
        type: MessageType.BOT,
        text: chatNode.message,
        options: chatNode.options,
        showFeedback: true,
        parentId: chatNode.parentId,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Failed to get response:", error);

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: MessageType.BOT,
        text: t("chat.error"),
        showFeedback: true,
        parentId: currentNode ? currentNode : undefined,
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  // Navigate to any specific node by ID
  const handleNavigateToNode = async (nodeId: string) => {
    setIsTyping(true);

    try {
      // Fetch the specific node
      const response = await apiRequest(
        "GET",
        `/api/chat/node/${nodeId}?lang=${i18n.language}`,
        { nodeId: nodeId }
      );
      const node: ChatNode = await response.json();

      setCurrentNode(node.id);

      // Add bot message for the node
      const botMessage: Message = {
        id: node.id,
        type: MessageType.BOT,
        text: node.message,
        options: node.options,
        showFeedback: true,
        parentId: node.parentId,
      };

      // Add the node's message without clearing history
      setMessages((prev) => [...prev, botMessage]);

      setIsTyping(false);
    } catch (error) {
      console.error(`Failed to navigate to node ${nodeId}:`, error);
      setIsTyping(false);
    }
  };

  // Navigate to home without clearing history
  const handleNavigateHome = async () => {
    setIsTyping(true);
    try {
      // We navigate to welcome node but keep the chat history
      const response = await apiRequest(
        "GET",
        `/api/chat/node/welcome?lang=${i18n.language}`,
        undefined
      );
      const welcomeNode: ChatNode = await response.json();

      // Set current node to welcome
      setCurrentNode(welcomeNode.id);

      // Add welcome message without clearing history
      const botMessage: Message = {
        id: welcomeNode.id,
        type: MessageType.BOT,
        text: welcomeNode.message,
        options: welcomeNode.options,
        showFeedback: true,
        parentId: welcomeNode.parentId,
      };

      // Add to existing messages
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Failed to navigate home:", error);
      setIsTyping(false);
    }
  };

  // Generic navigation function that can navigate to any node while preserving history
  const handleNavigateBack = async () => {
    if (navigationHistory.length === 0) {
      return;
    }

    setIsTyping(true);

    try {
      // Get last node from history
      const previousNodeId = navigationHistory[navigationHistory.length - 1];

      // Fetch the previous node with current language
      const response = await apiRequest(
        "GET",
        `/api/chat/node/${previousNodeId}?lang=${i18n.language}`,
        undefined
      );
      const previousNode: ChatNode = await response.json();

      setCurrentNode(previousNode.id);

      // Add bot message for the previous node
      const botMessage: Message = {
        id: previousNode.id,
        type: MessageType.BOT,
        text: previousNode.message,
        options: previousNode.options,
        showFeedback: true,
        parentId: previousNode.parentId,
      };

      // Add message without clearing history
      setMessages((prev) => [...prev, botMessage]);

      setIsTyping(false);
    } catch (error) {
      console.error("Failed to navigate back:", error);
      setIsTyping(false);
    }
  };

  return {
    messages,
    sendMessage,
    isTyping,
  };
}
