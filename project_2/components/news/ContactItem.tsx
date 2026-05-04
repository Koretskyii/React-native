import { Contact } from "@/data/contacts";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ContactItem({ contact }: { contact: Contact }) {
    const router = useRouter();

    const handlePress = () => {
        router.push({ pathname: '/(drawer)/(contacts)/[id]', params: { id: contact.id } });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
            <Image source={{ uri: contact.avatar }} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={styles.name}>{contact.name}</Text>
                <Text style={styles.phone}>{contact.phone}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        gap: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#e8ecf7',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1a1a2e',
    },
    phone: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    arrow: {
        fontSize: 22,
        color: '#ccc',
    },
});