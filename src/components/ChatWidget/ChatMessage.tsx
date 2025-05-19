"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Message, MessageType } from "@/shared/types";
import MenuOptions from "./MenuOptions";
import FeedbackButtons from "./FeedbackButtons";
import NavigationOptions from "./NavigationOptions";

interface ChatMessageProps {
  message: Message;
  onMenuOptionClick: (value: string, label: string) => void;
  onNavigateHome: () => void;
  onNavigateBack: () => void;
  isLastUserMessage?: boolean;
}

// Mapa de nombres comunes para los nodos de navegación
// Estos nombres se usan como claves de traducción
const NODE_IDS: Record<string, string> = {
  'welcome': 'welcome',
  'productos': 'products.title',
  'servicios': 'services.title',
  'preguntas_frecuentes': 'faq.title',
  'contacto': 'contact.title',
  'soporte': 'support.title',
  'asesoramiento': 'advice.title'
};

const ChatMessage = ({
  message,
  onMenuOptionClick,
  onNavigateHome,
  onNavigateBack,
}: ChatMessageProps) => {
  const [feedbackGiven, setFeedbackGiven] = useState<'like' | 'dislike' | null>(null);
  
  const { t } = useTranslation();
  
  // Determina el nombre adecuado para mostrar en los botones de navegación
  const getParentName = (nodeId: string): string => {
    // Si tenemos una clave de traducción para este nodeId, la usamos
    if (NODE_IDS[nodeId]) {
      return t(NODE_IDS[nodeId]);
    }
    
    // Si no, usamos el valor genérico de "nivel anterior"
    return t('navigation.back');
  };
  
  // Determinar el nivel del nodo actual en la jerarquía de navegación
  // level:
  // 0 = welcome (menú inicial/raíz)
  // 1 = categorías principales (productos, servicios, etc.)
  // 2 = detalles específicos (producto_hablalo, servicio_X, etc.)
  // 3+ = cualquier nivel más profundo
  const getNodeLevel = (): number => {
    if (message.id === 'welcome') return 0;
    if (message.parentId === 'welcome') return 1;
    if (Object.keys(NODE_IDS).includes(message.parentId || '')) return 2;
    // Si tiene padre pero no es ninguno de los anteriores, es nivel 3 o superior
    return message.parentId ? 3 : 1; // Default a nivel 1 si no podemos determinarlo
  };
  
  // Determinar si tenemos que mostrar navegación hacia nodos específicos además de la general
  const shouldShowParentNavigation = (): boolean => {
    const level = getNodeLevel();
    // Mostrar navegación a padre específico si estamos en nivel 2 o superior
    return level >= 2;
  };
  
  const handleFeedback = (type: 'like' | 'dislike') => {
    setFeedbackGiven(type);
  };

  // User messages are rendered differently than bot messages
  if (message.type === MessageType.USER) {
    return (
      <div className="flex items-start justify-end space-x-2 user-message message-wrapper">
        <div className="bg-[#9263AF] p-2 rounded-lg">
          <p className="text-white text-sm font-medium">{message.text}</p>
        </div>
        <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-lg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_5385_11776)">
              <rect x="0.5" width="44" height="44" fill="#9263AF"/>
              <path d="M12.4375 33.5V32.0625C12.4375 26.5051 16.9426 22 22.5 22C28.0574 22 32.5625 26.5051 32.5625 32.0625V33.5" stroke="#2E223B" strokeWidth="2.15625" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22.5 22C25.6756 22 28.25 19.4256 28.25 16.25C28.25 13.0744 25.6756 10.5 22.5 10.5C19.3244 10.5 16.75 13.0744 16.75 16.25C16.75 19.4256 19.3244 22 22.5 22Z" stroke="#2E223B" strokeWidth="2.15625" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_5385_11776">
                <rect x="0.5" width="44" height="44" rx="8" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  // Filtramos cualquier opción que sea de navegación porque esos botones se manejarán con NavigationOptions
  // En lugar de filtrar por texto que puede cambiar según el idioma, filtramos por value que es constante
  const filteredOptions = message.options ? message.options.filter(
    option => 
      !option.value.includes("_back") && 
      !option.value.includes("_home") && 
      !option.value.includes("volver") &&
      !option.value.includes("back_to")
  ) : [];

  // Bot messages with their structured components
  return (
    <div className="flex items-start space-x-2 bot-message message-wrapper">
      <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-lg bg-transparent flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_5382_27392)">
            <rect width="44" height="44" fill="#F27F04"/>
            <rect width="44" height="44" fill="#F27F04"/>
            <path d="M39.9949 13.8483C39.1936 15.5395 37.7908 16.7523 36.1633 17.3521C34.4921 17.968 32.5839 17.9374 30.8471 17.1146C27.419 15.4905 25.9566 11.3949 27.5808 7.96682C29.2049 4.53876 33.3005 3.07637 36.7285 4.70049C40.1566 6.3246 41.619 10.4202 39.9949 13.8483Z" fill="#CC710F"/>
            <path d="M14.7406 38.0592C14.201 39.1981 13.2564 40.0147 12.1605 40.4186C11.0351 40.8334 9.75014 40.8128 8.58059 40.2587C6.27218 39.165 5.28742 36.4071 6.38108 34.0987C7.47474 31.7903 10.2327 30.8055 12.5411 31.8992C14.8495 32.9929 15.8342 35.7508 14.7406 38.0592Z" fill="#CC710F"/>
            <path d="M11.3397 9.16891C11.0235 9.83625 10.4699 10.3148 9.82778 10.5515C9.16831 10.7945 8.41537 10.7825 7.73004 10.4578C6.37737 9.81691 5.80033 8.20083 6.44119 6.84816C7.08205 5.49548 8.69812 4.91844 10.0508 5.5593C11.4035 6.20016 11.9805 7.81623 11.3397 9.16891Z" fill="#CC710F"/>
            <path d="M36.9093 28.7358C36.892 30.8876 36.1201 33.0002 34.1784 33.9276C31.8981 35.0167 27.9255 36.1594 21.3556 36.0747C15.5324 36.0313 11.8109 34.5995 9.6266 33.301C7.76211 32.1927 7.04095 30.04 7.04095 27.8709L7.04094 22.2818C7.04094 13.8634 13.7387 7.0391 22.0009 7.0391C30.2632 7.0391 36.9609 13.8634 36.9609 22.2818L36.9093 28.7358Z" fill="#B1B1B1"/>
            <rect x="23.7598" y="14.0791" width="11.44" height="14.96" rx="5.72" fill="#F5F5F5"/>
            <rect x="8.80078" y="14.0791" width="11.44" height="14.96" rx="5.72" fill="#F5F5F5"/>
            <path d="M29.9241 20.0128C29.9241 18.7626 28.9158 17.749 27.672 17.749C26.4282 17.749 25.4199 18.7626 25.4199 20.0128L25.4199 23.5928C25.4199 24.8431 26.4282 25.8566 27.672 25.8566C28.9158 25.8566 29.9241 24.8431 29.9241 23.5928L29.9241 20.0128Z" fill="#2E1E33"/>
            <ellipse cx="26.3193" cy="19.7759" rx="1.80168" ry="2.02689" fill="#F5F5F5"/>
            <path d="M19.1116 20.0128C19.1116 18.7626 18.1033 17.749 16.8595 17.749C15.6157 17.749 14.6074 18.7626 14.6074 20.0128L14.6074 23.5928C14.6074 24.8431 15.6157 25.8566 16.8595 25.8566C18.1033 25.8566 19.1116 24.8431 19.1116 23.5928L19.1116 20.0128Z" fill="#2E1E33"/>
            <ellipse cx="15.5087" cy="19.7759" rx="1.80168" ry="2.02689" fill="#F5F5F5"/>
          </g>
          <defs>
            <clipPath id="clip0_5382_27392">
              <rect width="44" height="44" rx="8" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col space-y-3 max-w-[85%]">
        <div className="bg-[#191919] p-2 rounded-lg">
          <p className="text-white text-sm font-medium">{message.text}</p>
        </div>
        
        {/* Solo mostramos las opciones que NO son de navegación */}
        {filteredOptions.length > 0 && (
          <MenuOptions options={filteredOptions} onOptionClick={onMenuOptionClick} />
        )}
        
        {message.showFeedback && message.id !== 'welcome' && (
          <>
            <FeedbackButtons 
              onFeedback={handleFeedback} 
              selectedFeedback={feedbackGiven} 
            />
            
            {/* Mostrar navegación basada en el nivel del nodo */}
            {(() => {
              const level = getNodeLevel();
              const showParentNav = shouldShowParentNavigation();
              const showRootNav = level > 0; // Siempre mostrar navegación a raíz excepto en welcome
              
              return (
                <div className="space-y-2">
                  {/* Navegación al nodo padre directo (si corresponde) */}
                  {showParentNav && message.parentId && (
                    <NavigationOptions 
                      onHome={() => {
                        // Verificar que parentId existe antes de usarlo
                        if (message.parentId) {
                          onMenuOptionClick("_navigate_to", message.parentId);
                        }
                      }}
                      onBack={onNavigateBack}
                      homeLabel={t('navigation.back_to', { location: getParentName(message.parentId) })}
                      showBackButton={false}
                      showHomeButton={true}
                    />
                  )}
                  
                  {/* Navegación a raíz siempre (excepto en welcome) */}
                  {showRootNav && (
                    <NavigationOptions 
                      onHome={onNavigateHome} 
                      onBack={onNavigateBack}
                      homeLabel={t('navigation.back_to_menu')}
                      showBackButton={false}
                      showHomeButton={true}
                    />
                  )}
                </div>
              );
            })()}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;