"use client";
import React from "react";
import { useTranslation } from "react-i18next";

interface NavigationOptionsProps {
  onHome: () => void;
  onBack: () => void;
  backLabel?: string;
  homeLabel?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

const NavigationOptions: React.FC<NavigationOptionsProps> = ({ 
  onHome, 
  onBack, 
  backLabel, 
  homeLabel,
  showHomeButton = true,
  showBackButton = true
}) => {
  const { t } = useTranslation();
  
  // Si no hay botones que mostrar, no renderizamos nada
  if (!showHomeButton && !showBackButton) {
    return null;
  }
  
  // Obtener etiquetas traducidas o usar las proporcionadas
  const defaultBackLabel = t('navigation.back');
  const defaultHomeLabel = t('navigation.back_to_menu');
  
  const finalBackLabel = backLabel || defaultBackLabel;
  const finalHomeLabel = homeLabel || defaultHomeLabel;
  
  return (
    <div className="flex flex-col mt-1 space-y-1">
      {showBackButton && (
        <button 
          className="bg-transparent border border-[#FF4E00] text-white py-1 px-2 rounded-full text-xs flex items-center justify-center w-full"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          {finalBackLabel}
        </button>
      )}
      {showHomeButton && (
        <button 
          className="bg-transparent border border-[#FF4E00] text-white py-1 px-2 rounded-full text-xs flex items-center justify-center w-full"
          onClick={onHome}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {finalHomeLabel}
        </button>
      )}
    </div>
  );
};

export default NavigationOptions;