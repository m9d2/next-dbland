'use client';
import React, { createContext, ReactNode, useState } from 'react';

type MessageType = 'success' | 'error' | 'warning' | 'info';

interface MessageProps {
  type: MessageType;
  content: string;
  duration?: number;
}

interface MessageContextProps {
  showMessage: (type: MessageType, content: string, duration?: number) => void;
}

export const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const showMessage = (type: MessageType, content: string, duration = 3000) => {
    setMessages((prevMessages) => [...prevMessages, { type, content, duration }]);
    setTimeout(() => {
      setMessages((prevMessages) => prevMessages.slice(1));
    }, duration);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {/* 全局显示消息 */}
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="message-box">
            <span className="message-icon" style={{ color: getColor(msg.type) }}>
              {getIcon(msg.type)}
            </span>
            <span className="message-content">{msg.content}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        .message-container {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
        }

        .message-box {
          background-color: white;
          padding: 5px 20px;
          margin: 5px 0;
          border-radius: 4px;
          display: flex;
          align-items: center;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          opacity: 1;
          animation: slideIn 0.3s;
        }

        .message-icon {
          margin-right: 10px;
          font-weight: bold;
        }

        @keyframes slideIn {
          from {
            top: -50px;
            opacity: 0;
          }
          to {
            top: 20px;
            opacity: 1;
          }
        }

        .message-content {
          font-size: 14px;
        }
      `}</style>
    </MessageContext.Provider>
  );
};

const getColor = (type: MessageType) => {
  switch (type) {
    case 'success':
      return '#52c41a';
    case 'error':
      return '#ff4d4f';
    case 'warning':
      return '#faad14';
    case 'info':
      return '#1890ff';
    default:
      return '#fff';
  }
};

const getIcon = (type: MessageType) => {
  switch (type) {
    case 'success':
      return 'i';
    case 'error':
      return 'i';
    case 'warning':
      return 'i';
    case 'info':
      return 'i';
    default:
      return '';
  }
};
