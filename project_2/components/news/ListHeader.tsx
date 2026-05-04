import { View, Text, StyleSheet } from "react-native";

export default function ListHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>СЬОГОДНІ</Text>
            <Text style={styles.title}>📰 Стрічка новин</Text>
            <Text style={styles.subtitle}>Найважливіші події дня</Text>
            <View style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 12,
        backgroundColor: '#f7f8fc',
    },
    label: {
        fontSize: 11,
        fontWeight: '700',
        color: '#4a6cf7',
        letterSpacing: 1.2,
        marginBottom: 6,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1a1a2e',
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#e8ecf7',
        marginTop: 16,
    },
});
