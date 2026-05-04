import { Ionicons } from '@expo/vector-icons';

export type SettingItem =
    | { id: string; title: string; icon: keyof typeof Ionicons.glyphMap; type: 'toggle'; stateKey: string }
    | { id: string; title: string; icon: keyof typeof Ionicons.glyphMap; type: 'navigate'; screen: string }
    | { id: string; title: string; icon: keyof typeof Ionicons.glyphMap; type: 'action'; actionId: string; destructive?: boolean };

export const SETTINGS_LIST: SettingItem[] = [
    { id: 'theme', title: 'Dark Mode', icon: 'moon-outline', type: 'toggle', stateKey: 'darkMode' },
    { id: 'notifications', title: 'Notifications', icon: 'notifications-outline', type: 'toggle', stateKey: 'notifications' },

    { id: 'language', title: 'Language', icon: 'language-outline', type: 'navigate', screen: '/details' },
    { id: 'privacy', title: 'Privacy', icon: 'lock-closed-outline', type: 'navigate', screen: '/details' },

    { id: 'about', title: 'About', icon: 'information-circle-outline', type: 'action', actionId: 'about' },
    { id: 'logout', title: 'Log Out', icon: 'log-out-outline', type: 'action', actionId: 'logout', destructive: true },
];