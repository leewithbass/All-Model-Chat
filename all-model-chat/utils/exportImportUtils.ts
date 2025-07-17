import { AppSettings, SavedChatSession, SavedScenario } from '../types';

export interface ExportData {
  version: string;
  timestamp: number;
  appSettings: AppSettings;
  chatSessions: SavedChatSession[];
  scenarios: SavedScenario[];
}

export const exportAllData = (
  appSettings: AppSettings,
  chatSessions: SavedChatSession[],
  scenarios: SavedScenario[]
): void => {
  const exportData: ExportData = {
    version: '1.0.0',
    timestamp: Date.now(),
    appSettings,
    chatSessions,
    scenarios,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `all-model-chat-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importAllData = (file: File): Promise<ExportData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as ExportData;
        
        // 验证数据结构
        if (!data.version || !data.appSettings || !Array.isArray(data.chatSessions) || !Array.isArray(data.scenarios)) {
          throw new Error('Invalid file format');
        }
        
        resolve(data);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Failed to parse file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

export const validateImportData = (data: any): data is ExportData => {
  return (
    typeof data === 'object' &&
    typeof data.version === 'string' &&
    typeof data.timestamp === 'number' &&
    typeof data.appSettings === 'object' &&
    Array.isArray(data.chatSessions) &&
    Array.isArray(data.scenarios)
  );
};