import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface ListFooterProps {
    loading: boolean;
}

export default function ListFooter({ loading }: ListFooterProps) {
    if (!loading) return <View style={styles.spacer} />;

    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color="#4a6cf7" />
            <Text style={styles.text}>Завантаження новин...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        gap: 10,
    },
    text: {
        fontSize: 13,
        color: '#888',
        fontStyle: 'italic',
    },
    spacer: {
        height: 24,
    },
});
