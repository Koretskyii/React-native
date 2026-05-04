import { ThemedText } from '@/components/themed-text';
import { SettingItem } from '@/constants/settings.const';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

type Props = {
    item: SettingItem;
    // Для toggle-айтемів: поточне значення та callback
    toggleValue?: boolean;
    onToggle?: (value: boolean) => void;
    // Для navigate/action: callback натискання
    onPress?: () => void;
};

export function SettingRow({ item, toggleValue, onToggle, onPress }: Props) {
    const isDestructive = item.type === 'action' && item.destructive;

    return (
        <Pressable
            style={({ pressed }) => [styles.row, pressed && item.type !== 'toggle' && styles.pressed]}
            onPress={item.type !== 'toggle' ? onPress : undefined}
        >
            <View style={styles.left}>
                <Ionicons
                    name={item.icon}
                    size={22}
                    color={isDestructive ? '#FF3B30' : '#888'}
                    style={styles.icon}
                />
                <ThemedText style={[styles.title, isDestructive && styles.destructiveText]}>
                    {item.title}
                </ThemedText>
            </View>

            <View style={styles.right}>
                {item.type === 'toggle' && (
                    <Switch
                        value={toggleValue}
                        onValueChange={onToggle}
                        trackColor={{ false: '#ccc', true: '#4A90D9' }}
                    />
                )}
                {item.type === 'navigate' && (
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee',
    },
    pressed: {
        opacity: 0.6,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 14,
        width: 24,
    },
    title: {
        fontSize: 16,
    },
    destructiveText: {
        color: '#FF3B30',
    },
    right: {
        marginLeft: 8,
    },
});
