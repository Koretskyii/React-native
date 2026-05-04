import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const DETAILS_CONTENT: Record<string, { description: string; icon: keyof typeof Ionicons.glyphMap; items: string[] }> = {
    Language: {
        description: 'Оберіть мову інтерфейсу додатку',
        icon: 'language-outline',
        items: ['🇺🇦 Українська (активна)', '🇬🇧 English', '🇵🇱 Polski', '🇩🇪 Deutsch'],
    },
    Privacy: {
        description: 'Налаштування приватності та безпеки даних',
        icon: 'lock-closed-outline',
        items: ['Видимість профілю: Публічний', 'Двофакторна автентифікація: Вимкнено', 'Історія активності: Увімкнено', 'Завантаження даних'],
    },
};

const DEFAULT_CONTENT = {
    description: 'Деталі налаштування',
    icon: 'settings-outline' as const,
    items: ['Тут буде контент'],
};

export default function DetailsScreen() {
    const { title } = useLocalSearchParams<{ title: string }>();
    const content = DETAILS_CONTENT[title ?? ''] ?? DEFAULT_CONTENT;

    return (
        <>
            <Stack.Screen options={{ title: title ?? 'Details' }} />
            <ThemedView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.iconCircle}>
                        <Ionicons name={content.icon} size={32} color="#4A90D9" />
                    </View>
                    <ThemedText style={styles.description}>{content.description}</ThemedText>
                </View>

                <View style={styles.list}>
                    {content.items.map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <ThemedText style={styles.listItemText}>{item}</ThemedText>
                        </View>
                    ))}
                </View>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E8F0FE',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 15,
        color: '#888',
        textAlign: 'center',
    },
    list: {
        marginTop: 10,
        borderRadius: 12,
        overflow: 'hidden',
    },
    listItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee',
    },
    listItemText: {
        fontSize: 16,
    },
});
