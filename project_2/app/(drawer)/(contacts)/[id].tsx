import { findContactById } from "@/data/contacts";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ContactDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const contact = findContactById(Array.isArray(id) ? id[0] : id);

    if (!contact) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>Контакт не знайдено</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: contact.name }} />
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                {/* Avatar */}
                <View style={styles.avatarSection}>
                    <Image source={{ uri: contact.avatar }} style={styles.avatar} />
                    <Text style={styles.name}>{contact.name}</Text>
                    <Text style={styles.company}>{contact.company}</Text>
                </View>

                {/* Info cards */}
                <View style={styles.card}>
                    <InfoRow icon="📞" label="Телефон" value={contact.phone} />
                    <View style={styles.divider} />
                    <InfoRow icon="✉️" label="Email" value={contact.email} />
                    <View style={styles.divider} />
                    <InfoRow icon="🏢" label="Компанія" value={contact.company} />
                    <View style={styles.divider} />
                    <InfoRow icon="📍" label="Адреса" value={contact.address} />
                </View>
            </ScrollView>
        </>
    );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
        <View style={styles.row}>
            <Text style={styles.rowIcon}>{icon}</Text>
            <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowValue}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fc',
    },
    content: {
        paddingBottom: 40,
    },
    avatarSection: {
        alignItems: 'center',
        paddingVertical: 32,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e8ecf7',
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        marginBottom: 12,
        borderWidth: 3,
        borderColor: '#4a6cf7',
    },
    name: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1a1a2e',
        letterSpacing: -0.3,
    },
    company: {
        fontSize: 14,
        color: '#4a6cf7',
        marginTop: 4,
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        gap: 12,
    },
    rowIcon: {
        fontSize: 20,
        width: 28,
        textAlign: 'center',
    },
    rowText: {
        flex: 1,
    },
    rowLabel: {
        fontSize: 11,
        color: '#aaa',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    rowValue: {
        fontSize: 15,
        color: '#1a1a2e',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f2f8',
        marginLeft: 40,
    },
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundText: {
        fontSize: 16,
        color: '#999',
    },
});