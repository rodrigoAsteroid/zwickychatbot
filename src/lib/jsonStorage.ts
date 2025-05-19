import fs from "fs";
import path from "path";

import { ChatTree, ChatNode, Feedback } from "@/shared/types";

// Obtenemos la ruta base de la aplicación

// Path to JSON data file
const DATA_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "chatData.json"
);

// Paths to translation files
const TRANSLATION_PATH: Record<string, string> = {
  es: path.join(process.cwd(), "src", "locales", "es", "translation.json"),
  en: path.join(process.cwd(), "src", "locales", "en", "translation.json"),
  fr: path.join(process.cwd(), "src", "locales", "fr", "translation.json"),
};

// Interface for our JSON data structure
interface JsonData {
  chatTree: {
    name: string;
    description: string;
    structure: ChatTree;
  };
  feedbacks: Feedback[];
}

// Function to read data from JSON file
function readData(): JsonData {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
    const jsonData = JSON.parse(data) as JsonData;

    return jsonData;
  } catch (error) {
    console.error("Error reading data file:", error);
    throw error;
  }
}

// Function to read translation data for a specific language
function readTranslation(lang: string = "es") {
  try {
    // Validate that the language is supported, default to Spanish if not
    const validLang = ["es", "en", "fr"].includes(lang) ? lang : "es";
    const filePath = TRANSLATION_PATH[validLang];

    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading translation file for ${lang}:`, error);
    // Fallback to empty object if translation can't be loaded
    return {};
  }
}

// Function to translate a specific key from translations
function translateKey(key: string, lang: string = "es"): string {
  const translations = readTranslation(lang);

  // Handle nested keys like 'products.title'
  const parts = key.split(".");
  let result = translations;

  for (const part of parts) {
    if (result && typeof result === "object" && part in result) {
      result = result[part];
    } else {
      // If key not found, return the original key
      return key;
    }
  }

  const translated = typeof result === "string" ? result : key;

  return translated;
}

// Function to write data to JSON file
function writeData(data: JsonData): void {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data file:", error);
    throw error;
  }
}

class JsonStorage {
  // Get the chat tree
  async getChatTree(): Promise<ChatTree> {
    try {
      const data = readData();
      return data.chatTree.structure;
    } catch (error) {
      console.error("Error fetching chat tree:", error);
      throw error;
    }
  }

  // Function to translate a ChatNode to the specified language
  translateNode(node: ChatNode, language: string = "es"): ChatNode {
    // Create a deep copy to avoid modifying the original
    const translatedNode = JSON.parse(JSON.stringify(node)) as ChatNode;

    // Map of node IDs to translation keys
    const nodeIdToTranslationKey: Record<string, string> = {
      welcome: "welcome",
      productos: "products.title",
      servicios: "services.title",
      preguntas_frecuentes: "faq.title",
      soporte: "support.title",
      asesoramiento: "advice.name_request",
      asesoramiento_email: "advice.email_request",
      asesoramiento_consulta: "advice.details_request",
      asesoramiento_confirmacion: "advice.confirmation",
      soporte_email: "support.email_request",
      soporte_problema: "support.problem_request",
      soporte_confirmacion: "support.confirmation",
      servicio_capacitaciones: "training.title",
      capacitacion_basica: "basic_training.content",
      capacitacion_avanzada: "advanced_training.content",
      capacitacion_lideres: "leader_training.content",
      modalidades: "modalities.content",
      producto_hablalo: "products.hablalo_desc",
      producto_mapa: "products.mapa_desc",
      servicio_business: "services.business_desc",
      servicio_education: "services.education_desc",
      servicio_events: "services.events_desc",
      servicio_consultorias: "services.consultancy_desc",
      servicio_web: "services.web_desc",
      sobre_hablalo: "faq.hablalo.title",
      sobre_asteroid_servicios: "faq.asteroid.title",
      sobre_hablalo_descarga: "faq.hablalo.download",
      sobre_hablalo_funcionamiento: "faq.hablalo.functionality",
      sobre_hablalo_cards: "faq.hablalo.cards",
      sobre_hablalo_atajos: "faq.hablalo.shortcuts",
      sobre_hablalo_chat: "faq.hablalo.chat",
      sobre_asteroid_servicios_que_es: "faq.asteroid.what_is",
      sobre_asteroid_servicios_donde_operan: "faq.asteroid.where",
      sobre_asteroid_servicios_son_gratuitos: "faq.asteroid.free",
      sobre_asteroid_servicios_consultorias: "faq.asteroid.consultancy",
      sobre_asteroid_servicios_hablalo_demo: "faq.asteroid.demo",
      sobre_asteroid_servicios_empresas: "faq.asteroid.companies",
      // Add more mappings as needed
    };

    // Map of option values to translation keys
    const optionValueToTranslationKey: Record<string, string> = {
      conocer_productos: "navigation.products",
      conocer_servicios: "navigation.services",
      solicitar_asesoramiento: "navigation.advice",
      preguntas_frecuentes: "navigation.faq",
      soporte_tecnico: "navigation.support",
      producto_hablalo: "products.hablalo",
      producto_mapa: "products.mapa",
      servicio_business: "services.business",
      servicio_education: "services.education",
      servicio_events: "services.events",
      servicio_consultorias: "services.consultancy",
      servicio_capacitaciones: "services.trainings",
      servicio_web: "services.web",
      capacitacion_basica: "training.basic",
      capacitacion_avanzada: "training.advanced",
      capacitacion_lideres: "training.leaders",
      modalidades: "basic_training.modalities",
      modalidades_cursado: "basic_training.modalities",
      hablalo: "products.hablalo",
      mapa: "products.mapa",
      volver_menu: "navigation.back_to_menu",
      mapa_inclusivo: "products.mapa",
      // Add more mappings as needed
    };

    // Translate the message
    if (node.message) {
      // First check if we have a mapping for this node ID
      if (node.id && nodeIdToTranslationKey[node.id]) {
        const translationKey = nodeIdToTranslationKey[node.id];
        const translatedMessage = translateKey(translationKey, language);
        // Only update if we got a valid translation
        if (translatedMessage !== translationKey) {
          translatedNode.message = translatedMessage;
        }
      }
      // Then check if it's a direct key that exists in translations
      else {
        const translated = translateKey(node.message, language);
        if (translated !== node.message) {
          translatedNode.message = translated;
        }
      }

      // If we haven't translated the message yet, try a direct machine translation
      // This is a fallback for when neither mapping nor direct key lookup works
      if (translatedNode.message === node.message && language !== "es") {
        console.log(
          `Warning: No translation found for node ${node.id} message in ${language}. Using original Spanish text.`
        );
      }
    }

    // Translate options if they exist
    if (node.options && node.options.length > 0) {
      translatedNode.options = node.options.map((option) => {
        const translatedOption = { ...option };

        // Check if we have a mapping for this option value
        if (option.value && optionValueToTranslationKey[option.value]) {
          const translationKey = optionValueToTranslationKey[option.value];
          translatedOption.label = translateKey(translationKey, language);
        }

        return translatedOption;
      });
    }

    if (translatedNode.options && translatedNode.options.length > 0) {
      console.log(
        `Translated ${translatedNode.options.length} options. First option: "${translatedNode.options[0].label}"`
      );
    }

    return translatedNode;
  }

  // Get a specific node from the chat tree and translate it to the specified language
  async getChatNode(
    nodeId: string,
    language: string = "es"
  ): Promise<ChatNode> {
    try {
      const data = readData();
      const node = data.chatTree.structure.nodes[nodeId];

      if (!node) {
        throw new Error(`Node ${nodeId} not found`);
      }

      // Calcular el nivel y breadcrumbs para el nodo
      const enrichedNode = { ...node };

      // If level is not defined, calculate it based on parent relationships
      if (enrichedNode.level === undefined) {
        let currentNode = enrichedNode;
        let level = 0;
        const breadcrumbs: string[] = [];

        // Traverse up the parent chain to calculate level and build breadcrumbs
        while (currentNode.parentId) {
          level++;
          breadcrumbs.unshift(currentNode.parentId); // Add parent to breadcrumbs (at beginning)

          // Get the parent node
          const parentNode =
            data.chatTree.structure.nodes[currentNode.parentId];
          if (!parentNode) break; // Break if parent not found

          currentNode = parentNode;
        }

        // Set calculated values
        enrichedNode.level = level;

        // Only set breadcrumbs if not already defined and we found some
        if (!enrichedNode.breadcrumbs && breadcrumbs.length > 0) {
          enrichedNode.breadcrumbs = breadcrumbs;
        }
      }

      // Apply translations based on selected language
      const translatedNode = this.translateNode(enrichedNode, language);

      return translatedNode;
    } catch (error) {
      console.error(`Error fetching node ${nodeId}:`, error);
      throw error;
    }
  }

  // Get the next node based on current node and user input
  async getNextNode(
    currentNodeId: string,
    userInput: string,
    language: string = "es"
  ): Promise<ChatNode> {
    try {
      const currentNode = await this.getChatNode(currentNodeId, language);
      // Direct navigation command to a specific node
      if (userInput.startsWith("_navigate_to_node:")) {
        // Extraer el ID del nodo destino
        const targetNodeId = userInput.replace("_navigate_to_node:", "").trim();
        if (targetNodeId) {
          return await this.getChatNode(targetNodeId, language);
        }
      }

      // Special handling for asesoramiento flow
      if (currentNodeId === "asesoramiento" && userInput.trim() !== "") {
        // After entering the name, go to email
        return await this.getChatNode("asesoramiento_email", language);
      } else if (
        currentNodeId === "asesoramiento_email" &&
        userInput.trim() !== ""
      ) {
        // After entering the email, go to consultation
        return await this.getChatNode("asesoramiento_consulta", language);
      } else if (
        currentNodeId === "asesoramiento_consulta" &&
        userInput.trim() !== ""
      ) {
        // After entering the consultation, show confirmation
        return await this.getChatNode("asesoramiento_confirmacion", language);
      }

      // Special handling for soporte flow
      if (currentNodeId === "soporte" && userInput.trim() !== "") {
        // After entering the name, go to email
        return await this.getChatNode("soporte_email", language);
      } else if (currentNodeId === "soporte_email" && userInput.trim() !== "") {
        // After entering the email, go to problem description
        return await this.getChatNode("soporte_problema", language);
      } else if (
        currentNodeId === "soporte_problema" &&
        userInput.trim() !== ""
      ) {
        // After entering the problem description, show confirmation
        return await this.getChatNode("soporte_confirmacion", language);
      }

      // If the current node has options, find the matching option
      if (currentNode.options && currentNode.options.length > 0) {
        const selectedOption = currentNode.options.find(
          (option) => option.value === userInput || option.label === userInput
        );

        if (selectedOption) {
          // Get the target node
          const nextNode = await this.getChatNode(
            selectedOption.nextNodeId,
            language
          );

          // Make sure the target node has a parentId to allow proper navigation
          if (!nextNode.parentId) {
            nextNode.parentId = currentNodeId;
          }

          return nextNode;
        }
      }

      // If no matching option or no options, return a fallback node
      // El mensaje de fallback se traduce en el frontend
      return {
        id: "fallback",
        message: "chat.fallback", // Usamos una clave de traducción
        options: currentNode.options,
        parentId: currentNodeId,
      };
    } catch (error) {
      console.error("Error getting next node:", error);
      throw error;
    }
  }

  // Save user feedback
  async saveFeedback(
    nodeId: string,
    rating: "like" | "dislike",
    message?: string
  ): Promise<void> {
    try {
      const data = readData();

      // Create a new feedback entry
      const feedback: Feedback = {
        id: Date.now().toString(), // Using timestamp as a simple unique ID
        nodeId,
        rating,
        timestamp: new Date(),
      };

      // Add the feedback message if provided
      if (message) {
        feedback.message = message;
      }

      // Add the new feedback to the array
      data.feedbacks.push(feedback);

      // Save back to the file
      writeData(data);
    } catch (error) {
      console.error("Error saving feedback:", error);
      throw error;
    }
  }
}

export const storage = new JsonStorage();
