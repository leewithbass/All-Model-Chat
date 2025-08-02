import React from 'react';
import { Wand2 } from 'lucide-react';
import { Theme } from '../../constants/themeConstants';
import { AppSettings } from '../../types';
import { translations } from '../../utils/appUtils';
import { getResponsiveValue } from '../../utils/appUtils';
import { Select } from './shared/Tooltip';

interface AppearanceSectionProps {
  appSettings: AppSettings;
  onSettingChange: (key: keyof AppSettings, value: any) => void;
  t: (key: keyof typeof translations) => string;
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  appSettings,
  onSettingChange,
  t,
}) => {
  const iconSize = getResponsiveValue(14, 16);

  const themeOptions: { id: 'system' | 'onyx' | 'pearl'; labelKey: keyof typeof translations }[] = [
    { id: 'system', labelKey: 'settingsThemeSystem' },
    { id: 'onyx', labelKey: 'settingsThemeDark' },
    { id: 'pearl', labelKey: 'settingsThemeLight' },
  ];

  return (
    <div className="space-y-4 p-3 sm:p-4 border border-[var(--theme-border-secondary)] rounded-lg bg-[var(--theme-bg-secondary)]">
      <h3 className="text-sm font-semibold text-[var(--theme-text-primary)] flex items-center mb-1">
        <Wand2 size={iconSize} className="mr-2 text-[var(--theme-text-link)] opacity-80" />
        {t('settingsAppearance')}
      </h3>
       <div>
        <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
          {t('settingsTheme')}
        </label>
        <div role="radiogroup" className="flex w-full bg-[var(--theme-bg-tertiary)] p-1 rounded-lg">
          {themeOptions.map(option => (
            <button
              key={option.id}
              role="radio"
              aria-checked={appSettings.themeId === option.id}
              onClick={() => onSettingChange('themeId', option.id)}
              className={`flex-1 text-center px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--theme-bg-tertiary)] focus:ring-[var(--theme-border-focus)] ${
                appSettings.themeId === option.id
                  ? 'bg-[var(--theme-bg-accent)] text-[var(--theme-text-accent)] shadow'
                  : 'text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg-input)]/50'
              }`}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="base-font-size-slider" className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
          {t('settingsFontSize')}: <span className="font-mono text-[var(--theme-text-link)]">{appSettings.baseFontSize}px</span>
        </label>
        <input
          id="base-font-size-slider" type="range" min="12" max="24" step="1"
          value={appSettings.baseFontSize} onChange={(e) => onSettingChange('baseFontSize', parseInt(e.target.value, 10))}
          className="w-full h-2 bg-[var(--theme-border-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--theme-bg-accent)]"
          aria-label={`Base font size for the application: ${appSettings.baseFontSize}px`}
        />
      </div>
      <Select
        id="language-select"
        label={t('settingsLanguage')}
        value={appSettings.language}
        onChange={(e) => onSettingChange('language', e.target.value as 'en' | 'zh' | 'system')}
        aria-label="Select application language"
      >
        <option value="system">{t('settingsLanguageSystem')}</option>
        <option value="en">{t('settingsLanguageEn')}</option>
        <option value="zh">{t('settingsLanguageZh')}</option>
      </Select>
      <div className="flex items-center justify-between">
        <div>
            <label htmlFor="cmdEnterToSend" className="text-sm font-medium text-[var(--theme-text-primary)]">
                {t('setting_cmdEnterToSend_label')}
            </label>
            <p className="text-xs text-[var(--theme-text-secondary)]">
                {t('setting_cmdEnterToSend_description')}
            </p>
        </div>
        <button
            id="cmdEnterToSend"
            onClick={() => onSettingChange('isCmdEnterToSendEnabled', !appSettings.isCmdEnterToSendEnabled)}
            className={`${appSettings.isCmdEnterToSendEnabled ? 'bg-[var(--theme-bg-accent)]' : 'bg-gray-400/50'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--theme-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--theme-bg-primary)]`}
            aria-pressed={appSettings.isCmdEnterToSendEnabled}
        >
            <span
                className={`${appSettings.isCmdEnterToSendEnabled ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
      </div>
    </div>
  );
};