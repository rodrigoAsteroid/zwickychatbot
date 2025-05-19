/**
 * Export principal para el widget de chat.
 * Este archivo facilita la importación de todos los componentes del widget
 * desde una sola ubicación.
 */

// Componente principal
export { default as ChatWidget } from './ChatWidget';

// Componentes base
export { default as ChatButton } from './ChatButton';
export { default as ChatInterface } from './ChatInterface';
export { default as ChatHeader } from './ChatHeader';
export { default as ChatInput } from './ChatInput';
export { default as ChatMessage } from './ChatMessage';

// Componentes de interacción
export { default as MenuOptions } from './MenuOptions';
export { default as NavigationOptions } from './NavigationOptions';
export { default as FeedbackButtons } from './FeedbackButtons';
export { default as LanguageSelector } from './LanguageSelector';

// Hooks
export { useChat } from '@/hooks/useChat';
export type { ChatHook } from '@/hooks/useChat';