// Enum for message types
export enum MessageType {
  USER = "user",
  BOT = "bot"
}

// Option for menu selection
export interface Option {
  label: string;
  value: string;
  nextNodeId: string;
}

// Message structure
export interface Message {
  id: string;
  type: MessageType;
  text: string;
  options?: Option[];
  showFeedback: boolean;
  parentId?: string;
  parentName?: string;
}

// Chat node structure (server-side)
export interface ChatNode {
  id: string;
  message: string;
  options?: Option[];
  parentId?: string;
  type?: string;
  /**
   * Array of ancestor node IDs, ordered from root to immediate parent.
   * Useful for breadcrumb navigation in deeply nested menus.
   * e.g. ["welcome", "productos", "producto_hablalo"]
   */
  breadcrumbs?: string[];
  /**
   * Depth level in the navigation hierarchy, starting from 0 for root nodes.
   * Useful for conditional UI rendering based on menu depth.
   */
  level?: number;
}

// Chat tree structure for the database
export interface ChatTree {
  id: string;
  nodes: Record<string, ChatNode>;
}

// Feedback structure
export interface Feedback {
  id: string;
  nodeId: string;
  rating: "like" | "dislike";
  timestamp: Date;
  message?: string;
}
