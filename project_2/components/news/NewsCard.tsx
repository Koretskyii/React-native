import { NewsItem } from "@/data/news";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NewsCard({ item }: { item: NewsItem }) {
    const router = useRouter();

    const handlePress = () => {
        router.push({ pathname: '/(drawer)/(news)/[id]', params: { id: item.id } });
    };

    const formattedDate = new Date(item.date).toLocaleDateString('uk-UA', {
        day: 'numeric', month: 'short', year: 'numeric',
    });

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.85}>
            {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            )}
            <View style={styles.body}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                <View style={styles.footer}>
                    <Text style={styles.date}>{formattedDate}</Text>
                    <Text style={styles.arrow}>→</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 180,
    },
    body: {
        padding: 14,
        gap: 6,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#eef1ff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#4a6cf7',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a2e',
        lineHeight: 22,
    },
    description: {
        fontSize: 13,
        color: '#777',
        lineHeight: 19,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: '#aaa',
    },
    arrow: {
        fontSize: 16,
        color: '#4a6cf7',
        fontWeight: '600',
    },
});
