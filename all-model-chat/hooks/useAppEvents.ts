import { useState, useEffect } from 'react';
import { AppSettings, SavedChatSession, ChatSettings } from '../types';
import { logService } from '../services/logService';
import { exportAllData as exportData, importAllData as importData } from '../utils/exportImportUtils';

interface AppEventsProps {
  appSettings: AppSettings;
  setAppSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  savedSessions: SavedChatSession[];
  language: string;
  startNewChat: () => void;
  handleClearCurrentChat: () => void;
  currentChatSettings: ChatSettings;
  handleSelectModelInHeader: (modelId: string) => void;
  isSettingsModalOpen: boolean;
  isPreloadedMessagesModalOpen: boolean;
  setIsLogViewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAppEvents = ({
  appSettings,
  setAppSettings,
  savedSessions,
  language,
  startNewChat,
  handleClearCurrentChat,
  currentChatSettings,
  handleSelectModelInHeader,
  isSettingsModalOpen,
  isPreloadedMessagesModalOpen,
  setIsLogViewerOpen,
}: AppEventsProps) => {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(window.matchMedia('(display-mode: standalone)').matches);

  // PWA Installation Handlers
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      logService.info('PWA install prompt available.');
      setInstallPromptEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    const handleAppInstalled = () => {
      logService.info('PWA installed successfully.');
      setInstallPromptEvent(null);
      setIsStandalone(true);
    };
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => window.removeEventListener('appinstalled', handleAppInstalled);
  }, []);

  const handleInstallPwa = async () => {
    if (!installPromptEvent) return;
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    logService.info(`PWA install prompt outcome: ${outcome}`);
    setInstallPromptEvent(null);
  };

  // Settings Import/Export
  const handleExportSettings = () => {
    exportData(appSettings, [], []);
  };

  const handleImportSettings = async (file: File) => {
    try {
        const result = await importData(file);
        if (result && result.appSettings) {
            setAppSettings(result.appSettings);
            logService.info('Settings imported successfully.');
            alert('Settings imported successfully!');
        } else {
            logService.error('Failed to import settings or file is invalid.');
            alert('Failed to import settings. Please check the file format.');
        }
    } catch (error) {
        logService.error('Error importing settings:', { error });
        alert(`Error importing settings: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        const activeElement = document.activeElement as HTMLElement;
        const isGenerallyInputFocused = activeElement && (activeElement.tagName.toLowerCase() === 'input' || activeElement.tagName.toLowerCase() === 'textarea' || activeElement.tagName.toLowerCase() === 'select' || activeElement.isContentEditable);
        if ((event.ctrlKey || event.metaKey) && event.altKey && event.key.toLowerCase() === 'n') {
            event.preventDefault();
            startNewChat(); 
        } else if ((event.ctrlKey || event.metaKey) && event.altKey && event.key.toLowerCase() === 'l') {
            event.preventDefault();
            setIsLogViewerOpen(prev => !prev);
        }
        else if (event.key === 'Delete') {
            if (isSettingsModalOpen || isPreloadedMessagesModalOpen) return;
            const chatTextareaAriaLabel = 'Chat message input';
            const isChatTextareaFocused = activeElement?.getAttribute('aria-label') === chatTextareaAriaLabel;
            
            if (isGenerallyInputFocused) {
                if (isChatTextareaFocused && (activeElement as HTMLTextAreaElement).value.trim() === '') {
                    event.preventDefault();
                    handleClearCurrentChat(); 
                }
            } else {
                event.preventDefault();
                handleClearCurrentChat();
            }
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [startNewChat, handleClearCurrentChat, isSettingsModalOpen, isPreloadedMessagesModalOpen, setIsLogViewerOpen]);


  return {
    installPromptEvent,
    isStandalone,
    handleInstallPwa,
    handleExportSettings,
    handleImportSettings,
  };
};