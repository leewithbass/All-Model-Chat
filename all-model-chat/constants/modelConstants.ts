export const DEFAULT_MODEL_ID = 'gemini-2.5-pro'; 

export const TAB_CYCLE_MODELS: string[] = [
    'gemini-2.5-pro',
    'models/gemini-flash-latest',
    'models/gemini-flash-lite-latest',
];

export const THINKING_BUDGET_RANGES: { [key: string]: { min: number; max: number } } = {
    'models/gemini-flash-latest': { min: 1, max: 24576 },
    'gemini-2.5-pro': { min: 128, max: 32768 },
    'models/gemini-flash-lite-latest': { min: 512, max: 24576 },
};

export const DEFAULT_TEMPERATURE = 1.0; 
export const DEFAULT_TOP_P = 0.95; 
export const DEFAULT_SHOW_THOUGHTS = true;
export const DEFAULT_THINKING_BUDGET = -1; // -1 for auto/unlimited budget
export const DEFAULT_TTS_VOICE = 'Zephyr';

export const DEFAULT_TRANSCRIPTION_MODEL_ID = 'qwen-asr';
export const DEFAULT_TRANSCRIPTION_THINKING_ENABLED = false;

export const AVAILABLE_TRANSCRIPTION_MODELS: { id: string; name: string }[] = [
    { id: 'qwen-asr', name: 'Qwen ASR (Default)' },
    { id: 'models/gemini-flash-latest', name: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro (Higher Quality)' },
    { id: 'models/gemini-flash-lite-latest', name: 'Gemini 2.5 Flash Lite (Fastest)' },
];

export const AVAILABLE_TRANSCRIPTION_LANGUAGES: { id: string, name: string }[] = [
    { id: 'auto', name: '🌐 Auto Detect' },
    { id: 'zh', name: '🇨🇳 Chinese' },
    { id: 'en', name: '🇺🇸 English' },
    { id: 'ja', name: '🇯🇵 Japanese' },
    { id: 'ko', name: '🇰🇷 Korean' },
    { id: 'es', name: '🇪🇸 Spanish' },
    { id: 'fr', name: '🇫🇷 French' },
    { id: 'de', name: '🇩🇪 German' },
    { id: 'ar', name: '🇸🇦 Arabic' },
    { id: 'it', name: '🇮🇹 Italian' },
    { id: 'ru', name: '🇷🇺 Russian' },
    { id: 'pt', name: '🇵🇹 Portuguese' },
];

export const AVAILABLE_TTS_VOICES: { id: string; name: string }[] = [
    { id: 'Zephyr', name: 'Zephyr (Bright)' },
    { id: 'Puck', name: 'Puck (Upbeat)' },
    { id: 'Charon', name: 'Charon (Informative)' },
    { id: 'Kore', name: 'Kore (Firm)' },
    { id: 'Fenrir', name: 'Fenrir (Excitable)' },
    { id: 'Leda', name: 'Leda (Youthful)' },
    { id: 'Orus', name: 'Orus (Firm)' },
    { id: 'Aoede', name: 'Aoede (Breezy)' },
    { id: 'Callirrhoe', name: 'Callirrhoe (Easy-going)' },
    { id: 'Autonoe', name: 'Autonoe (Bright)' },
    { id: 'Enceladus', name: 'Enceladus (Breathy)' },
    { id: 'Iapetus', name: 'Iapetus (Clear)' },
    { id: 'Umbriel', name: 'Umbriel (Easy-going)' },
    { id: 'Algieba', name: 'Algieba (Smooth)' },
    { id: 'Despina', name: 'Despina (Smooth)' },
    { id: 'Erinome', name: 'Erinome (Clear)' },
    { id: 'Algenib', name: 'Algenib (Gravelly)' },
    { id: 'Rasalgethi', name: 'Rasalgethi (Informative)' },
    { id: 'Laomedeia', name: 'Laomedeia (Upbeat)' },
    { id: 'Achernar', name: 'Achernar (Soft)' },
    { id: 'Alnilam', name: 'Alnilam (Firm)' },
    { id: 'Schedar', name: 'Schedar (Even)' },
    { id: 'Gacrux', name: 'Gacrux (Mature)' },
    { id: 'Pulcherrima', name: 'Pulcherrima (Forward)' },
    { id: 'Achird', name: 'Achird (Friendly)' },
    { id: 'Zubenelgenubi', name: 'Zubenelgenubi (Casual)' },
    { id: 'Vindemiatrix', name: 'Vindemiatrix (Gentle)' },
    { id: 'Sadachbia', name: 'Sadachbia (Lively)' },
    { id: 'Sadaltager', name: 'Sadaltager (Knowledgeable)' },
    { id: 'Sulafat', name: 'Sulafat (Warm)' },
];