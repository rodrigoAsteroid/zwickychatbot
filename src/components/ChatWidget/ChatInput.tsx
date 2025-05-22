"use client";
import { useTranslation } from "react-i18next";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disableInput?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, onKeyPress, disableInput }) => {
  const { t } = useTranslation();
  
  return (
    <div className="p-2 border-t border-gray-800 rounded-b-[20px]">
      <div className="flex items-center space-x-2">
        <div className="bg-[#1D1F23] rounded-full flex-grow flex items-center pl-3 pr-2 py-1.5">
          <input 
            type="text" 
            className="bg-transparent text-white w-full border-none outline-none placeholder-gray-400 text-sm" 
            placeholder={t('actions.type_message')} 
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            disabled={disableInput}
          />
        </div>
        <button 
          className="bg-[#FF4E00] hover:bg-[#FF4E00]/90 text-white rounded-full w-[40px] h-[40px] flex items-center justify-center flex-shrink-0 transition-colors"
          onClick={onSend}
          aria-label={t('actions.send')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;