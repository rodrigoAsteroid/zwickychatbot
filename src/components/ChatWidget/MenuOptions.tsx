"use client";
import React from "react";
import { Option } from "@/shared/types";

interface MenuOptionsProps {
  options: Option[];
  onOptionClick: (value: string, label: string, requiredInput: boolean) => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ options, onOptionClick }) => {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option, index) => {
        // Check if it's a navigation button (back/home)
        const isNavButton = option.label.includes("🔙") || option.label.includes("🏠");
        
        return (
          <button 
            key={index}
            className={`option-button text-white px-3 py-2 text-left flex items-center ${
              isNavButton 
                ? "bg-transparent border border-[#FF4E00] rounded-full text-xs justify-center" 
                : "bg-[#191919] rounded-lg border border-[#FF4E00]"
            }`}
            onClick={() => onOptionClick(option.value, option.label.replace("🔙", "").replace("🏠", "").trim(), option.requiredInput)}
          >
            {isNavButton && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            )}
            <span className="text-[#F5F5F5] text-sm font-medium">{option.label.replace("🔙", "").replace("🏠", "").trim()}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MenuOptions;