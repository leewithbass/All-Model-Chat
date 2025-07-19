import React from 'react';
import { Modal } from './shared/Modal';
import { getTranslator } from '../utils/appUtils';

interface ExportChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'png' | 'html') => void;
  exportStatus: 'idle' | 'exporting';
  t: ReturnType<typeof getTranslator>;
}

export const ExportChatModal: React.FC<ExportChatModalProps> = ({ isOpen, onClose, onExport, exportStatus, t }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('exportChat_title')}>
      <div className="flex flex-col space-y-4">
        <p>{t('exportChat_description')}</p>
        <div className="flex justify-end space-x-3 pt-2">
          <button
            onClick={() => onExport('png')}
            disabled={exportStatus === 'exporting'}
            className="px-4 py-2 rounded-md bg-[var(--theme-bg-accent)] text-[var(--theme-text-accent)] hover:opacity-90 disabled:opacity-50"
          >
            {exportStatus === 'exporting' ? t('exportChat_exporting') : t('exportChat_asPNG')}
          </button>
          <button
            onClick={() => onExport('html')}
            disabled={exportStatus === 'exporting'}
            className="px-4 py-2 rounded-md bg-[var(--theme-bg-accent)] text-[var(--theme-text-accent)] hover:opacity-90 disabled:opacity-50"
          >
            {exportStatus === 'exporting' ? t('exportChat_exporting') : t('exportChat_asHTML')}
          </button>
        </div>
      </div>
    </Modal>
  );
};