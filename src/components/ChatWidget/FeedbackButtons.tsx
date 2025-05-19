"use client";
import React from "react";
import { useTranslation } from "react-i18next";

interface FeedbackButtonsProps {
  onFeedback: (type: 'like' | 'dislike') => void;
  selectedFeedback: 'like' | 'dislike' | null;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ onFeedback, selectedFeedback }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center space-x-3 text-xs text-white my-2">
      <span className="text-sm">{t('feedback.question')}</span>
      <div className="flex space-x-2">
        <button 
          className={`feedback-button p-1 rounded-full ${selectedFeedback === 'like' 
            ? 'text-[#FF4E00] border border-[#FF4E00]' 
            : 'text-white hover:text-[#FF4E00]'}`} 
          title={t('feedback.like')}
          onClick={() => onFeedback('like')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.4 5H16.6C17.3956 5 18.0587 5.5584 18.1766 6.34374L19.1195 13.3437C19.279 14.4305 18.4236 15.4 17.3223 15.4H13.4L13.8 18.6C13.8 19.37 13.15 20 12.35 20C11.9304 20 11.5436 19.7978 11.3056 19.4635L7.4 13.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 5V15C5 15.5523 5.44772 16 6 16H7.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          className={`feedback-button p-1 rounded-full ${selectedFeedback === 'dislike' 
            ? 'text-[#FF4E00] border border-[#FF4E00]' 
            : 'text-white hover:text-[#FF4E00]'}`} 
          title={t('feedback.dislike')}
          onClick={() => onFeedback('dislike')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 15V8C19 6.34315 17.6569 5 16 5H13.2564C12.5848 5 11.9304 5.17539 11.3701 5.50899L9.43566 6.64882C8.87539 6.98243 8.43692 7.46242 8.17033 8.03539C7.32003 10.0881 7.03556 12.3293 7.3392 14.5292C7.35093 14.6046 7.35678 14.6811 7.35678 14.7577V15.2108C7.35678 16.1522 6.63614 16.9414 5.69754 17.0315C4.97626 17.0995 4.14798 17.3482 3.7869 18.0485C3.50969 18.5967 3.67034 19.2956 4.0113 19.6967C4.88818 20.6923 6.57589 20.5206 7.94393 20.3834C8.5324 20.325 9.12416 20.2599 9.70903 20.1644C10.9173 19.9706 12.0337 19.3966 12.9172 18.5131C13.7203 17.7101 16.5451 17.571 17.6904 17.9095C18.5025 18.1482 19 18.9099 19 19.75C19 20.7165 18.2165 21.5 17.25 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FeedbackButtons;