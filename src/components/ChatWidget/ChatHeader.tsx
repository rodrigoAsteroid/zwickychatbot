"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

interface ChatHeaderProps {
  onClose?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#191919] p-2 flex flex-col rounded-t-[20px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 w-8 h-8 bg-[#F27F04] rounded-md flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5382_27392)">
                <rect width="44" height="44" fill="#F27F04" />
                <rect width="44" height="44" fill="#F27F04" />
                <path
                  d="M39.9949 13.8483C39.1936 15.5395 37.7908 16.7523 36.1633 17.3521C34.4921 17.968 32.5839 17.9374 30.8471 17.1146C27.419 15.4905 25.9566 11.3949 27.5808 7.96682C29.2049 4.53876 33.3005 3.07637 36.7285 4.70049C40.1566 6.3246 41.619 10.4202 39.9949 13.8483Z"
                  fill="#CC710F"
                />
                <path
                  d="M14.7406 38.0592C14.201 39.1981 13.2564 40.0147 12.1605 40.4186C11.0351 40.8334 9.75014 40.8128 8.58059 40.2587C6.27218 39.165 5.28742 36.4071 6.38108 34.0987C7.47474 31.7903 10.2327 30.8055 12.5411 31.8992C14.8495 32.9929 15.8342 35.7508 14.7406 38.0592Z"
                  fill="#CC710F"
                />
                <path
                  d="M11.3397 9.16891C11.0235 9.83625 10.4699 10.3148 9.82778 10.5515C9.16831 10.7945 8.41537 10.7825 7.73004 10.4578C6.37737 9.81691 5.80033 8.20083 6.44119 6.84816C7.08205 5.49548 8.69812 4.91844 10.0508 5.5593C11.4035 6.20016 11.9805 7.81623 11.3397 9.16891Z"
                  fill="#CC710F"
                />
                <path
                  d="M36.9093 28.7358C36.892 30.8876 36.1201 33.0002 34.1784 33.9276C31.8981 35.0167 27.9255 36.1594 21.3556 36.0747C15.5324 36.0313 11.8109 34.5995 9.6266 33.301C7.76211 32.1927 7.04095 30.04 7.04095 27.8709L7.04094 22.2818C7.04094 13.8634 13.7387 7.0391 22.0009 7.0391C30.2632 7.0391 36.9609 13.8634 36.9609 22.2818L36.9093 28.7358Z"
                  fill="#B1B1B1"
                />
                <rect
                  x="23.7598"
                  y="14.0791"
                  width="11.44"
                  height="14.96"
                  rx="5.72"
                  fill="#F5F5F5"
                />
                <rect
                  x="8.80078"
                  y="14.0791"
                  width="11.44"
                  height="14.96"
                  rx="5.72"
                  fill="#F5F5F5"
                />
                <path
                  d="M29.9241 20.0128C29.9241 18.7626 28.9158 17.749 27.672 17.749C26.4282 17.749 25.4199 18.7626 25.4199 20.0128L25.4199 23.5928C25.4199 24.8431 26.4282 25.8566 27.672 25.8566C28.9158 25.8566 29.9241 24.8431 29.9241 23.5928L29.9241 20.0128Z"
                  fill="#2E1E33"
                />
                <ellipse
                  cx="26.3193"
                  cy="19.7759"
                  rx="1.80168"
                  ry="2.02689"
                  fill="#F5F5F5"
                />
                <path
                  d="M19.1116 20.0128C19.1116 18.7626 18.1033 17.749 16.8595 17.749C15.6157 17.749 14.6074 18.7626 14.6074 20.0128L14.6074 23.5928C14.6074 24.8431 15.6157 25.8566 16.8595 25.8566C18.1033 25.8566 19.1116 24.8431 19.1116 23.5928L19.1116 20.0128Z"
                  fill="#2E1E33"
                />
                <ellipse
                  cx="15.5087"
                  cy="19.7759"
                  rx="1.80168"
                  ry="2.02689"
                  fill="#F5F5F5"
                />
              </g>
              <defs>
                <clipPath id="clip0_5382_27392">
                  <rect width="44" height="44" rx="8" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm">Zwicky</h1>
            <p className="text-gray-300 text-xs">{t("chat.assistant")}</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-gray-700 hover:text-white transition-colors"
            aria-label={t("actions.close")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Selector de idiomas */}
      <div className="mt-2 flex justify-center">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default ChatHeader;
