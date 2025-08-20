import React, { useState, useEffect, useRef } from 'react';
import { X, Save } from 'lucide-react';
import { translations } from '../../utils/appUtils';
import { Modal } from '../shared/Modal';

interface CustomSystemPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrompt: string;
  onSave: (newPrompt: string) => void;
  t: (key: keyof typeof translations) => string;
}

export const CustomSystemPromptModal: React.FC<CustomSystemPromptModalProps> = ({
  isOpen,
  onClose,
  currentPrompt,
  onSave,
  t,
}) => {
  const [prompt, setPrompt] = useState(currentPrompt);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPrompt(currentPrompt);
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
        textareaRef.current?.setSelectionRange(
          textareaRef.current.value.length,
          textareaRef.current.value.length
        );
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentPrompt]);

  const handleSave = () => {
    onSave(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} noPadding contentClassName="w-full h-full sm:w-auto sm:h-auto">
      <div className="bg-[var(--theme-bg-primary)] w-full h-full sm:rounded-2xl sm:shadow-premium sm:w-[50rem] sm:h-[38rem] flex flex-col">
        <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-[var(--theme-border-primary)]">
          <h2 id="custom-system-prompt-title" className="text-lg font-semibold text-[var(--theme-text-primary)]">
            {t('customSystemPrompt_title')}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--theme-text-tertiary)] hover:text-[var(--theme-text-primary)] transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--theme-border-focus)]"
            aria-label={t('close')}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow flex flex-col min-h-0">
          <div className="flex-grow min-h-0 p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            <p className="text-sm text-[var(--theme-text-secondary)] mb-4">
              {t('customSystemPrompt_description')}
            </p>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-full min-h-[200px] p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border-secondary)] rounded-lg focus:ring-2 focus:ring-[var(--theme-border-focus)] focus:border-[var(--theme-border-focus)] text-[var(--theme-text-primary)] placeholder-[var(--theme-text-tertiary)] resize-none custom-scrollbar"
              placeholder={t('customSystemPrompt_placeholder')}
              aria-label={t('customSystemPrompt_label')}
            />
          </div>

          <div className="flex-shrink-0 flex justify-end gap-3 p-4 border-t border-[var(--theme-border-primary)] bg-[var(--theme-bg-primary)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[var(--theme-text-secondary)] bg-[var(--theme-bg-secondary)] border border-[var(--theme-border-secondary)] rounded-lg hover:bg-[var(--theme-bg-tertiary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--theme-bg-primary)] focus:ring-[var(--theme-border-focus)] transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              ref={saveButtonRef}
              type="submit"
              className="px-4 py-2 text-sm font-medium text-[var(--theme-text-accent)] bg-[var(--theme-bg-accent)] border border-transparent rounded-lg hover:bg-[var(--theme-bg-accent-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--theme-bg-primary)] focus:ring-[var(--theme-border-focus)] transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};