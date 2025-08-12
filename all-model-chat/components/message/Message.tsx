import React, { useState, useMemo, useRef } from 'react';
import { ClipboardCopy, Check, Trash2 } from 'lucide-react';
import { ChatMessage, UploadedFile, ThemeColors } from '../../types';
import { MessageContent } from './MessageContent';
import { translations } from '../../utils/appUtils';
import { MessageActions } from './MessageActions';

interface MessageProps {
    message: ChatMessage;
    prevMessage?: ChatMessage;
    messageIndex: number;
    onEditMessage: (messageId: string) => void;
    onDeleteMessage: (messageId: string) => void;
    onRetryMessage: (messageId: string) => void; 
    onImageClick: (file: UploadedFile) => void;
    onOpenHtmlPreview: (html: string, options?: { initialTrueFullscreen?: boolean }) => void;
    showThoughts: boolean;
    themeColors: ThemeColors; 
    themeId: string;
    baseFontSize: number;
    expandCodeBlocksByDefault: boolean;
    isMermaidRenderingEnabled: boolean;
    isGraphvizRenderingEnabled: boolean;
    onTextToSpeech: (messageId: string, text: string) => void;
    ttsMessageId: string | null;
    onSuggestionClick?: (suggestion: string) => void;
    t: (key: keyof typeof translations) => string;
}

export const Message: React.FC<MessageProps> = React.memo((props) => {
    const { message, prevMessage, messageIndex, onDeleteMessage, t } = props;
    
    const isGrouped = prevMessage &&
        prevMessage.role === message.role &&
        !prevMessage.isLoading &&
        !message.isLoading &&
        (new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() < 5 * 60 * 1000);

    const isModelThinkingOrHasThoughts = message.role === 'model' && (message.isLoading || (message.thoughts && props.showThoughts));
    
    const messageContainerClasses = `flex items-start gap-2 sm:gap-3 group ${isGrouped ? 'mt-1' : 'mt-3 sm:mt-4'} ${message.role === 'user' ? 'justify-end' : 'justify-start'}`;
    const bubbleClasses = `w-fit max-w-[calc(100%-2.75rem)] sm:max-w-3xl lg:max-w-4xl xl:max-w-6xl p-2.5 sm:p-3 rounded-2xl shadow-md flex flex-col min-w-0 ${isModelThinkingOrHasThoughts ? 'sm:min-w-[320px]' : ''}`;

    const roleSpecificBubbleClasses = {
        user: 'bg-[var(--theme-bg-user-message)] text-[var(--theme-bg-user-message-text)] rounded-lg',
        model: 'bg-[var(--theme-bg-model-message)] text-[var(--theme-bg-model-message-text)] rounded-lg',
        error: 'bg-[var(--theme-bg-error-message)] text-[var(--theme-bg-error-message-text)] rounded-lg',
    };

    const isMobile = useMemo(() => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0), []);


    return (
        <div 
            className="relative message-container-animate"
            style={{ animationDelay: `${Math.min(messageIndex * 80, 800)}ms` }}
            data-message-id={message.id} 
            data-message-role={message.role}
        >
            <div
                className={`${messageContainerClasses}`}
            >
                {message.role !== 'user' && <MessageActions {...props} isGrouped={isGrouped} />}
                <div 
                    className={`${bubbleClasses} ${roleSpecificBubbleClasses[message.role]}`}
                >
                    <MessageContent {...props} />
                </div>
                {message.role === 'user' && <MessageActions {...props} isGrouped={isGrouped} />}
            </div>
        </div>
    );
});